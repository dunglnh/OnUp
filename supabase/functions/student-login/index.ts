/* Edge Function "student-login": học sinh đăng nhập bằng mã gia đình + PIN, và đặt/đổi PIN học sinh.
   PIN chỉ được băm ở đây (PBKDF2-SHA256 + PIN_PEPPER), lưu trong bảng student_pins mà trình duyệt không đọc được.
   Thử sai 5 lần thì phải đợi 30 giây (lần khóa sau gấp đôi), đếm trong bảng login_attempts.

   Triển khai: xem docs/HUONG-DAN-SUPABASE.md. Tắt "Verify JWT" cho hàm này (hàm tự kiểm tra người gọi),
   vì học sinh tra mã gia đình trước khi có phiên đăng nhập.

   Các yêu cầu (POST, JSON):
     {action:"students", code}                      → {family, students:[{id,name,avatar,grade,className}]}
     {action:"login", code, studentId, pin}         → {ok:true}   (cần phiên ẩn danh: Authorization: Bearer <token>)
     {action:"check_pin", pin}                      → {ok:true|false}   (học sinh tự kiểm tra PIN của mình)
     {action:"set_pin", studentId, pin, oldPin?}    → {ok:true}   (quản trị, phụ huynh của con, hoặc chính học sinh kèm PIN cũ)
   Lỗi: {error:"code"|"wrong"|"locked"|"auth"|"forbidden"|"pin"|"bad_request"|"server", wait?} */

// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2.116.0";

type Caller = { id: string; is_anonymous: boolean };
export type Deps = {
  db: any;                                              // supabase-js với service role key
  getUser: (token: string) => Promise<Caller | null>;   // kiểm tra token của người gọi
  pepper: string;
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-region, x-supabase-api-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const ITER = 150000;
const PIN_RE = /^\d{4,6}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const enc = new TextEncoder();

const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const hex = (u: Uint8Array) => [...u].map((b) => b.toString(16).padStart(2, "0")).join("");

function sameText(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function pbkdf2(pin: string, salt: Uint8Array, pepper: string, iter: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", enc.encode(pin + ":" + pepper), "PBKDF2", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations: iter }, key, 256));
}

export async function hashPin(pin: string, pepper: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${ITER}$${b64(salt)}$${b64(await pbkdf2(pin, salt, pepper, ITER))}`;
}

/* Kiểm tra PIN với giá trị đã lưu. Hỗ trợ dạng băm cũ của bản cục bộ (js/store.js) khi chuyển dữ liệu lên:
   "legacy$<salt>$s256:<hex>" hoặc "legacy$<salt>$fnv:<hex>". */
export async function verifyPin(pin: string, stored: string, pepper: string): Promise<boolean> {
  const parts = String(stored || "").split("$");
  if (parts[0] === "pbkdf2" && parts.length === 4) {
    const got = await pbkdf2(pin, unb64(parts[2]), pepper, +parts[1]);
    return sameText(b64(got), parts[3]);
  }
  if (parts[0] === "legacy" && parts.length >= 3) {
    const salt = parts[1], old = parts.slice(2).join("$"), text = salt + ":" + pin;
    if (old.startsWith("s256:")) {
      const d = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(text)));
      return sameText("s256:" + hex(d), old);
    }
    if (old.startsWith("fnv:")) {
      let h = 2166136261;
      for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
      return sameText("fnv:" + (h >>> 0).toString(16), old);
    }
  }
  return false;
}

const normCode = (c: unknown) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);

export function createHandler(deps: Deps) {
  const { db, pepper } = deps;
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
  const familyByCode = (code: string) =>
    code.length >= 6 ? one(db.from("families").select("id, name").eq("join_code", code)) : Promise.resolve(null);
  const student = (id: string) =>
    UUID_RE.test(id) ? one(db.from("profiles").select("id, family_id, role").eq("id", id).eq("role", "student")) : Promise.resolve(null);
  const pinOf = async (id: string) => ((await one(db.from("student_pins").select("pin_hash").eq("profile_id", id))) || {}).pin_hash || "";
  async function savePin(id: string, pin: string) {
    const { error } = await db.from("student_pins").upsert({ profile_id: id, pin_hash: await hashPin(pin, pepper), updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
  }
  /* Thử PIN của một học sinh: đếm trước khi kiểm tra (nhiều yêu cầu cùng lúc cũng không vượt giới hạn). */
  async function tryPin(id: string, pin: string): Promise<{ ok: boolean; wait?: number }> {
    const key = "pin:" + id;
    const wait = await rpc("attempt_begin", { p_key: key, p_max: 5, p_seconds: 30 });
    if (wait > 0) return { ok: false, wait };
    const stored = await pinOf(id);
    if (!PIN_RE.test(pin) || !stored || !(await verifyPin(pin, stored, pepper))) return { ok: false };
    await rpc("attempt_success", { p_key: key });
    if (!stored.startsWith("pbkdf2$")) await savePin(id, pin); // đổi dạng băm cũ sang PBKDF2
    return { ok: true };
  }
  /* Người gọi là ai: hồ sơ gắn với email, hoặc học sinh đang đăng nhập bằng phiên ẩn danh. */
  async function callerProfile(user: Caller) {
    if (!user.is_anonymous) return one(db.from("profiles").select("id, family_id, role").eq("auth_user_id", user.id));
    const s = await one(db.from("student_sessions").select("profile_id").eq("auth_user_id", user.id));
    return s ? one(db.from("profiles").select("id, family_id, role").eq("id", s.profile_id)) : null;
  }

  return async function handle(req: Request): Promise<Response> {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
    if (req.method !== "POST") return reply({ error: "bad_request" }, 405);
    let body: any;
    try { body = JSON.parse((await req.text()).slice(0, 10000)); } catch { return reply({ error: "bad_request" }, 400); }
    if (!body || typeof body !== "object") return reply({ error: "bad_request" }, 400);
    // Địa chỉ do proxy của Supabase đặt; phần đầu x-forwarded-for thì người gửi tự đặt được nên chỉ dùng khi không có gì khác.
    const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") ||
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const pin = String(body.pin ?? "");
    try {
      if (body.action === "students" || body.action === "login") {
        const codeKey = "code:" + ip;
        const w = await rpc("attempt_wait", { p_key: codeKey });
        if (w > 0) return reply({ error: "locked", wait: w });
        const fam = await familyByCode(normCode(body.code));
        if (!fam) {
          await rpc("attempt_begin", { p_key: codeKey, p_max: 10, p_seconds: 60 }); // chỉ đếm khi nhập sai mã
          return reply({ error: "code" });
        }
        if (body.action === "students") {
          const { data, error } = await db.from("profiles").select("id, name, avatar, grade, class_name")
            .eq("family_id", fam.id).eq("role", "student").order("name");
          if (error) throw new Error(error.message);
          return reply({ family: fam.name, students: (data || []).map((s: any) => ({ id: s.id, name: s.name, avatar: s.avatar, grade: s.grade, className: s.class_name || "" })) });
        }
        const user = token ? await deps.getUser(token) : null;
        if (!user || !user.is_anonymous) return reply({ error: "auth" }, 401);
        const s = await student(String(body.studentId || ""));
        if (!s || s.family_id !== fam.id) return reply({ error: "wrong" });
        const r = await tryPin(s.id, pin);
        if (r.wait) return reply({ error: "locked", wait: r.wait });
        if (!r.ok) return reply({ error: "wrong" });
        const { error } = await db.from("student_sessions").upsert({ auth_user_id: user.id, profile_id: s.id, created_at: new Date().toISOString() });
        if (error) throw new Error(error.message);
        return reply({ ok: true, profileId: s.id });
      }

      if (body.action === "check_pin" || body.action === "set_pin") {
        const user = token ? await deps.getUser(token) : null;
        const me = user ? await callerProfile(user) : null;
        if (!me) return reply({ error: "auth" }, 401);
        if (body.action === "check_pin") {
          if (me.role !== "student") return reply({ error: "forbidden" }, 403);
          const r = await tryPin(me.id, pin);
          return reply(r.wait ? { error: "locked", wait: r.wait } : { ok: r.ok });
        }
        const s = await student(String(body.studentId || ""));
        if (!s || s.family_id !== me.family_id) return reply({ error: "forbidden" }, 403);
        let allowed = me.role === "admin";
        if (me.role === "parent") allowed = !!(await one(db.from("parent_child").select("child_id").eq("parent_id", me.id).eq("child_id", s.id)));
        if (me.role === "student" && me.id === s.id) {
          const r = await tryPin(s.id, String(body.oldPin ?? ""));
          if (r.wait) return reply({ error: "locked", wait: r.wait });
          if (!r.ok) return reply({ error: "wrong" });
          allowed = true;
        }
        if (!allowed) return reply({ error: "forbidden" }, 403);
        if (!PIN_RE.test(pin)) return reply({ error: "pin" });
        await savePin(s.id, pin);
        await rpc("attempt_success", { p_key: "pin:" + s.id });
        return reply({ ok: true });
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
  const key = D.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const pepper = D.env.get("PIN_PEPPER") || "";
  if (!pepper) console.warn("Chưa đặt secret PIN_PEPPER: PIN vẫn được băm nhưng nên đặt để an toàn hơn.");
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  D.serve(createHandler({
    db, pepper,
    getUser: async (token: string) => {
      const { data, error } = await db.auth.getUser(token);
      return error || !data || !data.user ? null : { id: data.user.id, is_anonymous: !!data.user.is_anonymous };
    },
  }));
}
