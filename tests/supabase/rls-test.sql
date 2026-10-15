-- Kiểm thử RLS và các hàm của supabase/schema.sql, đóng vai người tấn công.
-- Chạy bằng tests/supabase/run.sh (nạp auth-stub.sql và schema.sql trước).

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

-- ---------- dữ liệu: tài khoản auth ----------
insert into t.ids values
  ('A1', gen_random_uuid()), ('P1', gen_random_uuid()), ('P2', gen_random_uuid()), ('B1', gen_random_uuid()),
  ('X', gen_random_uuid()), ('ANON1', gen_random_uuid()), ('ANON2', gen_random_uuid()), ('ANONB', gen_random_uuid()),
  ('S1', gen_random_uuid()), ('S2', gen_random_uuid());
insert into auth.users (id, email, is_anonymous) values
  (t.id('A1'), 'a1@example.com', false), (t.id('P1'), 'p1@example.com', false), (t.id('P2'), 'p2@example.com', false),
  (t.id('B1'), 'b1@example.com', false), (t.id('X'), 'x@example.com', false),
  (t.id('ANON1'), null, true), (t.id('ANON2'), null, true), (t.id('ANONB'), null, true);

-- ---------- tạo hai gia đình ----------
select t.login('A1');
select t.ok(create_family('Nhà A', '2026–2027', 'Bố A', '🧭',
  '[{"id":"ck1-l4","title":"Cuối kì I","kind":"dinh-ki","grades":[4],"start":"2026-12-28","end":"2027-01-08","tentative":true,"subjects":["Toán"],"modules":[],"banks":["mau-toan4-ck1"]}]',
  array['mau-toan4-ck1']) is not null, 'A1 tạo gia đình A');
select t.blocked($$select create_family('Nhà A2', '', 'Bố A', '🧭', '[]', '{}')$$, 'A1 tạo gia đình thứ hai');
select t.ok((select grades from exam_events where id = 'ck1-l4') = '{4}' and (select start_date from exam_events where id = 'ck1-l4') = '2026-12-28', 'lịch mặc định được chép vào gia đình A');
select t.ok((select join_code from families) ~ '^[A-Z0-9]{6}$', 'mã gia đình 6 kí tự');
-- quản trị thêm phụ huynh và học sinh
select t.blocked($$insert into profiles (family_id, role, name) values (current_family_id(), 'student', 'Thiếu khối')$$, 'học sinh phải có khối');
insert into profiles (id, family_id, role, name, grade) values
  (t.id('S1'), current_family_id(), 'student', 'Bin', 4),
  (t.id('S2'), current_family_id(), 'student', 'Na', 6);
insert into profiles (family_id, role, name) values (current_family_id(), 'parent', 'Mẹ Bin'), (current_family_id(), 'parent', 'Bố Na');
select t.ok((select count(*) from profiles where role = 'parent' and invite_code ~ '^[A-Z0-9]{12}$') = 2, 'phụ huynh mới có mã mời 12 kí tự');
insert into parent_child select p.id, t.id('S1') from profiles p where p.name = 'Mẹ Bin';
insert into parent_child select p.id, t.id('S2') from profiles p where p.name = 'Bố Na';
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('S1'), 'bank', 'x', 1, 2)$$, 'quản trị không ghi kết quả thay học sinh');
reset role;
create temp table inv as select name, invite_code from profiles where role = 'parent';
grant select on inv to public;

select t.login('B1');
select t.ok(create_family('Nhà B', '', 'Cô B', '', '[]', '{}') is not null, 'B1 tạo gia đình B');
insert into profiles (family_id, role, name, grade) values (current_family_id(), 'student', 'Tí', 4);
reset role;
insert into t.ids select 'SB', id from profiles where name = 'Tí';

-- ---------- phụ huynh nhận mã mời ----------
select t.login('P1');
select t.ok(claim_invite((select '  ' || lower(substr(invite_code,1,4)) || '-' || substr(invite_code,5) from inv where name = 'Mẹ Bin')) is not null, 'P1 nhận mã mời (có gạch nối, chữ thường)');
select t.login('P2');
select t.ok(claim_invite((select invite_code from inv where name = 'Mẹ Bin')) is null, 'P2 không dùng lại được mã đã dùng');
select t.ok(claim_invite((select invite_code from inv where name = 'Bố Na')) is not null, 'P2 nhận mã mời của mình');

-- ---------- người ngoài (email, chưa thuộc gia đình nào) dò mã mời ----------
select t.login('X');
select t.ok(claim_invite('AAAAAAAAAAAA') is null, 'mã mời sai lần 1');
select claim_invite('AAAAAAAAAAAB'), claim_invite('AAAAAAAAAAAC'), claim_invite('AAAAAAAAAAAD'), claim_invite('AAAAAAAAAAAE');
select t.blocked($$select claim_invite('AAAAAAAAAAAF')$$, 'sai 5 lần thì bị khóa khi dò mã mời');
select t.ok(t.n('select * from families') = 0 and t.n('select * from profiles') = 0 and t.n('select * from results') = 0
  and t.n('select * from exam_events') = 0, 'người chưa thuộc gia đình không thấy gì');

-- ---------- học sinh đăng nhập (Edge Function, service role ghi student_sessions) ----------
select t.as_service();
insert into student_sessions (auth_user_id, profile_id) values (t.id('ANON1'), t.id('S1')), (t.id('ANONB'), t.id('SB'));
insert into student_pins (profile_id, pin_hash) values (t.id('S1'), 'pbkdf2$x');
select t.ok(attempt_begin('pin:test') = 0, 'service role gọi được attempt_begin');
select attempt_begin('pin:test'), attempt_begin('pin:test'), attempt_begin('pin:test'), attempt_begin('pin:test');
select t.ok(attempt_begin('pin:test') between 29 and 30, 'sau 5 lần thử, PIN bị khóa 30 giây');
update login_attempts set locked_until = now() - interval '1 second' where key = 'pin:test';
select attempt_begin('pin:test'), attempt_begin('pin:test'), attempt_begin('pin:test'), attempt_begin('pin:test'), attempt_begin('pin:test');
select t.ok(attempt_begin('pin:test') between 59 and 60, 'lần khóa thứ hai dài gấp đôi (60 giây)');
select attempt_success('pin:test');
select t.ok(attempt_begin('pin:test') = 0, 'đăng nhập đúng thì xóa bộ đếm');

-- ---------- học sinh S1 ----------
select t.login('ANON1');
select t.ok(current_profile_id() = t.id('S1'), 'người dùng ẩn danh đã gắn là S1');
select t.ok(t.n('select * from profiles') = 1, 'học sinh chỉ thấy hồ sơ của mình');
select t.ok(t.n('select * from exam_events') = 1, 'học sinh thấy lịch thi của gia đình');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, label, r, t, s) values (t.id('S1'), 'bank', 'mau-toan4-ck1', 'Toán', 8, 10, 300)$$) = 1, 'học sinh ghi kết quả của mình');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('S2'), 'bank', 'x', 10, 10)$$, 'học sinh ghi kết quả cho bạn cùng gia đình');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('SB'), 'bank', 'x', 10, 10)$$, 'học sinh ghi kết quả cho học sinh nhà khác');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('S1'), 'bank', 'x', 11, 10)$$, 'điểm đúng lớn hơn tổng số câu');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t, at) values (t.id('S1'), 'bank', 'x', 1, 10, '2020-01-01')$$, 'học sinh tự đặt thời điểm làm bài');
select t.blocked($$insert into results (profile_id, family_id, source, ref_id, r, t) values (t.id('S1'), (select id from families), 'bank', 'x', 1, 10)$$, 'học sinh tự đặt family_id');
select t.ok(t.rows($$update results set r = 10$$) <= 0, 'học sinh không sửa được kết quả');
select t.ok(t.rows($$delete from results$$) <= 0, 'học sinh không xóa được kết quả');
select t.blocked($$insert into student_sessions (auth_user_id, profile_id) values (t.id('ANON1'), t.id('S2'))$$, 'học sinh tự gắn mình thành học sinh khác');
select t.blocked($$update profiles set role = 'admin' where id = t.id('S1')$$, 'học sinh tự nâng quyền');
select t.blocked($$update profiles set family_id = (select family_id from profiles limit 1) where id = t.id('S1')$$, 'học sinh đổi gia đình');
select t.ok(t.rows($$update profiles set avatar = '🦊' where id = t.id('S1')$$) = 1, 'học sinh đổi hình đại diện của mình');
select t.blocked($$select * from student_pins$$, 'học sinh đọc bảng PIN');
select t.blocked($$select * from login_attempts$$, 'học sinh đọc bộ đếm thử sai');
select t.blocked($$select attempt_success('pin:' || t.id('S2'))$$, 'học sinh tự xóa bộ đếm khóa PIN');
select t.blocked($$select add_child(null, 'Giả', '', 4::smallint, '')$$, 'học sinh tạo hồ sơ');
select t.blocked($$select trim_results(family_of(t.id('SB')))$$, 'gọi hàm nội bộ trim_results');
select t.blocked($$select attempt_begin('pin:' || t.id('S2'), 1000000, 0)$$, 'tự gọi attempt_begin');
select t.blocked($$select random_code(6)$$, 'gọi hàm nội bộ random_code');
select t.blocked($$select create_family('X', '', 'X', '', '[]', '{}')$$, 'người dùng ẩn danh tạo gia đình');
select t.blocked($$select import_local('{"users":[]}')$$, 'học sinh chuyển dữ liệu');
select t.ok(t.rows($$insert into exam_events (id, family_id, title, kind, grades) values ('x', current_family_id(), 'x', 'moc', '{4}')$$) = -1, 'học sinh không thêm kì thi');

-- ---------- người dùng ẩn danh chưa gắn ----------
select t.login('ANON2');
select t.ok(current_profile_id() is null and t.n('select * from families') = 0 and t.n('select * from profiles') = 0
  and t.n('select * from results') = 0 and t.n('select * from exam_events') = 0 and t.n('select * from question_banks') = 0
  and t.n('select * from parent_child') = 0 and t.n('select * from student_sessions') = 0, 'người dùng ẩn danh chưa gắn không thấy gì');
select t.blocked($$select claim_invite('AAAAAAAAAAAA')$$, 'người dùng ẩn danh nhận mã mời');

-- ---------- vai anon (chưa đăng nhập) ----------
reset role; select set_config('request.jwt.claims', '', false); set role anon;
select t.blocked($$select * from families$$, 'anon đọc families');
select t.blocked($$select * from profiles$$, 'anon đọc profiles');
select t.blocked($$select * from results$$, 'anon đọc results');
select t.blocked($$select current_profile_id()$$, 'anon gọi hàm');

-- ---------- phụ huynh P1 (con: S1) ----------
select t.login('P1');
select t.ok(t.n('select * from profiles') = 2, 'P1 thấy mình và con (S1), không thấy S2, P2, quản trị');
select t.ok(t.n($$select * from profiles where id = t.id('S2')$$) = 0, 'P1 không thấy học sinh không phải con mình');
select t.ok(t.n('select * from results') = 1, 'P1 thấy kết quả của con');
select t.ok(t.n($$select * from profiles where id = t.id('SB')$$) = 0 and t.n('select * from families') = 1, 'P1 không thấy gia đình B');
select t.ok(t.rows($$update profiles set name = 'Bin Bin' where id = t.id('S1')$$) = 1, 'P1 sửa hồ sơ của con');
select t.ok(t.rows($$update profiles set name = 'Na hack' where id = t.id('S2')$$) = 0, 'P1 không sửa được hồ sơ con nhà khác');
select t.ok(t.rows($$delete from profiles where id = t.id('S2')$$) = 0, 'P1 không xóa được học sinh khác');
select t.blocked($$insert into parent_child values (current_profile_id(), t.id('S2'))$$, 'P1 tự gắn mình làm phụ huynh của S2');
select t.blocked($$insert into parent_child values (current_profile_id(), t.id('SB'))$$, 'P1 tự gắn mình làm phụ huynh của học sinh nhà B');
select t.blocked($$insert into profiles (family_id, role, name) values (current_family_id(), 'admin', 'Tôi là quản trị')$$, 'P1 tự tạo tài khoản quản trị');
select t.ok(t.rows($$update families set name = 'Đổi tên'$$) = 0, 'P1 không đổi tên gia đình');
select t.blocked($$update families set join_code = 'ABCDEF'$$, 'P1 đổi mã gia đình');
select t.ok(t.rows($$update exam_events set title = 'x'$$) = 0, 'P1 không sửa lịch thi');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) values (t.id('S1'), 'bank', 'x', 10, 10)$$, 'phụ huynh ghi kết quả thay con');
select t.blocked($$select new_invite(t.id('S1'))$$, 'P1 tạo mã mời');
select t.blocked($$select new_join_code()$$, 'P1 đổi mã gia đình bằng hàm');
select t.blocked($$select delete_family()$$, 'P1 xóa gia đình');
select t.blocked($$select import_local('{"users":[]}')$$, 'P1 chuyển dữ liệu');
select t.ok(add_child(null, 'Cún', '🐶', 4::smallint, '4B') is not null and t.n('select * from profiles') = 3, 'P1 tự thêm con, thấy hồ sơ mới');

-- ---------- phụ huynh P2 (con: S2) ----------
select t.login('P2');
select t.ok(t.n('select * from results') = 0 and t.n($$select * from profiles where id = t.id('S1')$$) = 0, 'P2 không thấy S1 và kết quả của S1');

-- ---------- quản trị gia đình B tấn công gia đình A ----------
select t.login('B1');
select t.ok(t.n($$select * from profiles where family_id <> current_family_id()$$) = 0 and t.n('select * from results') = 0
  and t.n($$select * from exam_events where family_id <> current_family_id()$$) = 0, 'B1 không đọc được dữ liệu nhà A');
select t.ok(t.rows($$update profiles set name = 'hack' where id = t.id('S1')$$) = 0, 'B1 không sửa hồ sơ nhà A');
select t.ok(t.rows($$delete from results$$) = 0, 'B1 không xóa kết quả nhà A');
select t.blocked($$insert into profiles (family_id, role, name, grade) values ((select family_id from profiles where id = t.id('S1')), 'student', 'x', 4)$$, 'B1 thêm hồ sơ vào nhà A (biết family_id)');
select t.blocked($$insert into exam_events (id, family_id, title, kind, grades) select 'x', family_of(t.id('S1')), 'x', 'moc', '{4}'$$, 'B1 thêm kì thi vào nhà A');
select t.blocked($$insert into parent_child select id, t.id('S1') from profiles where role = 'admin'$$, 'B1 gắn mình làm phụ huynh của S1');
reset role;
create temp table pa as select id from profiles where name = 'Mẹ Bin'; grant select on pa to public;
select t.login('B1');
select t.blocked($$select new_invite((select id from pa))$$, 'B1 tạo mã mời cho phụ huynh nhà A (chiếm tài khoản)');

-- ---------- học sinh nhà B ----------
select t.login('ANONB');
select t.ok(t.n('select * from results') = 0 and t.n('select * from profiles') = 1, 'học sinh nhà B không thấy nhà A');

-- ---------- quản trị A ----------
select t.login('A1');
select t.ok(t.n('select * from profiles') = 6, 'A1 thấy mọi hồ sơ nhà A');
select t.ok(t.n('select * from results') = 1, 'A1 thấy kết quả nhà A');
select t.blocked($$delete from profiles where role = 'admin'$$, 'xóa quản trị cuối cùng');
select t.ok((select new_join_code()) ~ '^[A-Z0-9]{6}$', 'A1 đổi mã gia đình');
select t.ok(t.rows($$update families set name = 'Nhà A mới', school_year = '2027–2028'$$) = 1, 'A1 sửa thông tin gia đình');
select t.ok(t.rows($$insert into question_banks (id, family_id, title, grade, questions) values ('bk-1', current_family_id(), 'Đề 1', 4, '[{"type":"tf","q":"x","a":true}]')$$) = 1, 'A1 thêm ngân hàng đề');
select t.ok(t.rows($$insert into exam_events (id, family_id, title, kind, grades) values ('ck1-l4', current_family_id(), 'Cuối kì I (sửa)', 'dinh-ki', '{4}')
  on conflict (family_id, id) do update set title = excluded.title$$) = 1, 'A1 sửa kì thi bằng upsert');

-- chuyển dữ liệu cục bộ
select t.ok((import_local($j${
  "users":[
    {"id":"a-old","role":"admin","name":"Bố A","avatar":"🧭","salt":"s","pinHash":"s256:abc"},
    {"id":"p-old","role":"parent","name":"Bà ngoại","avatar":"🌻"},
    {"id":"s-old","role":"student","name":"Bông","avatar":"🐣","grade":6,"className":"6A","parentIds":["p-old","a-old"],"salt":"xyz","pinHash":"s256:deadbeef"},
    {"id":"bad","role":"student","name":"Không khối"}
  ],
  "events":[{"id":"ev-local","title":"Thi thử","kind":"thi-khac","grades":[6],"start":"2026-11-20","end":null,"tentative":false,"subjects":[],"scope":"","note":"","modules":[],"banks":["bk-local"]}],
  "banks":[{"id":"bk-local","title":"Đề tự nhập","grade":6,"subject":"Toán","minutes":15,"note":"","questions":[{"type":"tf","q":"1+1=2","a":true}],"src":"Đúng: 1+1=2"}],
  "results":[{"id":"r-old","userId":"s-old","source":"bank","refId":"bk-local","subject":"Toán","label":"Đề tự nhập","mode":"practice","r":1,"t":1,"s":20,"at":"2026-09-01T08:00:00.000Z","wrongTopics":["Phân số"]},
             {"id":"r-bad","userId":"p-old","source":"bank","refId":"x","r":1,"t":1}],
  "seedBanksSeen":["mau-toan4-ck1","toan4-ck1-de1"],
  "settings":{"schoolName":"Không ghi đè"}
}$j$)->>'users')::int = 2, 'chuyển dữ liệu: 2 hồ sơ mới (quản trị trùng tên được gộp, hồ sơ lỗi bị bỏ)');
select t.ok((select at from results where import_key = 'r-old') = '2026-09-01T08:00:00Z', 'giữ thời điểm làm bài cũ');
select t.ok(t.n($$select * from results where import_key = 'r-bad'$$) = 0, 'không nhập kết quả gắn với phụ huynh');
select t.ok(t.n($$select * from parent_child pc join profiles p on p.id = pc.child_id where p.name = 'Bông'$$) = 1, 'quan hệ phụ huynh–con được giữ (bỏ quan hệ với quản trị)');
select t.ok((select seed_banks_seen @> '{toan4-ck1-de1}' from families), 'seedBanksSeen được gộp');
select t.ok((select name from families) = 'Nhà A mới', 'không ghi đè tên gia đình đã có');
select t.ok((import_local($j${"users":[{"id":"s-old","role":"student","name":"Bông","grade":6}],"results":[{"id":"r-old","userId":"s-old","source":"bank","refId":"bk-local","r":1,"t":1,"at":"2026-09-01T08:00:00.000Z"}]}$j$)->>'results')::int = 0
  and t.n($$select * from profiles where name = 'Bông'$$) = 1, 'chuyển lại lần hai không bị trùng');
reset role;
select t.ok((select pin_hash from student_pins sp join profiles p on p.id = sp.profile_id where p.name = 'Bông') = 'legacy$xyz$s256:deadbeef', 'PIN cũ được giữ dạng băm cũ');

-- tối đa 5000 kết quả mỗi gia đình
insert into results (profile_id, source, ref_id, r, t) select t.id('S1'), 'bank', 'x', 1, 2 from generate_series(1, 5010);
select t.ok((select count(*) from results r join profiles p on p.id = r.profile_id where p.family_id = family_of(t.id('S1'))) = 5000, 'giữ tối đa 5000 kết quả mỗi gia đình');

-- gỡ email khỏi hồ sơ phụ huynh
select t.login('A1');
select t.ok((select new_invite(id) from profiles where name = 'Mẹ Bin') ~ '^[A-Z0-9]{12}$', 'A1 tạo mã mời mới cho P1');
select t.blocked($$select new_invite(current_profile_id())$$, 'quản trị tự tạo mã mời cho mình');
select t.login('P1');
select t.ok(current_profile_id() is null and t.n('select * from results') = 0, 'P1 mất quyền sau khi bị gỡ');

-- xóa gia đình B (có quản trị cuối cùng, vẫn xóa được)
select t.login('B1');
select delete_family();
reset role;
select t.ok(not exists (select 1 from profiles where name in ('Cô B', 'Tí')) and not exists (select 1 from student_sessions where auth_user_id = t.id('ANONB')), 'xóa gia đình B xóa hết hồ sơ và phiên học sinh');

-- người dùng email mới tạo gia đình riêng
select t.login('X');
select t.ok(t.n('select * from families') = 0, 'X chưa thấy gì');
reset role;
