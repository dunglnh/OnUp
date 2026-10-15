/* Kiểm thử SupabaseStore (js/store-supabase.js) và Edge Function student-login trên máy chủ Supabase giả trong bộ nhớ.
   Không cần mạng, không cần project Supabase. Chạy: node tests/supabase/store-test.mjs
   - So giao diện với LocalStore (js/store.js): đủ mọi hàm, cùng kiểu đồng bộ/async.
   - Chạy các luồng: quản trị tạo gia đình, phụ huynh nhận mã mời, học sinh đăng nhập bằng mã gia đình + PIN,
     ghi kết quả (cả khi mất mạng), chuyển dữ liệu cục bộ lên, gắn đề có sẵn mới, giới hạn kết quả mỗi học sinh.
   - Đóng vai người tấn công gọi thẳng Edge Function (dò PIN, dò mã gia đình, khóa máy của con). */
import vm from "node:vm";
import fs from "node:fs";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";

const require = createRequire(import.meta.url);
const { createBackend } = require("./fake-backend.js");
const { createFakeSupabase } = require("./fake-client.js");
const { loadEdgeFunction } = await import("./load-edge.mjs");
const { createHandler, verifyPin, hashPin, pinProblem, ITER } = await loadEdgeFunction();
const ROOT = new URL("../../", import.meta.url).pathname;

let passed = 0;
const failures = [];
function ok(cond, msg) { if (cond) { passed++; console.log("ok  " + msg); } else { failures.push(msg); console.log("FAIL " + msg); } }
async function throwsMsg(fn, re, msg) {
  try { await fn(); ok(false, msg + " (không báo lỗi)"); } catch (e) { ok(re.test(e.message), msg + " → " + e.message); }
}

const be = createBackend();
const service = createFakeSupabase((m) => be.handle(m), { service: true });
const PEPPER = "test-pepper-0123456789-abcdefghijklmnop"; // ít nhất 32 kí tự
const handler = createHandler({ db: service, getUser: be.getUser, pepper: PEPPER, iter: 1000 }); // ít vòng cho test nhanh
be.T.allowed_creators.push({ email: "bo.minh@example.com" }, { email: "co.lan@example.com" });
be.functions["student-login"] = handler;

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
    document: { head: { append: (s) => loaded.push(s.src) }, createElement: () => ({}) }
  };
  win.window = win;
  const ctx = vm.createContext(win);
  const load = (f) => vm.runInContext(fs.readFileSync(ROOT + f, "utf8"), ctx, { filename: f });
  ["data/calendar-2026-2027.js", "data/modules.js", "data/banks.js"].forEach(load);
  if (opts.realConfig) load("js/config.js");
  else vm.runInContext(`window.ONTAP_CONFIG = { supabaseUrl: "https://fake.supabase.co", supabaseAnonKey: ${JSON.stringify(opts.key || "anon-key")} };`, ctx);
  load("js/store.js");
  if (!opts.realConfig) win.supabase = { createClient: (u, k, o) => createFakeSupabase((m) => be.handle(m), { storage: localStorage, auth: o && o.auth }) };
  load("js/store-supabase.js");
  const errors = [];
  win.Store.onError = (m) => errors.push(m);
  return { win, get Store() { return win.Store; }, Local: win.LocalStore, errors, localStorage, sessionStorage, loaded };
}
async function emailLogin(b, email, remember) {
  await b.Store.sendLink(email, remember);
  const mail = be.outbox.filter((x) => x.email === email).pop();
  await b.Store.verifyCode(email, mail.otp);
}
let FAM_A = null; // gia đình của quản trị A
const fam = () => (FAM_A ? be.T.families.find((f) => f.id === FAM_A) : be.T.families[be.T.families.length - 1]);

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

/* ---------- 3. quản trị tạo gia đình ---------- */
await A.Store.init();
ok(A.Store.authState() === "signed-out" && A.Store.sessionUser() === null, "chưa đăng nhập: authState signed-out");
await throwsMsg(() => A.Store.sendLink("khong-phai-email"), /Email chưa đúng/, "email sai định dạng");
{
  const X = browser(); await X.Store.init(); await emailLogin(X, "nguoi.la@example.com");
  await throwsMsg(() => X.Store.createFamily({ name: "Người lạ" }), /chưa được phép tạo gia đình/, "email ngoài danh sách không tạo được gia đình");
}
await emailLogin(A, "bo.minh@example.com", true); // máy riêng: ghi nhớ đăng nhập
ok(A.Store.authState() === "no-profile", "đăng nhập email lần đầu: chưa thuộc gia đình nào");
await throwsMsg(() => A.Store.claimInvite("AAAA-BBBB-CCCC"), /Mã mời không đúng/, "mã mời sai");
await A.Store.createFamily({ schoolName: "Nhà Bin", name: "Bố Minh", avatar: "🧭" });
FAM_A = fam().id;
ok(A.Store.authState() === "ready" && A.Store.isReady() && A.Store.sessionUser().role === "admin" && A.Store.sessionUser().name === "Bố Minh", "tạo gia đình: thành quản trị");
ok(A.Store.events().length === A.win.ONTAP_SEED_EVENTS.length && JSON.stringify(A.Store.event("ck1-l4").banks) === JSON.stringify(A.win.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l4").banks),
  "lịch thi mặc định được chép lên máy chủ");
ok(/^[A-Z0-9]{6}$/.test(A.Store.familyCode()) && A.Store.settings().schoolName === "Nhà Bin", "quản trị đọc được mã gia đình 6 kí tự");
ok(A.Store.banks().filter((b) => b.seed).length === A.win.ONTAP_SEED_BANKS.length && be.T.question_banks.length === 0, "ngân hàng có sẵn không lưu lên máy chủ");

const mom = await A.Store.createUser({ role: "parent", name: "Mẹ Bin", avatar: "🌻" });
ok(/^[A-Z0-9]{12}$/.test(mom.inviteCode || "") && mom.linked === false, "tạo phụ huynh: có mã mời 12 kí tự, không cần PIN");
await throwsMsg(() => A.Store.createUser({ role: "student", name: "X", pin: "1111", grade: 4 }), /6 chữ số/, "PIN mới phải 6 chữ số");
await throwsMsg(() => A.Store.createUser({ role: "student", name: "X", pin: "123456", grade: 4 }), /dễ đoán/, "PIN dễ đoán (123456) bị từ chối");
await throwsMsg(() => A.Store.createUser({ role: "student", name: "X", pin: "201622", grade: 4 }), /dễ đoán/, "PIN là năm sinh bị từ chối");
const bin = await A.Store.createUser({ role: "student", name: "Bin", pin: "482915", grade: 4, className: "4A", parentIds: [mom.id] });
const na = await A.Store.createUser({ role: "student", name: "Na", pin: "730418", grade: 6 });
ok(A.Store.childrenOf(mom.id).map((c) => c.name).join() === "Bin" && bin.className === "4A", "tạo học sinh, gắn phụ huynh");
ok(be.T.student_pins.length === 2 && be.T.student_pins.every((p) => p.pin_hash.startsWith("pbkdf2v2$") && !p.pin_hash.includes("482915")), "PIN được băm PBKDF2 ở Edge Function");
ok(!JSON.stringify(A.Store.data()).includes("pbkdf2") && !("pinHash" in bin) && !("salt" in bin), "trình duyệt không nhận được PIN hay mã băm");
await throwsMsg(async () => A.Store.removeUser(A.Store.sessionUser().id), /ít nhất một tài khoản quản trị/, "không xóa được quản trị cuối cùng");

/* ---------- 4. lịch thi, ngân hàng, cài đặt ---------- */
const ev = A.Store.upsertEvent({ title: "Thi thử Toán", kind: "thi-khac", grades: [4], start: "2026-11-20", end: "", tentative: false, subjects: ["Toán"] });
A.Store.upsertEvent(Object.assign({}, ev, { title: "Thi thử Toán (sửa)" }));
const bk = A.Store.upsertBank({ title: "Đề tự nhập", grade: 4, subject: "Toán", minutes: 10, questions: [{ type: "tf", q: "1+1=2", a: true }], src: "Đúng: 1+1=2" });
A.Store.upsertEvent(Object.assign({}, A.Store.event(ev.id), { banks: [bk.id] }));
const ev2 = A.Store.upsertEvent({ title: "Xóa đi", kind: "moc", grades: [6], start: "2026-12-01" });
A.Store.removeEvent(ev2.id);
A.Store.setSettings({ schoolName: "Nhà Bin & Na", schoolYear: "2026–2027" });
await throwsMsg(async () => A.Store.upsertBank({ id: "mau-toan4-ck1", title: "x", questions: [{}] }), /bộ có sẵn/, "không sửa được bộ có sẵn");
await A.Store.flush();
{
  const A2 = browser({ local: A.localStorage }); // tab mới cùng máy, quản trị đã chọn ghi nhớ
  await A2.Store.init();
  const pick = (S) => JSON.stringify({ e: S.events(), b: S.banks(), u: S.users().map((u) => [u.id, u.name, u.role, u.grade || 0, (u.parentIds || []).join()]), s: [S.settings().schoolName, S.settings().schoolYear] });
  ok(A2.Store.authState() === "ready" && pick(A2.Store) === pick(A.Store), "tab mới (đã ghi nhớ) tải lại từ máy chủ: dữ liệu khớp bộ nhớ đệm");
  ok(A2.Store.event(ev.id).title === "Thi thử Toán (sửa)" && !A2.Store.event(ev2.id) && A2.Store.event(ev.id).banks[0] === bk.id, "sửa, xóa kì thi được lưu");
  A2.Store.removeBank(bk.id);
  await A2.Store.flush();
  ok(!be.T.question_banks.length && be.T.exam_events.find((e) => e.id === ev.id).banks.length === 0, "xóa ngân hàng thì bỏ gắn khỏi kì thi trên máy chủ");
  await A.Store.refresh();
}

/* ---------- 5. phụ huynh nhận mã mời (máy dùng chung: không ghi nhớ) ---------- */
const P = browser();
await P.Store.init();
await emailLogin(P, "me.bin@example.com");
await P.Store.claimInvite(" " + mom.inviteCode.toLowerCase().match(/.{4}/g).join("-") + " ");
ok(P.Store.authState() === "ready" && P.Store.sessionUser().id === mom.id, "phụ huynh nhận mã mời (gõ thường, có gạch nối)");
ok(P.Store.users().map((u) => u.name).sort().join() === "Bin,Mẹ Bin" && P.Store.user(na.id) === null, "phụ huynh chỉ thấy mình và con mình");
ok(P.Store.childrenOf(mom.id).length === 1 && P.Store.familyCode() === A.Store.familyCode(), "phụ huynh thấy con và mã gia đình");
{
  const P2tab = browser({ local: P.localStorage });
  await P2tab.Store.init();
  ok(P2tab.Store.authState() === "signed-out" && !P.localStorage.getItem("ontap_sb_auth"), "không ghi nhớ: phiên người lớn không nằm lâu trên máy dùng chung");
}
const cun = await P.Store.createUser({ role: "student", name: "Cún", pin: "590362", grade: 4, avatar: "🐶" });
ok(P.Store.childrenOf(mom.id).length === 2 && cun.parentIds[0] === mom.id, "phụ huynh tự thêm con (add_child + PIN)");
await P.Store.updateUser(cun.id, { name: "Cún Con", pin: "590373" });
ok(be.T.profiles.find((p) => p.id === cun.id).name === "Cún Con", "phụ huynh sửa hồ sơ và PIN của con");
await throwsMsg(() => P.Store.updateUser(bin.id, { parentIds: [] }), /Chỉ quản trị/, "phụ huynh không tự gỡ quan hệ phụ huynh–con");

/* ---------- 6. học sinh đăng nhập bằng mã gia đình + PIN ---------- */
const K = browser();
await K.Store.init();
const code = A.Store.familyCode();
await throwsMsg(() => K.Store.familyStudents("ZZZZZZ"), /Mã gia đình chưa đúng/, "mã gia đình sai");
const list = await K.Store.familyStudents(code.toLowerCase());
ok(list.students.map((s) => s.name).sort().join() === "Bin,Cún Con,Na" && list.family === "Nhà Bin & Na" && !JSON.stringify(list).includes("Mẹ")
  && !("grade" in list.students[0]) && !("className" in list.students[0]), "tra mã gia đình: chỉ hiện tên và hình học sinh");
let r;
for (let i = 0; i < 5; i++) r = await K.Store.studentLogin(code, bin.id, "999999");
ok(!r.ok && /PIN chưa đúng/.test(r.message), "PIN sai");
r = await K.Store.studentLogin(code, bin.id, "482915");
ok(!r.ok && r.locked && /Đợi 30 giây/.test(r.message), "sai 5 lần: phải đợi 30 giây, PIN đúng cũng chưa vào được");
be.clock += 31000;
r = await K.Store.studentLogin(code, bin.id, "482915");
ok(r.ok && K.Store.authState() === "ready" && K.Store.sessionUser().id === bin.id, "đợi xong, PIN đúng thì vào được");
ok(K.Store.users().length === 1 && K.Store.events().length > 0 && K.Store.lastUserId() === bin.id && K.Store.lastFamilyCode() === code, "học sinh chỉ thấy hồ sơ của mình và lịch thi");
const res1 = K.Store.addResult({ userId: bin.id, source: "bank", refId: "mau-toan4-ck1", subject: "Toán", label: "Toán 4", mode: "practice", r: 8, t: 10, s: 300, wrongTopics: ["Phân số"] });
ok(K.Store.resultsFor(bin.id)[0].id === res1.id, "kết quả hiện ngay trong bộ nhớ đệm");
await K.Store.flush();
ok(be.T.results.length === 1 && be.T.results[0].family_id === fam().id && be.T.results[0].wrong_topics[0] === "Phân số" && !K.localStorage.getItem("ontap_cloud_outbox"),
  "kết quả được lưu lên máy chủ, hộp gửi trống");
// mất mạng đúng lúc nộp bài: kết quả vẫn còn, tự gửi lại
be.failWrites = 1;
const res2 = K.Store.addResult({ userId: bin.id, source: "module", refId: "l4-giua-ki-1", subject: "Toán", label: "Đề 1", mode: "exam", r: 18, t: 20, s: 900 });
await K.Store.flush();
ok(be.T.results.length === 1 && K.Store.resultsFor(bin.id).some((x) => x.id === res2.id) && JSON.parse(K.localStorage.getItem("ontap_cloud_outbox"))[bin.id].length === 1
  && K.errors.some((m) => /tự gửi lại/.test(m)), "mất mạng khi nộp bài: kết quả giữ trong hộp gửi, không mất");
await K.Store.refresh();
await K.Store.flush();
ok(be.T.results.length === 2 && be.T.results.some((x) => x.id === res2.id) && !K.localStorage.getItem("ontap_cloud_outbox"), "có mạng lại: kết quả được gửi, không trùng");
// máy chủ quá tải (503) hoặc quá thời gian: giữ lại, gửi sau
for (const [code, msg] of [["PGRST000", "Could not connect with the database"], ["57014", "canceling statement due to statement timeout"]]) {
  be.failWrites = 1; be.failCode = code; be.failMsg = msg;
  const rr = K.Store.addResult({ userId: bin.id, source: "bank", refId: "mau-toan4-ck1", r: 1, t: 2 });
  await K.Store.flush();
  be.failCode = be.failMsg = null;
  await K.Store.refresh(); await K.Store.flush();
  ok(be.T.results.some((x) => x.id === rr.id) && !K.localStorage.getItem("ontap_cloud_outbox"), "lỗi tạm thời " + code + ": kết quả được giữ rồi gửi lại");
}
const nRes = be.T.results.length, nErr = K.errors.length;
K.Store.addResult({ userId: na.id, source: "bank", refId: "x", r: 1, t: 1 }); // giả mạo: ghi cho bạn khác
await K.Store.flush();
ok(be.T.results.length === nRes && K.errors.length > nErr && !K.localStorage.getItem("ontap_cloud_outbox"), "ghi kết quả cho người khác bị chặn, báo lỗi, không kẹt trong hộp gửi");
ok((await K.Store.checkPin(bin.id, "482915")) === true && (await K.Store.checkPin(bin.id, "000000")) === false, "học sinh kiểm tra PIN của mình");
await throwsMsg(() => K.Store.updateUser(bin.id, { pin: "614073", oldPin: "000000" }), /PIN hiện tại chưa đúng/, "đổi PIN cần PIN cũ đúng");
await throwsMsg(() => K.Store.updateUser(bin.id, { name: "Tên mới" }), /chỉ đổi được hình đại diện/, "học sinh không tự đổi tên");
await K.Store.updateUser(bin.id, { pin: "614073", oldPin: "482915", avatar: "🦊" });
ok(be.T.profiles.find((p) => p.id === bin.id).avatar === "🦊" && K.Store.authState() === "ready", "học sinh đổi hình đại diện và PIN, máy đang dùng vẫn đăng nhập");

await P.Store.refresh();
ok(P.Store.resultsFor(bin.id).length === be.T.results.filter((x) => x.profile_id === bin.id).length && P.Store.resultsFor(bin.id).length >= 2, "phụ huynh thấy kết quả mới của con sau khi tải lại");

// phiên học sinh bị thu hồi hoặc hết hạn lúc đang làm bài: giữ kết quả, đăng nhập lại thì gửi
for (const how of ["thu hồi", "hết hạn"]) {
  if (how === "thu hồi") await A.Store.signOutChild(bin.id);
  else be.T.student_sessions.filter((x) => x.profile_id === bin.id).forEach((x) => (x.created_at = new Date(Date.now() + be.clock - 31 * 864e5).toISOString()));
  const rr = K.Store.addResult({ userId: bin.id, source: "bank", refId: "mau-toan4-ck1", r: 2, t: 2 });
  await K.Store.flush();
  ok(K.Store.authState() === "signed-out" && JSON.parse(K.localStorage.getItem("ontap_cloud_outbox") || "{}")[bin.id].length === 1, "phiên bị " + how + ": kết quả giữ trong hộp gửi, mời đăng nhập lại");
  ok((await K.Store.studentLogin(code, bin.id, "614073")).ok, "đăng nhập lại sau khi phiên bị " + how);
  await K.Store.flush();
  ok(be.T.results.some((x) => x.id === rr.id) && !K.localStorage.getItem("ontap_cloud_outbox"), "đăng nhập lại: kết quả được gửi (phiên bị " + how + ")");
}

// đăng xuất, tab khác, mở lại trình duyệt
const kAnon = be.T.student_sessions.find((s) => s.profile_id === bin.id).auth_user_id;
K.Store.setSession(null);
ok(K.Store.authState() === "signed-out" && K.Store.sessionUser() === null, "học sinh đăng xuất");
await K.Store.flush();
ok(!be.T.student_sessions.some((s) => s.auth_user_id === kAnon), "đăng xuất: gỡ gắn phiên học sinh trên máy chủ");
r = await K.Store.studentLogin(code, bin.id, "614073");
ok(r.ok && be.T.student_sessions.some((s) => s.auth_user_id === kAnon), "đăng nhập lại bằng PIN mới, dùng lại phiên ẩn danh của tab");
{
  const K2 = browser({ local: K.localStorage }); // tab thứ hai cùng máy
  await K2.Store.init();
  ok(K2.Store.authState() === "signed-out" && be.T.student_sessions.some((s) => s.auth_user_id === kAnon), "tab mới: phải nhập PIN, không làm tab cũ mất đăng nhập");
  ok((await K2.Store.studentLogin(code, na.id, "730418")).ok, "tab thứ hai đăng nhập cho em");
  await K.Store.refresh();
  ok(K.Store.sessionUser().id === bin.id && K2.Store.sessionUser().id === na.id, "mỗi tab giữ đúng học sinh của mình");
  const rb = K.Store.addResult({ userId: bin.id, source: "bank", refId: "mau-toan4-ck1", r: 1, t: 2 });
  await K.Store.flush();
  ok(be.T.results.find((x) => x.id === rb.id).profile_id === bin.id, "điểm của tab cũ vẫn vào đúng hồ sơ");
}

/* ---------- 7. đề có sẵn mới được gắn vào kì thi trên máy chủ ---------- */
{
  const se = A.win.ONTAP_SEED_EVENTS.find((e) => (e.banks || []).length);
  const newId = se.banks[0];
  const f = fam(), row = be.T.exam_events.find((e) => e.family_id === f.id && e.id === se.id);
  f.seed_banks_seen = f.seed_banks_seen.filter((x) => x !== newId); row.banks = row.banks.filter((x) => x !== newId);
  await P.Store.refresh();
  ok(P.Store.event(se.id).banks.includes(newId) && !row.banks.includes(newId), "phụ huynh thấy đề mới trong bộ nhớ đệm (chỉ quản trị ghi lên máy chủ)");
  await A.Store.refresh(); await A.Store.flush();
  ok(row.banks[0] === newId && f.seed_banks_seen.includes(newId), "quản trị mở app: đề mới được gắn vào kì thi trên máy chủ");
  A.Store.upsertEvent(Object.assign({}, A.Store.event(se.id), { banks: A.Store.event(se.id).banks.filter((x) => x !== newId) }));
  await A.Store.refresh(); await A.Store.flush();
  ok(!A.Store.event(se.id).banks.includes(newId) && !row.banks.includes(newId), "đề quản trị đã bỏ gắn thì không gắn lại");
  A.Store.resetEvents(); await A.Store.flush();
  ok(be.T.exam_events.filter((e) => e.family_id === f.id).length === A.win.ONTAP_SEED_EVENTS.length &&
     be.T.exam_events.find((e) => e.family_id === f.id && e.id === se.id).banks.includes(newId), "khôi phục lịch mặc định trên máy chủ");
}

/* ---------- 8. chuyển dữ liệu máy cũ lên ---------- */
let bongId;
{
  const M = browser({ realConfig: true }); // máy cũ: bản cục bộ
  const L = M.Store;
  L.setup({ schoolName: "Nhà cũ" });
  await L.createUser({ role: "admin", name: "Bố Minh", pin: "1234" });
  const ba = await L.createUser({ role: "parent", name: "Bà ngoại", pin: "5555" });
  const bong = await L.createUser({ role: "student", name: "Bông", pin: "4321", grade: 6, className: "6A", parentIds: [ba.id] });
  L.addResult({ userId: bong.id, source: "module", refId: "l6-giua-ki-1", subject: "Toán", label: "Đề 1", mode: "exam", r: 15, t: 20, s: 900 });
  L.upsertBank({ title: "Văn 6 tự nhập", grade: 6, subject: "Ngữ văn", questions: [{ type: "tf", q: "x", a: true }] });
  // bản cục bộ không nhận bản sao lưu từ đám mây (không có PIN, khôi phục vào là không ai đăng nhập được)
  const before = JSON.stringify(L.data());
  await throwsMsg(async () => L.importJSON(A.Store.exportJSON()), /sao lưu từ đám mây/, "bản cục bộ từ chối khôi phục bản sao lưu đám mây");
  ok(JSON.stringify(L.data()) === before, "dữ liệu máy không đổi khi từ chối");
  A.localStorage.setItem("ontap_db_v1", M.localStorage.getItem("ontap_db_v1")); // dữ liệu cũ nằm trên máy quản trị
  A.localStorage.setItem("u_" + bong.id + "__ioe6_wrong", "[1,2,3]"); // tiến độ trong bài ôn của Bông
  const loc = A.Store.localData();
  ok(loc && loc.users.length === 3, "nhận ra dữ liệu cũ trên máy này");
  const out = await A.Store.migrate(loc);
  ok(out.users === 2 && out.results === 1, `chuyển lên: ${out.users} tài khoản mới, ${out.results} kết quả (quản trị trùng tên được gộp)`);
  ok(out.invites.some((i) => i.name === "Bà ngoại" && /^[A-Z0-9]{12}$/.test(i.code)), "phụ huynh cũ nhận mã mời");
  bongId = A.Store.users("student").find((u) => u.name === "Bông").id;
  ok(A.Store.users("student").some((u) => u.name === "Bông" && u.className === "6A") && A.Store.banks().some((b) => b.title === "Văn 6 tự nhập"), "bộ nhớ đệm có dữ liệu vừa chuyển");
  ok(A.Store.migratedAt() && A.Store.resultsFor(bongId)[0].at === M.Store.data().results[0].at, "giữ thời điểm làm bài cũ");
  ok(A.localStorage.getItem("u_" + bongId + "__ioe6_wrong") === "[1,2,3]", "tiến độ trong bài ôn được chép sang mã mới");
  ok(!be.log.some((x) => x.kind === "rpc" && x.op === "import_local" && false) && be.T.student_pins.filter((p) => /^legacy\$/.test(p.pin_hash)).length === 0
     && be.T.student_pins.find((p) => p.profile_id === bongId).pin_hash.startsWith("wrap$"), "PIN cũ được bọc bằng cách băm mới ngay sau khi chuyển");
  const again = await A.Store.migrate(A.Store.localData());
  ok(again.users === 0 && again.results === 0 && A.Store.users("student").filter((u) => u.name === "Bông").length === 1, "chuyển lại lần hai không bị trùng");
  await throwsMsg(() => A.Store.importJSON(A.Store.exportJSON()), /sao lưu từ đám mây/, "không chuyển lại bản sao lưu từ đám mây");
  ok(A.Store.user(bongId).pinOld === true, "quản trị thấy Bông còn PIN cũ, nên đặt lại");
  const KB = browser();
  await KB.Store.init();
  ok((await KB.Store.studentLogin(code, bongId, "1111")).ok === false, "PIN sai với PIN cũ bị từ chối");
  const rb = await KB.Store.studentLogin(code, bongId, "4321");
  ok(rb.ok === true && rb.mustChange === true, "học sinh chuyển lên đăng nhập bằng PIN cũ (được nhắc đổi PIN)");
  ok(be.T.student_pins.find((p) => p.profile_id === bongId).pin_hash.startsWith("pbkdf2v2w$"), "đăng nhập đúng: PIN đổi sang dạng băm mới (đánh dấu PIN cũ)");
  await throwsMsg(() => P.Store.migrate(loc), /Chỉ quản trị/, "phụ huynh không chuyển dữ liệu được");
  await throwsMsg(() => A.Store.importJSON("không phải json"), /JSON/, "file sao lưu hỏng");
  const exp = JSON.parse(A.Store.exportJSON());
  ok(exp.users.length === A.Store.users().length && !JSON.stringify(exp).includes("inviteCode") && exp.events.length > 0, "tải file sao lưu từ đám mây");
}

/* ---------- 9. mã mời, mã gia đình, đăng xuất con ---------- */
let nc;
{
  const KX = browser(); await KX.Store.init(); await KX.Store.studentLogin(code, na.id, "730418");
  const old = A.Store.familyCode();
  nc = await A.Store.newJoinCode();
  ok(nc !== old && fam().join_code === nc, "đổi mã gia đình");
  await KX.Store.refresh();
  ok(KX.Store.authState() === "signed-out", "đổi mã gia đình: máy học sinh bị đăng xuất");
  await throwsMsg(() => K.Store.familyStudents(old), /Mã gia đình chưa đúng/, "mã gia đình cũ không dùng được nữa");
  const KY = browser(); await KY.Store.init(); await KY.Store.studentLogin(nc, na.id, "730418");
  ok((await A.Store.signOutChild(na.id)) >= 1, "quản trị đăng xuất con khỏi mọi máy");
  await KY.Store.refresh();
  ok(KY.Store.authState() === "signed-out", "máy của con mất đăng nhập ngay");
  const inv = await A.Store.newInvite(mom.id);
  ok(/^[A-Z0-9]{12}$/.test(inv) && A.Store.user(mom.id).linked === false, "gỡ email phụ huynh, tạo mã mời mới");
  await P.Store.refresh().catch(() => {});
  ok(P.Store.authState() !== "ready", "phụ huynh bị gỡ email thì mất quyền");
}

/* ---------- 10. mất mạng khi ghi ---------- */
be.failWrites = 1;
A.Store.setSettings({ schoolName: "Không lưu được" });
await A.Store.flush();
ok(A.errors.some((m) => /Mất kết nối mạng/.test(m)), "mất mạng khi ghi: báo lỗi cho người dùng");
await new Promise((res) => setTimeout(res, 400));
ok(A.Store.settings().schoolName !== "Không lưu được", "sau lỗi, bộ nhớ đệm khớp lại máy chủ");

/* ---------- 11. giới hạn kết quả ---------- */
{
  const KB = browser();
  await KB.Store.init();
  await KB.Store.studentLogin(nc, na.id, "730418");
  be.rateLimit = false;
  var binBefore = be.T.results.filter((x) => x.profile_id === bin.id).length;
  for (let i = 0; i < 2003; i++) {
    KB.Store.addResult({ userId: na.id, source: "bank", refId: "x", label: "Lần " + i, r: 1, t: 2 });
    if (i % 300 === 299) await KB.Store.flush(); // hộp gửi giữ tối đa 500 kết quả chưa gửi
  }
  ok(KB.Store.resultsFor(na.id).length === 2000, "bộ nhớ đệm giữ tối đa 2000 kết quả mỗi học sinh");
  await KB.Store.flush();
  ok(be.T.results.filter((x) => x.profile_id === na.id).length === 2000 && be.T.results.filter((x) => x.profile_id === bin.id).length === binBefore,
    "máy chủ giữ tối đa 2000 kết quả mỗi học sinh, kết quả của anh chị em còn nguyên");
  be.rateLimit = true;
  for (let i = 0; i < 61; i++) KB.Store.addResult({ userId: na.id, source: "bank", refId: "y", r: 1, t: 2 });
  await KB.Store.flush();
  const left = JSON.parse(KB.localStorage.getItem("ontap_cloud_outbox") || "{}")[na.id] || [];
  ok(left.length >= 1 && KB.errors.some((m) => /Gửi quá nhiều/.test(m)), "quá giới hạn tốc độ: kết quả chờ trong hộp gửi, không mất");
}

/* ---------- 12. tấn công thẳng vào Edge Function ---------- */
{
  const call = async (body, token, headers) => {
    const res = await handler(new Request("http://fake/functions/v1/student-login", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body),
      headers: Object.assign({ "content-type": "application/json", authorization: "Bearer " + (token || "anon-key") }, headers || {}) }));
    return { status: res.status, body: await res.json() };
  };
  const tok = (b) => JSON.parse(b.sessionStorage.getItem("ontap_sb_auth") || b.localStorage.getItem("ontap_sb_auth")).access_token;
  const anon = async () => (await be.handle({ kind: "auth", op: "anon", args: {} })).session.access_token;
  const c = fam().join_code;
  // một gia đình khác
  const B = browser(); await B.Store.init(); await emailLogin(B, "co.lan@example.com");
  await B.Store.createFamily({ name: "Cô Lan" });
  const ti = await B.Store.createUser({ role: "student", name: "Tí", pin: "385920", grade: 4 });

  ok((await call({ action: "login", code: c, studentId: bin.id, pin: "614073" }, tok(A))).body.error === "auth", "đăng nhập học sinh bằng phiên email bị từ chối");
  ok((await call({ action: "login", code: c, studentId: bin.id, pin: "614073" })).status === 401, "đăng nhập học sinh không có phiên bị từ chối");
  ok((await call({ action: "students", code: c })).status === 401, "tra mã gia đình không có phiên bị từ chối");
  ok((await call({ action: "login", code: c, studentId: ti.id, pin: "385920" }, await anon())).body.error === "wrong", "dùng mã gia đình này để đăng nhập học sinh nhà khác: bị từ chối");
  ok((await call({ action: "set_pin", studentId: ti.id, pin: "583920" }, tok(A))).body.error === "forbidden", "quản trị nhà khác đặt PIN cho Tí: bị chặn");
  ok((await call({ action: "set_pin", studentId: na.id, pin: "583920" }, tok(B))).body.error === "forbidden", "quản trị B đặt PIN cho học sinh nhà A: bị chặn");
  const P2 = browser(); await P2.Store.init(); await emailLogin(P2, "me.bin@example.com");
  await P2.Store.claimInvite(A.Store.user(mom.id).inviteCode);
  ok((await call({ action: "set_pin", studentId: na.id, pin: "583920" }, tok(P2))).body.error === "forbidden", "phụ huynh đặt PIN cho học sinh không phải con mình: bị chặn");
  ok((await call({ action: "check_pin", pin: "614073" }, tok(P2))).body.error === "forbidden", "phụ huynh dò PIN qua check_pin: bị chặn");
  const KS = browser(); await KS.Store.init(); await KS.Store.studentLogin(c, bin.id, "614073");
  ok((await call({ action: "set_pin", studentId: na.id, pin: "583920" }, tok(KS))).body.error === "forbidden", "học sinh đặt PIN cho bạn: bị chặn");
  ok((await call({ action: "set_pin", studentId: bin.id, pin: "583920", oldPin: "000000" }, tok(KS))).body.error === "wrong", "học sinh đổi PIN mà không biết PIN cũ: bị chặn");
  ok((await call({ action: "set_pin", studentId: bin.id, pin: "abc" }, tok(A))).body.error === "pin" && (await call({ action: "set_pin", studentId: bin.id, pin: "654321" }, tok(A))).body.error === "weak",
    "PIN mới sai dạng hoặc dễ đoán bị từ chối ở máy chủ");
  ok((await call({ action: "wrap_legacy" }, tok(P2))).body.error === "forbidden", "phụ huynh không gọi được wrap_legacy");
  const a0 = await anon();
  ok((await call({ action: "students", code: "' or 1=1 --" }, a0)).body.error === "code", "mã gia đình lạ không lộ dữ liệu");
  ok((await call({ action: "nope" }, a0)).status === 400 && (await call("rác")).status === 400, "yêu cầu lạ bị từ chối");
  {
    const weak = createHandler({ db: service, getUser: be.getUser, pepper: "ngan", iter: 1000 });
    const res = await weak(new Request("http://fake/x", { method: "POST", body: JSON.stringify({ action: "students", code: c }), headers: { authorization: "Bearer " + a0 } }));
    ok(res.status === 500 && (await res.json()).error === "server", "thiếu PIN_PEPPER đủ dài: hàm từ chối mọi yêu cầu");
  }

  // (a) gửi dồn dập cùng lúc từ một người gọi: chỉ 5 lần được kiểm tra
  be.clock += 3 * 3600e3;
  const a1 = await anon();
  const burst = await Promise.all(Array.from({ length: 30 }, (_, i) => call({ action: "login", code: c, studentId: na.id, pin: String(100000 + i) }, a1)));
  const checked = burst.filter((x) => x.body.error === "wrong").length;
  ok(checked === 5 && burst.every((x) => x.body.error === "wrong" || x.body.error === "locked"), `gửi 30 PIN cùng lúc: chỉ ${checked} lần được thử`);

  // (b) người gọi bị khóa theo bộ đếm của chính mình khi dò nhiều học sinh
  be.clock += 3 * 3600e3;
  const a2 = await anon();
  const kids = [bin.id, na.id, cun.id];
  let callerLocked = null;
  for (let i = 0; i < 12; i++) {
    const x = await call({ action: "login", code: c, studentId: kids[i % 3], pin: String(200000 + i) }, a2);
    if (x.body.error === "locked" && callerLocked == null) callerLocked = i;
  }
  ok(callerLocked === 10, "dò nhiều học sinh từ một máy: sau 10 lần sai máy đó bị khóa (" + callerLocked + ")");
  ok((await call({ action: "login", code: c, studentId: cun.id, pin: "590373" }, await anon())).body.ok, "máy khác vẫn đăng nhập đúng cho con bình thường");

  // (c) trần cứng: kẻ dò đổi máy liên tục và chờ hết hạn khóa vẫn không quá 15 lần sai rồi bị khóa hẳn
  be.clock += 25 * 3600e3; // sang ngày mới để tách khỏi trần trong ngày
  KNA = browser(); await KNA.Store.init();
  ok((await KNA.Store.studentLogin(fam().join_code, na.id, "730418")).ok, "máy của Na đăng nhập đúng (thành máy quen)");
  KNA.Store.setSession(null); await KNA.Store.flush();
  let wrong = 0, hard = null;
  for (let i = 0; i < 40 && hard == null; i++) {
    if (i % 5 === 0) be.clock += 2 * 3600e3; // đợi hết khóa tạm
    const x = await call({ action: "login", code: c, studentId: na.id, pin: String(300000 + i) }, await anon());
    if (x.body.error === "wrong") wrong++;
    if (x.body.reset) hard = i;
  }
  ok(wrong === 15 && hard != null, `dò PIN kiên nhẫn: chỉ ${wrong} lần sai rồi PIN bị khóa hẳn, đợi cũng không mở`);
  be.clock += 2 * 3600e3;
  ok((await call({ action: "login", code: c, studentId: na.id, pin: "730418" }, await anon())).body.reset === true, "khóa hẳn: máy lạ nhập đúng PIN cũng không vào");
  // máy quen của con vẫn đăng nhập được (người lạ không khóa được máy của con) — KNA đã đăng nhập đúng trước đó
  ok((await KB_login(na.id, "730418")).ok, "máy quen của con vẫn đăng nhập được khi máy lạ đã bị khóa");
  await A.Store.refresh();
  ok(A.Store.user(na.id).pinLocked === true, "quản trị thấy PIN của con bị khóa");
  await A.Store.updateUser(na.id, { pin: "730592" });
  ok((await call({ action: "login", code: c, studentId: na.id, pin: "730592" }, await anon())).body.ok && A.Store.user(na.id).pinLocked === false, "người lớn đặt lại PIN thì mở khóa");

  // (R3) kẻ lạ làm khóa cả gia đình: máy quen của con vẫn đăng nhập được
  be.clock += 25 * 3600e3;
  const KC = browser(); await KC.Store.init();
  ok((await KC.Store.studentLogin(fam().join_code, cun.id, "590373")).ok, "máy của Cún đăng nhập đúng (thành máy quen)");
  KC.Store.setSession(null); await KC.Store.flush();
  let famLocked = false;
  for (let i = 0; i < 40; i++) {
    const x = await call({ action: "login", code: fam().join_code, studentId: i % 2 ? bin.id : cun.id, pin: String(500000 + i) }, await anon());
    if (x.body.error === "locked" && !x.body.reset) famLocked = true;
  }
  ok(famLocked, "kẻ lạ dò 30+ lần trong gia đình: bộ đếm gia đình khóa máy lạ");
  ok((await KC.Store.studentLogin(fam().join_code, cun.id, "590373")).ok, "máy quen của con vẫn đăng nhập được khi cả gia đình đang bị khóa với máy lạ");
  {
    const k1 = await anon(), r1 = await call({ action: "login", code: "ZZZZZZ", studentId: cun.id, pin: "590373" }, k1);
    const r2 = await call({ action: "login", code: fam().join_code, studentId: ti.id, pin: "385920" }, k1);
    ok(r1.body.error === "wrong" && r2.body.error === "wrong", "đăng nhập: mã sai và học sinh nhà khác trả cùng một câu, không đoán được mã đúng");
  }

  // (d) trần trong ngày: con đăng nhập đúng xen giữa cũng không cho kẻ dò quá 20 lần sai một ngày
  be.clock += 2 * 864e5;
  wrong = 0; hard = null;
  for (let i = 0; i < 60 && hard == null; i++) {
    if (i % 5 === 0) { be.clock += 2 * 3600e3; await call({ action: "login", code: c, studentId: cun.id, pin: "590373" }, await anon()); }
    const x = await call({ action: "login", code: c, studentId: cun.id, pin: String(400000 + i) }, await anon());
    if (x.body.error === "wrong") wrong++;
    if (x.body.reset) hard = i;
  }
  ok(wrong <= 20 && hard != null, `con đăng nhập đúng xen giữa: kẻ dò vẫn chỉ được ${wrong} lần sai trong ngày`);

  // (e) dò mã gia đình: khóa theo người gọi, và theo IP khi có cf-connecting-ip
  const a3 = await anon();
  let last;
  for (let i = 0; i < 11; i++) last = await call({ action: "students", code: "ABCDE" + i }, a3);
  ok(last.body.error === "locked", "dò mã gia đình 10 lần sai: người gọi bị khóa");
  for (let i = 0; i < 51; i++) last = await call({ action: "students", code: "QWERT" + (i % 10) + String.fromCharCode(65 + (i % 26)) }, await anon(), { "cf-connecting-ip": "192.0.2.50" });
  ok(last.body.error === "locked", "đổi phiên liên tục từ một IP: sau 50 lần sai bị khóa theo IP");
  {
    // máy quen của học sinh dùng chung IP với kẻ dò (ví dụ Wi-Fi trường) vẫn tra được mã đúng
    const r2 = await handler(new Request("http://fake/x", { method: "POST", body: JSON.stringify({ action: "students", code: fam().join_code, device: KC.localStorage.getItem("ontap_device") }),
      headers: { authorization: "Bearer " + (await anon()), "cf-connecting-ip": "192.0.2.50" } }));
    const j2 = await r2.json();
    ok((j2.students || []).length > 0, "máy quen dùng chung IP đang bị khóa vẫn tra được mã đúng");
  }
  ok(/^ip:[0-9a-f]{32}$/.test(be.T.login_attempts.find((a) => a.key.startsWith("ip:")).key), "IPv6/IPv4 được băm trước khi lưu");
  ok((await call({ action: "students", code: c }, await anon(), { "cf-connecting-ip": "192.0.2.51" })).body.students.length > 0, "IP khác vẫn tra được mã đúng");
  ok(!be.T.login_attempts.some((a) => a.key.includes("192.0.2")), "không lưu IP gốc (chỉ lưu dạng băm)");

  // dạng băm
  const h = await hashPin("583920", "p".repeat(32));
  ok(h.startsWith("pbkdf2v2$" + ITER + "$") && ITER >= 600000 && await verifyPin("583920", h, "p".repeat(32)) && !(await verifyPin("583920", h, "q".repeat(32))), "PBKDF2 600000 vòng, có muối và pepper");
  ok(pinProblem("111111") && pinProblem("123456") && pinProblem("987654") && pinProblem("121212") && pinProblem("201512") && pinProblem("1234") && !pinProblem("583920"), "danh sách PIN dễ đoán");
}
async function KB_login(id, pin) { return KNA.Store.studentLogin(fam().join_code, id, pin); }
var KNA;

/* ---------- 13. đăng nhập ẩn danh chưa bật ---------- */
be.anonEnabled = false;
{
  const KX = browser(); await KX.Store.init();
  await throwsMsg(() => KX.Store.studentLogin(fam().join_code, na.id, "730418"), /Anonymous sign-ins/, "chưa bật Anonymous sign-ins: báo rõ cho người dùng");
}
be.anonEnabled = true;

/* ---------- 14. link đăng nhập lỗi ---------- */
{
  const E = browser({ hash: "#error=access_denied&error_code=otp_expired&error_description=<b>Bấm+vào+đây</b>" });
  await E.Store.init();
  const m = E.Store.authError();
  ok(/hết hạn/.test(m) && !/Bấm|<b>/.test(m) && E.win.location.hash === "" && E.Store.authError() === "", "link email lỗi: báo câu cố định, không in lại chữ trong địa chỉ");
}

/* ---------- 15. xóa toàn bộ dữ liệu trên đám mây ---------- */
{
  const before = be.T.families.length, fid = FAM_A;
  await A.Store.wipe();
  ok(be.T.families.length === before - 1 && !be.T.profiles.some((p) => p.family_id === fid) && !be.T.results.some((x) => x.family_id === fid) && A.Store.authState() === "signed-out",
    "quản trị xóa toàn bộ dữ liệu gia đình trên máy chủ");
}

console.log(`\n${passed} kiểm tra đạt, ${failures.length} lỗi`);
if (failures.length) { console.log("SUPABASE STORE FAILED"); process.exit(1); }
console.log("SUPABASE STORE OK");
