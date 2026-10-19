/* Kiểm thử SupabaseStore (js/store-supabase.js) không cần mạng, trên máy chủ Supabase giả (fake-backend.js) và
   Edge Function admin thật (tài khoản do chủ app tạo). Chạy: node tests/supabase/store-test.mjs   (in "SUPABASE STORE OK")
   - config.js để trống: app dùng LocalStore, không tải gì từ mạng; từ chối chạy khi config.js chứa khóa bí mật.
   - Giao diện giống LocalStore (js/store.js): đủ mọi hàm, cùng kiểu đồng bộ/async.
   - Đăng nhập tên đăng nhập + mật khẩu, ghi nhớ trên máy, bắt đổi mật khẩu tạm, nhập lại mật khẩu, đổi mật khẩu, CAPTCHA.
   - Hồ sơ con: thêm/sửa/xóa, PIN 4 số tùy chọn (băm trên máy), hạn mức theo gói (Store.can), "Ai đang học?".
   - Kết quả qua hộp gửi, lịch thi, ngân hàng tự nhập, chuyển dữ liệu từ bản lưu trên máy, tài khoản bị khóa, phiên bị thu hồi. */
import vm from "node:vm";
import fs from "node:fs";
import nodeCrypto from "node:crypto";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";

const require = createRequire(import.meta.url);
const { createBackend } = require("./fake-backend.js");
const { createFakeSupabase } = require("./fake-client.js");
const { loadEdgeFunction } = await import("./load-edge.mjs");
const { createHandler, LOGIN_DOMAIN } = await loadEdgeFunction();
const ROOT = new URL("../../", import.meta.url).pathname;

let passed = 0;
const failures = [];
function ok(cond, msg) { if (cond) { passed++; console.log("ok  " + msg); } else { failures.push(msg); console.log("FAIL " + msg); } }
async function throwsMsg(fn, re, msg) {
  try { await fn(); ok(false, msg + " (không báo lỗi)"); } catch (e) { ok(re.test(e.message), msg + " → " + e.message); }
}

const be = createBackend();
be.functions.admin = createHandler({ db: createFakeSupabase((m) => be.handle(m), { service: true }), getUser: be.getUser, now: () => new Date(Date.now() + be.clock) });

function memStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear: () => m.clear(),
    key: (i) => [...m.keys()][i], get length() { return m.size; }, _m: m };
}
/* Một "tab trình duyệt": nạp các file của app trong vm, như index.html. local: localStorage dùng chung (cùng máy). */
function browser(opts = {}) {
  const localStorage = opts.local || memStorage(), sessionStorage = memStorage();
  const loaded = [], scripts = [];
  const win = {
    console, setTimeout, clearTimeout, URLSearchParams, TextEncoder, crypto: webcrypto, atob, btoa, localStorage, sessionStorage,
    location: { origin: "https://dunglnh.github.io", pathname: "/OnUp/", search: "", hash: "", href: "https://dunglnh.github.io/OnUp/" },
    history: { replaceState() {} },
    document: { head: { append: (s) => { loaded.push(s.src); scripts.push(s); } }, createElement: () => ({ remove() {} }), querySelector: () => null, body: { append() {} } },
    Intl
  };
  if (opts.turnstile) win.turnstile = opts.turnstile;
  win.window = win;
  const ctx = vm.createContext(win);
  const load = (f) => vm.runInContext(fs.readFileSync(ROOT + f, "utf8"), ctx, { filename: f });
  ["data/grades.js", "data/calendar-2026-2027.js", "data/modules.js", "data/banks/index.js"].forEach(load);
  if (opts.realConfig) {
    load("js/config.js");
    // Kiểm thử "config.js để trống" dù js/config.js thật đã điền Supabase: giữ mọi mục khác của file, chỉ xóa hai giá trị này.
    if (opts.blank) vm.runInContext(`window.ONTAP_CONFIG.supabaseUrl = ""; window.ONTAP_CONFIG.supabaseAnonKey = "";`, ctx);
  } else vm.runInContext(`window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: ${JSON.stringify(opts.key || "anon-key")}, turnstileSiteKey: ${JSON.stringify(opts.siteKey || "")} };`, ctx);
  load("js/store.js");
  if (!opts.realConfig) win.supabase = { createClient: (u, k, o) => createFakeSupabase((m) => be.handle(m), { storage: localStorage, auth: o && o.auth }) };
  load("js/store-supabase.js");
  load("js/quiz.js"); // Quiz.key, Quiz.text cho báo câu sai (mục 7b)
  const errors = [];
  if (win.Store.cloud) win.Store.onError = (m) => errors.push(m);
  return { win, get Store() { return win.Store; }, Local: win.LocalStore, errors, localStorage, sessionStorage, loaded, scripts, load };
}
const fam = (u) => be.T.families.find((f) => f.username === u);
const profilesOf = (u) => be.T.profiles.filter((p) => p.family_id === fam(u).id);
const AUTH = "ontap_sb_auth";

/* ---------- 1. config.js để trống: vẫn là LocalStore, không tải gì từ mạng; config.js thật không chứa khóa bí mật ---------- */
{
  const real = browser({ realConfig: true }).win.ONTAP_CONFIG, key = String(real.supabaseAnonKey || "");
  let role = "";
  try { role = JSON.parse(Buffer.from(key.split(".")[1] || "", "base64").toString()).role || ""; } catch (e) { /* không phải JWT */ }
  ok((!real.supabaseUrl && !key) || (/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(real.supabaseUrl) && !!key && !/^sb_secret_/.test(key) && role !== "service_role"),
    "js/config.js thật: để trống, hoặc URL Supabase + khóa công khai (không phải khóa bí mật)");
  const b = browser({ realConfig: true, blank: true });
  ok(!b.Store.cloud && b.Store === b.win.Store && typeof b.Store.setup === "function" && !b.win.LocalStore, "config.js trống: app dùng LocalStore như cũ");
  ok(b.loaded.length === 0, "config.js trống: không tải script nào từ mạng");
  ok(b.Store.can("addChild") === true && b.Store.can("bank:toan4-ck1-de1") === true, "LocalStore.can: bản lưu trên máy không có gói, luôn được");
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
  const isAsync = (f) => typeof f === "function" && f.constructor.name === "AsyncFunction";
  const asyncOf = (o) => Object.keys(o).filter((k) => isAsync(o[k])).sort().join(",");
  ok(asyncOf(L) === "addReport,checkPin,createUser,updateUser" && ["addReport", "checkPin", "createUser", "updateUser"].every((k) => isAsync(C[k])),
    "createUser, updateUser, checkPin, addReport là async ở cả hai kho");
  const syncNow = Object.keys(L).filter((k) => typeof L[k] === "function" && !isAsync(L[k]) && isAsync(C[k]));
  ok(syncNow.length === 0, "các hàm đồng bộ của LocalStore (đọc dữ liệu, setSession, can…) cũng đồng bộ ở bản đám mây" + (syncNow.length ? ": " + syncNow.join(", ") : ""));
}

/* ---------- 3. chủ app tạo tài khoản ---------- */
const OWNER_PW = "chu-app-mat-khau-rat-dai-2026";
const ownerUser = be.addUser("chu.app@" + LOGIN_DOMAIN, OWNER_PW);
be.T.app_owners.push({ user_id: ownerUser.id, created_at: new Date().toISOString() });
const owner = createFakeSupabase((m) => be.handle(m), { storage: memStorage() });
await owner.auth.signInWithPassword({ email: "chu.app@" + LOGIN_DOMAIN, password: OWNER_PW });
async function admin(body) {
  const r = await owner.functions.invoke("admin", { body });
  return r.error ? await r.error.context.json() : r.data;
}
const acc = await admin({ action: "create_account", username: "nha.bin", display_name: "Nhà Bin" });
ok(acc.account && acc.password && fam("nha.bin").must_change_password, "chủ app tạo tài khoản nha.bin, mật khẩu tạm");

/* ---------- 4. đăng nhập, bắt đổi mật khẩu tạm ---------- */
await A.Store.init();
ok(A.Store.authState() === "signed-out" && A.Store.sessionUser() === null && A.errors.length === 0, "chưa đăng nhập: authState signed-out, không lỗi");
await throwsMsg(() => A.Store.signIn("Nha Bin", "x"), /Tên đăng nhập gồm 4–20 kí tự/, "tên đăng nhập sai dạng: báo ngay, không gọi máy chủ");
await throwsMsg(() => A.Store.signIn("nha.bin", "sai-mat-khau"), /Tên đăng nhập hoặc mật khẩu chưa đúng/, "sai mật khẩu");
await A.Store.signIn("  NHA.BIN ", acc.password, false);
ok(A.Store.authState() === "change-password" && A.Store.sessionUser() === null && A.Store.username() === "nha.bin", "mật khẩu tạm: authState change-password (tên đăng nhập viết hoa, có khoảng trắng vẫn nhận)");
ok(!!A.sessionStorage.getItem(AUTH) && !A.localStorage.getItem(AUTH), "không chọn ghi nhớ: phiên chỉ giữ trong tab (sessionStorage)");
await throwsMsg(() => A.Store.changePassword("ngan"), /ít nhất 8 kí tự/, "mật khẩu mới quá ngắn");
await throwsMsg(() => A.Store.changePassword(acc.password), /phải khác/, "mật khẩu mới trùng mật khẩu tạm");
const PW = "me-bin-2026";
await A.Store.changePassword(PW);
ok(A.Store.authState() === "ready" && !fam("nha.bin").must_change_password, "đặt mật khẩu mới: máy chủ bỏ cờ bắt đổi, authState ready");
{
  const S = A.Store, users = S.users();
  ok(users.length === 1 && users[0].role === "admin" && users[0].name === "Phụ huynh" && S.users("student").length === 0, "tài khoản mới: chỉ có Phụ huynh (vai trò admin của app), chưa có hồ sơ con");
  ok(S.sessionUser() === null && S.parentUnlocked(), "chưa chọn ai đang học; vừa nhập mật khẩu nên vào khu phụ huynh không phải hỏi lại");
  await S.flush();
  const seedN = A.win.ONTAP_SEED_EVENTS.length;
  ok(S.events().length === seedN && be.T.exam_events.filter((e) => e.family_id === fam("nha.bin").id).length === seedN
    && fam("nha.bin").seed_banks_seen.length === A.win.ONTAP_SEED_BANKS.length, "tài khoản mới: chép lịch thi mặc định lên máy chủ");
  ok(S.settings().schoolName === "Nhà Bin" && S.plan().id === "free" && S.plan().maxChildren === 5 && S.can("addChild"), "tên gia đình, gói free 5 hồ sơ");
  ok(fam("nha.bin").last_seen_at, "mở app ghi lần dùng gần nhất (touch)");
  S.setSession(users[0].id);
  ok(S.sessionUser() && S.sessionUser().name === "Phụ huynh", "chọn Phụ huynh");
}

/* ---------- 5. hồ sơ con, PIN 4 số ---------- */
let bin, na;
{
  const S = A.Store;
  await throwsMsg(() => S.createUser({ role: "parent", name: "Bà" }), /chỉ thêm hồ sơ con/, "bản đám mây không thêm tài khoản người lớn");
  await throwsMsg(() => S.createUser({ role: "student", name: "Bin", grade: 5 }), /^Chọn khối lớp 4 hoặc 6\.$/, "khối chưa có nội dung (lớp 5) bị từ chối");
  await throwsMsg(() => S.createUser({ role: "student", name: "Bin", grade: 4, pin: "12345" }), /4 chữ số/, "PIN không đúng 4 số bị từ chối");
  await throwsMsg(() => S.createUser({ role: "student", name: "  ", grade: 4 }), /Cần nhập tên/, "thiếu tên");
  bin = await S.createUser({ role: "student", name: "Bin", grade: 4, className: "4A", avatar: "🦊", pin: "1357" });
  na = await S.createUser({ role: "student", name: "Na", grade: 6 });
  const pb = be.T.profiles.find((p) => p.id === bin.id), pn = be.T.profiles.find((p) => p.id === na.id);
  ok(pb && pb.family_id === fam("nha.bin").id && pb.grade === 4 && pb.class_name === "4A" && /^4\.[0-9a-f]{16}\$s256:[0-9a-f]{64}$/.test(pb.pin_hash) && pn && pn.pin_hash === null,
    "tạo hồ sơ con trên máy chủ; PIN băm trên máy (dạng 4.<muối>$s256:…), hồ sơ không PIN để trống");
  ok(bin.hasPin && bin.pinLen === 4 && !na.hasPin && bin.parentIds.join() === S.users("admin")[0].id && S.childrenOf(S.users("admin")[0].id).length === 2,
    "hồ sơ có PIN biết độ dài 4; hồ sơ con thuộc Phụ huynh");
  ok(!(await S.checkPin(bin.id, "1111")) && (await S.checkPin(bin.id, "1357")) && (await S.checkPin(na.id, "")) && !(await S.checkPin(S.users("admin")[0].id, "1357")),
    "kiểm tra PIN trên máy: sai/đúng; hồ sơ không PIN luôn vào được; Phụ huynh không dùng PIN");
  // hạn mức theo gói
  const extra = [];
  for (const n of ["Ba", "Bốn", "Năm"]) extra.push(await S.createUser({ role: "student", name: n, grade: 4 }));
  ok(S.users("student").length === 5 && !S.can("addChild") && S.can("bank:toan4-ck1-de1"), "đủ 5 hồ sơ: can(\"addChild\") = false, nội dung vẫn dùng được");
  await throwsMsg(() => S.createUser({ role: "student", name: "Sáu", grade: 4 }), /đủ 5 hồ sơ con/, "hồ sơ thứ 6 bị chặn ở app");
  S.removeUser(extra[2].id);
  await S.flush();
  ok(profilesOf("nha.bin").length === 4 && S.can("addChild"), "xóa một hồ sơ: máy chủ còn 4, thêm được nữa");
  // sửa hồ sơ
  await S.updateUser(bin.id, { name: " Bin Bin ", className: "4B", pin: "2468" });
  ok(be.T.profiles.find((p) => p.id === bin.id).name === "Bin Bin" && bin.className === "4B" && (await S.checkPin(bin.id, "2468")) && !(await S.checkPin(bin.id, "1357")), "sửa tên, lớp, đặt PIN mới");
  await S.updateUser(bin.id, { noPin: true });
  ok(!bin.hasPin && be.T.profiles.find((p) => p.id === bin.id).pin_hash === null && (await S.checkPin(bin.id, "")), "bỏ PIN");
  await S.updateUser(bin.id, { pin: "1357" });
  await throwsMsg(() => S.updateUser(bin.id, { grade: 5 }), /Chọn khối/, "đổi sang khối chưa có nội dung bị từ chối");
  await throwsMsg(() => S.updateUser(S.users("admin")[0].id, { name: "Mẹ" }), /người cấp tài khoản/, "không sửa Phụ huynh ở đây");
}

/* ---------- 6. ghi nhớ trên máy, nhiều tab, kết quả qua hộp gửi ---------- */
const dev = memStorage(); // máy của con
const B = browser({ local: dev });
await B.Store.init();
await B.Store.signIn("nha.bin", PW, true);
ok(B.Store.authState() === "ready" && !!dev.getItem(AUTH) && !B.sessionStorage.getItem(AUTH), "chọn ghi nhớ: phiên giữ trong localStorage");
{
  const B2 = browser({ local: dev });
  await B2.Store.init();
  ok(B2.Store.authState() === "ready" && B2.Store.sessionUser() === null && !B2.Store.parentUnlocked(), "tab mới trên máy đã ghi nhớ: vào thẳng “Ai đang học?”, khu phụ huynh phải nhập lại mật khẩu");
  const p = B2.Store.users("admin")[0];
  B2.Store.setSession(p.id);
  ok(B2.Store.sessionUser() === null, "chưa nhập lại mật khẩu thì không chọn được Phụ huynh");
  ok(!(await B2.Store.checkPassword("sai-roi-nhe")) && !B2.Store.parentUnlocked(), "nhập lại mật khẩu sai");
  ok((await B2.Store.checkPassword(PW)) && B2.Store.parentUnlocked(), "nhập lại mật khẩu đúng");
  B2.Store.setSession(p.id);
  ok(B2.Store.sessionUser() && B2.Store.sessionUser().id === p.id, "vào khu phụ huynh");
  // UX3: mã mở nhanh khu phụ huynh, chỉ trên máy đã ghi nhớ: băm và lưu trên máy theo mã gia đình, đúng mã thì mở khóa như vừa nhập mật khẩu
  ok(B2.Store.quickCodeLen() === 0 && !(await B2.Store.checkQuickCode("2468")), "máy chưa có mã mở nhanh: độ dài 0, kiểm tra mã nào cũng sai");
  await throwsMsg(() => B2.Store.setQuickCode("12"), /4–6 chữ số/, "mã mở nhanh phải 4–6 chữ số");
  await throwsMsg(() => B2.Store.setQuickCode("abcd"), /4–6 chữ số/, "mã mở nhanh chỉ gồm chữ số");
  await B2.Store.setQuickCode("24680");
  const saved = JSON.parse(dev.getItem("ontap_cloud_quick") || "{}");
  ok(B2.Store.quickCodeLen() === 5 && Object.keys(saved).join() === fam("nha.bin").id && /^5\.[0-9a-f]{16}\$s256:[0-9a-f]{64}$/.test(saved[fam("nha.bin").id]), "đặt mã 5 số: lưu trên máy theo mã gia đình, băm như PIN, muối ghi độ dài");
  const B3 = browser({ local: dev });
  await B3.Store.init();
  ok(B3.Store.quickCodeLen() === 5 && !B3.Store.parentUnlocked(), "tab mới: biết máy có mã 5 số, nhưng chưa mở khóa");
  ok(!(await B3.Store.checkQuickCode("2468")) && !(await B3.Store.checkQuickCode("24681")) && !B3.Store.parentUnlocked(), "sai mã mở nhanh: không mở khóa");
  B3.Store.setSession(p.id);
  ok(B3.Store.sessionUser() === null, "chưa đúng mã thì không chọn được Phụ huynh");
  ok((await B3.Store.checkQuickCode("24680")) && B3.Store.parentUnlocked(), "đúng mã mở nhanh: mở khóa như vừa nhập mật khẩu");
  B3.Store.setSession(p.id);
  ok(B3.Store.sessionUser() && B3.Store.sessionUser().id === p.id, "vào khu phụ huynh bằng mã mở nhanh");
  await B3.Store.setQuickCode(null);
  ok(B3.Store.quickCodeLen() === 0 && dev.getItem("ontap_cloud_quick") === null && B2.Store.quickCodeLen() === 0, "bỏ mã: xóa khỏi máy, tab khác cũng không còn");
  await B3.Store.setQuickCode("2468");
  ok(B3.Store.quickCodeLen() === 4 && (await B3.Store.checkQuickCode("2468")), "đặt lại mã 4 số");
  const C = browser({ local: A.localStorage });
  await C.Store.init();
  ok(C.Store.authState() === "signed-out", "tab mới trên máy không ghi nhớ: phải đăng nhập lại");
  await throwsMsg(() => A.Store.setQuickCode("2468"), /Ghi nhớ trên máy này/, "máy không ghi nhớ: không đặt được mã mở nhanh");
  ok(A.Store.quickCodeLen() === 0, "máy không ghi nhớ: không có mã");
}
{
  const S = B.Store;
  S.setSession(bin.id);
  ok(S.sessionUser().id === bin.id && S.lastUserId() === bin.id, "con chọn hồ sơ của mình; máy nhớ hồ sơ chọn gần nhất");
  S.addResult({ userId: bin.id, source: "bank", refId: "toan4-ck1-de1", subject: "Toán", label: "Toán 4 · Đề 1", mode: "exam", r: 20, t: 25, s: 900, wrongTopics: ["Phân số"] });
  await S.flush();
  const rows = be.T.results.filter((r) => r.profile_id === bin.id);
  ok(rows.length === 1 && rows[0].family_id === fam("nha.bin").id && rows[0].ref_id === "toan4-ck1-de1" && !dev.getItem("ontap_cloud_outbox"), "kết quả của hồ sơ đang học lên máy chủ, hộp gửi trống");
  const before = be.T.results.length;
  S.addResult({ userId: na.id, source: "bank", refId: "x", r: 1, t: 2, s: 1 });
  await S.flush();
  ok(be.T.results.length === before && B.errors.some((m) => /hồ sơ đang học/.test(m)), "không ghi kết quả cho hồ sơ khác hồ sơ đang học");
  be.failWrites = 1; be.failMsg = "TypeError: Failed to fetch"; be.failCode = "";
  S.addResult({ userId: bin.id, source: "module", refId: "ioe-4", subject: "Tiếng Anh", label: "IOE · Test 1", mode: "exam", r: 24, t: 30, s: 800 });
  await S.flush();
  ok(be.T.results.length === before && JSON.parse(dev.getItem("ontap_cloud_outbox"))[bin.id].length === 1 && S.resultsFor(bin.id).length === 2, "mất mạng: kết quả nằm lại trong hộp gửi, vẫn hiện trên máy");
  await S.refresh(); await S.flush();
  ok(be.T.results.length === before + 1 && !dev.getItem("ontap_cloud_outbox") && S.resultsFor(bin.id).length === 2, "có mạng lại: gửi kết quả trong hộp gửi, không trùng");
  await A.Store.refresh();
  ok(A.Store.resultsFor(bin.id).length === 2 && A.Store.resultsFor(bin.id)[0].label === "IOE · Test 1", "máy khác tải lại thấy kết quả");
  // Dạng câu mới (Phiên K2): số câu đúng lẻ đến 0,01; điểm tự chấm tự luận là kết quả riêng (mode "self", phần tư điểm).
  const tn = { userId: bin.id, source: "bank", refId: "thunghiem6-dang-cau-moi", subject: "Thử nghiệm", label: "Đề thử nghiệm" };
  S.addResult(Object.assign({ mode: "practice", r: 2.354, t: 4, s: 60 }, tn));
  S.addResult(Object.assign({ mode: "self", r: 14, t: 28, s: 0 }, tn));
  await S.flush();
  const k2 = () => be.T.results.filter((r) => r.profile_id === bin.id && r.ref_id === tn.refId);
  ok(k2().length === 2 && k2().some((r) => r.r === 2.35 && r.t === 4 && r.mode === "practice") && k2().some((r) => r.mode === "self" && r.r === 14 && r.t === 28)
    && S.resultsFor(bin.id).some((r) => r.r === 2.35), "số câu đúng lẻ (làm tròn 0,01) và điểm tự chấm tự luận lên máy chủ");
  be.intR = true; // máy chủ chưa chạy supabase/cap-nhat-k2.sql: cột r còn là số nguyên
  S.addResult(Object.assign({ mode: "exam", r: 1.5, t: 2, s: 30 }, tn));
  await S.flush();
  be.intR = false;
  ok(k2().length === 3 && k2().some((r) => r.mode === "exam" && r.r === 2 && r.t === 2) && !dev.getItem("ontap_cloud_outbox") && !B.errors.some((m) => /không nhận/.test(m)),
    "máy chủ chưa cập nhật: gửi lại số câu đúng làm tròn, không mất kết quả");
  S.setSession(null);
  ok(S.sessionUser() === null && S.authState() === "ready", "đổi người học: về “Ai đang học?”, không đăng xuất");
}

/* ---------- 7. lịch thi, ngân hàng tự nhập, đề có sẵn, thông tin chung ---------- */
{
  const S = A.Store, fid = fam("nha.bin").id;
  const ev = S.upsertEvent({ title: "Thi thử", grades: [4], start: "2026-12-01", end: "2026-12-02" });
  S.setSettings({ schoolName: "Nhà Bin Na", schoolYear: "2026–2027" });
  const bk = S.upsertBank({ title: "Đề tự nhập", grade: 4, subject: "Toán", questions: [{ type: "tf", q: "1 + 1 = 2", a: true, topic: "Cộng", p: "d1" }], passages: { d1: { title: "Đoạn", text: "Một cộng một." } }, src: "Đúng: 1 + 1 = 2" });
  await S.flush();
  ok(be.T.question_banks.find((b) => b.id === bk.id).passages.d1.text === "Một cộng một.", "ngân hàng tự nhập có đoạn đọc: lên máy chủ");
  await B.Store.refresh();
  ok(B.Store.bank(bk.id).passages.d1.title === "Đoạn" && B.Store.bank(bk.id).questions[0].p === "d1", "máy khác tải lại thấy đoạn đọc");
  be.intR = true; // máy chủ chưa có cột passages: ngân hàng không có đoạn đọc vẫn lưu được
  const bk0 = S.upsertBank({ title: "Đề không đoạn đọc", grade: 4, subject: "Toán", questions: [{ type: "tf", q: "2 + 2 = 4", a: true, topic: "Cộng" }], src: "Đúng: 2 + 2 = 4" });
  await S.flush();
  be.intR = false;
  ok(be.T.question_banks.some((b) => b.id === bk0.id) && !("passages" in S.bank(bk0.id)), "máy chủ chưa cập nhật: ngân hàng không có đoạn đọc vẫn lưu được");
  S.removeBank(bk0.id);
  ok(be.T.exam_events.some((e) => e.family_id === fid && e.id === ev.id && e.start_date === "2026-12-01") && be.T.question_banks.some((b) => b.family_id === fid && b.id === bk.id)
    && fam("nha.bin").display_name === "Nhà Bin Na", "thêm kì thi, ngân hàng đề, đổi tên gia đình: lên máy chủ");
  // Đề có sẵn: lúc mở app chỉ có danh mục data/banks/index.js; câu hỏi tải khi mở đề (loadBank dùng chung với LocalStore).
  const seed = S.bank("toan4-ck1-de1"), nTags = A.scripts.length;
  const p1 = S.loadBank("toan4-ck1-de1"), p2 = S.loadBank("toan4-ck1-de2"), tag = A.scripts[nTags];
  ok(seed.seed && !seed.questions && seed.n === 25 && A.scripts.length === nTags + 1 && tag.src === "data/banks/4-toan.js",
    "đề có sẵn: chưa có câu hỏi; mở đề thì tải file câu hỏi của khối, môn đó (hai đề cùng file: tải một lần)");
  A.load("data/banks/4-toan.js"); tag.onload();
  const [b1, b2] = await Promise.all([p1, p2]);
  ok(b1.seed && b1.questions.length === 25 && b2.questions.length === 25 && S.bank("toan4-ck1-de1").questions.length === 25
    && (await S.loadBank("toan4-ck1-de3")).questions.length === 25 && A.scripts.length === nTags + 1, "tải xong: đề đủ câu hỏi, không tải lại file");
  ok((await S.loadBank(bk.id)).questions.length === 1 && (await S.loadBank("khong-co")) === null && A.scripts.length === nTags + 1,
    "loadBank: ngân hàng tự nhập có sẵn câu hỏi, đề không có thì null");
  // Đề ngẫu nhiên (K3): cùng file, tải xong thì có cả kho câu: câu riêng của pool (src là mã pool) và câu của các đề cố định
  // trong from (src là mã đề đó; Toán 4 cuối kì I, Phiên N1: 31 + 3 × 25 câu), đề cố định giữ nguyên.
  const pool = await S.loadBank("toan4-ck1-ngau-nhien"), pool2 = S.bank("toan4-gk2-ngau-nhien");
  const bySrc = (b) => JSON.stringify(b.questions.reduce((o, q) => ((o[q.src] = (o[q.src] || 0) + 1), o), {}));
  ok(pool.seed && pool.pool && pool.n === 25 && bySrc(pool) === JSON.stringify({ "toan4-ck1-ngau-nhien": 31, "toan4-ck1-de1": 25, "toan4-ck1-de2": 25, "toan4-ck1-de3": 25 }) && !!pool.note && pool2.questions.length === 50
    && S.bank("toan4-ck1-de1").questions.length === 25 && !("src" in S.bank("toan4-ck1-de1").questions[0]) && A.scripts.length === nTags + 1, "đề ngẫu nhiên: kho câu gộp từ các đề cố định cùng file, không tải lại file");
  const p3 = S.loadBank("khtn6-ck1-de1"); A.scripts[nTags + 1].onerror();
  await throwsMsg(() => p3, /Chưa tải được đề/, "mất mạng: tải đề báo lỗi");
  S.loadBank("khtn6-ck1-de1");
  ok(A.scripts.length === nTags + 3 && A.scripts[nTags + 2].src === "data/banks/6-khtn.js", "lần sau tải lại file");
  S.removeEvent(ev.id); S.removeBank(bk.id);
  await S.flush();
  ok(!be.T.exam_events.some((e) => e.id === ev.id) && !be.T.question_banks.some((b) => b.id === bk.id), "xóa kì thi, ngân hàng đề");
}

/* ---------- 7b. báo câu sai (question_reports, Phiên R1) ---------- */
{
  const S = B.Store, Q = B.win.Quiz, fid = fam("nha.bin").id;
  const q = { type: "mc", q: "36 480 : 6 = ?", o: ["6 080", "608", "60 800", "680"], topic: "Phép chia", x: "Chia từ trái sang phải." };
  const key = Q.key(q), qText = Q.text(q);
  ok(qText === "36 480 : 6 = ? · ✓ 6 080 · – 608 · – 60 800 · – 680" && Q.text({ type: "fill", q: "5 tấn 30 kg = ___ kg", ans: ["5030", "5 030"] }) === "5 tấn 30 kg = ___ kg · Đáp án: 5030"
    && Q.text({ type: "tf", q: "1 + 1 = 2", a: true }) === "1 + 1 = 2 · Đáp án: Đúng" && Q.text({ type: "essay", q: "Viết đoạn văn.", x: "Gợi ý dài" }) === "Viết đoạn văn. · Gợi ý: Gợi ý dài"
    && Q.text({ type: "mc", q: "x".repeat(600), o: ["a", "b"] }).length === 500 && Q.REASONS.map((r) => r[0]).join() === "wrong,unclear,typo,other",
    "Quiz.text: bản chụp nội dung câu (đáp án đúng đánh dấu ✓), tối đa 500 kí tự; Quiz.REASONS");
  S.setSession(bin.id);
  await throwsMsg(() => S.addReport({ userId: bin.id, bankId: "toan4-ck1-de1", qKey: key, reason: "sai" }), /chọn một lí do/, "lí do lạ: báo ngay, không gọi máy chủ");
  await throwsMsg(() => S.addReport({ userId: "khong-co", bankId: "toan4-ck1-de1", qKey: key, reason: "wrong" }), /Không tìm thấy người dùng/, "người dùng lạ");
  const r1 = await S.addReport({ userId: bin.id, bankId: "toan4-ck1-de1", qKey: key, qText, reason: "wrong", note: "  Phải là 6 080  " });
  const row = be.T.question_reports.find((r) => r.id === r1.id);
  ok(row && row.family_id === fid && row.profile_id === bin.id && row.bank_id === "toan4-ck1-de1" && row.q_key === key && row.q_text === qText && row.reason === "wrong" && row.note === "Phải là 6 080" && row.status === "new",
    "con báo câu sai: lên máy chủ với hồ sơ con, gia đình do máy chủ điền, ghi chú bỏ khoảng trắng");
  ok(S.reports().length === 1 && S.reports()[0].id === r1.id && S.reports()[0].userId === bin.id && S.reports()[0].status === "new" && r1.qKey === key, "reports(): có ngay trong bộ nhớ đệm");
  const P = A.Store, parent = P.users("admin")[0];
  await new Promise((r) => setTimeout(r, 2)); // created_at tính đến mili giây: hai báo cáo cùng một ms thì "mới nhất trước" không xác định
  const r2 = await P.addReport({ userId: parent.id, bankId: "toan4-ck1-ngau-nhien", qKey: "abc", qText: "Câu của đề ngẫu nhiên", reason: "unclear", note: "" });
  ok(be.T.question_reports.find((r) => r.id === r2.id).profile_id === null && r2.userId === parent.id, "phụ huynh báo: không có hồ sơ (profile_id trống), trong app ghi là Phụ huynh");
  await S.refresh();
  ok(S.reports().length === 2 && S.reports()[0].id === r2.id && S.reports()[1].userId === bin.id, "máy khác tải lại: thấy cả hai, mới nhất trước; báo cáo của phụ huynh ghi userId Phụ huynh");
  for (let i = 0; i < 28; i++) await S.addReport({ userId: bin.id, bankId: "toan4-ck1-de2", qKey: "k" + i, reason: "other" });
  await throwsMsg(() => S.addReport({ userId: bin.id, bankId: "toan4-ck1-de2", qKey: "k31", reason: "typo" }), /tối đa 30 câu một ngày/, "câu thứ 31 trong ngày: máy chủ từ chối, app báo đúng lời");
  ok(S.reports().length === 30 && be.T.question_reports.filter((r) => r.family_id === fid).length === 30, "giữ đúng 30 báo cáo");
  // máy chủ chưa chạy supabase/cap-nhat-r1.sql: app vẫn mở được, chỉ không gửi báo cáo được
  be.noReports = true;
  const N = browser();
  await N.Store.init(); await N.Store.signIn("nha.bin", PW);
  ok(N.Store.authState() === "ready" && N.Store.users("student").length === 4 && N.Store.reports().length === 0 && N.errors.length === 0, "máy chủ chưa có bảng question_reports: app vẫn đăng nhập, dữ liệu đủ, danh sách báo cáo trống");
  N.Store.setSession(bin.id);
  await throwsMsg(() => N.Store.addReport({ userId: bin.id, bankId: "x", qKey: "k", reason: "wrong" }), /chưa cập nhật để nhận báo cáo/, "gửi báo cáo khi máy chủ chưa có bảng: báo rõ");
  be.noReports = false;
  S.setSession(null);
}

/* ---------- 8. chuyển dữ liệu từ bản lưu trên máy ---------- */
{
  const h = (salt, pin) => "s256:" + nodeCrypto.createHash("sha256").update(salt + ":" + pin).digest("hex");
  const local = {
    v: 1, settings: { schoolName: "Nhà cũ" },
    users: [
      { id: "a1", role: "admin", name: "Bố", salt: "s1", pinHash: h("s1", "1234") },
      { id: "p1", role: "parent", name: "Bà", salt: "s2", pinHash: h("s2", "5555") },
      { id: "k1", role: "student", name: "Bông", avatar: "🐼", grade: 6, className: "6A", parentIds: ["p1"], salt: "s3", pinHash: h("s3", "43210") }
    ],
    events: [], banks: [],
    results: [{ id: "r1", userId: "k1", source: "module", refId: "l6-giua-ki-1", subject: "Toán", label: "Toán · Đề 1", mode: "exam", r: 17, t: 20, s: 1200, at: "2026-10-10T09:00:00.000Z" }],
    seedBanksSeen: []
  };
  A.localStorage.setItem("ontap_db_v1", JSON.stringify(local));
  A.localStorage.setItem("u_k1__ioe4_hist", "[1,2]");
  const S = A.Store;
  ok(S.localData() && S.localData().users.length === 3, "đọc được dữ liệu bản lưu trên máy");
  const res = await S.migrate(S.localData());
  const bong = S.users("student").find((u) => u.name === "Bông");
  ok(res.profiles === 1 && res.results === 1 && bong && bong.grade === 6 && bong.hasPin && bong.pinLen === 0 && S.resultsFor(bong.id).length === 1, "chuyển lên: học sinh thành hồ sơ con, giữ PIN cũ (chưa biết độ dài), kết quả");
  ok(A.localStorage.getItem("u_" + bong.id + "__ioe4_hist") === "[1,2]" && !!S.migratedAt(), "chép tiến độ bài ôn sang mã hồ sơ mới");
  ok(!(await S.checkPin(bong.id, "1234")) && (await S.checkPin(bong.id, "43210")), "PIN cũ 5 số dùng được trên bản đám mây");
  await S.flush();
  ok(/^5\./.test(be.T.profiles.find((p) => p.id === bong.id).pin_hash) && bong.pinLen === 5, "nhập đúng PIN cũ: băm lại kèm độ dài, lần sau bàn phím tự vào");
  const again = await S.migrate(S.localData());
  ok(again.profiles === 0 && again.results === 0 && S.users("student").length === 5, "chuyển lại: không trùng");
  await throwsMsg(() => S.migrate({ users: [], events: [], results: [], from: "cloud" }), /sao lưu từ đám mây/, "không chuyển file sao lưu đám mây");
  const out = S.exportJSON();
  ok(/"from": "cloud"/.test(out) && !/s256:|pin_hash|"salt"/.test(out), "tải file sao lưu: không chứa mã PIN");
}

/* ---------- 9. đổi mật khẩu ---------- */
const PW2 = "me-bin-moi-2026";
{
  const S = A.Store;
  await throwsMsg(() => S.changePassword(PW2, "sai-mat-khau"), /hiện tại chưa đúng/, "đổi mật khẩu: sai mật khẩu hiện tại");
  await throwsMsg(() => S.changePassword(PW2, ""), /hiện tại chưa đúng/, "đổi mật khẩu: bỏ trống mật khẩu hiện tại");
  await S.changePassword(PW2, PW);
  ok(S.authState() === "ready", "đổi mật khẩu thành công");
  const D = browser();
  await D.Store.init();
  await throwsMsg(() => D.Store.signIn("nha.bin", PW), /chưa đúng/, "mật khẩu cũ không đăng nhập được nữa");
  await D.Store.signIn("nha.bin", PW2);
  ok(D.Store.authState() === "ready", "mật khẩu mới đăng nhập được");
}

/* ---------- 10. CAPTCHA ---------- */
{
  be.captchaRequired = true;
  const stub = { n: 0, boxes: [], render(host, o) { this.boxes.push(host); setTimeout(() => o.callback("ok-" + (++this.n)), 1); return this.n; }, remove() {} };
  const E = browser({ siteKey: "0x4AAAAAAAtest", turnstile: stub });
  await E.Store.init();
  const used = be.captchaUsed;
  await E.Store.signIn("nha.bin", PW2);
  ok(E.Store.authState() === "ready" && be.captchaUsed === used + 1, "CAPTCHA bật: đăng nhập kèm mã xác minh");
  ok(await E.Store.checkPassword(PW2), "CAPTCHA bật: nhập lại mật khẩu cũng kèm mã xác minh");
  // UX3b: checkPassword nhận thêm chỗ đặt ô CAPTCHA (hộp đăng xuất ở trang Tài khoản đặt ô #outCaptcha trong hộp); mặc định vẫn #pwCaptcha
  E.win.document.querySelector = (s) => (/^#(pwCaptcha|outCaptcha)$/.test(s) ? { id: s.slice(1) } : null);
  ok((await E.Store.checkPassword(PW2)) && stub.boxes[stub.boxes.length - 1].id === "pwCaptcha", "CAPTCHA bật: ô xác minh mặc định đặt ở #pwCaptcha");
  ok((await E.Store.checkPassword(PW2, "#outCaptcha")) && stub.boxes[stub.boxes.length - 1].id === "outCaptcha", "UX3b: checkPassword(mật khẩu, chỗ đặt ô CAPTCHA) đặt ô vào hộp đăng xuất");
  E.win.document.querySelector = () => null;
  const F = browser();
  await F.Store.init();
  await throwsMsg(() => F.Store.signIn("nha.bin", PW2), /chưa có khóa CAPTCHA/, "máy chủ bật CAPTCHA mà app chưa có khóa: báo rõ");
  be.captchaRequired = false;
}

/* ---------- 11. tài khoản bị khóa, đặt lại mật khẩu, tài khoản không có gia đình ---------- */
{
  const S = A.Store, id = fam("nha.bin").id;
  ok((await admin({ action: "set_status", id, status: "locked" })).account.status === "locked", "chủ app khóa tài khoản");
  await S.refresh();
  ok(S.authState() === "locked" && S.users().length === 0 && S.sessionUser() === null, "đang mở app: tải lại thấy tài khoản bị khóa, không còn dữ liệu trên máy");
  const G = browser();
  await G.Store.init();
  await throwsMsg(() => G.Store.signIn("nha.bin", PW2), /đang bị khóa/, "tài khoản bị khóa không đăng nhập được");
  await admin({ action: "set_status", id, status: "active" });
  await S.signIn("nha.bin", PW2);
  ok(S.authState() === "ready" && S.users("student").length === 5, "mở khóa: đăng nhập lại, dữ liệu còn nguyên");
  const r = await admin({ action: "reset_password", id });
  await B.Store.refresh();
  ok(B.Store.authState() === "signed-out" && !dev.getItem(AUTH), "chủ app đặt lại mật khẩu: máy đang đăng nhập bị đăng xuất");
  await B.Store.signIn("nha.bin", r.password, true);
  ok(B.Store.authState() === "change-password", "đăng nhập bằng mật khẩu tạm mới: bắt đổi mật khẩu");
  await B.Store.changePassword(PW);
  ok(B.Store.authState() === "ready", "đổi xong mật khẩu tạm");
  const H = browser();
  await H.Store.init();
  await H.Store.signIn("chu.app", OWNER_PW);
  ok(H.Store.authState() === "no-family" && H.Store.users().length === 0, "tài khoản chủ app (không có gia đình) đăng nhập vào app: authState no-family");
}

/* ---------- 12. máy dùng chung cho hai gia đình, đăng xuất ---------- */
{
  const acc2 = await admin({ action: "create_account", username: "nha.na", password: "nha-na-2026-tam" });
  const box = { [bin.id]: [{ id: nodeCrypto.randomUUID(), userId: bin.id, source: "bank", refId: "x", r: 1, t: 2, s: 3, at: new Date().toISOString() }] };
  const shared = memStorage();
  shared.setItem("ontap_cloud_outbox", JSON.stringify(box));
  const K = browser({ local: shared });
  await K.Store.init();
  await K.Store.signIn("nha.na", acc2.password);
  await K.Store.changePassword("nha-na-2026-moi");
  await K.Store.flush();
  ok(K.Store.users("student").length === 0 && JSON.parse(shared.getItem("ontap_cloud_outbox"))[bin.id].length === 1 && K.errors.length === 0,
    "gia đình khác đăng nhập trên cùng máy: không thấy, không gửi kết quả còn chờ của gia đình trước");
  const S = A.Store, kid = S.users("student")[0].id;
  S.setSession(kid);
  await S.signOut();
  ok(S.authState() === "signed-out" && S.sessionUser() === null && S.users().length === 0 && !A.sessionStorage.getItem(AUTH) && !A.localStorage.getItem(AUTH), "đăng xuất: xóa phiên trên máy");
  const n = be.T.results.length;
  S.addResult({ userId: kid, source: "bank", refId: "toan4-ck1-de2", subject: "Toán", label: "Toán 4 · Đề 2", r: 3, t: 5, s: 60 }); // phiên hết giữa lúc con làm bài
  ok(JSON.parse(A.localStorage.getItem("ontap_cloud_outbox") || "{}")[kid].length === 1 && A.errors.some((m) => /đăng nhập lại để gửi/.test(m)), "phiên hết giữa lúc làm bài: kết quả vào hộp gửi, mời bố mẹ đăng nhập lại");
  await S.signIn("nha.bin", PW); await S.flush();
  ok(be.T.results.length === n + 1 && !A.localStorage.getItem("ontap_cloud_outbox"), "đăng nhập lại: tự gửi kết quả còn chờ");
  const unexpected = A.errors.filter((m) => !/đăng nhập lại để gửi/.test(m)).concat(B.errors.filter((m) => !/hồ sơ đang học|Chưa gửi được/.test(m)));
  ok(!unexpected.length, "không có lỗi ngoài ý muốn" + (unexpected.length ? ": " + unexpected.join(" | ") : ""));
}

console.log(`\n${passed} kiểm tra đạt, ${failures.length} lỗi`);
if (failures.length) { console.log("SUPABASE STORE FAILED"); process.exit(1); }
console.log("SUPABASE STORE OK");
