-- Kiểm thử RLS, trigger và các hàm của supabase/schema.sql, đóng vai phụ huynh, nhà khác, tài khoản bị khóa, chủ app
-- và người chưa đăng nhập. Chạy bằng tests/supabase/run.sh (nạp auth-stub.sql, schema.sql và đề từ banks-to-sql.js trước,
-- truyền biến psql `banks` = số đề trong danh mục data/banks/index.js).

-- ---------- công cụ kiểm thử ----------
create schema t;
grant usage on schema t to public;
create table t.ids (k text primary key, v uuid);
grant all on t.ids to public;
create function t.id(k text) returns uuid language sql stable as $$ select v from t.ids where ids.k = id.k $$;
create function t.login(k text) returns void language plpgsql as $$
begin
  execute 'reset role';
  if k is null then perform set_config('request.jwt.claims', '', false); return; end if;
  perform set_config('request.jwt.claims', json_build_object('sub', t.id(k), 'role', 'authenticated')::text, false);
  execute 'set role authenticated';
end $$;
create function t.as_service() returns void language plpgsql as $$
begin execute 'reset role'; perform set_config('request.jwt.claims', '', false); execute 'set role service_role'; end $$;
create function t.ok(c boolean, msg text) returns void language plpgsql as $$
begin
  if c is not true then raise exception 'FAIL: %', msg; end if;
  raise notice 'ok  %', msg;
end $$;
-- Câu lệnh phải bị chặn (báo lỗi).
create function t.blocked(q text, msg text) returns void language plpgsql as $$
declare e text;
begin
  begin execute q; exception when others then e := sqlerrm; end;
  if e is null then raise exception 'FAIL (không bị chặn): %', msg; end if;
  raise notice 'ok  chặn: % [%]', msg, e;
end $$;
-- Câu lệnh phải bị chặn với lời báo có chứa chuỗi cho trước.
create function t.blocked_with(q text, needle text, msg text) returns void language plpgsql as $$
declare e text;
begin
  begin execute q; exception when others then e := sqlerrm; end;
  if e is null then raise exception 'FAIL (không bị chặn): %', msg; end if;
  if position(needle in e) = 0 then raise exception 'FAIL (sai lời báo "%"): %', e, msg; end if;
  raise notice 'ok  chặn: % [%]', msg, e;
end $$;
-- Số dòng một câu lệnh UPDATE/DELETE/INSERT ảnh hưởng (lỗi thì -1).
create function t.rows(q text) returns int language plpgsql as $$
declare n int;
begin
  begin execute q; get diagnostics n = row_count; exception when others then return -1; end;
  return n;
end $$;
create function t.n(q text) returns int language plpgsql as $$
declare n int; begin execute 'select count(*) from (' || q || ') x' into n; return n; end $$;
grant execute on all functions in schema t to public;

-- ---------- dữ liệu: người dùng Supabase Auth và tài khoản (Edge Function admin tạo bằng khóa bí mật) ----------
insert into t.ids values ('OWNER', gen_random_uuid()), ('PA', gen_random_uuid()), ('PB', gen_random_uuid()),
  ('PL', gen_random_uuid()), ('X', gen_random_uuid());
insert into auth.users (id, email) values
  (t.id('OWNER'), 'chu.app@users.onup.invalid'), (t.id('PA'), 'nha.a@users.onup.invalid'),
  (t.id('PB'), 'nha.b@users.onup.invalid'), (t.id('PL'), 'nha.khoa@users.onup.invalid'), (t.id('X'), 'nguoi.la@users.onup.invalid');
insert into app_owners (user_id) values (t.id('OWNER'));

select t.as_service();
select t.ok(t.rows($$insert into families (auth_user_id, username, display_name) values
  (t.id('PA'), 'nha.a', 'Nhà A'), (t.id('PB'), 'nha.b', 'Nhà B'), (t.id('PL'), 'nha.khoa', 'Nhà sẽ bị khóa')$$) = 3, 'khóa bí mật (Edge Function) tạo tài khoản');
select t.blocked($$insert into families (auth_user_id, username) values (t.id('X'), 'Nha.X')$$, 'tên đăng nhập có chữ hoa');
select t.blocked($$insert into families (auth_user_id, username) values (t.id('X'), 'abc')$$, 'tên đăng nhập 3 kí tự');
select t.blocked($$insert into families (auth_user_id, username) values (t.id('X'), 'a..b')$$, 'tên đăng nhập có hai dấu chấm liền nhau');
select t.blocked($$insert into families (auth_user_id, username) values (t.id('X'), '.abcd')$$, 'tên đăng nhập bắt đầu bằng dấu chấm');
select t.blocked($$insert into families (auth_user_id, username) values (t.id('X'), 'nha.a')$$, 'tên đăng nhập trùng');
select t.blocked($$insert into families (auth_user_id, username) values (t.id('PA'), 'nha.a2')$$, 'một người dùng hai tài khoản');
select t.ok((select plan = 'free' and plan_until is null and must_change_password and status = 'active' from families where username = 'nha.a'),
  'tài khoản mới: gói free, bắt đổi mật khẩu tạm, đang hoạt động');
select t.ok((select max_children from plans where id = 'free') = 5 and (select all_banks from plans where id = 'free'), 'gói free hôm nay: 5 hồ sơ con, mọi đề');
reset role;
insert into t.ids select 'FA', id from families where username = 'nha.a';
insert into t.ids select 'FB', id from families where username = 'nha.b';
insert into t.ids select 'FL', id from families where username = 'nha.khoa';

-- ---------- vai anon (chưa đăng nhập) ----------
select t.login(null); set role anon;
select t.blocked($$select id from families$$, 'anon đọc families');
select t.blocked($$select * from profiles$$, 'anon đọc profiles');
select t.blocked($$select * from results$$, 'anon đọc results');
select t.blocked($$select * from paid_banks$$, 'anon đọc paid_banks');
select t.blocked($$select * from plans$$, 'anon đọc plans');
select t.blocked($$select my_family_id()$$, 'anon gọi hàm');
select t.blocked($$select touch()$$, 'anon gọi touch');
reset role;

-- ---------- phụ huynh A ----------
select t.login('PA');
select t.ok(my_family_id() = t.id('FA') and not is_owner(), 'PA: gia đình A, không phải owner');
select t.ok(t.n('select id from families') = 1, 'PA chỉ thấy dòng families của mình');
select t.ok(t.n('select * from plans') = 2, 'PA đọc được bảng gói');
select t.ok(t.n('select * from app_owners') = 0 and t.n('select * from admin_notes') = 0 and t.n('select * from plan_log') = 0
  and t.n('select * from admin_log') = 0, 'PA không thấy app_owners, ghi chú, nhật ký');
select t.ok(t.rows($$update families set display_name = 'Nhà Bin', school_year = '2026–2027', seed_banks_seen = '{toan4-ck1-de1}'$$) = 1,
  'PA sửa tên hiển thị, năm học, seed_banks_seen');
select t.blocked($$update families set plan = 'family', plan_until = '2099-01-01'$$, 'PA tự nâng gói');
select t.blocked($$update families set status = 'active'$$, 'PA tự đổi trạng thái');
select t.blocked($$update families set must_change_password = false$$, 'PA tự bỏ cờ đổi mật khẩu bằng UPDATE');
select t.blocked($$update families set username = 'nha.moi'$$, 'PA tự đổi tên đăng nhập');
select t.blocked($$update families set auth_user_id = auth.uid()$$, 'PA đổi người giữ tài khoản');
select t.blocked($$insert into families (auth_user_id, username) values (auth.uid(), 'nha.a3')$$, 'PA tự tạo tài khoản');
select t.ok(t.rows($$delete from families$$) <= 0 and t.n('select id from families') = 1, 'PA không xóa được tài khoản');
select t.blocked($$insert into app_owners values (auth.uid())$$, 'PA tự thêm mình làm owner');
select t.blocked($$insert into admin_log (action) values ('x')$$, 'PA ghi nhật ký admin');
select t.blocked($$insert into plan_log (username, new_plan) values ('nha.a', 'family')$$, 'PA ghi nhật ký gói');
select t.blocked($$insert into admin_notes (family_id, note) values (my_family_id(), 'x')$$, 'PA ghi ghi chú admin');
select t.ok(t.rows($$update plans set max_children = 50$$) = 0, 'PA không sửa được bảng gói');
select t.blocked($$insert into plans (id, name, max_children) values ('vip', 'VIP', 50)$$, 'PA thêm gói');
select password_changed();
select touch();
reset role;
select t.ok((select not must_change_password and last_seen_at > now() - interval '1 minute' from families where id = t.id('FA')),
  'password_changed bỏ cờ đổi mật khẩu; touch ghi lần dùng gần nhất');

-- hồ sơ con
select t.login('PA');
select t.ok(t.rows($$insert into profiles (name, grade, class_name) values ('  Bin ', 4, '4A')$$) = 1, 'PA thêm hồ sơ con, không cần ghi family_id');
select t.ok((select family_id = t.id('FA') and name = 'Bin' and not locked and pin_hash is null from profiles where name = 'Bin'), 'hồ sơ con: gia đình tự điền, tên bỏ khoảng trắng');
select t.ok(t.rows($$insert into profiles (family_id, name, grade, pin_hash) values (my_family_id(), 'Na', 6, 's$fnv:1a2b')$$) = 1, 'PA thêm hồ sơ con có PIN');
select t.ok(t.rows($$insert into profiles (name, grade) values ('Út', 1)$$) = 1 and t.rows($$insert into profiles (name, grade) values ('Cả', 12)$$) = 1, 'khối 1 và khối 12 được');
select t.blocked($$insert into profiles (name, grade) values ('X', 0)$$, 'khối 0');
select t.blocked($$insert into profiles (name, grade) values ('X', 13)$$, 'khối 13');
select t.blocked($$insert into profiles (name) values ('Không khối')$$, 'hồ sơ con phải có khối');
select t.blocked($$insert into profiles (name, grade) values ('   ', 4)$$, 'tên trống');
select t.blocked($$insert into profiles (family_id, name, grade) values (t.id('FB'), 'Cài vào nhà B', 4)$$, 'PA thêm hồ sơ vào nhà B (biết family_id)');
select t.blocked($$insert into profiles (name, grade, locked) values ('X', 4, false)$$, 'PA tự đặt cờ locked');
select t.blocked($$insert into profiles (name, grade, created_at) values ('X', 4, '2000-01-01')$$, 'PA tự đặt thời điểm tạo (để chọn hồ sơ khỏi bị khóa)');
select t.blocked($$insert into profiles (name, grade, import_key) values ('X', 4, 'k')$$, 'PA tự đặt import_key');
select t.ok(t.rows($$insert into profiles (name, grade) values ('Thứ năm', 5)$$) = 1, 'hồ sơ thứ 5 được');
select t.blocked_with($$insert into profiles (name, grade) values ('Thứ sáu', 5)$$, 'đủ 5 hồ sơ con', 'gói free: hồ sơ thứ 6 bị chặn');
select t.blocked($$insert into profiles (name, grade) select 'Hàng loạt ' || i, 4 from generate_series(1, 3) i$$, 'thêm nhiều hồ sơ một lệnh cũng không vượt hạn mức');
select t.ok(t.rows($$update profiles set name = 'Bin Bin', avatar = '🦊', pin_hash = 'x$y', class_name = '4B', grade = 5 where name = 'Bin'$$) = 1, 'PA sửa hồ sơ con');
select t.blocked($$update profiles set locked = true$$, 'PA đổi cờ locked');
select t.blocked($$update profiles set family_id = t.id('FB')$$, 'PA chuyển hồ sơ sang nhà khác');
select t.blocked($$update profiles set created_at = '2000-01-01'$$, 'PA đổi thời điểm tạo');
select t.ok(t.rows($$delete from profiles where name = 'Cả'$$) = 1 and t.n('select * from profiles') = 4, 'PA xóa hồ sơ con');
reset role;
insert into t.ids select 'BIN', id from profiles where name = 'Bin Bin';
insert into t.ids select 'NA', id from profiles where name = 'Na';
insert into t.ids select 'UT', id from profiles where name = 'Út';
insert into t.ids select 'NAM', id from profiles where name = 'Thứ năm';

-- kết quả
select t.login('PA');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics)
  values (t.id('BIN'), 'bank', 'toan4-ck1-de1', 'Toán', 'Toán · Đề 1', 'exam', 8, 10, 300, '{Phân số}')$$) = 1, 'ghi kết quả cho hồ sơ con');
select t.ok((select family_id = t.id('FA') and at > now() - interval '1 minute' from results where profile_id = t.id('BIN')), 'kết quả: family_id và thời điểm do máy chủ đặt');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t, at) values (t.id('BIN'), 'bank', 'x', 1, 2, '2020-01-01')$$, 'tự đặt thời điểm làm bài');
select t.blocked($$insert into results (profile_id, family_id, source, ref_id, r, t) values (t.id('BIN'), t.id('FA'), 'bank', 'x', 1, 2)$$, 'tự đặt family_id');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t, import_key) values (t.id('BIN'), 'bank', 'x', 1, 2, 'k')$$, 'tự đặt import_key');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('BIN'), 'bank', 'x', 11, 10)$$, 'điểm đúng lớn hơn tổng số câu');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('BIN'), 'khac', 'x', 1, 2)$$, 'nguồn kết quả lạ');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t, wrong_topics) values (t.id('BIN'), 'bank', 'x', 1, 2, array[repeat('x', 6000)])$$, 'chủ đề sai quá dài');
select t.blocked($$update results set r = 10$$, 'sửa kết quả');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, mode, r, t) values (t.id('BIN'), 'bank', 'x', 'practice', 23.35, 25)$$) = 1, 'ghi số câu đúng lẻ');
select t.ok((select r from results where profile_id = t.id('BIN') and ref_id = 'x') = 23.35, 'số câu đúng lẻ đến 0,01 (câu đúng/sai 4 ý, nối cột chấm từng ý)');
select t.ok(t.rows($$delete from results where profile_id = t.id('BIN') and ref_id = 'x'$$) = 1, 'xóa kết quả thử');
select t.ok(t.n('select * from results') = 1, 'PA thấy kết quả của các con');
-- lịch thi, ngân hàng tự nhập
select t.ok(t.rows($$insert into exam_events (id, family_id, title, kind, grades, start_date, banks) values ('ck1-l4', my_family_id(), 'Cuối kì I', 'dinh-ki', '{4}', '2026-12-28', '{toan4-ck1-de1}')$$) = 1, 'PA thêm kì thi');
select t.ok(t.rows($$insert into exam_events (id, family_id, title, kind, grades) values ('ck1-l4', my_family_id(), 'Cuối kì I (sửa)', 'dinh-ki', '{4,6}')
  on conflict (family_id, id) do update set title = excluded.title, grades = excluded.grades$$) = 1, 'PA sửa kì thi bằng upsert');
select t.blocked($$insert into exam_events (id, family_id, title, kind, grades) values ('x', my_family_id(), 'x', 'moc', '{13}')$$, 'kì thi khối 13');
select t.blocked($$insert into exam_events (id, family_id, title, kind, grades, subjects) values ('big', my_family_id(), 'x', 'moc', '{4}', array(select 'm' || i from generate_series(1, 40) i))$$, 'mảng môn thi quá dài');
select t.ok(t.rows($$insert into question_banks (id, family_id, title, grade, questions) values ('bk-1', my_family_id(), 'Đề tự nhập', 4, '[{"type":"tf","q":"1+1=2","a":true}]')$$) = 1, 'PA thêm ngân hàng đề tự nhập');
select t.blocked($$insert into question_banks (id, family_id, title, grade, questions) select 'q' || i, my_family_id(), 'x', 4, '[]' from generate_series(1, 100) i$$, 'quá 100 ngân hàng đề');
select t.ok((select passages = '{}' from question_banks where id = 'bk-1'), 'ngân hàng tự nhập: mặc định không có đoạn đọc');
select t.ok(t.rows($$update question_banks set passages = '{"d1":{"title":"Đoạn 1","text":"Chữ"}}' where id = 'bk-1'$$) = 1, 'ngân hàng có đoạn đọc dùng chung');
select t.blocked($$update question_banks set passages = '[]' where id = 'bk-1'$$, 'đoạn đọc phải là đối tượng');
reset role;

-- ---------- phụ huynh B tấn công nhà A ----------
select t.login('PB');
select t.ok(my_family_id() = t.id('FB'), 'PB: gia đình B');
select t.ok(t.n('select id from families') = 1 and t.n('select * from profiles') = 0 and t.n('select * from results') = 0
  and t.n('select * from exam_events') = 0 and t.n('select * from question_banks') = 0, 'PB không thấy gì của nhà A');
select t.ok(t.rows($$update profiles set name = 'hack' where id = t.id('BIN')$$) = 0, 'PB không sửa hồ sơ nhà A');
select t.ok(t.rows($$delete from profiles where id = t.id('BIN')$$) = 0, 'PB không xóa hồ sơ nhà A');
select t.ok(t.rows($$delete from results$$) = 0 and t.rows($$delete from exam_events$$) = 0, 'PB không xóa kết quả, lịch thi nhà A');
select t.ok(t.rows($$update families set display_name = 'hack' where id = t.id('FA')$$) = 0, 'PB không sửa tài khoản A');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('BIN'), 'bank', 'x', 10, 10)$$, 'PB ghi kết quả cho con nhà A');
select t.blocked($$insert into exam_events (id, family_id, title, kind, grades) values ('x', t.id('FA'), 'x', 'moc', '{4}')$$, 'PB thêm kì thi vào nhà A');
select t.blocked($$insert into question_banks (id, family_id, title, grade, questions) values ('x', t.id('FA'), 'x', 4, '[]')$$, 'PB thêm ngân hàng đề vào nhà A');
select t.ok(t.rows($$insert into profiles (name, grade) values ('Tí', 4)$$) = 1, 'PB thêm hồ sơ con của mình');
reset role;
insert into t.ids select 'TI', id from profiles where name = 'Tí';

-- ---------- người đã đăng nhập nhưng không có tài khoản gia đình ----------
select t.login('X');
select t.ok(my_family_id() is null and t.n('select id from families') = 0 and t.n('select * from profiles') = 0 and t.n('select * from results') = 0
  and t.n('select * from paid_banks') = 0, 'người dùng không có tài khoản gia đình không thấy gì');
select t.blocked($$insert into profiles (name, grade) values ('X', 4)$$, 'không có tài khoản: thêm hồ sơ');
select t.blocked($$select import_local('{"users":[]}')$$, 'không có tài khoản: chuyển dữ liệu');
select touch(); select password_changed();
reset role;

-- ---------- hàm nội bộ ----------
select t.login('PA');
select t.blocked($$select sync_profile_locks(my_family_id())$$, 'gọi hàm nội bộ sync_profile_locks');
select t.blocked($$select effective_plan(my_family_id())$$, 'gọi hàm nội bộ effective_plan');
select t.blocked($$select trim_results_of(array[t.id('TI')])$$, 'gọi hàm nội bộ trim_results_of');
select t.blocked($$select today_vn()$$, 'gọi hàm nội bộ today_vn');
reset role;

-- ---------- đề trong paid_banks (nạp từ supabase/banks-to-sql.js) ----------
-- Không ghi cứng số đề: :banks do run.sh đếm trong data/banks/index.js, :trials là số đề thử đếm ở đây. Thêm đề không phải sửa file này.
select t.ok((select count(*) from paid_banks) = :banks and (select count(*) from paid_banks where published) = :banks,
  'banks-to-sql.js: đủ ' || :banks || ' đề có sẵn (data/banks/), đã đăng');
select count(*) filter (where free_trial) as trials, count(*) filter (where not free_trial) as paid from paid_banks \gset
select t.ok(:trials > 0 and :paid > 0, 'có ' || :trials || ' đề thử và ' || :paid || ' đề không phải đề thử');
-- Quy tắc của banks-to-sql.js viết lại bằng SQL: mã có đuôi "-de<số>" là đề thử khi số là 1;
-- mã không có số là đề thử khi đứng đầu nhóm (kì thi, khối, môn) trong danh mục data/banks/index.js.
select t.ok(not exists (select 1 from (
    select free_trial, coalesce(substring(id from '-de([0-9]+)$')::int = 1, sort = min(sort) over (partition by exam, grade, subject)) as trial
    from paid_banks) x where free_trial <> trial),
  'đề số 1 mỗi môn mỗi kì là đề thử, các đề còn lại thì không');
select t.ok((select free_trial from paid_banks where id = 'toan4-ck1-de1') and (select not free_trial from paid_banks where id = 'toan4-ck1-de2'),
  'toan4-ck1-de1 là đề thử, toan4-ck1-de2 thì không');
select t.ok((select exam = 'ck1-l4' and grade = 4 and subject = 'Toán' and jsonb_array_length(questions) > 0 from paid_banks where id = 'toan4-ck1-de2'),
  'đề gắn đúng kì thi, khối, môn, có câu hỏi');
insert into paid_banks (id, title, grade, questions, free_trial, published) values ('nhap-chua-dang', 'Đề nháp', 4, '[]', true, false);
select t.login('PA');
select t.ok(t.n('select * from paid_banks') = :banks, 'gói free hôm nay (all_banks): đọc mọi đề đã đăng, không thấy đề chưa đăng');
select t.blocked($$insert into paid_banks (id, title, grade, questions) values ('gia', 'Giả', 4, '[]')$$, 'PA thêm đề vào paid_banks');
select t.ok(t.rows($$update paid_banks set free_trial = true$$) = 0 and t.rows($$delete from paid_banks$$) = 0, 'PA không sửa, không xóa được đề');
reset role;

-- ---------- gói trả phí, hết hạn, hồ sơ bị khóa (giả lập lúc bắt đầu bán) ----------
update plans set max_children = 2, all_banks = false where id = 'free';
update plans set max_children = 3, all_banks = true, price = 300000 where id = 'family';
select t.login('PA');
select t.ok(t.n('select * from paid_banks') = :trials and t.n('select * from paid_banks where not free_trial') = 0, 'gói free khi đã bán: chỉ đọc đề thử');
select touch();
reset role;
select t.ok((select string_agg(name, ',' order by created_at) from profiles where family_id = t.id('FA') and locked) = 'Út,Thứ năm',
  'gói free 2 hồ sơ: các hồ sơ tạo sau bị khóa (touch tính lại)');
-- owner kích hoạt gói (qua Edge Function: khóa bí mật)
select t.as_service();
update families set plan = 'family', plan_until = today_vn() + 30 where id = t.id('FA');
reset role;
select t.ok(plan_active(t.id('FA')) and effective_plan(t.id('FA')) = 'family', 'gói family còn hạn: plan_active');
select t.ok((select string_agg(name, ',' order by created_at) from profiles where family_id = t.id('FA') and locked) = 'Thứ năm',
  'kích hoạt gói 3 hồ sơ: mở khóa ngay hồ sơ thứ 3');
select t.login('PA');
select t.ok(plan_active(my_family_id()), 'PA hỏi plan_active của mình');
select t.login('PB');
select t.ok(not plan_active(t.id('FA')), 'PB hỏi plan_active của nhà A: không trả lời (false)');
select t.login('OWNER');
select t.ok(plan_active(t.id('FA')), 'owner hỏi được plan_active của mọi gia đình');
select t.login('PA');
select t.ok(t.n('select * from paid_banks') = :banks, 'gói family còn hạn: đọc mọi đề');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, r, t) values (t.id('UT'), 'bank', 'x', 1, 2)$$) = 1, 'hồ sơ trong hạn mức ghi được kết quả');
select t.blocked_with($$insert into results (profile_id, source, ref_id, r, t) values (t.id('NAM'), 'bank', 'x', 1, 2)$$, 'đang bị khóa', 'hồ sơ bị khóa không ghi được kết quả');
select t.ok(t.n($$select * from results where profile_id = t.id('BIN')$$) = 1 and t.n($$select * from profiles where id = t.id('NAM')$$) = 1,
  'hồ sơ bị khóa vẫn hiện, kết quả cũ vẫn xem được');
select t.blocked_with($$insert into profiles (name, grade) values ('Thứ sáu', 4)$$, 'đủ 3 hồ sơ con', 'đủ hạn mức (kể cả hồ sơ bị khóa): không thêm được');
reset role;
-- hết hạn theo thời gian (không có lệnh UPDATE nào chạy trigger): lần ghi kết quả tiếp theo tự khóa
alter table families disable trigger families_after_plan;
update families set plan_until = today_vn() - 1 where id = t.id('FA');
alter table families enable trigger families_after_plan;
select t.ok(not plan_active(t.id('FA')) and effective_plan(t.id('FA')) = 'free', 'quá plan_until: hết hiệu lực, về gói free');
select t.login('PA');
select t.blocked_with($$insert into results (profile_id, source, ref_id, r, t) values (t.id('UT'), 'bank', 'x', 1, 2)$$, 'đang bị khóa', 'gói vừa hết hạn: hồ sơ thứ 3 bị khóa ngay khi ghi kết quả');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, r, t) values (t.id('NA'), 'bank', 'x', 1, 2)$$) = 1, 'hai hồ sơ đầu vẫn ghi được');
select t.ok(t.n('select * from paid_banks') = :trials, 'hết hạn: lại chỉ đọc đề thử');
select t.ok(t.n('select * from profiles') = 4 and t.n($$select * from results where profile_id = t.id('BIN')$$) = 1, 'hết hạn không mất dữ liệu');
reset role;
-- xóa một hồ sơ thì hồ sơ bị khóa kế tiếp được mở
select t.login('PA');
select t.ok(t.rows($$delete from profiles where id = t.id('NA')$$) = 1, 'PA xóa một hồ sơ');
reset role;
select t.ok((select not locked from profiles where id = t.id('UT')) and (select locked from profiles where id = t.id('NAM')), 'xóa hồ sơ: hồ sơ kế tiếp được mở khóa');
select t.ok(not exists (select 1 from results where profile_id = t.id('NA')), 'xóa hồ sơ xóa luôn kết quả của hồ sơ đó');
-- trả lại cấu hình hôm nay
update plans set max_children = 5, all_banks = true, price = null where id = 'free';
update plans set max_children = 5, all_banks = true, price = null where id = 'family';
select t.as_service();
update families set plan = 'free', plan_until = null where id = t.id('FA');
reset role;
select t.ok(not exists (select 1 from profiles where locked), 'về gói free 5 hồ sơ: không còn hồ sơ nào bị khóa');

-- ---------- tài khoản bị khóa ----------
select t.login('PL');
insert into profiles (name, grade) values ('Con nhà khóa', 4);
reset role;
insert into t.ids select 'KL', id from profiles where name = 'Con nhà khóa';
select t.as_service();
update families set status = 'locked' where id = t.id('FL');
reset role;
select t.login('PL');
select t.ok(my_family_id() is null, 'tài khoản bị khóa: không có gia đình hoạt động');
select t.ok((select status from families) = 'locked' and t.n('select id from families') = 1, 'tài khoản bị khóa vẫn đọc được trạng thái của mình');
select t.ok(t.n('select * from profiles') = 0 and t.n('select * from results') = 0 and t.n('select * from exam_events') = 0
  and t.n('select * from question_banks') = 0 and t.n('select * from paid_banks') = 0, 'tài khoản bị khóa không đọc được dữ liệu');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('KL'), 'bank', 'x', 1, 2)$$, 'tài khoản bị khóa ghi kết quả');
select t.blocked($$insert into profiles (name, grade) values ('X', 4)$$, 'tài khoản bị khóa thêm hồ sơ');
select t.ok(t.rows($$update families set display_name = 'x'$$) = 0 and t.rows($$delete from profiles$$) = 0, 'tài khoản bị khóa không sửa, không xóa được');
select t.blocked($$select import_local('{"users":[]}')$$, 'tài khoản bị khóa chuyển dữ liệu');
select touch(); select password_changed();
reset role;
select t.ok((select must_change_password and last_seen_at is null from families where id = t.id('FL')), 'tài khoản bị khóa: touch, password_changed không làm gì');
select t.as_service();
update families set status = 'active' where id = t.id('FL');
reset role;
select t.login('PL');
select t.ok(t.n('select * from profiles') = 1, 'mở khóa: đọc lại được dữ liệu');
reset role;

-- ---------- chủ app (owner) ----------
select t.login('OWNER');
select t.ok(is_owner() and my_family_id() is null, 'owner: is_owner, không có gia đình');
select t.ok(t.n('select * from app_owners') = 1, 'owner đọc dòng app_owners của mình');
select t.ok(t.n('select id from families') = 3, 'owner đọc được mọi tài khoản');
select t.ok(t.n('select * from profiles') = 0 and t.n('select * from results') = 0, 'owner không đọc hồ sơ con, bài làm của các gia đình');
select t.ok(t.rows($$insert into admin_notes (family_id, note) values (t.id('FA'), 'Zalo: Mẹ Bin')$$) = 1
  and t.rows($$update admin_notes set note = 'Zalo: Mẹ Bin, 09xx' where family_id = t.id('FA')$$) = 1, 'owner ghi chú về tài khoản');
-- trang admin (admin.html) lưu ghi chú bằng upsert của supabase-js: insert … on conflict do update
select t.ok(t.rows($$insert into admin_notes (family_id, note, updated_at) values (t.id('FA'), 'Zalo: Mẹ Bin, 0987', now())
  on conflict (family_id) do update set note = excluded.note, updated_at = excluded.updated_at$$) = 1, 'owner lưu ghi chú kiểu upsert (trang admin)');
select t.ok((select note from admin_notes where family_id = t.id('FA')) = 'Zalo: Mẹ Bin, 0987', 'upsert ghi đè ghi chú cũ');
select t.ok(t.n('select * from paid_banks') = :banks + 1, 'owner thấy cả đề chưa đăng (đề nháp)');
select t.ok(t.rows($$update paid_banks set published = true where id = 'nhap-chua-dang'$$) = 1
  and t.rows($$insert into paid_banks (id, title, grade, questions) values ('gk2-toan4-de1', 'Toán 4 · Giữa kì II · Đề 1', 4, '[]')$$) = 1
  and t.rows($$delete from paid_banks where id = 'gk2-toan4-de1'$$) = 1, 'owner đăng, thêm, xóa đề');
select t.ok(t.rows($$update plans set price = 250000 where id = 'family'$$) = 1, 'owner sửa bảng gói');
select t.ok(t.rows($$delete from plans where id = 'free'$$) = 0, 'không xóa được gói free');
select t.blocked($$update families set status = 'locked'$$, 'owner đổi trạng thái trực tiếp (chỉ qua Edge Function, có nhật ký)');
select t.blocked($$insert into admin_log (action) values ('x')$$, 'owner tự ghi nhật ký (chỉ Edge Function ghi)');
reset role;
select t.as_service();
insert into admin_log (actor, action, family_id, username) values (t.id('OWNER'), 'create_account', t.id('FA'), 'nha.a');
insert into plan_log (family_id, username, new_plan, new_until, amount, by_user) values (t.id('FA'), 'nha.a', 'family', '2027-08-31', 300000, t.id('OWNER'));
reset role;
select t.login('OWNER');
select t.ok(t.n('select * from admin_log') = 1 and t.n('select * from plan_log') = 1, 'owner đọc nhật ký admin và nhật ký gói');
reset role;

-- ---------- chuyển dữ liệu máy cũ (import_local) ----------
select t.login('PB');
select t.ok((import_local($j${
  "users":[
    {"id":"a-old","role":"admin","name":"Bố B","avatar":"🧭","salt":"s","pinHash":"s256:abc"},
    {"id":"p-old","role":"parent","name":"Bà ngoại","avatar":"🌻"},
    {"id":"s-old","role":"student","name":"Bông","avatar":"🐼","grade":6,"className":"6A","parentIds":["p-old"],"salt":"xyz","pinHash":"s256:deadbeef"},
    {"id":"s-old2","role":"student","name":"Mít","grade":4},
    {"id":"bad","role":"student","name":"Không khối"},
    {"id":"bad2","role":"student","name":"Khối lạ","grade":"bốn"},
    {"id":"bad3","name":"Không vai trò","grade":4}
  ],
  "events":[{"id":"ev-local","title":"Thi thử","kind":"thi-khac","grades":[6],"start":"2026-11-20","end":null,"tentative":false,"subjects":[],"scope":"","note":"","modules":[],"banks":["bk-local"]}],
  "banks":[{"id":"bk-local","title":"Đề tự nhập","grade":6,"subject":"Toán","minutes":15,"note":"","questions":[{"type":"tf","q":"1+1=2","a":true,"p":"d1"}],"passages":{"d1":{"text":"Đoạn đọc"}},"src":"Đúng: 1+1=2"}],
  "results":[{"id":"r-old","userId":"s-old","source":"bank","refId":"bk-local","subject":"Toán","label":"Đề tự nhập","mode":"practice","r":1,"t":1,"s":20,"at":"2026-09-01T08:00:00.000Z","wrongTopics":["Phân số"]},
             {"id":"r-bad","userId":"p-old","source":"bank","refId":"x","r":1,"t":1},
             {"id":"r-nosrc","userId":"s-old","refId":"x","r":1,"t":1},
             {"id":"r-tl","userId":"s-old2","source":"bank","refId":"x","r":1,"t":2,"at":"2099-01-01T00:00:00Z"},
             {"id":"r-sai","userId":"s-old2","source":"bank","refId":"x","r":"?","t":2,"at":"hôm qua"},
             {"id":"r-le","userId":"s-old2","source":"bank","refId":"x","mode":"practice","r":1.35,"t":2}],
  "seedBanksSeen":["mau-toan4-ck1","toan4-ck1-de1"],
  "settings":{"schoolName":"Không ghi đè"}
}$j$)->>'profiles')::int = 2, 'chuyển dữ liệu: 2 hồ sơ con (bỏ quản trị, phụ huynh, hồ sơ lỗi)');
select t.ok((select at from results where import_key = 'r-old') = '2026-09-01T08:00:00Z', 'giữ thời điểm làm bài cũ');
select t.ok((select count(*) from results where import_key in ('r-tl', 'r-sai') and at <= now()) = 2,
  'không nhận thời điểm tương lai; thời điểm, điểm sai dạng không làm hỏng cả lần chuyển');
select t.ok(t.n($$select * from results where import_key in ('r-bad', 'r-nosrc')$$) = 0, 'bỏ kết quả của phụ huynh, kết quả thiếu nguồn');
select t.ok((select pin_hash from profiles where name = 'Bông') = 'xyz$s256:deadbeef' and (select pin_hash from profiles where name = 'Mít') is null,
  'PIN cũ giữ dạng <muối>$<mã băm> của js/store.js');
select t.ok(t.n($$select * from exam_events where id = 'ev-local'$$) = 1 and t.n($$select * from question_banks where id = 'bk-local'$$) = 1, 'chuyển lịch thi và ngân hàng đề');
select t.ok((select passages->'d1'->>'text' from question_banks where id = 'bk-local') = 'Đoạn đọc' and (select r from results where import_key = 'r-le') = 1.35,
  'chuyển cả đoạn đọc của ngân hàng và số câu đúng lẻ');
select t.ok((select seed_banks_seen @> '{toan4-ck1-de1}' and display_name = 'Nhà B' from families), 'seedBanksSeen được gộp, không ghi đè tên hiển thị');
select t.ok((import_local($j${"users":[{"id":"s-old","role":"student","name":"Bông","grade":6}],"results":[{"id":"r-old","userId":"s-old","source":"bank","refId":"bk-local","r":1,"t":1,"at":"2026-09-01T08:00:00.000Z"}]}$j$)->>'results')::int = 0
  and t.n($$select * from profiles where name = 'Bông'$$) = 1, 'chuyển lại lần hai không bị trùng');
select t.blocked($$select import_local('{"from":"cloud","users":[]}')$$, 'chuyển lại bản sao lưu từ đám mây');
select t.blocked(format($q$select import_local(%L::jsonb)$q$, jsonb_build_object('users', jsonb_build_array(
  jsonb_build_object('id', t.id('BIN')::text, 'role', 'student', 'name', 'Bin', 'grade', 4))))::text, 'chuyển file có mã máy chủ của hồ sơ có sẵn');
select t.blocked_with($$select import_local('{"users":[{"id":"k1","role":"student","name":"K1","grade":4},{"id":"k2","role":"student","name":"K2","grade":4},{"id":"k3","role":"student","name":"K3","grade":4}]}')$$,
  'đủ 5 hồ sơ con', 'chuyển dữ liệu cũng theo hạn mức hồ sơ của gói');
select t.ok(t.n('select * from profiles') = 3, 'lần chuyển vượt hạn mức không để lại hồ sơ nào');
reset role;
select t.ok(not exists (select 1 from profiles p where p.family_id = t.id('FA') and p.import_key is not null), 'chuyển dữ liệu của B không đụng tới nhà A');

-- ---------- giới hạn kết quả ----------
select t.login('PB');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) select t.id('TI'), 'bank', 'rac', 1, 2 from generate_series(1, 1000)$$, 'chèn 1000 kết quả một lần');
reset role;
insert into results (profile_id, source, ref_id, r, t) values (t.id('BIN'), 'bank', 'cua-bin', 1, 2);
create temp table before_bin as select id from results where profile_id = t.id('BIN'); grant select on before_bin to public;
select set_config('app.importing', 'on', false);
insert into results (profile_id, source, ref_id, r, t, at) select t.id('TI'), 'bank', 'cu', 1, 2, now() - interval '1 day' - i * interval '1 second' from generate_series(1, 2005) i;
select set_config('app.importing', '', false);
select t.login('PB');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, r, t) values (t.id('TI'), 'bank', 'moi', 1, 2)$$) = 1, 'hồ sơ có hơn 2000 kết quả vẫn ghi được');
reset role;
select t.ok((select count(*) from results where profile_id = t.id('TI')) = 2000, 'mỗi hồ sơ giữ tối đa 2000 kết quả (bỏ bản ghi cũ nhất)');
select t.ok((select count(*) from results where profile_id = t.id('BIN')) = (select count(*) from before_bin), 'kết quả của nhà khác vẫn còn nguyên');
select t.login('PB');
select t.blocked_with($$insert into results (profile_id, source, ref_id, r, t) select t.id('TI'), 'bank', 'nhanh', 1, 2 from generate_series(1, 60)$$,
  'quá nhiều kết quả', 'quá 60 kết quả trong 10 phút');
select t.ok(t.rows($$delete from results where profile_id = t.id('TI') and ref_id = 'moi'$$) = 1, 'phụ huynh xóa kết quả của con mình');
reset role;

-- ---------- xóa tài khoản (Edge Function xóa người dùng Auth: xóa dây chuyền) ----------
select t.ok((select count(*) from plan_log where username = 'nha.a') = 1, 'trước khi xóa: có nhật ký gói');
delete from auth.users where id = t.id('PA');
select t.ok(not exists (select 1 from families where id = t.id('FA')) and not exists (select 1 from profiles where family_id = t.id('FA'))
  and not exists (select 1 from results where family_id = t.id('FA')) and not exists (select 1 from exam_events where family_id = t.id('FA'))
  and not exists (select 1 from admin_notes where family_id = t.id('FA')), 'xóa người dùng Auth: xóa tài khoản, hồ sơ con, kết quả, lịch thi, ghi chú');
select t.ok((select family_id is null and username = 'nha.a' from plan_log) and (select count(*) from admin_log where username = 'nha.a') = 1,
  'nhật ký gói và nhật ký admin vẫn giữ sau khi xóa tài khoản');
select t.ok((select count(*) from families) = 2 and (select count(*) from profiles where family_id = t.id('FB')) = 3, 'tài khoản khác không bị ảnh hưởng');
select t.login('PA');
select t.ok(my_family_id() is null and t.n('select id from families') = 0, 'phiên cũ của tài khoản đã xóa không còn thấy gì');
reset role;
