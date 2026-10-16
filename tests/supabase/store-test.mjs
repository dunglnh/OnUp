/* Kiểm thử SupabaseStore (js/store-supabase.js) không cần mạng. Chạy: node tests/supabase/store-test.mjs
   - config.js để trống: app dùng LocalStore, không tải gì từ mạng; từ chối chạy khi config.js chứa khóa bí mật.
   - So giao diện với LocalStore (js/store.js): đủ mọi hàm, cùng kiểu đồng bộ/async.
   Máy chủ đã chuyển sang tài khoản tên đăng nhập + mật khẩu (supabase/schema.sql, Edge Function admin); phần đăng nhập
   của js/store-supabase.js (email, mã mời, mã gia đình + PIN) chưa đổi theo, nên các luồng đó được viết lại cùng giao
   diện ở Phiên B (docs/THIET-KE-TAI-KHOAN.md mục 8). Kiểm thử máy chủ: tests/supabase/run.sh và admin-test.mjs. */
import vm from "node:vm";
import fs from "node:fs";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";

const require = createRequire(import.meta.url);
const { createBackend } = require("./fake-backend.js");
const { createFakeSupabase } = require("./fake-client.js");
const ROOT = new URL("../../", import.meta.url).pathname;

let passed = 0;
const failures = [];
function ok(cond, msg) { if (cond) { passed++; console.log("ok  " + msg); } else { failures.push(msg); console.log("FAIL " + msg); } }
async function throwsMsg(fn, re, msg) {
  try { await fn(); ok(false, msg + " (không báo lỗi)"); } catch (e) { ok(re.test(e.message), msg + " → " + e.message); }
}

const be = createBackend();

function memStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear: () => m.clear(),
    key: (i) => [...m.keys()][i], get length() { return m.size; }, _m: m };
}
/* Một "tab trình duyệt": nạp các file của app trong vm, như index.html. */
function browser(opts = {}) {
  const localStorage = opts.local || memStorage(), sessionStorage = memStorage();
  const loaded = [];
  const win = {
    console, setTimeout, clearTimeout, URLSearchParams, TextEncoder, crypto: webcrypto, atob, btoa, localStorage, sessionStorage,
    location: { origin: "https://dunglnh.github.io", pathname: "/OnUp/", search: "", hash: opts.hash || "", href: "https://dunglnh.github.io/OnUp/" },
    history: { replaceState() { win.location.hash = ""; } },
    document: { head: { append: (s) => loaded.push(s.src) }, createElement: () => ({}), querySelector: () => null, body: { append() {} } }
  };
  if (opts.turnstile) win.turnstile = opts.turnstile;
  win.window = win;
  const ctx = vm.createContext(win);
  const load = (f) => vm.runInContext(fs.readFileSync(ROOT + f, "utf8"), ctx, { filename: f });
  ["data/calendar-2026-2027.js", "data/modules.js", "data/banks.js"].forEach(load);
  if (opts.realConfig) load("js/config.js");
  else vm.runInContext(`window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: ${JSON.stringify(opts.key || "anon-key")}, turnstileSiteKey: ${JSON.stringify(opts.siteKey || "")} };`, ctx);
  load("js/store.js");
  if (!opts.realConfig) win.supabase = { createClient: (u, k, o) => createFakeSupabase((m) => be.handle(m), { storage: localStorage, auth: o && o.auth }) };
  load("js/store-supabase.js");
  const errors = [];
  win.Store.onError = (m) => errors.push(m);
  return { win, get Store() { return win.Store; }, Local: win.LocalStore, errors, localStorage, sessionStorage, loaded };
}

/* ---------- 1. config.js để trống: vẫn là LocalStore, không tải gì từ mạng ---------- */
{
  const b = browser({ realConfig: true });
  ok(!b.Store.cloud && b.Store === b.win.Store && typeof b.Store.setup === "function" && !b.win.LocalStore, "config.js trống: app dùng LocalStore như cũ");
  ok(b.loaded.length === 0, "config.js trống: không tải script nào từ mạng");
}
{
  const fakeJwt = "x." + Buffer.from(JSON.stringify({ role: "service_role" })).toString("base64") + ".y";
  const b = browser({ key: fakeJwt });
  await throwsMsg(() => b.Store.init(), /khóa bí mật/, "từ chối chạy khi config.js chứa service_role key");
}

/* ---------- 2. giao diện giống LocalStore ---------- */
const A = browser();
{
  const L = A.Local, C = A.Store;
  const missing = Object.keys(L).filter((k) => !(k in C) || typeof C[k] !== typeof L[k]);
  ok(missing.length === 0, "SupabaseStore có đủ mọi hàm của LocalStore" + (missing.length ? ": thiếu " + missing.join(", ") : ` (${Object.keys(L).length} mục)`));
  const asyncOf = (o) => Object.keys(o).filter((k) => typeof o[k] === "function" && o[k].constructor.name === "AsyncFunction").sort().join(",");
  ok(asyncOf(L) === "checkPin,createUser,updateUser" && ["checkPin", "createUser", "updateUser"].every((k) => C[k].constructor.name === "AsyncFunction"),
    "createUser, updateUser, checkPin là async ở cả hai kho; các hàm đọc là đồng bộ");
}

/* ---------- 3. chưa đăng nhập: khởi động được với máy chủ mới ---------- */
await A.Store.init();
ok(A.Store.authState() === "signed-out" && A.Store.sessionUser() === null && A.errors.length === 0, "chưa đăng nhập: authState signed-out, không lỗi");

console.log(`\n${passed} kiểm tra đạt, ${failures.length} lỗi`);
if (failures.length) { console.log("SUPABASE STORE FAILED"); process.exit(1); }
console.log("SUPABASE STORE OK");
