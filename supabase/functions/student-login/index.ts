/* Edge Function "student-login": học sinh đăng nhập bằng mã gia đình + PIN, và đặt/đổi PIN học sinh.
   PIN chỉ được băm ở đây (PBKDF2-SHA256 + PIN_PEPPER), lưu trong bảng student_pins mà trình duyệt không đọc được.
   Giới hạn thử (đếm trong login_attempts, xem attempt_begin trong supabase/schema.sql):
   - mỗi hồ sơ: sai 5 lần đợi 30 giây, lần khóa sau gấp đôi; sai quá 15 lần kể từ lần đúng, hoặc quá 20 lần trong
     ngày, thì khóa hẳn tới khi bố mẹ/quản trị đặt lại PIN. Máy con đã đăng nhập đúng được đếm riêng,
     nên người lạ thử sai không khóa được máy của con;
   - mỗi người gọi và mỗi gia đình cũng có giới hạn riêng.
   PIN mới (đặt hoặc đổi) phải gồm 6 chữ số và không dễ đoán.

   Triển khai: xem docs/HUONG-DAN-SUPABASE.md. Tắt "Verify JWT" cho hàm này (hàm tự kiểm tra người gọi).
   Cần secret PIN_PEPPER (ít nhất 32 kí tự); thiếu thì hàm từ chối mọi yêu cầu.

   Các yêu cầu (POST, JSON, luôn kèm Authorization: Bearer <token của phiên đăng nhập>):
     {action:"students", code}                    → {family, students:[{id,name,avatar}]}
     {action:"login", code, studentId, pin, device?} → {ok:true}   (phiên ẩn danh; device: mã ngẫu nhiên của máy)
     {action:"check_pin", pin}                    → {ok:true|false}   (học sinh tự kiểm tra PIN của mình)
     {action:"set_pin", studentId, pin, oldPin?}  → {ok:true}   (quản trị, phụ huynh của con, hoặc chính học sinh kèm PIN cũ)
     {action:"wrap_legacy"}                       → {wrapped, left}   (quản trị, sau khi chuyển dữ liệu máy cũ lên)
   Lỗi: {error:"code"|"wrong"|"locked"|"auth"|"forbidden"|"pin"|"weak"|"bad_request"|"server", wait?, reset?} */

// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2.116.0";

type Caller = { id: string; is_anonymous: boolean };
export type Deps = {
  db: any;                                              // supabase-js với khóa bí mật (service role)
  getUser: (token: string) => Promise<Caller | null>;   // kiểm tra token của người gọi
  pepper: string;
  iter?: number;                                        // số vòng PBKDF2 (chỉ đổi khi kiểm thử)
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-region, x-supabase-api-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
export const ITER = 600000;
const PIN_RE = /^\d{4,6}$/;          // PIN đang có (PIN cũ chuyển từ máy có thể 4–5 số)
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const WRAP_BATCH = 3;                // mỗi lần gọi wrap_legacy chỉ bọc vài PIN cho khỏi quá thời gian CPU
// [p_max, p_seconds, p_max_rounds, p_window, p_cap, p_day_cap] cho attempt_begin
const PIN_LIMIT = [5, 30, 7, 86400, 15, 20];
const CALLER_LIMIT = [10, 600, 3, 3600, null, null];
const FAMILY_LIMIT = [30, 600, 3, 3600, null, null];
const enc = new TextEncoder();

const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const hex = (u: Uint8Array) => [...u].map((b) => b.toString(16).padStart(2, "0")).join("");

function sameText(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function pbkdf2(text: string, salt: Uint8Array, pepper: string, iter: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", enc.encode(text + ":" + pepper), "PBKDF2", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations: iter }, key, 256));
}

/* PIN mới phải 6 chữ số và không dễ đoán. Trả về null nếu được, hoặc mã lỗi "pin" / "weak". */
export function pinProblem(pin: string): string | null {
  if (!/^\d{6}$/.test(pin)) return "pin";
  const d = [...pin].map(Number);
  const steps = d.slice(1).map((x, i) => x - d[i]);
  if (steps.every((s) => s === steps[0]) && Math.abs(steps[0]) <= 1) return "weak";      // 111111, 123456, 987654
  if (pin === pin.slice(0, 2).repeat(3) || pin === pin.slice(0, 3).repeat(2)) return "weak"; // 121212, 123123
  const y1 = +pin.slice(0, 4), y2 = +pin.slice(2);
  if ((y1 >= 2010 && y1 <= 2019) || (y2 >= 2010 && y2 <= 2019)) return "weak";              // năm sinh 2010–2019
  return null;
}

/* Lưu PIN: "pbkdf2v2$vòng$muối$băm"; PIN chưa đạt chuẩn mới (PIN cũ 4 số) lưu "pbkdf2v2w$…" để bố mẹ biết nên đặt lại. */
export async function hashPin(pin: string, pepper: string, iter = ITER): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const tag = pinProblem(pin) ? "pbkdf2v2w" : "pbkdf2v2";
  return `${tag}$${iter}$${b64(salt)}$${b64(await pbkdf2(pin, salt, pepper, iter))}`;
}
function legacyHash(algo: string, salt: string, pin: string): Promise<string> | string {
  const text = salt + ":" + pin;
  if (algo === "s256") return crypto.subtle.digest("SHA-256", enc.encode(text)).then((d) => "s256:" + hex(new Uint8Array(d)));
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return "fnv:" + (h >>> 0).toString(16);
}
/* Bọc mã băm cũ (không có pepper) bằng PBKDF2 + pepper, để bảng không còn giữ mã băm cũ dễ dò. */
export async function wrapLegacy(stored: string, pepper: string, iter = ITER): Promise<string | null> {
  const p = String(stored).split("$");
  if (p[0] !== "legacy" || p.length < 3) return null;
  const old = p.slice(2).join("$"), algo = old.split(":")[0];
  if (algo !== "s256" && algo !== "fnv") return null;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `wrap$${iter}$${b64(salt)}$${b64(await pbkdf2(old, salt, pepper, iter))}$${algo}$${p[1]}`;
}

/* Kiểm tra PIN với giá trị đã lưu: pbkdf2v2 / pbkdf2v2w / pbkdf2 (bản đầu) / wrap (PIN cũ đã bọc) / legacy (PIN cũ). */
export async function verifyPin(pin: string, stored: string, pepper: string): Promise<boolean> {
  const p = String(stored || "").split("$");
  if (["pbkdf2", "pbkdf2v2", "pbkdf2v2w"].includes(p[0]) && p.length === 4) {
    return sameText(b64(await pbkdf2(pin, unb64(p[2]), pepper, +p[1])), p[3]);
  }
  if (p[0] === "wrap" && p.length === 6) {
    const old = await legacyHash(p[4], p[5], pin);
    return sameText(b64(await pbkdf2(old, unb64(p[2]), pepper, +p[1])), p[3]);
  }
  if (p[0] === "legacy" && p.length >= 3) {
    const old = p.slice(2).join("$"), algo = old.split(":")[0];
    if (algo !== "s256" && algo !== "fnv") return false;
    return sameText(await legacyHash(algo, p[1], pin), old);
  }
  return false;
}

const normCode = (c: unknown) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);

export function createHandler(deps: Deps) {
  const { db, pepper } = deps;
  const iter = deps.iter || ITER;
  const reply = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

  async function rpc(name: string, args: Record<string, unknown>) {
    const { data, error } = await db.rpc(name, args);
    if (error) throw new Error(name + ": " + error.message);
    return data;
  }
  async function one(q: any) {
    const { data, error } = await q.maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  }
  async function run(q: any) {
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return data;
  }
  const begin = (key: string, l: (number | null)[]) =>
    rpc("attempt_begin", { p_key: key, p_max: l[0], p_seconds: l[1], p_max_rounds: l[2], p_window: l[3], p_cap: l[4], p_day_cap: l[5] }) as Promise<number>;
  const done = (key: string, reset: boolean) => rpc("attempt_done", { p_key: key, p_reset: reset });
  const student = (id: string) =>
    UUID_RE.test(id) ? one(db.from("profiles").select("id, family_id, role").eq("id", id).eq("role", "student")) : Promise.resolve(null);
  const pinOf = async (id: string) => ((await one(db.from("student_pins").select("pin_hash").eq("profile_id", id))) || {}).pin_hash || "";
  async function savePin(id: string, pin: string) {
    await run(db.from("student_pins").upsert({ profile_id: id, pin_hash: await hashPin(pin, pepper, iter), updated_at: new Date().toISOString() }));
  }
  /* Địa chỉ IP do proxy Cloudflare của Supabase đặt (người gửi không tự đặt được). Không có thì bỏ qua bộ đếm IP.
     Lưu dạng băm (không giữ IP gốc); IPv6 gộp theo /64. */
  async function ipKey(req: Request): Promise<string | null> {
    let ip = (req.headers.get("cf-connecting-ip") || "").trim();
    if (!ip) return null;
    if (ip.includes(":")) ip = ip.split(":").slice(0, 4).join(":");
    const d = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(ip + "|" + pepper)));
    return "ip:" + hex(d).slice(0, 32);
  }
  /* Mã máy do trình duyệt tự sinh (ngẫu nhiên, lưu ở localStorage). Chỉ giữ bản băm. */
  async function deviceKey(dev: unknown): Promise<string | null> {
    const d = String(dev || "");
    if (!/^[A-Za-z0-9_-]{16,64}$/.test(d)) return null;
    return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(d + "|" + pepper)))).slice(0, 32);
  }
  async function familyByCode(code: string, keys: string[]) {
    if (code.length < 6) return { miss: true };
    return await rpc("family_by_code", { p_code: code, p_keys: keys, p_max: 10, p_seconds: 30, p_window: 600 });
  }

  /* Thử PIN của một học sinh. Đếm trước khi kiểm tra (nhiều yêu cầu cùng lúc cũng không vượt giới hạn) theo
     người gọi, gia đình và hồ sơ (máy quen của con có bộ đếm riêng). */
  async function tryPin(id: string, fid: string, uid: string, pin: string, dev: string | null): Promise<{ ok: boolean; wait?: number; reset?: boolean; weak?: boolean }> {
    const known = dev ? await one(db.from("known_devices").select("profile_id").eq("profile_id", id).eq("device", dev)) : null;
    const buckets: [string, (number | null)[], boolean][] = [
      ["pinu:" + uid, CALLER_LIMIT, false],
      ["fam:" + fid, FAMILY_LIMIT, false],
      [known ? `pin:${id}:${dev}` : `pin:${id}`, PIN_LIMIT, true],
    ];
    const counted: string[] = [];
    for (const [key, limit] of buckets) {
      const w = await begin(key, limit);
      if (w !== 0) {
        for (const k of counted) await done(k, false); // lần này không được thử: trả lại các lượt đã đếm
        return w < 0 ? { ok: false, reset: true } : { ok: false, wait: w };
      }
      counted.push(key);
    }
    const stored = await pinOf(id);
    if (!PIN_RE.test(pin) || !stored || !(await verifyPin(pin, stored, pepper))) return { ok: false };
    for (const [key, , reset] of buckets) await done(key, reset);
    if (dev && !known) await run(db.from("known_devices").upsert({ profile_id: id, device: dev }));
    if (!stored.startsWith("pbkdf2v2")) await savePin(id, pin); // đổi dạng băm cũ sang dạng mới
    return { ok: true, weak: !!pinProblem(pin) };
  }
  const tried = (r: { ok: boolean; wait?: number; reset?: boolean }) =>
    r.reset ? { error: "locked", reset: true } : r.wait ? { error: "locked", wait: r.wait } : null;

  /* Người gọi là ai: hồ sơ gắn với email, hoặc học sinh đang đăng nhập bằng phiên ẩn danh (còn hạn 30 ngày). */
  async function callerProfile(user: Caller) {
    if (!user.is_anonymous) return one(db.from("profiles").select("id, family_id, role").eq("auth_user_id", user.id));
    const s = await one(db.from("student_sessions").select("profile_id, created_at").eq("auth_user_id", user.id));
    if (!s || Date.now() - new Date(s.created_at).getTime() > 30 * 864e5) return null;
    return one(db.from("profiles").select("id, family_id, role").eq("id", s.profile_id));
  }

  return async function handle(req: Request): Promise<Response> {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
    if (req.method !== "POST") return reply({ error: "bad_request" }, 405);
    if (!pepper || pepper.length < 32) { console.error("Thiếu secret PIN_PEPPER (cần ít nhất 32 kí tự)."); return reply({ error: "server" }, 500); }
    let body: any;
    try { body = JSON.parse((await req.text()).slice(0, 10000)); } catch { return reply({ error: "bad_request" }, 400); }
    if (!body || typeof body !== "object") return reply({ error: "bad_request" }, 400);
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const pin = String(body.pin ?? "");
    const dev = await deviceKey(body.device);
    try {
      if (!["students", "login", "check_pin", "set_pin", "wrap_legacy"].includes(body.action)) return reply({ error: "bad_request" }, 400);
      const user = token ? await deps.getUser(token) : null;
      if (!user) return reply({ error: "auth" }, 401);

      if (body.action === "students") {
        const ip = await ipKey(req);
        const f = await familyByCode(normCode(body.code), ["codeu:" + user.id].concat(ip ? [ip] : []));
        if (f.wait) return reply({ error: "locked", wait: f.wait });
        if (!f.id) return reply({ error: "code" });
        const data = await run(db.from("profiles").select("id, name, avatar").eq("family_id", f.id).eq("role", "student").order("name"));
        return reply({ family: f.name, students: (data || []).map((s: any) => ({ id: s.id, name: s.name, avatar: s.avatar })) });
      }

      if (body.action === "login") {
        if (!user.is_anonymous) return reply({ error: "auth" }, 401);
        const f = await familyByCode(normCode(body.code), ["codeu:" + user.id]);
        if (f.wait) return reply({ error: "locked", wait: f.wait });
        if (!f.id) return reply({ error: "code" });
        const s = await student(String(body.studentId || ""));
        if (!s || s.family_id !== f.id) return reply({ error: "wrong" });
        const r = await tryPin(s.id, s.family_id, user.id, pin, dev);
        if (tried(r)) return reply(tried(r));
        if (!r.ok) return reply({ error: "wrong" });
        await run(db.from("student_sessions").upsert({ auth_user_id: user.id, profile_id: s.id, created_at: new Date().toISOString() }));
        return reply({ ok: true, profileId: s.id, mustChange: r.weak || undefined });
      }

      const me = await callerProfile(user);
      if (!me) return reply({ error: "auth" }, 401);

      if (body.action === "check_pin") {
        if (me.role !== "student") return reply({ error: "forbidden" }, 403);
        const r = await tryPin(me.id, me.family_id, user.id, pin, dev);
        return reply(tried(r) || { ok: r.ok });
      }

      if (body.action === "set_pin") {
        const s = await student(String(body.studentId || ""));
        if (!s || s.family_id !== me.family_id) return reply({ error: "forbidden" }, 403);
        let allowed = me.role === "admin", self = false;
        if (me.role === "parent") allowed = !!(await one(db.from("parent_child").select("child_id").eq("parent_id", me.id).eq("child_id", s.id)));
        if (me.role === "student" && me.id === s.id) {
          const p = pinProblem(pin);
          if (p) return reply({ error: p });
          const r = await tryPin(s.id, s.family_id, user.id, String(body.oldPin ?? ""), dev);
          if (tried(r)) return reply(tried(r));
          if (!r.ok) return reply({ error: "wrong" });
          allowed = self = true;
        }
        if (!allowed) return reply({ error: "forbidden" }, 403);
        const p = pinProblem(pin);
        if (p) return reply({ error: p });
        await savePin(s.id, pin);
        await rpc("attempt_reset_profile", { p_profile: s.id });
        // PIN mới: đăng xuất mọi máy của con (trừ chính máy con đang dùng để tự đổi PIN).
        let del = db.from("student_sessions").delete().eq("profile_id", s.id);
        if (self) del = del.neq("auth_user_id", user.id);
        await run(del);
        return reply({ ok: true });
      }

      if (body.action === "wrap_legacy") {
        if (me.role !== "admin") return reply({ error: "forbidden" }, 403);
        const kids = await run(db.from("profiles").select("id").eq("family_id", me.family_id).eq("role", "student"));
        const ids = (kids || []).map((k: any) => k.id);
        const pins = ids.length ? await run(db.from("student_pins").select("profile_id, pin_hash").in("profile_id", ids)) : [];
        const todo = (pins || []).filter((x: any) => String(x.pin_hash).startsWith("legacy$"));
        let wrapped = 0;
        for (const x of todo.slice(0, WRAP_BATCH)) {
          const w = await wrapLegacy(x.pin_hash, pepper, iter);
          if (w) { await run(db.from("student_pins").update({ pin_hash: w, updated_at: new Date().toISOString() }).eq("profile_id", x.profile_id)); wrapped++; }
        }
        return reply({ wrapped, left: Math.max(todo.length - WRAP_BATCH, 0) });
      }
      return reply({ error: "bad_request" }, 400);
    } catch (e) {
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
      db, pepper: D.env.get("PIN_PEPPER") || "",
      getUser: async (token: string) => {
        const { data, error } = await db.auth.getUser(token);
        return error || !data || !data.user ? null : { id: data.user.id, is_anonymous: !!data.user.is_anonymous };
      },
    }));
  }
}
