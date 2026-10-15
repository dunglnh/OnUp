/* Kiểm thử SupabaseStore (js/store-supabase.js) và Edge Function student-login trên máy chủ Supabase giả trong bộ nhớ.
   Không cần mạng, không cần project Supabase. Chạy: node tests/supabase/store-test.mjs
   - So giao diện với LocalStore (js/store.js): đủ mọi hàm, cùng kiểu đồng bộ/async.
   - Chạy các luồng: quản trị tạo gia đình, phụ huynh nhận mã mời, học sinh đăng nhập bằng mã gia đình + PIN,
     ghi kết quả, chuyển dữ liệu cục bộ lên, gắn đề có sẵn mới, giới hạn 5000 kết quả, báo lỗi khi mất mạng.
   - Đóng vai người tấn công gọi thẳng Edge Function. */
import vm from "node:vm";
import fs from "node:fs";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";

const require = createRequire(import.meta.url);
const { createBackend } = require("./fake-backend.js");
const { createFakeSupabase } = require("./fake-client.js");
const { loadEdgeFunction } = await import("./load-edge.mjs");
const { createHandler, verifyPin, hashPin } = await loadEdgeFunction();
const ROOT = new URL("../../", import.meta.url).pathname;

let passed = 0;
const failures = [];
function ok(cond, msg) { if (cond) { passed++; console.log("ok  " + msg); } else { failures.push(msg); console.log("FAIL " + msg); } }
async function throwsMsg(fn, re, msg) {
  try { await fn(); ok(false, msg + " (không báo lỗi)"); } catch (e) { ok(re.test(e.message), msg + " → " + e.message); }
}

const be = createBackend();
const service = createFakeSupabase((m) => be.handle(m), { service: true });
const handler = createHandler({ db: service, getUser: be.getUser, pepper: "test-pepper" });
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
async function emailLogin(b, email) {
  await b.Store.sendLink(email);
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
await emailLogin(A, "bo.minh@example.com");
ok(A.Store.authState() === "no-profile", "đăng nhập email lần đầu: chưa thuộc gia đình nào");
await throwsMsg(() => A.Store.claimInvite("AAAA-BBBB-CCCC"), /Mã mời không đúng/, "mã mời sai");
await A.Store.createFamily({ schoolName: "Nhà Bin", name: "Bố Minh", avatar: "🧭" });
FAM_A = fam().id;
ok(A.Store.authState() === "ready" && A.Store.isReady() && A.Store.sessionUser().role === "admin" && A.Store.sessionUser().name === "Bố Minh", "tạo gia đình: thành quản trị");
ok(A.Store.events().length === A.win.ONTAP_SEED_EVENTS.length && JSON.stringify(A.Store.event("ck1-l4").banks) === JSON.stringify(A.win.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l4").banks),
  "lịch thi mặc định được chép lên máy chủ");
ok(/^[A-Z0-9]{6}$/.test(A.Store.familyCode()) && A.Store.settings().schoolName === "Nhà Bin", "có mã gia đình 6 kí tự và tên gia đình");
ok(A.Store.banks().filter((b) => b.seed).length === A.win.ONTAP_SEED_BANKS.length && be.T.question_banks.length === 0, "ngân hàng có sẵn không lưu lên máy chủ");

const mom = await A.Store.createUser({ role: "parent", name: "Mẹ Bin", avatar: "🌻" });
ok(/^[A-Z0-9]{12}$/.test(mom.inviteCode || "") && mom.linked === false, "tạo phụ huynh: có mã mời 12 kí tự, không cần PIN");
const bin = await A.Store.createUser({ role: "student", name: "Bin", pin: "1111", grade: 4, className: "4A", parentIds: [mom.id] });
const na = await A.Store.createUser({ role: "student", name: "Na", pin: "3333", grade: 6 });
ok(A.Store.childrenOf(mom.id).map((c) => c.name).join() === "Bin" && bin.className === "4A", "tạo học sinh, gắn phụ huynh");
ok(be.T.student_pins.length === 2 && be.T.student_pins.every((p) => p.pin_hash.startsWith("pbkdf2$150000$") && !p.pin_hash.includes("1111")), "PIN được băm PBKDF2 ở Edge Function");
ok(!JSON.stringify(A.Store.data()).includes("pbkdf2") && !("pinHash" in bin) && !("salt" in bin), "trình duyệt không nhận được PIN hay mã băm");
await throwsMsg(() => A.Store.createUser({ role: "student", name: "X", pin: "12", grade: 4 }), /4 đến 6 chữ số/, "PIN quá ngắn");
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
  const A2 = browser({ local: A.localStorage }); // tab mới cùng máy
  await A2.Store.init();
  const pick = (S) => JSON.stringify({ e: S.events(), b: S.banks(), u: S.users().map((u) => [u.id, u.name, u.role, u.grade || 0, (u.parentIds || []).join()]), s: [S.settings().schoolName, S.settings().schoolYear] });
  ok(A2.Store.authState() === "ready" && pick(A2.Store) === pick(A.Store), "tab mới tải lại từ máy chủ: dữ liệu khớp bộ nhớ đệm");
  ok(A2.Store.event(ev.id).title === "Thi thử Toán (sửa)" && !A2.Store.event(ev2.id) && A2.Store.event(ev.id).banks[0] === bk.id, "sửa, xóa kì thi được lưu");
  A2.Store.removeBank(bk.id);
  await A2.Store.flush();
  ok(!be.T.question_banks.length && be.T.exam_events.find((e) => e.id === ev.id).banks.length === 0, "xóa ngân hàng thì bỏ gắn khỏi kì thi trên máy chủ");
  await A.Store.refresh();
}

/* ---------- 5. phụ huynh nhận mã mời ---------- */
const P = browser();
await P.Store.init();
await emailLogin(P, "me.bin@example.com");
await P.Store.claimInvite(" " + mom.inviteCode.toLowerCase().match(/.{4}/g).join("-") + " ");
ok(P.Store.authState() === "ready" && P.Store.sessionUser().id === mom.id, "phụ huynh nhận mã mời (gõ thường, có gạch nối)");
ok(P.Store.users().map((u) => u.name).sort().join() === "Bin,Mẹ Bin" && P.Store.user(na.id) === null, "phụ huynh chỉ thấy mình và con mình");
ok(P.Store.childrenOf(mom.id).length === 1 && P.Store.familyCode() === A.Store.familyCode(), "phụ huynh thấy con và mã gia đình");
const cun = await P.Store.createUser({ role: "student", name: "Cún", pin: "7777", grade: 4, avatar: "🐶" });
ok(P.Store.childrenOf(mom.id).length === 2 && cun.parentIds[0] === mom.id, "phụ huynh tự thêm con (add_child + PIN)");
await P.Store.updateUser(cun.id, { name: "Cún Con", pin: "7778" });
ok(be.T.profiles.find((p) => p.id === cun.id).name === "Cún Con", "phụ huynh sửa hồ sơ và PIN của con");
await throwsMsg(() => P.Store.updateUser(bin.id, { parentIds: [] }), /Chỉ quản trị/, "phụ huynh không tự gỡ quan hệ phụ huynh–con");

/* ---------- 6. học sinh đăng nhập bằng mã gia đình + PIN ---------- */
const K = browser();
await K.Store.init();
const code = A.Store.familyCode();
await throwsMsg(() => K.Store.familyStudents("ZZZZZZ"), /Mã gia đình chưa đúng/, "mã gia đình sai");
const list = await K.Store.familyStudents(code.toLowerCase());
ok(list.students.map((s) => s.name).sort().join() === "Bin,Cún Con,Na" && list.family === "Nhà Bin & Na" && !JSON.stringify(list).includes("Mẹ"), "tra mã gia đình: chỉ hiện tên học sinh");
let r;
for (let i = 0; i < 5; i++) r = await K.Store.studentLogin(code, bin.id, "9999");
ok(!r.ok && /PIN chưa đúng/.test(r.message), "PIN sai");
r = await K.Store.studentLogin(code, bin.id, "1111");
ok(!r.ok && r.locked && /Đợi 30 giây/.test(r.message), "sai 5 lần: phải đợi 30 giây, PIN đúng cũng chưa vào được");
be.clock += 31000;
r = await K.Store.studentLogin(code, bin.id, "1111");
ok(r.ok && K.Store.authState() === "ready" && K.Store.sessionUser().id === bin.id, "đợi xong, PIN đúng thì vào được");
ok(K.Store.users().length === 1 && K.Store.events().length > 0 && K.Store.lastUserId() === bin.id && K.Store.lastFamilyCode() === code, "học sinh chỉ thấy hồ sơ của mình và lịch thi");
const res1 = K.Store.addResult({ userId: bin.id, source: "bank", refId: "mau-toan4-ck1", subject: "Toán", label: "Toán 4", mode: "practice", r: 8, t: 10, s: 300, wrongTopics: ["Phân số"] });
ok(K.Store.resultsFor(bin.id)[0].id === res1.id, "kết quả hiện ngay trong bộ nhớ đệm");
await K.Store.flush();
ok(be.T.results.length === 1 && be.T.results[0].family_id === fam().id && be.T.results[0].wrong_topics[0] === "Phân số", "kết quả được lưu lên máy chủ");
K.Store.addResult({ userId: na.id, source: "bank", refId: "x", r: 1, t: 1 }); // giả mạo: ghi cho bạn khác
await K.Store.flush();
ok(be.T.results.length === 1 && K.errors.length === 1, "ghi kết quả cho người khác bị chặn và báo lỗi: " + K.errors[0]);
await new Promise((res) => setTimeout(res, 400)); // tải lại sau lỗi
ok(K.Store.resultsFor(na.id).length === 0, "sau lỗi, bộ nhớ đệm được tải lại theo máy chủ");
ok((await K.Store.checkPin(bin.id, "1111")) === true && (await K.Store.checkPin(bin.id, "0000")) === false, "học sinh kiểm tra PIN của mình");
await throwsMsg(() => K.Store.updateUser(bin.id, { pin: "2222", oldPin: "0000" }), /PIN hiện tại chưa đúng/, "đổi PIN cần PIN cũ đúng");
await K.Store.updateUser(bin.id, { pin: "2222", oldPin: "1111", avatar: "🦊" });
ok(be.T.profiles.find((p) => p.id === bin.id).avatar === "🦊", "học sinh đổi hình đại diện và PIN");

await P.Store.refresh();
ok(P.Store.resultsFor(bin.id).length === 1, "phụ huynh thấy kết quả mới của con sau khi tải lại");

// đăng xuất, mở lại trình duyệt
const anonId = be.T.student_sessions[0].auth_user_id;
K.Store.setSession(null);
ok(K.Store.authState() === "signed-out" && K.Store.sessionUser() === null, "học sinh đăng xuất");
await K.Store.flush();
ok(be.T.student_sessions.length === 0, "đăng xuất: gỡ gắn phiên học sinh trên máy chủ");
r = await K.Store.studentLogin(code, bin.id, "2222");
ok(r.ok && be.T.student_sessions[0].auth_user_id === anonId, "đăng nhập lại bằng PIN mới, dùng lại người dùng ẩn danh cũ");
{
  const K2 = browser({ local: K.localStorage }); // đóng trình duyệt rồi mở lại: sessionStorage mất
  await K2.Store.init();
  ok(K2.Store.authState() === "signed-out" && be.T.student_sessions.length === 0, "mở lại trình duyệt: học sinh phải nhập lại PIN (như bản cục bộ)");
}

/* ---------- 7. đề có sẵn mới được gắn vào kì thi trên máy chủ ---------- */
{
  const se = A.win.ONTAP_SEED_EVENTS.find((e) => (e.banks || []).length);
  const newId = se.banks[0];
  const f = fam(), row = be.T.exam_events.find((e) => e.family_id === f.id && e.id === se.id);
  f.seed_banks_seen = f.seed_banks_seen.filter((x) => x !== newId); row.banks = row.banks.filter((x) => x !== newId); // như máy chủ trước khi có đề mới
  await P.Store.refresh();
  ok(P.Store.event(se.id).banks.includes(newId) && !row.banks.includes(newId), "phụ huynh thấy đề mới trong bộ nhớ đệm (chỉ quản trị ghi lên máy chủ)");
  await A.Store.refresh(); await A.Store.flush();
  ok(row.banks[0] === newId && f.seed_banks_seen.includes(newId), "quản trị mở app: đề mới được gắn vào kì thi trên máy chủ");
  A.Store.upsertEvent(Object.assign({}, A.Store.event(se.id), { banks: A.Store.event(se.id).banks.filter((x) => x !== newId) }));
  await A.Store.refresh(); await A.Store.flush();
  ok(!A.Store.event(se.id).banks.includes(newId) && !row.banks.includes(newId), "đề quản trị đã bỏ gắn thì không gắn lại");
  A.Store.resetEvents(); await A.Store.flush();
  ok(be.T.exam_events.filter((e) => e.family_id === f.id).length === A.win.ONTAP_SEED_EVENTS.length && row !== be.T.exam_events.find((e) => e.id === se.id) &&
     be.T.exam_events.find((e) => e.family_id === f.id && e.id === se.id).banks.includes(newId), "khôi phục lịch mặc định trên máy chủ");
}

/* ---------- 8. chuyển dữ liệu máy cũ lên ---------- */
{
  const M = browser({ realConfig: true }); // máy cũ: bản cục bộ
  const L = M.Store;
  L.setup({ schoolName: "Nhà cũ" });
  await L.createUser({ role: "admin", name: "Bố Minh", pin: "1234" });
  const ba = await L.createUser({ role: "parent", name: "Bà ngoại", pin: "5555" });
  const bong = await L.createUser({ role: "student", name: "Bông", pin: "4321", grade: 6, className: "6A", parentIds: [ba.id] });
  L.addResult({ userId: bong.id, source: "module", refId: "l6-giua-ki-1", subject: "Toán", label: "Đề 1", mode: "exam", r: 15, t: 20, s: 900 });
  L.upsertBank({ title: "Văn 6 tự nhập", grade: 6, subject: "Ngữ văn", questions: [{ type: "tf", q: "x", a: true }] });
  A.localStorage.setItem("ontap_db_v1", M.localStorage.getItem("ontap_db_v1")); // dữ liệu cũ nằm trên máy quản trị
  const loc = A.Store.localData();
  ok(loc && loc.users.length === 3, "nhận ra dữ liệu cũ trên máy này");
  const out = await A.Store.migrate(loc);
  ok(out.users === 2 && out.results === 1, `chuyển lên: ${out.users} tài khoản mới, ${out.results} kết quả (quản trị trùng tên được gộp)`);
  ok(out.invites.some((i) => i.name === "Bà ngoại" && /^[A-Z0-9]{12}$/.test(i.code)), "phụ huynh cũ nhận mã mời");
  ok(A.Store.users("student").some((u) => u.name === "Bông" && u.className === "6A") && A.Store.banks().some((b) => b.title === "Văn 6 tự nhập"), "bộ nhớ đệm có dữ liệu vừa chuyển");
  ok(A.Store.migratedAt() && A.Store.resultsFor(A.Store.users("student").find((u) => u.name === "Bông").id)[0].at === M.Store.data().results[0].at, "giữ thời điểm làm bài cũ");
  const again = await A.Store.migrate(A.Store.localData());
  ok(again.users === 0 && again.results === 0 && A.Store.users("student").filter((u) => u.name === "Bông").length === 1, "chuyển lại lần hai không bị trùng");
  const bongId = A.Store.users("student").find((u) => u.name === "Bông").id;
  ok(be.T.student_pins.find((p) => p.profile_id === bongId).pin_hash.startsWith("legacy$"), "PIN cũ giữ dạng băm cũ");
  const KB = browser();
  await KB.Store.init();
  ok((await KB.Store.studentLogin(code, bongId, "1111")).ok === false, "PIN sai với dạng băm cũ bị từ chối");
  ok((await KB.Store.studentLogin(code, bongId, "4321")).ok === true, "học sinh chuyển lên đăng nhập bằng PIN cũ");
  ok(be.T.student_pins.find((p) => p.profile_id === bongId).pin_hash.startsWith("pbkdf2$"), "đăng nhập đúng: PIN đổi sang PBKDF2");
  await throwsMsg(() => P.Store.migrate(loc), /Chỉ quản trị/, "phụ huynh không chuyển dữ liệu được");
  await throwsMsg(() => A.Store.importJSON("không phải json"), /JSON/, "file sao lưu hỏng");
  const exp = JSON.parse(A.Store.exportJSON());
  ok(exp.users.length === A.Store.users().length && !JSON.stringify(exp).includes("inviteCode") && exp.events.length > 0, "tải file sao lưu từ đám mây");
}

/* ---------- 9. mã mời, mã gia đình ---------- */
{
  const old = A.Store.familyCode(), nc = await A.Store.newJoinCode();
  ok(nc !== old && fam().join_code === nc, "đổi mã gia đình");
  await throwsMsg(() => K.Store.familyStudents(old), /Mã gia đình chưa đúng/, "mã gia đình cũ không dùng được nữa");
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

/* ---------- 11. tối đa 5000 kết quả ---------- */
{
  const KB = browser();
  await KB.Store.init();
  await KB.Store.studentLogin(nc_code(), na.id, "3333");
  for (let i = 0; i < 5003; i++) KB.Store.addResult({ userId: na.id, source: "bank", refId: "x", label: "Lần " + i, r: 1, t: 2 });
  ok(KB.Store.data().results.length === 5000, "bộ nhớ đệm giữ tối đa 5000 kết quả");
  await KB.Store.flush();
  const n = be.T.results.filter((x) => x.family_id === fam().id).length;
  ok(n === 5000 && KB.errors.length === 0, "máy chủ giữ tối đa 5000 kết quả mỗi gia đình (" + n + ")");
}
function nc_code() { return fam().join_code; }

/* ---------- 12. tấn công thẳng vào Edge Function ---------- */
{
  const call = async (body, token, ip) => {
    const res = await handler(new Request("http://fake/functions/v1/student-login", { method: "POST", body: JSON.stringify(body),
      headers: { "content-type": "application/json", authorization: "Bearer " + (token || "anon-key"), "x-forwarded-for": ip || "198.51.100.9" } }));
    return { status: res.status, body: await res.json() };
  };
  const tok = (b) => JSON.parse(b.localStorage.getItem("ontap_sb_auth")).access_token;
  const anon = (await be.handle({ kind: "auth", op: "anon", args: {} })).session.access_token;
  const c = fam().join_code;
  // một gia đình khác
  const B = browser(); await B.Store.init(); await emailLogin(B, "co.lan@example.com");
  await B.Store.createFamily({ name: "Cô Lan" });
  const ti = await B.Store.createUser({ role: "student", name: "Tí", pin: "1234", grade: 4 });

  ok((await call({ action: "login", code: c, studentId: bin.id, pin: "2222" }, tok(A))).body.error === "auth", "đăng nhập học sinh bằng phiên email bị từ chối");
  ok((await call({ action: "login", code: c, studentId: bin.id, pin: "2222" })).status === 401, "đăng nhập học sinh không có phiên bị từ chối");
  ok((await call({ action: "login", code: c, studentId: ti.id, pin: "1234" }, anon)).body.error === "wrong", "dùng mã gia đình này để đăng nhập học sinh nhà khác: bị từ chối");
  ok((await call({ action: "set_pin", studentId: ti.id, pin: "0000" }, tok(A))).body.error === "forbidden", "quản trị nhà khác đặt PIN cho Tí: bị chặn");
  ok((await call({ action: "set_pin", studentId: na.id, pin: "0000" }, tok(B))).body.error === "forbidden", "quản trị B đặt PIN cho học sinh nhà A: bị chặn");
  const P2 = browser(); await P2.Store.init(); await emailLogin(P2, "me.bin@example.com");
  await P2.Store.claimInvite(A.Store.user(mom.id).inviteCode);
  ok((await call({ action: "set_pin", studentId: na.id, pin: "0000" }, tok(P2))).body.error === "forbidden", "phụ huynh đặt PIN cho học sinh không phải con mình: bị chặn");
  ok((await call({ action: "check_pin", pin: "1111" }, tok(P2))).body.error === "forbidden", "phụ huynh dò PIN qua check_pin: bị chặn");
  const KS = browser(); await KS.Store.init(); await KS.Store.studentLogin(c, bin.id, "2222");
  ok((await call({ action: "set_pin", studentId: na.id, pin: "0000" }, tok(KS))).body.error === "forbidden", "học sinh đặt PIN cho bạn: bị chặn");
  ok((await call({ action: "set_pin", studentId: bin.id, pin: "0000", oldPin: "1111" }, tok(KS))).body.error === "wrong", "học sinh đổi PIN mà không biết PIN cũ: bị chặn");
  ok((await call({ action: "set_pin", studentId: bin.id, pin: "abc" }, tok(A))).body.error === "pin", "PIN không phải 4–6 chữ số bị từ chối");
  ok((await call({ action: "students", code: "' or 1=1 --" })).body.error === "code", "mã gia đình lạ không lộ dữ liệu");
  ok((await call({ action: "nope" })).status === 400 && (await call("rác")).status === 400, "yêu cầu lạ bị từ chối");

  // dò PIN dồn dập cùng lúc: chỉ 5 lần được kiểm tra
  be.clock += 3600 * 1000;
  const a2 = (await be.handle({ kind: "auth", op: "anon", args: {} })).session.access_token;
  const burst = await Promise.all(Array.from({ length: 30 }, (_, i) => call({ action: "login", code: c, studentId: na.id, pin: String(1000 + i) }, a2)));
  const checked = burst.filter((x) => x.body.error === "wrong").length, locked = burst.filter((x) => x.body.error === "locked").length;
  ok(checked === 5 && locked === 25, `gửi 30 PIN cùng lúc: chỉ ${checked} lần được thử, ${locked} lần bị khóa`);
  be.clock += 31000;
  for (let i = 0; i < 5; i++) await call({ action: "login", code: c, studentId: na.id, pin: "0000" }, a2);
  const w = (await call({ action: "login", code: c, studentId: na.id, pin: "3333" }, a2)).body;
  ok(w.error === "locked" && w.wait > 30 && w.wait <= 60, "lần khóa thứ hai dài hơn (" + w.wait + " giây)");

  // dò mã gia đình
  let last;
  for (let i = 0; i < 11; i++) last = await call({ action: "students", code: "ABCDE" + i }, null, "192.0.2.50");
  ok(last.body.error === "locked", "dò mã gia đình 10 lần sai: bị khóa theo địa chỉ IP");
  ok((await call({ action: "students", code: c }, null, "192.0.2.51")).body.students.length > 0, "máy khác vẫn tra được mã đúng");

  // dạng băm
  const h = await hashPin("4321", "p");
  ok(await verifyPin("4321", h, "p") && !(await verifyPin("4321", h, "khác")) && !(await verifyPin("1234", h, "p")), "PBKDF2 có muối và pepper");
}

/* ---------- 13. đăng nhập ẩn danh chưa bật ---------- */
be.anonEnabled = false;
{
  const KX = browser(); await KX.Store.init();
  await throwsMsg(() => KX.Store.studentLogin(fam().join_code, na.id, "3333"), /Anonymous sign-ins/, "chưa bật Anonymous sign-ins: báo rõ cho người dùng");
}
be.anonEnabled = true;

/* ---------- 14. link đăng nhập hết hạn ---------- */
{
  const E = browser({ hash: "#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired" });
  await E.Store.init();
  ok(/hết hạn/.test(E.Store.authError()) && E.win.location.hash === "" && E.Store.authError() === "", "link email hết hạn: báo lỗi một lần, xóa khỏi địa chỉ");
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
