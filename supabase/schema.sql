-- Đồng bộ đám mây (giai đoạn 2). Chạy MỘT LẦN trong Supabase → SQL Editor → New query → dán cả file → Run.
-- Hướng dẫn từng bước: docs/HUONG-DAN-SUPABASE.md.
--
-- Ai đăng nhập thế nào:
--  * Quản trị, phụ huynh: email (magic link). profiles.auth_user_id trỏ vào auth.users.
--  * Học sinh: không có email. App đăng nhập ẩn danh (Anonymous sign-in), rồi Edge Function
--    student-login kiểm tra mã gia đình + PIN và ghi một dòng student_sessions gắn người dùng
--    ẩn danh đó với hồ sơ học sinh. Người dùng ẩn danh chưa được gắn thì không đọc được gì.
--
-- Anon key là công khai, nên mọi quyền đều do RLS dưới đây quyết định:
--  * quản trị: đọc/ghi mọi thứ trong family của mình;
--  * phụ huynh: đọc hồ sơ và kết quả của con mình (parent_child), sửa hồ sơ con, đọc lịch thi và ngân hàng đề của family;
--  * học sinh: đọc hồ sơ của mình, lịch thi và ngân hàng đề của family, chỉ ghi và đọc kết quả của chính mình.
-- PIN học sinh nằm trong student_pins: bật RLS, không có chính sách nào, nên chỉ Edge Function (service role) đọc được.

-- ============================== BẢNG ==============================

create table families (
  id uuid primary key default gen_random_uuid(),
  name text not null default '' check (char_length(name) <= 80),
  school_year text not null default '2026–2027' check (char_length(school_year) <= 20),
  join_code text unique not null check (join_code ~ '^[A-Z0-9]{6,12}$'),  -- mã gia đình để học sinh đăng nhập
  seed_banks_seen text[] not null default '{}',   -- như seedBanksSeen trong js/store.js
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  auth_user_id uuid unique references auth.users(id) on delete set null,  -- chỉ quản trị, phụ huynh
  role text not null check (role in ('admin','parent','student')),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  avatar text not null default '🙂' check (char_length(avatar) <= 16),
  grade smallint check (grade in (4,6)),
  class_name text not null default '' check (char_length(class_name) <= 20),
  invite_code text unique,                 -- mã mời để phụ huynh/quản trị gắn email của mình vào hồ sơ này
  import_key text,                         -- mã cũ ở máy cục bộ, để chuyển dữ liệu nhiều lần không bị trùng
  created_at timestamptz not null default now(),
  check (role <> 'student' or grade is not null),
  check (role <> 'student' or (auth_user_id is null and invite_code is null)),
  check (role = 'student' or grade is null),
  unique (family_id, import_key)
);
create index on profiles (family_id);

create table parent_child (
  parent_id uuid references profiles(id) on delete cascade,
  child_id uuid references profiles(id) on delete cascade,
  primary key (parent_id, child_id)
);
create index on parent_child (child_id);

create table exam_events (
  id text not null check (char_length(id) between 1 and 80),
  family_id uuid not null references families(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  kind text not null check (kind in ('dinh-ki','ioe','thi-khac','moc')),
  grades smallint[] not null, start_date date, end_date date,
  tentative boolean not null default true,
  subjects text[] not null default '{}', scope text not null default '' check (char_length(scope) <= 2000),
  note text not null default '' check (char_length(note) <= 2000),
  modules text[] not null default '{}', banks text[] not null default '{}',
  primary key (family_id, id)
);

create table question_banks (
  id text not null check (char_length(id) between 1 and 80),
  family_id uuid not null references families(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  grade smallint not null check (grade in (4,6)), subject text not null default '' check (char_length(subject) <= 60),
  minutes int not null default 0 check (minutes between 0 and 600),
  note text not null default '' check (char_length(note) <= 2000),
  src text not null default '' check (char_length(src) <= 200000),
  questions jsonb not null check (jsonb_typeof(questions) = 'array' and pg_column_size(questions) <= 1000000),
  primary key (family_id, id)
);

create table results (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  family_id uuid not null references families(id) on delete cascade,  -- trigger tự điền từ profile_id
  source text not null check (source in ('module','bank')),
  ref_id text not null check (char_length(ref_id) <= 80),
  subject text not null default '' check (char_length(subject) <= 60),
  label text not null default '' check (char_length(label) <= 120),
  mode text not null default '' check (char_length(mode) <= 20),
  r int not null check (r >= 0), t int not null check (t > 0 and t <= 1000 and r <= t), s int not null default 0 check (s >= 0),
  wrong_topics text[] check (cardinality(wrong_topics) <= 50),
  import_key text,
  at timestamptz not null default now(),
  unique (family_id, import_key)
);
create index on results (profile_id, at desc);
create index on results (family_id, at desc);

-- Học sinh đang đăng nhập: người dùng ẩn danh nào đang là học sinh nào. Chỉ Edge Function ghi.
create table student_sessions (
  auth_user_id uuid primary key references auth.users(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index on student_sessions (profile_id);

-- PIN học sinh đã băm (PBKDF2 trong Edge Function). Không ai ngoài service role đọc được.
create table student_pins (
  profile_id uuid primary key references profiles(id) on delete cascade,
  pin_hash text not null,
  updated_at timestamptz not null default now()
);

-- Đếm số lần thử sai (PIN, mã gia đình, mã mời). Không ai ngoài service role đọc được.
create table login_attempts (
  key text primary key,
  fails int not null default 0,
  rounds int not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);

-- ============================== HÀM HỖ TRỢ CHO RLS ==============================
-- security definer để đọc profiles mà không vướng chính RLS của profiles (tránh đệ quy).

create function current_profile_id() returns uuid
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select p.id from profiles p where p.auth_user_id = auth.uid()),
    (select s.profile_id from student_sessions s where s.auth_user_id = auth.uid()))
$$;

create function current_family_id() returns uuid
language sql stable security definer set search_path = public as $$
  select family_id from profiles where id = current_profile_id()
$$;

create function current_role_name() returns text
language sql stable security definer set search_path = public as $$
  select role from profiles where id = current_profile_id()
$$;

create function is_admin_of(fid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = current_profile_id() and role = 'admin' and family_id = fid)
$$;

create function is_parent_of(child uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from parent_child pc join profiles p on p.id = pc.parent_id
                 where pc.parent_id = current_profile_id() and p.role = 'parent' and pc.child_id = child)
$$;

create function family_of(pid uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select family_id from profiles where id = pid
$$;

create function is_anonymous_user() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select u.is_anonymous from auth.users u where u.id = auth.uid()), true)
$$;

-- Mã ngẫu nhiên từ gen_random_uuid (ngẫu nhiên mật mã). Bỏ các kí tự dễ nhầm 0/O, 1/I.
create function random_code(len int) returns text
language plpgsql volatile set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  bytes bytea := decode(replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''), 'hex');
  out text := '';
begin
  for i in 0 .. len - 1 loop
    out := out || substr(alphabet, (get_byte(bytes, i) % 32) + 1, 1);
  end loop;
  return out;
end $$;

-- ============================== TRIGGER ==============================

-- Phải còn ít nhất một quản trị (trừ khi đang xóa cả family).
create function profiles_keep_admin() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if old.role = 'admin'
     and exists (select 1 from families where id = old.family_id)
     and not exists (select 1 from profiles where family_id = old.family_id and role = 'admin' and id <> old.id) then
    raise exception 'Phải còn ít nhất một tài khoản quản trị.';
  end if;
  return old;
end $$;
create trigger profiles_keep_admin before delete on profiles for each row execute function profiles_keep_admin();

-- Hồ sơ quản trị/phụ huynh mới chưa có email thì tự có mã mời.
create function profiles_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.name := btrim(new.name);
  if new.role in ('admin','parent') and new.auth_user_id is null and new.invite_code is null then
    new.invite_code := random_code(12);
  end if;
  if new.role <> 'student' then new.grade := null; new.class_name := ''; end if;
  return new;
end $$;
create trigger profiles_before_insert before insert on profiles for each row execute function profiles_before_insert();

-- Phụ huynh–con: cùng family, đúng vai trò.
create function parent_child_check() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from profiles p join profiles c on c.family_id = p.family_id
    where p.id = new.parent_id and p.role = 'parent' and c.id = new.child_id and c.role = 'student') then
    raise exception 'Phụ huynh và học sinh phải cùng gia đình.';
  end if;
  return new;
end $$;
create trigger parent_child_check before insert or update on parent_child for each row execute function parent_child_check();

-- Kết quả: family_id lấy từ hồ sơ; thời điểm do máy chủ đặt (trừ khi chuyển dữ liệu cũ qua import_local).
create function results_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.family_id := (select family_id from profiles where id = new.profile_id);
  if current_setting('app.importing', true) is distinct from 'on' then
    new.at := now(); new.import_key := null;
  end if;
  return new;
end $$;
create trigger results_before_insert before insert on results for each row execute function results_before_insert();

-- Tối đa 5000 kết quả mỗi family, như bản cục bộ (bỏ bớt bản ghi cũ nhất).
create function trim_results(fid uuid) returns void
language sql security definer set search_path = public as $$
  delete from results where id in (select id from results where family_id = fid order by at desc, id offset 5000)
$$;
create function results_trim() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if current_setting('app.importing', true) is distinct from 'on' then perform trim_results(new.family_id); end if;
  return null;
end $$;
create trigger results_trim after insert on results for each row execute function results_trim();

-- ============================== RLS ==============================

alter table families enable row level security;
alter table profiles enable row level security;
alter table parent_child enable row level security;
alter table exam_events enable row level security;
alter table question_banks enable row level security;
alter table results enable row level security;
alter table student_sessions enable row level security;
alter table student_pins enable row level security;
alter table login_attempts enable row level security;

-- Không cho vai trò anon (chưa đăng nhập) đụng vào bảng nào. Học sinh đăng nhập ẩn danh có vai trò authenticated.
revoke all on families, profiles, parent_child, exam_events, question_banks, results,
  student_sessions, student_pins, login_attempts from anon, authenticated;

grant select, update (name, school_year, seed_banks_seen) on families to authenticated;
grant select, delete, insert (id, family_id, role, name, avatar, grade, class_name),
  update (name, avatar, grade, class_name) on profiles to authenticated;
grant select, insert, delete on parent_child to authenticated;
grant select, insert, update, delete on exam_events, question_banks to authenticated;
grant select, delete, insert (id, profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics) on results to authenticated;
grant select, delete on student_sessions to authenticated;
-- student_pins, login_attempts: không cấp gì.

create policy fam_select on families for select to authenticated using (id = (select current_family_id()));
create policy fam_update on families for update to authenticated using (is_admin_of(id)) with check (is_admin_of(id));

create policy prof_select on profiles for select to authenticated using (
  id = (select current_profile_id()) or is_admin_of(family_id) or is_parent_of(id));
create policy prof_insert on profiles for insert to authenticated with check (is_admin_of(family_id));
create policy prof_update on profiles for update to authenticated
  using (id = (select current_profile_id()) or is_admin_of(family_id) or is_parent_of(id))
  with check (id = (select current_profile_id()) or is_admin_of(family_id) or is_parent_of(id));
create policy prof_delete on profiles for delete to authenticated using (is_admin_of(family_id) or is_parent_of(id));

create policy pc_select on parent_child for select to authenticated using (
  parent_id = (select current_profile_id()) or child_id = (select current_profile_id()) or is_admin_of(family_of(child_id)));
create policy pc_insert on parent_child for insert to authenticated with check (is_admin_of(family_of(child_id)));
create policy pc_delete on parent_child for delete to authenticated using (is_admin_of(family_of(child_id)));

create policy ev_select on exam_events for select to authenticated using (family_id = (select current_family_id()));
create policy ev_insert on exam_events for insert to authenticated with check (is_admin_of(family_id));
create policy ev_update on exam_events for update to authenticated using (is_admin_of(family_id)) with check (is_admin_of(family_id));
create policy ev_delete on exam_events for delete to authenticated using (is_admin_of(family_id));

create policy qb_select on question_banks for select to authenticated using (family_id = (select current_family_id()));
create policy qb_insert on question_banks for insert to authenticated with check (is_admin_of(family_id));
create policy qb_update on question_banks for update to authenticated using (is_admin_of(family_id)) with check (is_admin_of(family_id));
create policy qb_delete on question_banks for delete to authenticated using (is_admin_of(family_id));

create policy res_select on results for select to authenticated using (
  profile_id = (select current_profile_id()) or is_parent_of(profile_id) or is_admin_of(family_id));
create policy res_insert on results for insert to authenticated with check (
  profile_id = (select current_profile_id()) and (select current_role_name()) = 'student');
create policy res_delete on results for delete to authenticated using (is_admin_of(family_id));

create policy ss_select on student_sessions for select to authenticated using (auth_user_id = auth.uid());
create policy ss_delete on student_sessions for delete to authenticated using (auth_user_id = auth.uid());

-- ============================== HÀM GỌI TỪ APP (RPC) ==============================
-- Mọi hàm security definer tự kiểm tra quyền của người gọi.

-- Người dùng email chưa thuộc family nào: tạo family mới, mình là quản trị, chép lịch thi mặc định.
create function create_family(p_name text, p_school_year text, p_admin_name text, p_avatar text,
                              p_events jsonb, p_seed_banks text[]) returns uuid
language plpgsql security definer set search_path = public as $$
declare fid uuid; pid uuid; code text;
begin
  if auth.uid() is null or is_anonymous_user() then raise exception 'Cần đăng nhập bằng email.'; end if;
  if current_profile_id() is not null then raise exception 'Tài khoản này đã thuộc một gia đình.'; end if;
  loop
    code := random_code(6);
    exit when not exists (select 1 from families where join_code = code);
  end loop;
  insert into families (name, school_year, join_code, seed_banks_seen)
    values (left(coalesce(btrim(p_name), ''), 80), left(coalesce(nullif(btrim(p_school_year), ''), '2026–2027'), 20), code, coalesce(p_seed_banks, '{}'))
    returning id into fid;
  insert into profiles (family_id, auth_user_id, role, name, avatar)
    values (fid, auth.uid(), 'admin', left(btrim(p_admin_name), 40), left(coalesce(nullif(p_avatar, ''), '🧭'), 16))
    returning id into pid;
  insert into exam_events (id, family_id, title, kind, grades, start_date, end_date, tentative, subjects, scope, note, modules, banks)
    select e.id, fid, e.title, coalesce(e.kind, 'dinh-ki'), e.grades, e.start, coalesce(e."end", e.start), coalesce(e.tentative, false),
           coalesce(e.subjects, '{}'), coalesce(e.scope, ''), coalesce(e.note, ''), coalesce(e.modules, '{}'), coalesce(e.banks, '{}')
    from jsonb_to_recordset(coalesce(p_events, '[]'::jsonb)) as e(id text, title text, kind text, grades smallint[], start date, "end" date,
         tentative boolean, subjects text[], scope text, note text, modules text[], banks text[]);
  return fid;
end $$;

-- Thử sai nhiều lần thì khóa. Đếm cả lần thử trước khi kiểm tra, nên gửi nhiều yêu cầu cùng lúc cũng không vượt giới hạn.
-- Trả về số giây phải đợi (0 = được thử). Mỗi lần bị khóa liên tiếp thì thời gian khóa gấp đôi, tối đa khoảng 1 giờ.
create function attempt_begin(p_key text, p_max int default 5, p_seconds int default 30) returns int
language plpgsql security definer set search_path = public as $$
declare a login_attempts;
begin
  insert into login_attempts (key) values (p_key) on conflict (key) do nothing;
  select * into a from login_attempts where key = p_key for update;
  if a.locked_until is not null and a.locked_until > now() then
    return ceil(extract(epoch from a.locked_until - now()))::int;
  end if;
  if a.updated_at < now() - interval '1 day' then a.rounds := 0; a.fails := 0; end if;
  a.fails := a.fails + 1;
  if a.fails >= p_max then
    a.locked_until := now() + make_interval(secs => p_seconds * power(2, least(a.rounds, 7)));
    a.rounds := a.rounds + 1; a.fails := 0;
  end if;
  update login_attempts set fails = a.fails, rounds = a.rounds, locked_until = a.locked_until, updated_at = now() where key = p_key;
  return 0;
end $$;

-- Chỉ xem còn bị khóa bao lâu (không đếm). Dùng cho tra mã gia đình: chỉ đếm khi nhập sai mã.
create function attempt_wait(p_key text) returns int
language sql security definer set search_path = public as $$
  select coalesce((select ceil(extract(epoch from locked_until - now()))::int from login_attempts
                   where key = p_key and locked_until > now()), 0)
$$;

create function attempt_success(p_key text) returns void
language sql security definer set search_path = public as $$
  delete from login_attempts where key = p_key
$$;

-- Phụ huynh/quản trị đã đăng nhập email nhập mã mời quản trị viên đưa cho.
create function claim_invite(p_code text) returns uuid
language plpgsql security definer set search_path = public as $$
declare pid uuid; wait int; k text := 'invite:' || auth.uid();
begin
  if auth.uid() is null or is_anonymous_user() then raise exception 'Cần đăng nhập bằng email.'; end if;
  if current_profile_id() is not null then raise exception 'Tài khoản này đã thuộc một gia đình.'; end if;
  wait := attempt_begin(k);
  if wait > 0 then raise exception 'Sai nhiều lần. Đợi % giây rồi thử lại.', wait; end if;
  update profiles set auth_user_id = auth.uid(), invite_code = null
    where invite_code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'))
      and auth_user_id is null and role in ('admin','parent')
    returning id into pid;
  -- Mã sai: trả về null thay vì báo lỗi, để lần thử sai vẫn được đếm (báo lỗi sẽ hủy cả giao dịch).
  if pid is not null then perform attempt_success(k); end if;
  return pid;
end $$;

-- Quản trị tạo mã mời mới cho một hồ sơ quản trị/phụ huynh (gỡ email đang gắn, nếu có).
create function new_invite(p_profile uuid) returns text
language plpgsql security definer set search_path = public as $$
declare code text := random_code(12);
begin
  if not is_admin_of(family_of(p_profile)) then raise exception 'Không có quyền.'; end if;
  if p_profile = current_profile_id() then raise exception 'Không tạo mã mời cho chính mình.'; end if;
  update profiles set invite_code = code, auth_user_id = null where id = p_profile and role in ('admin','parent');
  if not found then raise exception 'Chỉ tạo mã mời cho phụ huynh hoặc quản trị.'; end if;
  return code;
end $$;

-- Quản trị đổi mã gia đình (khi lỡ để lộ). Học sinh đang đăng nhập không bị đăng xuất.
create function new_join_code() returns text
language plpgsql security definer set search_path = public as $$
declare code text; fid uuid := current_family_id();
begin
  if not is_admin_of(fid) then raise exception 'Không có quyền.'; end if;
  loop
    code := random_code(6);
    exit when not exists (select 1 from families where join_code = code);
  end loop;
  update families set join_code = code where id = fid;
  return code;
end $$;

-- Phụ huynh tự thêm con (hồ sơ học sinh và quan hệ phụ huynh–con được tạo cùng lúc).
create function add_child(p_id uuid, p_name text, p_avatar text, p_grade smallint, p_class text) returns uuid
language plpgsql security definer set search_path = public as $$
declare me uuid := current_profile_id(); fid uuid := current_family_id();
begin
  if current_role_name() is distinct from 'parent' then raise exception 'Không có quyền.'; end if;
  insert into profiles (id, family_id, role, name, avatar, grade, class_name)
    values (coalesce(p_id, gen_random_uuid()), fid, 'student', left(btrim(p_name), 40), left(coalesce(nullif(p_avatar, ''), '🐣'), 16), p_grade, left(coalesce(btrim(p_class), ''), 20))
    returning id into p_id;
  insert into parent_child (parent_id, child_id) values (me, p_id);
  return p_id;
end $$;

-- Quản trị xóa toàn bộ dữ liệu của family trên đám mây.
create function delete_family() returns void
language plpgsql security definer set search_path = public as $$
declare fid uuid := current_family_id();
begin
  if not is_admin_of(fid) then raise exception 'Không có quyền.'; end if;
  delete from families where id = fid;
end $$;

-- Chuyển dữ liệu từ máy cục bộ (định dạng của js/store.js / file sao lưu) lên family của quản trị đang đăng nhập.
-- Chạy lại nhiều lần không bị trùng (dựa vào import_key = mã cũ). Quản trị cục bộ trùng tên với người đang
-- chuyển thì gộp vào hồ sơ của người đang chuyển. Phụ huynh/quản trị khác nhận mã mời mới.
-- PIN học sinh: giữ dạng băm cũ ("legacy$salt$hash"); Edge Function đổi sang PBKDF2 ở lần đăng nhập đúng đầu tiên.
create function import_local(p_data jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  fid uuid := current_family_id(); me uuid := current_profile_id(); my_name text;
  u jsonb; pid uuid; ids jsonb := '{}'::jsonb; n_users int := 0; n_res int := 0; invites jsonb := '[]'::jsonb;
  ev jsonb; bk jsonb; rs jsonb; par text; seen text[];
begin
  if not is_admin_of(fid) then raise exception 'Chỉ quản trị mới chuyển được dữ liệu.'; end if;
  if jsonb_typeof(p_data->'users') <> 'array' then raise exception 'Dữ liệu không đúng định dạng.'; end if;
  perform set_config('app.importing', 'on', true);
  select name into my_name from profiles where id = me;

  for u in select * from jsonb_array_elements(p_data->'users') loop
    continue when coalesce(u->>'role', '') not in ('admin','parent','student') or coalesce(btrim(u->>'name'), '') = '';
    continue when u->>'role' = 'student' and coalesce((u->>'grade')::int, 0) not in (4, 6);
    pid := null;
    if u->>'role' = 'admin' and btrim(u->>'name') = my_name then pid := me; end if;
    if pid is null then select id into pid from profiles where family_id = fid and import_key = u->>'id'; end if;
    if pid is null then
      insert into profiles (family_id, role, name, avatar, grade, class_name, import_key)
        values (fid, u->>'role', left(btrim(u->>'name'), 40), left(coalesce(nullif(u->>'avatar', ''), '🙂'), 16),
                case when u->>'role' = 'student' then (u->>'grade')::smallint end,
                case when u->>'role' = 'student' then left(coalesce(u->>'className', ''), 20) else '' end, u->>'id')
        returning id into pid;
      n_users := n_users + 1;
      if u->>'role' = 'student' and coalesce(u->>'pinHash', '') <> '' then
        insert into student_pins (profile_id, pin_hash)
          values (pid, 'legacy$' || coalesce(u->>'salt', '') || '$' || (u->>'pinHash'))
          on conflict (profile_id) do nothing;
      end if;
    end if;
    ids := ids || jsonb_build_object(u->>'id', pid);
  end loop;

  for u in select * from jsonb_array_elements(p_data->'users') loop
    continue when u->>'role' <> 'student' or not (ids ? (u->>'id')) or jsonb_typeof(u->'parentIds') <> 'array';
    for par in select jsonb_array_elements_text(u->'parentIds') loop
      if ids ? par and exists (select 1 from profiles where id = (ids->>par)::uuid and role = 'parent') then
        insert into parent_child (parent_id, child_id) values ((ids->>par)::uuid, (ids->>(u->>'id'))::uuid) on conflict do nothing;
      end if;
    end loop;
  end loop;

  if jsonb_typeof(p_data->'events') = 'array' then
    for ev in select * from jsonb_array_elements(p_data->'events') loop
      continue when coalesce(ev->>'id', '') = '' or coalesce(btrim(ev->>'title'), '') = '';
      insert into exam_events (id, family_id, title, kind, grades, start_date, end_date, tentative, subjects, scope, note, modules, banks)
      select ev->>'id', fid, left(e.title, 200), case when e.kind in ('dinh-ki','ioe','thi-khac','moc') then e.kind else 'dinh-ki' end,
             coalesce(e.grades, '{}'), e.start, coalesce(e."end", e.start), coalesce(e.tentative, false),
             coalesce(e.subjects, '{}'), left(coalesce(e.scope, ''), 2000), left(coalesce(e.note, ''), 2000), coalesce(e.modules, '{}'), coalesce(e.banks, '{}')
      from jsonb_to_record(ev) as e(title text, kind text, grades smallint[], start date, "end" date, tentative boolean,
           subjects text[], scope text, note text, modules text[], banks text[])
      on conflict (family_id, id) do update set title = excluded.title, kind = excluded.kind, grades = excluded.grades,
        start_date = excluded.start_date, end_date = excluded.end_date, tentative = excluded.tentative, subjects = excluded.subjects,
        scope = excluded.scope, note = excluded.note, modules = excluded.modules, banks = excluded.banks;
    end loop;
  end if;

  if jsonb_typeof(p_data->'banks') = 'array' then
    for bk in select * from jsonb_array_elements(p_data->'banks') loop
      continue when coalesce(bk->>'id', '') = '' or jsonb_typeof(bk->'questions') <> 'array' or coalesce((bk->>'grade')::int, 0) not in (4, 6);
      insert into question_banks (id, family_id, title, grade, subject, minutes, note, src, questions)
        values (bk->>'id', fid, left(coalesce(bk->>'title', 'Ngân hàng'), 200), (bk->>'grade')::smallint, left(coalesce(bk->>'subject', ''), 60),
                least(greatest(coalesce((bk->>'minutes')::int, 0), 0), 600), left(coalesce(bk->>'note', ''), 2000), left(coalesce(bk->>'src', ''), 200000), bk->'questions')
        on conflict (family_id, id) do update set title = excluded.title, grade = excluded.grade, subject = excluded.subject,
          minutes = excluded.minutes, note = excluded.note, src = excluded.src, questions = excluded.questions;
    end loop;
  end if;

  if jsonb_typeof(p_data->'results') = 'array' then
    for rs in select * from jsonb_array_elements(p_data->'results') loop
      continue when not (ids ? (rs->>'userId')) or coalesce((rs->>'t')::int, 0) <= 0 or rs->>'source' not in ('module','bank');
      continue when not exists (select 1 from profiles where id = (ids->>(rs->>'userId'))::uuid and role = 'student');
      insert into results (profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics, import_key, at)
        values ((ids->>(rs->>'userId'))::uuid, rs->>'source', left(coalesce(rs->>'refId', ''), 80), left(coalesce(rs->>'subject', ''), 60),
                left(coalesce(rs->>'label', ''), 120), left(coalesce(rs->>'mode', ''), 20),
                least(greatest(coalesce((rs->>'r')::int, 0), 0), least((rs->>'t')::int, 1000)), least((rs->>'t')::int, 1000),
                greatest(coalesce((rs->>'s')::int, 0), 0),
                case when jsonb_typeof(rs->'wrongTopics') = 'array' then (select array_agg(x) from (select left(x, 200) x from jsonb_array_elements_text(rs->'wrongTopics') x limit 50) w) end,
                coalesce(rs->>'id', md5(rs::text)), coalesce((rs->>'at')::timestamptz, now()))
        on conflict (family_id, import_key) do nothing;
      if found then n_res := n_res + 1; end if;
    end loop;
  end if;

  if jsonb_typeof(p_data->'seedBanksSeen') = 'array' then
    select array(select distinct x from (select unnest(seed_banks_seen) x from families where id = fid
                                         union select jsonb_array_elements_text(p_data->'seedBanksSeen')) s) into seen;
    update families set seed_banks_seen = seen where id = fid;
  end if;
  if coalesce(btrim(p_data#>>'{settings,schoolName}'), '') <> '' then
    update families set name = left(btrim(p_data#>>'{settings,schoolName}'), 80) where id = fid and name = '';
  end if;

  perform trim_results(fid);
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'role', role, 'code', invite_code) order by role, name), '[]')
    into invites from profiles where family_id = fid and invite_code is not null;
  return jsonb_build_object('users', n_users, 'results', n_res, 'invites', invites);
end $$;

-- Quyền gọi hàm: bỏ hết rồi cấp lại đúng chỗ cần. Các hàm hỗ trợ RLS phải gọi được bởi authenticated
-- vì chính sách chạy với quyền của người đăng nhập. Hàm đếm lần thử chỉ dành cho Edge Function (service role).
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function current_profile_id(), current_family_id(), current_role_name(), is_admin_of(uuid),
  is_parent_of(uuid), family_of(uuid),
  create_family(text, text, text, text, jsonb, text[]), claim_invite(text), new_invite(uuid), new_join_code(),
  add_child(uuid, text, text, smallint, text), delete_family(), import_local(jsonb)
  to authenticated;
grant execute on all functions in schema public to service_role;
grant all on all tables in schema public to service_role;
