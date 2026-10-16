/* Kiểm thử Edge Function admin (supabase/functions/admin/index.ts) trên máy chủ Supabase giả trong bộ nhớ, và so máy chủ
   giả với các quy tắc của supabase/schema.sql (RLS thật kiểm tra ở tests/supabase/run.sh). Không cần mạng.
   Chạy: node tests/supabase/admin-test.mjs   (in "ADMIN OK") */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createBackend } = require("./fake-backend.js");
const { createFakeSupabase } = require("./fake-client.js");
const { loadEdgeFunction } = await import("./load-edge.mjs");
const { createHandler, tempPassword, usernameProblem, loginEmail, LOGIN_DOMAIN, todayVN } = await loadEdgeFunction();

let passed = 0;
const failures = [];
function ok(cond, msg) { if (cond) { passed++; console.log("ok  " + msg); } else { failures.push(msg); console.log("FAIL " + msg); } }

const be = createBackend();
const service = createFakeSupabase((m) => be.handle(m), { service: true });
const handler = createHandler({ db: service, getUser: be.getUser, now: () => new Date(Date.now() + be.clock) });
be.functions.admin = handler;
const memStorage = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };
const client = () => createFakeSupabase((m) => be.handle(m), { storage: memStorage() });
const login = (c, username, password, captchaToken) => c.auth.signInWithPassword({ email: username + "@" + LOGIN_DOMAIN, password, options: { captchaToken } });
async function call(c, body) {
  const r = await c.functions.invoke("admin", { body });
  return r.error ? Object.assign({ status: r.error.context.status }, await r.error.context.json()) : Object.assign({ status: 200 }, r.data);
}
const raw = (init, body) => handler(new Request("http://fake/functions/v1/admin", Object.assign({ method: "POST", body }, init)));
const rows = async (q) => { const r = await q; return r.error ? { error: r.error.message } : r.data; };
const ymd = (days) => todayVN(new Date(Date.now() + be.clock + days * 864e5));

/* ---------- 1. hàm phụ ---------- */
ok(LOGIN_DOMAIN === "users.onup.invalid" && loginEmail("nha.bin") === "nha.bin@users.onup.invalid", "tên đăng nhập → email nội bộ @users.onup.invalid");
ok(["nha.bin", "bo_minh", "abcd", "a1b2c3d4e5f6g7h8i9j0"].every((u) => !usernameProblem(u))
  && ["abc", "a1b2c3d4e5f6g7h8i9j0k", "Nha.bin", ".abcd", "abcd.", "ab..cd", "nha bin", "nhà.bin", "a@bcd", "_abcd"].every((u) => usernameProblem(u)),
  "kiểm tra tên đăng nhập: 4–20 kí tự a-z 0-9 . _, đầu cuối là chữ hoặc số, không có ..");
{
  const pw = Array.from({ length: 200 }, () => tempPassword());
  ok(pw.every((p) => /^[a-hjkmnp-z2-9]{10}$/.test(p)) && new Set(pw).size === 200, "mật khẩu tạm: 10 kí tự, không có kí tự dễ nhầm (i l o 0 1), không trùng");
}
ok(todayVN(new Date("2026-10-16T16:59:00Z")) === "2026-10-16" && todayVN(new Date("2026-10-16T17:00:00Z")) === "2026-10-17", "ngày hôm nay theo giờ Việt Nam (UTC+7)");

/* ---------- 2. chủ app ---------- */
const OWNER_PW = "chu-app-mat-khau-rat-dai-2026";
const ownerUser = be.addUser("chu.app@" + LOGIN_DOMAIN, OWNER_PW);
be.T.app_owners.push({ user_id: ownerUser.id, created_at: new Date().toISOString() }); // như lệnh SQL trong hướng dẫn
const O = client();
ok(!(await login(O, "chu.app", OWNER_PW)).error, "chủ app đăng nhập bằng tên đăng nhập + mật khẩu");
ok((await rows(O.from("app_owners").select("user_id"))).length === 1 && (await O.rpc("is_owner")).data === true, "chủ app đọc được dòng app_owners của mình");

/* ---------- 3. yêu cầu sai, người gọi không phải owner ---------- */
{
  let r = await raw({ method: "OPTIONS" });
  ok(r.status === 200 && r.headers.get("access-control-allow-origin") === "*", "OPTIONS (CORS) trả 200");
  r = await raw({ method: "GET", body: undefined });
  ok(r.status === 405, "GET bị từ chối");
  r = await raw({}, "khong-phai-json");
  ok(r.status === 400 && (await r.json()).error === "bad_request", "thân yêu cầu không phải JSON");
  r = await raw({}, "[1,2]");
  ok(r.status === 400, "thân yêu cầu là mảng");
  r = await raw({}, JSON.stringify({ action: "list_accounts" }));
  ok(r.status === 401 && (await r.json()).error === "auth", "không có token: 401");
  r = await raw({ headers: { authorization: "Bearer tok-gia" } }, JSON.stringify({ action: "list_accounts" }));
  ok(r.status === 401, "token giả: 401");
  ok((await call(O, { action: "xoa_het" })).error === "bad_request" && (await call(O, { action: "constructor" })).error === "bad_request"
    && (await call(O, { action: "__proto__" })).error === "bad_request", "thao tác lạ (kể cả tên thuộc tính có sẵn của object) bị từ chối");
}

/* ---------- 4. tạo tài khoản ---------- */
let A; // {account, password}
{
  for (const u of ["ab", "nha..bin", "nha bin", "_nha", "nhà.bin", ""]) {
    const r = await call(O, { action: "create_account", username: u });
    if (r.error !== "username") ok(false, "tên đăng nhập sai: " + JSON.stringify(u) + " → " + JSON.stringify(r));
  }
  ok(true, "tên đăng nhập sai dạng bị từ chối (6 trường hợp)");
  ok((await call(O, { action: "create_account", username: "nha.ngan", password: "1234567" })).error === "password"
    && (await call(O, { action: "create_account", username: "nha.ngan", password: "x".repeat(73) })).error === "password"
    && (await call(O, { action: "create_account", username: "nha.ngan", password: "        " })).error === "password"
    && (await call(O, { action: "create_account", username: "nha.ngan", password: 12345678 })).error === "password", "mật khẩu ngắn, quá dài, toàn khoảng trắng, không phải chữ bị từ chối");
  ok(be.users.size === 1, "tạo hỏng thì không để lại người dùng Auth nào");
  A = await call(O, { action: "create_account", username: "  Nha.Bin ", display_name: "Nhà Bin", note: "Zalo: Mẹ Bin 09xx" });
  ok(A.status === 200 && A.account.username === "nha.bin" && /^[a-hjkmnp-z2-9]{10}$/.test(A.password), "tạo tài khoản: tên đăng nhập viết thường, mật khẩu tạm tự sinh");
  const u = [...be.users.values()].find((x) => x.email === "nha.bin@users.onup.invalid");
  ok(!!u && u.email_confirmed && u.user_metadata.username === "nha.bin", "người dùng Auth: email nội bộ, đã xác nhận sẵn (không gửi thư)");
  ok(A.account.plan === "free" && A.account.plan_until === null && !A.account.plan_active && A.account.status === "active"
    && A.account.must_change_password && A.account.children === 0 && A.account.note === "Zalo: Mẹ Bin 09xx" && A.account.display_name === "Nhà Bin",
    "tài khoản mới: gói free, đang hoạt động, bắt đổi mật khẩu, có ghi chú");
  const log = be.T.admin_log.find((l) => l.action === "create_account");
  ok(log && log.actor === ownerUser.id && log.username === "nha.bin" && !JSON.stringify(be.T.admin_log).includes(A.password), "ghi nhật ký admin, không ghi mật khẩu");
  const n = be.users.size;
  ok((await call(O, { action: "create_account", username: "nha.bin" })).error === "taken" && be.users.size === n, "tên đăng nhập trùng: taken, không tạo thêm người dùng Auth");
  be.addUser("nha.cu@" + LOGIN_DOMAIN, "mat-khau-cu-123"); // người dùng Auth có sẵn nhưng chưa có tài khoản
  ok((await call(O, { action: "create_account", username: "nha.cu" })).error === "taken", "email nội bộ đã có trong Auth: taken");
  be.failWrites = 1; // lần ghi bảng families bị lỗi
  const m = be.users.size, logErr = console.error;
  console.error = () => {}; // lỗi 500 này là cố ý
  const r500 = await call(O, { action: "create_account", username: "nha.loi" });
  console.error = logErr;
  ok(r500.status === 500 && be.users.size === m && !be.T.families.some((f) => f.username === "nha.loi"),
    "ghi families lỗi: xóa người dùng Auth vừa tạo, không để lại rác");
}

/* ---------- 5. phụ huynh đăng nhập, bắt đổi mật khẩu ---------- */
const PA = client();
{
  ok((await login(PA, "nha.bin", "sai-mat-khau")).error.code === "invalid_credentials", "sai mật khẩu: không đăng nhập được");
  ok(!(await login(PA, "nha.bin", A.password)).error, "phụ huynh đăng nhập bằng mật khẩu tạm");
  ok((await call(PA, { action: "list_accounts" })).error === "forbidden", "phụ huynh gọi Edge Function admin: 403");
  ok((await call(PA, { action: "set_plan", id: A.account.id, plan: "family", until: ymd(365) })).error === "forbidden", "phụ huynh tự nâng gói qua Edge Function: 403");
  const fam = (await rows(PA.from("families").select("*")))[0];
  ok(fam && fam.must_change_password === true, "app thấy cờ must_change_password");
  ok(!(await PA.auth.updateUser({ password: "mat-khau-moi-cua-me" })).error && !(await PA.rpc("password_changed")).error, "phụ huynh đặt mật khẩu mới");
  ok((await rows(PA.from("families").select("must_change_password")))[0].must_change_password === false, "đổi mật khẩu xong: bỏ cờ bắt đổi");
  ok((await login(client(), "nha.bin", A.password)).error && !(await login(client(), "nha.bin", "mat-khau-moi-cua-me")).error, "mật khẩu tạm hết dùng được, mật khẩu mới dùng được");
}

/* ---------- 6. đặt lại mật khẩu ---------- */
{
  ok((await call(O, { action: "reset_password", id: "khong-phai-uuid" })).error === "not_found"
    && (await call(O, { action: "reset_password", id: "00000000-0000-4000-8000-000000000000" })).status === 404, "đặt lại mật khẩu: mã tài khoản sai → 404");
  ok((await call(O, { action: "reset_password", id: A.account.id, password: "ngan" })).error === "password", "đặt lại mật khẩu quá ngắn bị từ chối");
  const r = await call(O, { action: "reset_password", id: A.account.id });
  ok(r.status === 200 && /^[a-hjkmnp-z2-9]{10}$/.test(r.password) && r.account.must_change_password, "đặt lại mật khẩu: mật khẩu tạm mới, bắt đổi lần sau");
  ok((await PA.auth.getUser()).error, "đặt lại mật khẩu: máy đang đăng nhập bị đăng xuất");
  ok((await login(client(), "nha.bin", "mat-khau-moi-cua-me")).error && !(await login(PA, "nha.bin", r.password)).error, "mật khẩu cũ hết dùng được, mật khẩu tạm mới dùng được");
  const r2 = await call(O, { action: "reset_password", id: A.account.id, password: "owner-dat-san-123" });
  ok(r2.password === "owner-dat-san-123" && !(await login(PA, "nha.bin", "owner-dat-san-123")).error, "chủ app tự đặt mật khẩu tạm");
  ok(be.T.admin_log.filter((l) => l.action === "reset_password").length === 2 && !JSON.stringify(be.T.admin_log).includes("owner-dat-san-123"), "nhật ký đặt lại mật khẩu, không có mật khẩu");
}

/* ---------- 7. hồ sơ con, kết quả (máy chủ giả theo đúng quy tắc của schema.sql) ---------- */
const kids = [];
{
  for (const [name, grade] of [["Bin", 4], ["Na", 6], ["Út", 1]]) {
    const r = await PA.from("profiles").insert({ name, grade }).select("*").single();
    kids.push(r.data);
  }
  ok(kids.every((k) => k && k.family_id === A.account.id && !k.locked), "phụ huynh thêm hồ sơ con (gia đình tự điền)");
  ok((await PA.from("profiles").insert({ name: "Lớp 13", grade: 13 })).error && (await PA.from("profiles").insert({ name: "X", grade: 4, locked: false })).error,
    "khối 13, tự đặt locked: bị chặn");
  ok(!(await PA.from("results").insert({ profile_id: kids[0].id, source: "bank", ref_id: "toan4-ck1-de1", r: 8, t: 10 })).error, "ghi kết quả cho con");
  ok((await PA.from("results").insert({ profile_id: kids[0].id, source: "bank", ref_id: "x", r: 1, t: 2, at: "2020-01-01" })).error, "tự đặt thời điểm làm bài: bị chặn");
  ok(!(await PA.rpc("touch")).error && be.T.families.find((f) => f.id === A.account.id).last_seen_at, "touch ghi lần dùng gần nhất");
}

/* ---------- 8. gói ---------- */
{
  const id = A.account.id;
  ok((await call(O, { action: "set_plan", id, plan: "vang" })).error === "plan", "gói không có trong bảng plans");
  ok((await call(O, { action: "set_plan", id, plan: "family" })).error === "date", "gói trả phí thiếu hạn");
  ok((await call(O, { action: "set_plan", id, plan: "family", until: ymd(-1) })).error === "date", "hạn trong quá khứ");
  ok((await call(O, { action: "set_plan", id, plan: "family", until: ymd(4 * 365) })).error === "date", "hạn quá 3 năm (gõ nhầm năm)");
  ok((await call(O, { action: "set_plan", id, plan: "family", until: "2027-02-30" })).error === "date" && (await call(O, { action: "set_plan", id, plan: "family", until: "31/8/2027" })).error === "date",
    "ngày không có thật, sai định dạng");
  for (const amount of [-1, 1.5, "abc", 2e9]) {
    const r = await call(O, { action: "set_plan", id, plan: "family", until: ymd(30), amount });
    if (r.error !== "bad_request") ok(false, "số tiền sai " + amount + " → " + JSON.stringify(r));
  }
  ok(be.T.plan_log.length === 0 && be.T.families.find((f) => f.id === id).plan === "free", "yêu cầu sai không đổi gói, không ghi nhật ký");
  const until = ymd(30);
  const r = await call(O, { action: "set_plan", id, plan: "family", until, amount: 300000, note: "CK ONUP nha.bin" });
  ok(r.status === 200 && r.account.plan === "family" && r.account.plan_until === until && r.account.plan_active, "kích hoạt gói family có hạn");
  const pl = be.T.plan_log[0];
  ok(pl && pl.username === "nha.bin" && pl.old_plan === "free" && pl.old_until === null && pl.new_plan === "family" && pl.new_until === until
    && pl.amount === 300000 && pl.note === "CK ONUP nha.bin" && pl.by_user === ownerUser.id, "nhật ký gói: gói cũ → mới, hạn, số tiền, ghi chú, ai làm");
  ok((await PA.rpc("plan_active", { fid: id })).data === true, "phụ huynh thấy gói đang hiệu lực");
  const r2 = await call(O, { action: "set_plan", id, plan: "free", until: "2099-01-01" });
  ok(r2.account.plan === "free" && r2.account.plan_until === null && be.T.plan_log.length === 2 && be.T.plan_log[1].old_plan === "family", "về gói free: bỏ hạn, ghi nhật ký");
  await call(O, { action: "set_plan", id, plan: "family", until });
}

/* ---------- 9. hạn mức và hết hạn (giả lập lúc bắt đầu bán: free 2 hồ sơ, chỉ đề thử) ---------- */
{
  Object.assign(be.T.plans.find((p) => p.id === "free"), { max_children: 2, all_banks: false });
  Object.assign(be.T.plans.find((p) => p.id === "family"), { max_children: 3, all_banks: true });
  be.T.paid_banks.push({ id: "de-thu", title: "Đề thử", grade: 4, questions: [], free_trial: true, published: true },
    { id: "de-tra-phi", title: "Đề trả phí", grade: 4, questions: [], free_trial: false, published: true },
    { id: "de-nhap", title: "Đề nháp", grade: 4, questions: [], free_trial: true, published: false });
  ok((await rows(PA.from("paid_banks").select("id"))).length === 2, "gói family còn hạn: đọc mọi đề đã đăng");
  ok((await PA.from("profiles").insert({ name: "Thứ tư", grade: 4 })).error.message.includes("đủ 3 hồ sơ"), "gói family: tối đa 3 hồ sơ");
  be.clock = 31 * 864e5; // 31 ngày sau: gói hết hạn
  ok((await PA.rpc("plan_active", { fid: A.account.id })).data === false, "quá hạn: gói hết hiệu lực");
  const e = (await PA.from("results").insert({ profile_id: kids[2].id, source: "bank", ref_id: "x", r: 1, t: 2 })).error;
  ok(e && e.message.includes("đang bị khóa"), "hết hạn: hồ sơ thứ 3 bị khóa khi ghi kết quả");
  ok(!(await PA.from("results").insert({ profile_id: kids[1].id, source: "bank", ref_id: "x", r: 1, t: 2 })).error, "hai hồ sơ đầu vẫn ghi được");
  ok((await rows(PA.from("paid_banks").select("id"))).map((b) => b.id).join() === "de-thu", "hết hạn: chỉ đọc đề thử");
  ok((await rows(PA.from("profiles").select("id, locked"))).filter((p) => p.locked).length === 1, "hồ sơ bị khóa vẫn hiện (locked = true)");
  const list = await call(O, { action: "list_accounts", q: "nha.bin" });
  ok(list.accounts[0].plan === "family" && !list.accounts[0].plan_active, "list_accounts: gói đã hết hạn thì plan_active = false");
  await call(O, { action: "set_plan", id: A.account.id, plan: "family", until: ymd(60), amount: 300000 });
  ok(!(await PA.from("results").insert({ profile_id: kids[2].id, source: "bank", ref_id: "x", r: 1, t: 2 })).error, "gia hạn: mở khóa hồ sơ ngay");
  be.clock = 0;
  Object.assign(be.T.plans.find((p) => p.id === "free"), { max_children: 5, all_banks: true });
  Object.assign(be.T.plans.find((p) => p.id === "family"), { max_children: 5, all_banks: true });
}

/* ---------- 10. khóa / mở khóa ---------- */
const B = await call(O, { action: "create_account", username: "nha_b", password: "mat-khau-nha-b" });
const PB = client();
{
  await login(PB, "nha_b", "mat-khau-nha-b");
  ok((await rows(PB.from("profiles").select("id"))).length === 0 && (await rows(PB.from("results").select("id"))).length === 0
    && (await PB.from("profiles").update({ name: "hack" }).eq("id", kids[0].id).select("id")).data.length === 0, "nhà B không thấy, không sửa được dữ liệu nhà A");
  ok((await PB.from("results").insert({ profile_id: kids[0].id, source: "bank", ref_id: "x", r: 1, t: 1 })).error, "nhà B ghi kết quả cho con nhà A: bị chặn");
  ok((await call(O, { action: "set_status", id: B.account.id, status: "xoa" })).error === "bad_request", "trạng thái lạ");
  const r = await call(O, { action: "set_status", id: A.account.id, status: "locked" });
  ok(r.status === 200 && r.account.status === "locked", "khóa tài khoản");
  ok((await login(client(), "nha.bin", "owner-dat-san-123")).error.code === "user_banned", "tài khoản bị khóa: không đăng nhập được");
  const fams = await rows(PA.from("families").select("status"));
  ok(fams.length === 1 && fams[0].status === "locked" && (await rows(PA.from("profiles").select("id"))).length === 0
    && (await PA.from("results").insert({ profile_id: kids[0].id, source: "bank", ref_id: "x", r: 1, t: 1 })).error,
    "máy đang đăng nhập: chỉ còn thấy trạng thái bị khóa, không đọc/ghi gì");
  const r2 = await call(O, { action: "set_status", id: A.account.id, status: "active" });
  ok(r2.account.status === "active" && !(await login(PA, "nha.bin", "owner-dat-san-123")).error && (await rows(PA.from("profiles").select("id"))).length === 3, "mở khóa: đăng nhập và đọc lại được");
  ok(be.T.admin_log.filter((l) => l.action === "set_status").map((l) => l.detail.status).join() === "locked,active", "nhật ký khóa/mở khóa");
}

/* ---------- 11. danh sách và số liệu ---------- */
{
  await PB.from("profiles").insert({ name: "Tí", grade: 6 });
  const r = await call(O, { action: "list_accounts" });
  const a = r.accounts.find((x) => x.username === "nha.bin"), b = r.accounts.find((x) => x.username === "nha_b");
  ok(r.status === 200 && r.accounts.length === 2 && a.children === 3 && a.grades.join() === "1,4,6" && b.children === 1 && b.grades.join() === "6",
    "list_accounts: số hồ sơ con, các khối của từng tài khoản");
  ok(r.stats.accounts === 2 && r.stats.children === 4 && r.stats.children_by_grade["6"] === 2 && r.stats.children_by_grade["4"] === 1
    && r.stats.active_7d === 1 && r.stats.paid === 1 && r.stats.expiring_30d === 0 && r.stats.locked === 0, "số liệu nhanh: tài khoản, hồ sơ theo khối, dùng trong 7 ngày, đang trả phí");
  ok(!JSON.stringify(r).includes("pin_hash") && !JSON.stringify(r).includes("toan4-ck1-de1"), "chủ app không thấy PIN hay bài làm của các con");
  ok((await call(O, { action: "list_accounts", q: "MẸ BIN" })).accounts.map((x) => x.username).join() === "nha.bin"
    && (await call(O, { action: "list_accounts", q: "nha_" })).accounts.map((x) => x.username).join() === "nha_b"
    && (await call(O, { action: "list_accounts", q: "khong-co" })).accounts.length === 0, "tìm theo tên đăng nhập hoặc ghi chú");
  await call(O, { action: "set_plan", id: B.account.id, plan: "family", until: ymd(10) });
  ok((await call(O, { action: "list_accounts" })).stats.expiring_30d === 1, "số tài khoản sắp hết hạn trong 30 ngày");
  // nhiều hơn 1000 tài khoản: đọc theo từng trang
  for (let i = 0; i < 1100; i++) {
    const u = be.addUser(`t${i}@${LOGIN_DOMAIN}`, "mat-khau-thu-123");
    be.T.families.push({ id: "00000000-0000-4000-8000-" + String(i).padStart(12, "0"), auth_user_id: u.id, username: "thu" + i, display_name: "", school_year: "", seed_banks_seen: [],
      plan: "free", plan_until: null, must_change_password: true, status: "active", created_at: "2026-01-01T00:00:00.000Z", last_seen_at: null });
  }
  ok((await call(O, { action: "list_accounts" })).accounts.length === 1102, "list_accounts đọc đủ khi có hơn 1000 tài khoản");
  be.T.families = be.T.families.filter((f) => !/^thu\d+$/.test(f.username));
}

/* ---------- 12. tài khoản của chính chủ app ---------- */
{
  be.T.families.push({ id: "11111111-1111-4111-8111-111111111111", auth_user_id: ownerUser.id, username: "chu.app", display_name: "Nhà chủ app", school_year: "", seed_banks_seen: [],
    plan: "free", plan_until: null, must_change_password: false, status: "active", created_at: new Date().toISOString(), last_seen_at: null });
  ok((await call(O, { action: "set_status", id: "11111111-1111-4111-8111-111111111111", status: "locked" })).error === "self"
    && (await call(O, { action: "delete_account", id: "11111111-1111-4111-8111-111111111111", confirm: "chu.app" })).error === "self",
    "không khóa, không xóa được tài khoản của chính chủ app");
  be.T.families = be.T.families.filter((f) => f.username !== "chu.app");
}

/* ---------- 13. xóa tài khoản ---------- */
{
  ok((await call(O, { action: "delete_account", id: A.account.id })).error === "confirm" && (await call(O, { action: "delete_account", id: A.account.id, confirm: "nha_b" })).error === "confirm",
    "xóa: phải gõ đúng tên đăng nhập");
  const r = await call(O, { action: "delete_account", id: A.account.id, confirm: " NHA.BIN " });
  ok(r.ok === true, "xóa tài khoản");
  ok(!be.T.families.some((f) => f.id === A.account.id) && !be.T.profiles.some((p) => p.family_id === A.account.id) && !be.T.results.some((x) => x.family_id === A.account.id)
    && !be.T.admin_notes.some((n) => n.family_id === A.account.id) && ![...be.users.values()].some((u) => u.email === "nha.bin@" + LOGIN_DOMAIN),
    "xóa luôn người dùng Auth, hồ sơ con, kết quả, ghi chú");
  ok(be.T.plan_log.filter((l) => l.username === "nha.bin").every((l) => l.family_id === null) && be.T.admin_log.some((l) => l.action === "delete_account" && l.username === "nha.bin"),
    "nhật ký vẫn giữ tên đăng nhập sau khi xóa");
  const gone = await PA.from("families").select("id");
  ok(!!gone.error || gone.data.length === 0, "máy của tài khoản đã xóa không còn thấy gì");
  ok((await call(O, { action: "delete_account", id: A.account.id, confirm: "nha.bin" })).status === 404, "xóa lần hai: 404");
  ok((await rows(PB.from("profiles").select("id"))).length === 1, "tài khoản khác không bị ảnh hưởng");
  // người dùng Auth đã bị xóa từ trước (ví dụ xóa tay trong trang Supabase): vẫn dọn được tài khoản
  const C = await call(O, { action: "create_account", username: "nha.c" });
  be.users.delete([...be.users.values()].find((u) => u.email === "nha.c@" + LOGIN_DOMAIN).id);
  ok((await call(O, { action: "delete_account", id: C.account.id, confirm: "nha.c" })).ok === true && !be.T.families.some((f) => f.username === "nha.c"),
    "người dùng Auth đã mất từ trước: vẫn xóa được tài khoản");
}

/* ---------- 14. máy chủ giả: các quy tắc khác của schema.sql ---------- */
{
  const X = client(); // chưa đăng nhập (vai anon)
  ok((await X.from("families").select("id")).error && (await X.from("plans").select("id")).error && (await X.rpc("touch")).error, "chưa đăng nhập: không đọc được gì");
  ok((await rows(O.from("families").select("id"))).length === 1 && (await rows(O.from("profiles").select("id"))).length === 0, "chủ app đọc mọi tài khoản, không đọc hồ sơ con");
  ok((await PB.from("families").update({ plan: "family" }).eq("id", B.account.id)).error && (await PB.from("families").update({ status: "active" })).error
    && (await PB.from("families").update({ must_change_password: false })).error, "phụ huynh không tự đổi gói, trạng thái, cờ đổi mật khẩu");
  ok((await PB.from("families").update({ display_name: "Nhà B" }).eq("id", B.account.id).select("display_name")).data[0].display_name === "Nhà B", "phụ huynh sửa tên hiển thị");
  ok((await PB.from("admin_log").select("id")).data.length === 0 && (await PB.from("admin_notes").insert({ family_id: B.account.id, note: "x" })).error
    && (await PB.from("paid_banks").insert({ id: "gia", title: "x", grade: 4, questions: [] })).error, "phụ huynh không đọc nhật ký, không ghi ghi chú hay đề");
  const imp = await PB.rpc("import_local", { p_data: { users: [{ id: "s1", role: "student", name: "Bông", grade: 6, salt: "s", pinHash: "s256:ab" }, { id: "a1", role: "admin", name: "Bố" }],
    results: [{ id: "r1", userId: "s1", source: "bank", refId: "x", r: 1, t: 2, at: "2026-09-01T08:00:00.000Z" }] } });
  ok(!imp.error && imp.data.profiles === 1 && imp.data.results === 1 && be.T.profiles.find((p) => p.name === "Bông").pin_hash === "s$s256:ab", "máy chủ giả: chuyển dữ liệu máy cũ");
  ok((await PB.rpc("import_local", { p_data: { users: [1, 2, 3, 4].map((i) => ({ id: "k" + i, role: "student", name: "K" + i, grade: 4 })) } })).error
    && (await rows(PB.from("profiles").select("id"))).length === 2, "máy chủ giả: chuyển dữ liệu vượt hạn mức thì hủy cả lần chuyển");
  be.captchaRequired = true;
  ok((await login(client(), "nha_b", "mat-khau-nha-b")).error && !(await login(client(), "nha_b", "mat-khau-nha-b", "ok-1")).error, "CAPTCHA bật: đăng nhập cần mã xác minh");
  be.captchaRequired = false;
}

console.log(`\n${passed} kiểm tra đạt, ${failures.length} lỗi.`);
if (failures.length) { console.log("ADMIN FAILED"); process.exit(1); }
console.log("ADMIN OK");
