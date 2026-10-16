/* Edge Function "admin": chức năng của chủ app (owner), thay cho student-login cũ. Chỉ người dùng có trong bảng
   app_owners gọi được. Hàm dùng khóa bí mật (service role) nên bỏ qua RLS: mọi kiểm tra quyền nằm ở đây.

   Tài khoản = một gia đình. Tên đăng nhập lưu ở Supabase Auth dạng email nội bộ <tên-đăng-nhập>@users.onup.invalid
   (đuôi .invalid không bao giờ là email thật; tạo bằng auth.admin.createUser với email_confirm, không gửi thư).

   Triển khai: xem docs/HUONG-DAN-SUPABASE.md. Tắt "Verify JWT" cho hàm này (hàm tự kiểm tra người gọi).

   Các yêu cầu (POST, JSON, luôn kèm Authorization: Bearer <token phiên đăng nhập của owner>):
     {action:"list_accounts", q?}                                  → {accounts:[Account], stats}
     {action:"create_account", username, password?, display_name?, note?} → {account, password}
     {action:"reset_password", id, password?}                      → {account, password}   (bắt đổi ở lần đăng nhập tới)
     {action:"set_plan", id, plan, until?, amount?, note?}         → {account}   (until "YYYY-MM-DD", bắt buộc với gói trả phí)
     {action:"set_status", id, status:"active"|"locked"}           → {account}
     {action:"delete_account", id, confirm}                        → {ok:true}   (confirm = đúng tên đăng nhập)
   password để trống thì hàm tự sinh mật khẩu tạm. Account = {id, username, display_name, plan, plan_until, plan_active,
   status, must_change_password, created_at, last_seen_at, children, grades, note}.
   Lỗi: {error:"auth"|"forbidden"|"bad_request"|"username"|"taken"|"password"|"not_found"|"plan"|"date"|"self"|"confirm"|"server"}.
   Mọi thao tác ghi (trừ list_accounts) ghi một dòng admin_log; set_plan ghi thêm plan_log. Không ghi mật khẩu vào nhật ký. */

// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2.116.0";

export type Deps = {
  db: any;                                                     // supabase-js với khóa bí mật (service role)
  getUser: (token: string) => Promise<{ id: string } | null>;  // kiểm tra token của người gọi
  now?: () => Date;                                            // chỉ đổi khi kiểm thử
};

export const LOGIN_DOMAIN = "users.onup.invalid";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-region, x-supabase-api-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const BAN = "876000h";               // khóa tài khoản: cấm đăng nhập ~100 năm (mở khóa: "none")
const PAGE = 1000;                   // PostgREST trả tối đa 1000 dòng mỗi lần
const PW_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"; // bỏ i, l, o, 0, 1 cho khỏi đọc nhầm khi gửi qua Zalo
const FAMILY_COLS = "id, auth_user_id, username, display_name, plan, plan_until, must_change_password, status, created_at, last_seen_at";

/* Tên đăng nhập: 4–20 kí tự a-z 0-9 . _, đầu và cuối là chữ hoặc số, không có ".." (giống ràng buộc trong schema.sql). */
export function usernameProblem(u: string): boolean {
  return !/^[a-z0-9][a-z0-9._]{2,18}[a-z0-9]$/.test(u) || u.includes("..");
}
export const loginEmail = (username: string) => `${username}@${LOGIN_DOMAIN}`;
/* Mật khẩu: 8–72 kí tự (72 là giới hạn của bcrypt mà Supabase Auth dùng). */
export const passwordProblem = (p: string) => p.length < 8 || p.length > 72 || !p.trim();
export function tempPassword(len = 10): string {
  const out: string[] = [];
  while (out.length < len) {
    for (const b of crypto.getRandomValues(new Uint8Array(len * 2))) {
      if (b < 248 && out.length < len) out.push(PW_ALPHABET[b % PW_ALPHABET.length]); // 248 = 8 × 31: không lệch
    }
  }
  return out.join("");
}
/* Ngày hôm nay theo giờ Việt Nam (UTC+7), dạng YYYY-MM-DD. */
export const todayVN = (d: Date) => new Date(d.getTime() + 7 * 3600e3).toISOString().slice(0, 10);
const validDate = (s: string) => DATE_RE.test(s) && new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s;
const addYears = (s: string, n: number) => String(+s.slice(0, 4) + n) + s.slice(4);

class Reply {
  body: unknown; status: number;
  constructor(body: unknown, status = 200) { this.body = body; this.status = status; }
}
const bad = (error: string, status = 400) => new Reply({ error }, status);

export function createHandler(deps: Deps) {
  const { db } = deps;
  const now = deps.now || (() => new Date());
  const reply = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

  async function run(q: any) {
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return data;
  }
  async function one(q: any) {
    const { data, error } = await q.maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  }
  /* Đọc hết một bảng theo từng trang (bảng có thể dài hơn 1000 dòng). */
  async function all(make: () => any) {
    const rows: any[] = [];
    for (let from = 0; ; from += PAGE) {
      const page = await run(make().range(from, from + PAGE - 1));
      rows.push(...(page || []));
      if (!page || page.length < PAGE) return rows;
    }
  }
  const authErr = (e: any) => String((e && (e.code || e.message)) || e || "");

  async function family(id: unknown) {
    if (!UUID_RE.test(String(id || ""))) throw bad("not_found", 404);
    const f = await one(db.from("families").select(FAMILY_COLS).eq("id", String(id)));
    if (!f) throw bad("not_found", 404);
    return f;
  }
  async function isOwner(uid: string) {
    return !!(await one(db.from("app_owners").select("user_id").eq("user_id", uid)));
  }
  async function account(f: any, kids?: any[], note?: string | null) {
    if (!kids) kids = await run(db.from("profiles").select("family_id, grade").eq("family_id", f.id));
    if (note === undefined) note = ((await one(db.from("admin_notes").select("note").eq("family_id", f.id))) || {}).note;
    const grades = [...new Set((kids || []).map((k: any) => +k.grade))].sort((a, b) => a - b);
    return {
      id: f.id, username: f.username, display_name: f.display_name, plan: f.plan, plan_until: f.plan_until,
      plan_active: f.plan !== "free" && !!f.plan_until && f.plan_until >= todayVN(now()),
      status: f.status, must_change_password: f.must_change_password, created_at: f.created_at, last_seen_at: f.last_seen_at,
      children: (kids || []).length, grades, note: note || "",
    };
  }
  async function log(actor: string, action: string, f: any, detail: Record<string, unknown> = {}) {
    await run(db.from("admin_log").insert({ actor, action, family_id: f ? f.id : null, username: f ? f.username : null, detail }));
  }
  function newPassword(p: unknown): string {
    if (p == null || p === "") return tempPassword();
    if (typeof p !== "string" || passwordProblem(p)) throw bad("password");
    return p;
  }

  /* ---------------- các thao tác ---------------- */
  async function listAccounts(body: any) {
    const fams = await all(() => db.from("families").select(FAMILY_COLS).order("created_at", { ascending: false }).order("id"));
    const kids = await all(() => db.from("profiles").select("family_id, grade").order("id"));
    const notes = await all(() => db.from("admin_notes").select("family_id, note").order("family_id"));
    const kidsOf = new Map<string, any[]>(), noteOf = new Map<string, string>();
    for (const k of kids) { if (!kidsOf.has(k.family_id)) kidsOf.set(k.family_id, []); kidsOf.get(k.family_id)!.push(k); }
    for (const n of notes) noteOf.set(n.family_id, n.note);
    const list = await Promise.all(fams.map((f: any) => account(f, kidsOf.get(f.id) || [], noteOf.get(f.id) || "")));
    const today = todayVN(now()), in30 = todayVN(new Date(now().getTime() + 30 * 864e5)), weekAgo = now().getTime() - 7 * 864e5;
    const byGrade: Record<string, number> = {};
    for (const k of kids) byGrade[k.grade] = (byGrade[k.grade] || 0) + 1;
    const stats = {
      accounts: list.length,
      locked: list.filter((a) => a.status === "locked").length,
      children: kids.length,
      children_by_grade: byGrade,
      active_7d: list.filter((a) => a.last_seen_at && new Date(a.last_seen_at).getTime() >= weekAgo).length,
      paid: list.filter((a) => a.plan_active).length,
      expiring_30d: list.filter((a) => a.plan_active && a.plan_until <= in30 && a.plan_until >= today).length,
    };
    const q = String(body.q ?? "").trim().toLowerCase().slice(0, 100);
    const accounts = q ? list.filter((a) => [a.username, a.display_name, a.note].some((s) => String(s || "").toLowerCase().includes(q))) : list;
    return { accounts, stats };
  }

  async function createAccount(actor: string, body: any) {
    const username = String(body.username ?? "").trim().toLowerCase();
    if (usernameProblem(username)) throw bad("username");
    const password = newPassword(body.password);
    const display = String(body.display_name ?? "").trim().slice(0, 80);
    const note = String(body.note ?? "").trim().slice(0, 2000);
    if (await one(db.from("families").select("id").eq("username", username))) throw bad("taken", 409);
    const { data, error } = await db.auth.admin.createUser({
      email: loginEmail(username), password, email_confirm: true, user_metadata: { username },
    });
    if (error || !data || !data.user) {
      if (/already|exists|registered/i.test(authErr(error))) throw bad("taken", 409);
      if (/password/i.test(authErr(error))) throw bad("password");
      throw new Error("createUser: " + authErr(error));
    }
    const uid = data.user.id;
    const ins = await db.from("families").insert({ auth_user_id: uid, username, display_name: display, must_change_password: true })
      .select(FAMILY_COLS).maybeSingle();
    if (ins.error || !ins.data) {
      await db.auth.admin.deleteUser(uid); // không để lại người dùng Auth không có tài khoản
      if (ins.error && (ins.error.code === "23505" || /duplicate/i.test(ins.error.message))) throw bad("taken", 409);
      throw new Error("insert families: " + (ins.error ? ins.error.message : "không có dòng"));
    }
    if (note) await run(db.from("admin_notes").upsert({ family_id: ins.data.id, note, updated_at: now().toISOString() }));
    await log(actor, "create_account", ins.data);
    return { account: await account(ins.data, [], note), password };
  }

  async function resetPassword(actor: string, body: any) {
    const f = await family(body.id);
    const password = newPassword(body.password);
    const { error } = await db.auth.admin.updateUserById(f.auth_user_id, { password });
    if (error) {
      if (/password/i.test(authErr(error))) throw bad("password");
      throw new Error("updateUserById: " + authErr(error));
    }
    // Supabase Auth đăng xuất mọi máy khi đặt lại mật khẩu bằng quyền admin.
    const upd = await one(db.from("families").update({ must_change_password: true }).eq("id", f.id).select(FAMILY_COLS));
    await log(actor, "reset_password", f);
    return { account: await account(upd || f), password };
  }

  async function setPlan(actor: string, body: any) {
    const f = await family(body.id);
    const plan = String(body.plan ?? "");
    if (!plan || !(await one(db.from("plans").select("id").eq("id", plan)))) throw bad("plan");
    let until: string | null = null;
    if (plan !== "free") {
      until = String(body.until ?? "");
      const today = todayVN(now());
      // gói trả phí phải có hạn, từ hôm nay đến tối đa 3 năm sau (chặn gõ nhầm năm)
      if (!validDate(until) || until < today || until > addYears(today, 3)) throw bad("date");
    }
    let amount: number | null = null;
    if (body.amount != null && body.amount !== "") {
      amount = Number(body.amount);
      if (!Number.isInteger(amount) || amount < 0 || amount > 1e9) throw bad("bad_request");
    }
    const note = String(body.note ?? "").trim().slice(0, 500);
    const upd = await one(db.from("families").update({ plan, plan_until: until }).eq("id", f.id).select(FAMILY_COLS));
    if (!upd) throw bad("not_found", 404);
    await run(db.from("plan_log").insert({
      family_id: f.id, username: f.username, old_plan: f.plan, old_until: f.plan_until, new_plan: plan, new_until: until,
      amount, note, by_user: actor,
    }));
    await log(actor, "set_plan", f, { plan, until, amount });
    return { account: await account(upd) };
  }

  async function setStatus(actor: string, body: any) {
    const f = await family(body.id);
    const status = String(body.status ?? "");
    if (status !== "active" && status !== "locked") throw bad("bad_request");
    if (await isOwner(f.auth_user_id)) throw bad("self"); // không khóa chính chủ app
    const upd = await one(db.from("families").update({ status }).eq("id", f.id).select(FAMILY_COLS));
    // Cấm/cho phép đăng nhập ở Supabase Auth (cấm thì máy đang đăng nhập cũng không làm mới phiên được).
    const { error } = await db.auth.admin.updateUserById(f.auth_user_id, { ban_duration: status === "locked" ? BAN : "none" });
    if (error) throw new Error("ban: " + authErr(error));
    await log(actor, "set_status", f, { status });
    return { account: await account(upd || f) };
  }

  async function deleteAccount(actor: string, body: any) {
    const f = await family(body.id);
    if (String(body.confirm ?? "").trim().toLowerCase() !== f.username) throw bad("confirm");
    if (await isOwner(f.auth_user_id)) throw bad("self");
    const { error } = await db.auth.admin.deleteUser(f.auth_user_id);
    if (error && !/not.?found/i.test(authErr(error))) throw new Error("deleteUser: " + authErr(error));
    // Xóa người dùng Auth thì families (và hồ sơ con, kết quả…) bị xóa dây chuyền; xóa thêm cho chắc nếu người dùng đã mất từ trước.
    await run(db.from("families").delete().eq("id", f.id));
    await log(actor, "delete_account", f);
    return { ok: true };
  }

  return async function handle(req: Request): Promise<Response> {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
    if (req.method !== "POST") return reply({ error: "bad_request" }, 405);
    let body: any;
    try { body = JSON.parse((await req.text()).slice(0, 10000)); } catch { return reply({ error: "bad_request" }, 400); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return reply({ error: "bad_request" }, 400);
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    try {
      const actions: Record<string, (actor: string, body: any) => Promise<unknown>> = {
        list_accounts: (_a, b) => listAccounts(b), create_account: createAccount, reset_password: resetPassword,
        set_plan: setPlan, set_status: setStatus, delete_account: deleteAccount,
      };
      const fn = Object.prototype.hasOwnProperty.call(actions, body.action) ? actions[body.action] : null;
      if (!fn) return reply({ error: "bad_request" }, 400);
      const user = token ? await deps.getUser(token) : null;
      if (!user) return reply({ error: "auth" }, 401);
      if (!(await isOwner(user.id))) return reply({ error: "forbidden" }, 403);
      return reply(await fn(user.id, body));
    } catch (e) {
      if (e instanceof Reply) return reply(e.body, e.status);
      console.error(e);
      return reply({ error: "server" }, 500);
    }
  };
}

// Chạy trên Supabase (Deno). Kiểm thử bằng Node (tests/supabase) bỏ dòng import ở đầu file, phần này không chạy.
const D = (globalThis as any).Deno;
if (D && D.serve) {
  const url = D.env.get("SUPABASE_URL");
  // Khóa bí mật mới (SUPABASE_SECRET_KEYS, dạng JSON) nếu có, không thì khóa service_role cũ.
  let key = "";
  try { const k = JSON.parse(D.env.get("SUPABASE_SECRET_KEYS") || "{}"); key = k.default || Object.values(k)[0] || ""; } catch { key = ""; }
  key = key || D.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!url || !key) {
    console.error("Không có SUPABASE_URL hoặc khóa bí mật cho Edge Function.");
    D.serve((req: Request) => new Response(req.method === "OPTIONS" ? "ok" : JSON.stringify({ error: "server" }),
      { status: req.method === "OPTIONS" ? 200 : 500, headers: { ...CORS, "Content-Type": "application/json" } }));
  } else {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    D.serve(createHandler({
      db,
      getUser: async (token: string) => {
        const { data, error } = await db.auth.getUser(token);
        return error || !data || !data.user ? null : { id: data.user.id };
      },
    }));
  }
}
