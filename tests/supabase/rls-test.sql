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

-- ---------- tạo hai gia đình (chỉ email trong allowed_creators) ----------
insert into allowed_creators (email) values ('a1@example.com'), ('b1@example.com');
select t.login('X');
select t.blocked($$select create_family('Nhà X', '', 'X', '', '[]', '{}')$$, 'email ngoài danh sách được phép tạo gia đình');
select t.blocked($$select * from allowed_creators$$, 'đọc danh sách email được phép');
select t.login('A1');
select t.ok(create_family('Nhà A', '2026–2027', 'Bố A', '🧭',
  '[{"id":"ck1-l4","title":"Cuối kì I","kind":"dinh-ki","grades":[4],"start":"2026-12-28","end":"2027-01-08","tentative":true,"subjects":["Toán"],"modules":[],"banks":["mau-toan4-ck1"]}]',
  array['mau-toan4-ck1']) is not null, 'A1 tạo gia đình A');
select t.blocked($$select create_family('Nhà A2', '', 'Bố A', '🧭', '[]', '{}')$$, 'A1 tạo gia đình thứ hai');
select t.ok((select grades from exam_events where id = 'ck1-l4') = '{4}' and (select start_date from exam_events where id = 'ck1-l4') = '2026-12-28', 'lịch mặc định được chép vào gia đình A');
select t.ok(get_join_code() ~ '^[A-Z0-9]{6}$', 'mã gia đình 6 kí tự (đọc qua get_join_code)');
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
select t.ok(t.n('select id from families') = 0 and t.n('select * from profiles') = 0 and t.n('select * from results') = 0
  and t.n('select * from exam_events') = 0, 'người chưa thuộc gia đình không thấy gì');

-- ---------- học sinh đăng nhập (Edge Function, service role ghi student_sessions) ----------
select t.as_service();
insert into student_sessions (auth_user_id, profile_id) values (t.id('ANON1'), t.id('S1')), (t.id('ANONB'), t.id('SB'));
insert into student_pins (profile_id, pin_hash) values (t.id('S1'), 'pbkdf2$x');
select t.ok(attempt_begin('pin:test', 5, 30) = 0, 'service role gọi được attempt_begin');
select attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30);
select t.ok(attempt_begin('pin:test', 5, 30) between 29 and 30, 'sau 5 lần thử, PIN bị khóa 30 giây');
update login_attempts set locked_until = now() - interval '1 second' where key = 'pin:test';
select attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30), attempt_begin('pin:test', 5, 30);
select t.ok(attempt_begin('pin:test', 5, 30) between 59 and 60, 'lần khóa thứ hai dài gấp đôi (60 giây)');
select attempt_done('pin:test', true);
select t.ok((select since_ok = 0 and locked_until is null and rounds = 2 from login_attempts where key = 'pin:test'), 'đăng nhập đúng: xóa lượt hiện tại nhưng nhớ số lần đã khóa');
-- trần cứng trong ngày: lần sai thứ 21 bị từ chối kể cả sau khi đợi, lần đúng không xóa được
delete from login_attempts where key = 'pin:cap';
do $$ begin
  for i in 1 .. 20 loop
    update login_attempts set locked_until = null where key = 'pin:cap';
    perform attempt_begin('pin:cap', 5, 30, 7, 86400, 15, 20);
    if i % 10 = 0 then perform attempt_done('pin:cap', true); end if; -- con đăng nhập đúng xen giữa
    update login_attempts set day_fails = day_fails + 1 where key = 'pin:cap' and i % 10 = 0; -- lần đúng không tính là sai: bù lại để đủ 20 lần sai
  end loop;
end $$;
update login_attempts set locked_until = null where key = 'pin:cap';
select t.ok(attempt_begin('pin:cap', 5, 30, 7, 86400, 15, 20) = -1, 'lần sai thứ 21 trong ngày bị từ chối kể cả sau khi đợi');
select attempt_done('pin:cap', true);
update login_attempts set locked_until = null, day_start = now() - interval '2 days' where key = 'pin:cap';
select t.ok(attempt_begin('pin:cap', 5, 30, 7, 86400, 15, 20) = -1, 'khóa hẳn: đăng nhập đúng hay sang ngày mới cũng không mở');
select t.ok(attempt_begin('pin:cap2', 5, 30, 7, 86400, 3, 20) = 0 and attempt_begin('pin:cap2', 5, 30, 7, 86400, 3, 20) = 0
  and attempt_begin('pin:cap2', 5, 30, 7, 86400, 3, 20) = 0 and attempt_begin('pin:cap2', 5, 30, 7, 86400, 3, 20) = -1, 'trần số lần sai kể từ lần đúng gần nhất');
select attempt_reset_profile('00000000-0000-0000-0000-000000000000');
insert into login_attempts (key, hard) values ('pin:' || t.id('S2'), true), ('pin:' || t.id('S2') || ':' || t.id('ANON2'), true);
select attempt_reset_profile(t.id('S2'));
select t.ok(not exists (select 1 from login_attempts where key like 'pin:' || t.id('S2') || '%'), 'người lớn đặt lại PIN thì mở mọi khóa của con');
-- tra mã gia đình: đếm lần nhập sai theo người gọi / IP
select family_by_code('ZZZZZZ', null, array['codeu:t', 'ip:t'], array[3, 50], 30, 600), family_by_code('ZZZZZY', null, array['codeu:t', 'ip:t'], array[3, 50], 30, 600),
       family_by_code('ZZZZZX', null, array['codeu:t', 'ip:t'], array[3, 50], 30, 600);
select t.ok((family_by_code((select join_code from families limit 1), null, array['codeu:t'], array[3], 30, 600)->>'wait')::int > 0, 'nhập sai mã gia đình 3 lần thì khóa, mã đúng cũng phải đợi');
select t.ok((family_by_code((select join_code from families limit 1), null, array['codeu:t2', 'ip:t'], array[3, 50], 30, 600)->>'id') is not null, 'cùng IP nhưng người gọi khác: IP chưa tới ngưỡng 50 lần nên vẫn tra được');
insert into known_devices (profile_id, device) values (t.id('S1'), 'maycuabin0000000000000000');
select t.ok((family_by_code((select join_code from families f join profiles p on p.family_id = f.id where p.id = t.id('S1')), 'maycuabin0000000000000000', array['codeu:t'], array[3], 30, 600)->>'id') is not null,
  'máy quen của học sinh trong gia đình nhập đúng mã thì không bị khóa chặn');

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
select t.blocked($$select attempt_done('pin:' || t.id('S2'), true)$$, 'học sinh tự xóa bộ đếm khóa PIN');
select t.blocked($$select attempt_reset_profile(t.id('S1'))$$, 'học sinh tự mở khóa PIN');
select t.blocked($$select family_by_code('ABCDEF', null, '{}', '{}', 0, 0)$$, 'học sinh tra mã gia đình không bị đếm');
select t.blocked($$select join_code from families$$, 'học sinh đọc mã gia đình');
select t.ok(get_join_code() is null, 'get_join_code không trả mã cho học sinh');
select t.blocked($$update profiles set name = 'Tên mới' where id = t.id('S1')$$, 'học sinh tự đổi tên');
select t.blocked($$update profiles set grade = 6 where id = t.id('S1')$$, 'học sinh tự đổi khối');
select t.blocked($$select sign_out_child(t.id('S2'))$$, 'học sinh đăng xuất bạn');
select t.ok(t.n('select * from child_pin_status()') = 0, 'học sinh không xem tình trạng PIN');
select t.blocked($$select add_child(null, 'Giả', '', 4::smallint, '')$$, 'học sinh tạo hồ sơ');
select t.blocked($$select trim_results_of(array[t.id('S2')])$$, 'gọi hàm nội bộ trim_results_of');
select t.blocked($$select attempt_begin('pin:' || t.id('S2'), 1000000, 0)$$, 'tự gọi attempt_begin');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t, wrong_topics) values (t.id('S1'), 'bank', 'x', 1, 2, array[repeat('x', 6000)])$$, 'chủ đề sai quá dài');
select t.blocked($$select random_code(6)$$, 'gọi hàm nội bộ random_code');
select t.blocked($$select create_family('X', '', 'X', '', '[]', '{}')$$, 'người dùng ẩn danh tạo gia đình');
select t.blocked($$select import_local('{"users":[]}')$$, 'học sinh chuyển dữ liệu');
select t.ok(t.rows($$insert into exam_events (id, family_id, title, kind, grades) values ('x', current_family_id(), 'x', 'moc', '{4}')$$) = -1, 'học sinh không thêm kì thi');

-- ---------- người dùng ẩn danh chưa gắn ----------
select t.login('ANON2');
select t.ok(current_profile_id() is null and t.n('select id from families') = 0 and t.n('select * from profiles') = 0
  and t.n('select * from results') = 0 and t.n('select * from exam_events') = 0 and t.n('select * from question_banks') = 0
  and t.n('select * from parent_child') = 0 and t.n('select * from student_sessions') = 0, 'người dùng ẩn danh chưa gắn không thấy gì');
select t.blocked($$select claim_invite('AAAAAAAAAAAA')$$, 'người dùng ẩn danh nhận mã mời');

-- ---------- vai anon (chưa đăng nhập) ----------
reset role; select set_config('request.jwt.claims', '', false); set role anon;
select t.blocked($$select id from families$$, 'anon đọc families');
select t.blocked($$select * from profiles$$, 'anon đọc profiles');
select t.blocked($$select * from results$$, 'anon đọc results');
select t.blocked($$select current_profile_id()$$, 'anon gọi hàm');

-- ---------- phụ huynh P1 (con: S1) ----------
select t.login('P1');
select t.ok(t.n('select * from profiles') = 2, 'P1 thấy mình và con (S1), không thấy S2, P2, quản trị');
select t.ok(t.n($$select * from profiles where id = t.id('S2')$$) = 0, 'P1 không thấy học sinh không phải con mình');
select t.ok(t.n('select * from results') = 1, 'P1 thấy kết quả của con');
select t.ok(t.n($$select * from profiles where id = t.id('SB')$$) = 0 and t.n('select id from families') = 1, 'P1 không thấy gia đình B');
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

-- học sinh chèn hàng loạt: bị giới hạn tốc độ, và cắt bớt chỉ đụng tới kết quả của chính mình
insert into student_sessions (auth_user_id, profile_id) values (t.id('ANON1'), t.id('S1')) on conflict (auth_user_id) do update set profile_id = excluded.profile_id, created_at = now();
insert into results (profile_id, source, ref_id, r, t) values (t.id('S2'), 'bank', 'na-1', 3, 4), (t.id('S2'), 'bank', 'na-2', 3, 4);
create temp table before_na as select id from results where profile_id = t.id('S2'); grant select on before_na to public;
select t.login('ANON1');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) select t.id('S1'), 'bank', 'rac', 1, 2 from generate_series(1, 1000)$$, 'học sinh chèn 1000 kết quả một lần');
reset role;
select set_config('app.importing', 'on', false);
insert into results (profile_id, source, ref_id, r, t, at) select t.id('S1'), 'bank', 'cu', 1, 2, now() - interval '1 day' - i * interval '1 second' from generate_series(1, 2005) i;
select set_config('app.importing', '', false);
select t.login('ANON1');
select t.ok(t.rows($$insert into results (profile_id, source, ref_id, r, t) values (t.id('S1'), 'bank', 'moi', 1, 2)$$) = 1, 'học sinh có hơn 2000 kết quả vẫn ghi được');
reset role;
select t.ok((select count(*) from results where profile_id = t.id('S1')) = 2000, 'mỗi học sinh giữ tối đa 2000 kết quả (bỏ bản ghi cũ nhất)');
select t.ok((select count(*) from results where profile_id = t.id('S2')) = (select count(*) from before_na) and (select count(*) from before_na) >= 2,
  'kết quả của anh chị em vẫn còn nguyên sau khi học sinh khác chèn hàng loạt');
select t.login('ANON1');
select t.blocked($$insert into results (profile_id, source, ref_id, r, t) select t.id('S1'), 'bank', 'nhanh', 1, 2 from generate_series(1, 60)$$, 'quá 60 kết quả trong 10 phút');
reset role;

-- phiên học sinh: đăng xuất từ xa, đổi mã gia đình, hết hạn
select t.login('P1');
select t.blocked($$select sign_out_child(t.id('S2'))$$, 'phụ huynh đăng xuất con nhà khác');
select t.ok(get_join_code() ~ '^[A-Z0-9]{6}$', 'phụ huynh đọc mã gia đình qua get_join_code');
select t.ok(t.n('select * from child_pin_status()') = 2, 'phụ huynh xem tình trạng PIN của các con mình');
select t.ok(sign_out_child(t.id('S1')) = 1, 'phụ huynh đăng xuất con khỏi mọi máy');
reset role;
select t.ok(not exists (select 1 from known_devices where profile_id = t.id('S1')), 'đăng xuất con khỏi mọi máy: quên luôn các máy quen');
-- PIN cũ đã đăng nhập (đổi sang pbkdf2v2w) vẫn được báo là PIN cũ; PIN mới 6 số (pbkdf2v2) thì không
insert into student_pins (profile_id, pin_hash) values (t.id('S2'), 'pbkdf2v2w$1$x$y') on conflict (profile_id) do update set pin_hash = excluded.pin_hash;
update student_pins set pin_hash = 'pbkdf2v2$1$x$y' where profile_id = t.id('S1');
select t.login('A1');
select t.ok((select legacy from child_pin_status() where profile_id = t.id('S2')) and not (select legacy from child_pin_status() where profile_id = t.id('S1')),
  'PIN cũ vẫn được đánh dấu sau khi học sinh đăng nhập lần đầu');
select t.login('ANON1');
select t.ok(current_profile_id() is null and t.n('select * from results') = 0, 'máy của con bị đăng xuất mất quyền ngay');
reset role;
insert into student_sessions (auth_user_id, profile_id) values (t.id('ANON1'), t.id('S1')) on conflict (auth_user_id) do update set created_at = now();
select t.login('A1');
select new_join_code();
select t.login('ANON1');
select t.ok(current_profile_id() is null, 'đổi mã gia đình thì mọi máy học sinh bị đăng xuất');
reset role;
insert into student_sessions (auth_user_id, profile_id, created_at) values (t.id('ANON1'), t.id('S1'), now() - interval '31 days') on conflict (auth_user_id) do update set created_at = excluded.created_at;
select t.login('ANON1');
select t.ok(current_profile_id() is null, 'phiên học sinh hết hạn sau 30 ngày');
reset role;
select t.login('B1');
select t.ok(family_of(t.id('S1')) is null, 'family_of không cho biết gia đình của hồ sơ nhà khác');
reset role;

-- giới hạn số mục mỗi gia đình
select t.login('A1');
select t.blocked($$insert into question_banks (id, family_id, title, grade, questions) select 'q' || i, current_family_id(), 'x', 4, '[]' from generate_series(1, 101) i$$, 'quá 100 ngân hàng đề');
select t.blocked($$insert into exam_events (id, family_id, title, kind, grades, subjects) values ('big', current_family_id(), 'x', 'moc', '{4}', array(select 'm' || i from generate_series(1, 40) i))$$, 'mảng môn thi quá dài');
select t.blocked($$select import_local('{"from":"cloud","users":[]}')$$, 'chuyển lại bản sao lưu từ đám mây');
-- file "dữ liệu máy cũ" nêu mã máy chủ của phụ huynh và của con nhà khác: bị từ chối, không tạo quan hệ phụ huynh–con
select t.blocked(format($q$select import_local(%L::jsonb)$q$, jsonb_build_object('users', jsonb_build_array(
  jsonb_build_object('id', (select id::text from profiles where name = 'Mẹ Bin'), 'role', 'parent', 'name', 'Mẹ Bin'),
  jsonb_build_object('id', t.id('S2')::text, 'role', 'student', 'name', 'Na', 'grade', 6, 'parentIds', jsonb_build_array((select id::text from profiles where name = 'Mẹ Bin')))),
  'results', jsonb_build_array(jsonb_build_object('id', 'r-x', 'userId', t.id('S2')::text, 'source', 'bank', 'refId', 'x', 'r', 0, 't', 1, 'at', '2099-01-01T00:00:00Z'))))::text,
  'chuyển file có mã máy chủ của hồ sơ có sẵn');
reset role;
select t.ok(not exists (select 1 from parent_child pc join profiles p on p.id = pc.parent_id where p.name = 'Mẹ Bin' and pc.child_id = t.id('S2')), 'phụ huynh không có thêm quyền với con nhà khác');
select t.login('A1');
-- thời điểm trong tương lai hoặc sai dạng: dùng thời điểm hiện tại
select import_local($j${"users":[{"id":"k-moi","role":"student","name":"Mít","grade":4}],
  "results":[{"id":"r-tl","userId":"k-moi","source":"bank","refId":"x","r":1,"t":2,"at":"2099-01-01T00:00:00Z"},
             {"id":"r-sai","userId":"k-moi","source":"bank","refId":"x","r":1,"t":2,"at":"hôm qua"}]}$j$);
reset role;
select t.ok((select count(*) from results where import_key in ('r-tl', 'r-sai') and at <= now()) = 2, 'chuyển dữ liệu: không nhận thời điểm tương lai, thời điểm sai dạng không làm hỏng cả lần chuyển');

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
select t.ok(t.n('select id from families') = 0, 'X chưa thấy gì');
reset role;
