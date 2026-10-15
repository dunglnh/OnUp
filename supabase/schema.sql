-- Đồng bộ đám mây. Chạy MỘT LẦN trong Supabase → SQL Editor → New query → dán cả file → Run.
-- Hướng dẫn từng bước: docs/HUONG-DAN-SUPABASE.md.
--
-- Ai đăng nhập thế nào:
--  * Quản trị, phụ huynh: email. profiles.auth_user_id trỏ vào auth.users. Chỉ email có trong allowed_creators
--    mới tạo được gia đình mới; người khác vào gia đình bằng mã mời.
--  * Học sinh: không có email. App đăng nhập ẩn danh (Anonymous sign-in), rồi Edge Function student-login
--    kiểm tra mã gia đình + PIN và ghi một dòng student_sessions (hết hạn sau 30 ngày) gắn người dùng ẩn danh
--    đó với hồ sơ học sinh. Người dùng ẩn danh chưa được gắn thì không đọc được gì.
--
-- Anon key là công khai, nên mọi quyền đều do RLS dưới đây quyết định:
--  * quản trị: đọc/ghi mọi thứ trong family của mình;
--  * phụ huynh: đọc hồ sơ và kết quả của con mình (parent_child), sửa hồ sơ con, đọc lịch thi và ngân hàng đề của family;
--  * học sinh: đọc hồ sơ của mình, lịch thi và ngân hàng đề của family, chỉ ghi và đọc kết quả của chính mình.
-- Lưu ý: ai biết mã gia đình đều xem được TÊN và hình đại diện của các học sinh trong gia đình (để chọn tên khi
-- đăng nhập). Mã gia đình chỉ quản trị và phụ huynh đọc được.
-- PIN học sinh nằm trong student_pins; bộ đếm thử sai trong login_attempts; thiết bị quen trong known_devices.
-- Ba bảng này bật RLS, không có chính sách nào, nên chỉ Edge Function (service role) đọc được.

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- ============================== BẢNG ==============================

create table families (
  id uuid primary key default gen_random_uuid(),
  name text not null default '' check (char_length(name) <= 80),
  school_year text not null default '2026–2027' check (char_length(school_year) <= 20),
  join_code text unique not null check (join_code ~ '^[A-Z0-9]{6,12}$'),  -- mã gia đình để học sinh đăng nhập
  seed_banks_seen text[] not null default '{}' check (cardinality(seed_banks_seen) <= 1000),  -- như seedBanksSeen trong js/store.js
  created_at timestamptz not null default now()
);

-- Email được phép tạo gia đình mới. Chủ project tự thêm trong SQL Editor (xem hướng dẫn, bước 2).
create table allowed_creators (
  email text primary key check (email = lower(btrim(email)))
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
  check (cardinality(grades) <= 2 and cardinality(subjects) <= 30 and cardinality(modules) <= 50 and cardinality(banks) <= 100
         and char_length(array_to_string(subjects || modules || banks, '')) <= 5000),
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
  questions jsonb not null check (jsonb_typeof(questions) = 'array' and pg_column_size(questions) <= 500000),
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
  wrong_topics text[] check (wrong_topics is null or (cardinality(wrong_topics) <= 50 and char_length(array_to_string(wrong_topics, '')) <= 5000)),
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

-- PIN học sinh đã băm (PBKDF2 + pepper trong Edge Function).
create table student_pins (
  profile_id uuid primary key references profiles(id) on delete cascade,
  pin_hash text not null,
  updated_at timestamptz not null default now()
);

-- Thiết bị (người dùng ẩn danh) đã từng đăng nhập đúng: thử sai trên máy của con được đếm riêng,
-- nên người lạ thử sai không khóa được máy của con.
create table known_devices (
  profile_id uuid references profiles(id) on delete cascade,
  auth_user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, auth_user_id)
);

-- Đếm số lần thử (PIN, mã gia đình, mã mời). Khóa là chuỗi: 'pin:<hồ sơ>', 'pin:<hồ sơ>:<thiết bị>',
-- 'pinu:<người gọi>', 'fam:<gia đình>', 'codeu:<người gọi>', 'ip:<băm IP>', 'invite:<người gọi>'.
create table login_attempts (
  key text primary key,
  fails int not null default 0,          -- lần thử trong lượt hiện tại (đủ p_max thì khóa tạm)
  rounds int not null default 0,         -- số lần đã bị khóa tạm liên tiếp (thời gian khóa gấp đôi mỗi lần)
  locked_until timestamptz,
  since_ok int not null default 0,       -- lần thử sai kể từ lần đúng gần nhất
  day_fails int not null default 0,      -- lần thử sai trong ngày (lần đúng không xóa)
  day_start timestamptz,
  hard boolean not null default false,   -- khóa hẳn, chỉ người lớn đặt lại PIN mới mở
  updated_at timestamptz not null default now()
);
create index on login_attempts (updated_at);

-- ============================== HÀM HỖ TRỢ CHO RLS ==============================
-- security definer để đọc profiles mà không vướng chính RLS của profiles (tránh đệ quy).

create function current_profile_id() returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce(
    (select p.id from profiles p where p.auth_user_id = auth.uid()),
    (select s.profile_id from student_sessions s where s.auth_user_id = auth.uid() and s.created_at > now() - interval '30 days'))
$$;

create function current_family_id() returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select family_id from profiles where id = current_profile_id()
$$;

create function current_role_name() returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select role from profiles where id = current_profile_id()
$$;

create function is_admin_of(fid uuid) returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from profiles where id = current_profile_id() and role = 'admin' and family_id = fid)
$$;

create function is_parent_of(child uuid) returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from parent_child pc join profiles p on p.id = pc.parent_id
                 where pc.parent_id = current_profile_id() and p.role = 'parent' and pc.child_id = child)
$$;

-- Gia đình của một hồ sơ, chỉ khi hồ sơ đó cùng gia đình với người gọi (không dùng để dò hồ sơ nhà khác).
create function family_of(pid uuid) returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select family_id from profiles where id = pid and family_id = current_family_id()
$$;

create function is_anonymous_user() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce((select u.is_anonymous from auth.users u where u.id = auth.uid()), true)
$$;

-- Mã ngẫu nhiên (pgcrypto). Bảng chữ 32 kí tự, bỏ các kí tự dễ nhầm 0/O, 1/I.
create function random_code(len int) returns text
language plpgsql volatile set search_path = public, pg_temp as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  bytes bytea := extensions.gen_random_bytes(len);
  out text := '';
begin
  for i in 0 .. len - 1 loop
    out := out || substr(alphabet, (get_byte(bytes, i) % 32) + 1, 1);
  end loop;
  return out;
end $$;

-- ============================== TRIGGER ==============================

-- Phải còn ít nhất một quản trị (trừ khi đang xóa cả family). Khóa dòng family để hai lệnh xóa cùng lúc không lọt.
create function profiles_keep_admin() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if old.role = 'admin' then
    perform 1 from families where id = old.family_id for update;
    if found and not exists (select 1 from profiles where family_id = old.family_id and role = 'admin' and id <> old.id) then
      raise exception 'Phải còn ít nhất một tài khoản quản trị.';
    end if;
  end if;
  return old;
end $$;
create trigger profiles_keep_admin before delete on profiles for each row execute function profiles_keep_admin();

-- Hồ sơ quản trị/phụ huynh mới chưa có email thì tự có mã mời.
create function profiles_before_insert() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  new.name := btrim(new.name);
  if new.role in ('admin','parent') and new.auth_user_id is null and new.invite_code is null then
    new.invite_code := random_code(12);
  end if;
  if new.role <> 'student' then new.grade := null; new.class_name := ''; end if;
  return new;
end $$;
create trigger profiles_before_insert before insert on profiles for each row execute function profiles_before_insert();

-- Học sinh tự sửa hồ sơ của mình thì chỉ được đổi hình đại diện.
create function profiles_before_update() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if old.role = 'student' and old.id = current_profile_id()
     and (new.name is distinct from old.name or new.grade is distinct from old.grade or new.class_name is distinct from old.class_name) then
    raise exception 'Con chỉ đổi được hình đại diện. Nhờ bố mẹ sửa tên hoặc lớp nhé.';
  end if;
  return new;
end $$;
create trigger profiles_before_update before update on profiles for each row execute function profiles_before_update();

-- Giới hạn số mục mỗi gia đình (chặn làm đầy bộ nhớ của project).
create function enforce_family_quota() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare lim int := TG_ARGV[0]::int; n int;
begin
  execute format('select count(*) from %I where family_id = $1', TG_TABLE_NAME) into n using new.family_id;
  if n >= lim then raise exception 'Gia đình đã có % mục, không thêm được nữa.', lim; end if;
  return new;
end $$;
create trigger profiles_quota before insert on profiles for each row execute function enforce_family_quota('300');
create trigger exam_events_quota before insert on exam_events for each row execute function enforce_family_quota('500');
create trigger question_banks_quota before insert on question_banks for each row execute function enforce_family_quota('100');

-- Phụ huynh–con: cùng family, đúng vai trò.
create function parent_child_check() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if not exists (
    select 1 from profiles p join profiles c on c.family_id = p.family_id
    where p.id = new.parent_id and p.role = 'parent' and c.id = new.child_id and c.role = 'student') then
    raise exception 'Phụ huynh và học sinh phải cùng gia đình.';
  end if;
  return new;
end $$;
create trigger parent_child_check before insert or update on parent_child for each row execute function parent_child_check();

-- Kết quả: family_id lấy từ hồ sơ; thời điểm do máy chủ đặt; tối đa 60 kết quả mỗi 10 phút cho mỗi học sinh
-- (trừ khi chuyển dữ liệu cũ qua import_local).
create function results_before_insert() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  new.family_id := (select family_id from profiles where id = new.profile_id);
  if current_setting('app.importing', true) is distinct from 'on' then
    new.at := now(); new.import_key := null;
    if (select count(*) from results where profile_id = new.profile_id and at > now() - interval '10 minutes') >= 60 then
      raise exception 'Gửi quá nhiều kết quả trong thời gian ngắn. Đợi vài phút rồi thử lại.';
    end if;
  end if;
  return new;
end $$;
create trigger results_before_insert before insert on results for each row execute function results_before_insert();

-- Tối đa 2000 kết quả mỗi học sinh: bỏ bớt bản ghi cũ nhất của CHÍNH học sinh đó, không đụng tới người khác.
create function trim_results_of(pids uuid[]) returns void
language sql security definer set search_path = public, pg_temp as $$
  delete from results where id in (
    select id from (select id, row_number() over (partition by profile_id order by at desc, id desc) rn
                    from results where profile_id = any(pids)) x
    where rn > 2000)
$$;
create function results_trim() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if current_setting('app.importing', true) is distinct from 'on' then
    perform trim_results_of(array(select distinct profile_id from ins));
  end if;
  return null;
end $$;
create trigger results_trim after insert on results referencing new table as ins
  for each statement execute function results_trim();

-- ============================== RLS ==============================

alter table families enable row level security;
alter table allowed_creators enable row level security;
alter table profiles enable row level security;
alter table parent_child enable row level security;
alter table exam_events enable row level security;
alter table question_banks enable row level security;
alter table results enable row level security;
alter table student_sessions enable row level security;
alter table student_pins enable row level security;
alter table known_devices enable row level security;
alter table login_attempts enable row level security;

-- Không cho vai trò anon (chưa đăng nhập) đụng vào bảng nào. Học sinh đăng nhập ẩn danh có vai trò authenticated.
revoke all on families, allowed_creators, profiles, parent_child, exam_events, question_banks, results,
  student_sessions, student_pins, known_devices, login_attempts from anon, authenticated;

-- families: không cấp cột join_code (phụ huynh, quản trị đọc qua get_join_code()).
grant select (id, name, school_year, seed_banks_seen, created_at), update (name, school_year, seed_banks_seen) on families to authenticated;
grant select, delete, insert (id, family_id, role, name, avatar, grade, class_name),
  update (name, avatar, grade, class_name) on profiles to authenticated;
grant select, insert, delete on parent_child to authenticated;
grant select, insert, update, delete on exam_events, question_banks to authenticated;
grant select, delete, insert (id, profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics) on results to authenticated;
grant select, delete on student_sessions to authenticated;
-- allowed_creators, student_pins, known_devices, login_attempts: không cấp gì.

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

-- ============================== ĐẾM LẦN THỬ (chỉ Edge Function và các hàm dưới gọi) ==============================

-- Đếm một lần thử TRƯỚC khi kiểm tra (gửi nhiều yêu cầu cùng lúc cũng không vượt giới hạn).
-- Trả về: 0 = được thử; > 0 = số giây phải đợi; -1 = khóa hẳn (chỉ mở khi người lớn đặt lại PIN).
--  * p_max lần trong một lượt thì khóa p_seconds giây, mỗi lần khóa tiếp theo gấp đôi (tối đa 2^p_max_rounds lần).
--  * Không có lần thử nào trong p_window giây thì quên lượt và số lần khóa.
--  * p_cap: số lần sai tối đa kể từ lần đúng gần nhất; p_day_cap: số lần sai tối đa trong ngày (lần đúng không xóa).
create function attempt_begin(p_key text, p_max int, p_seconds int, p_max_rounds int default 7, p_window int default 86400,
                              p_cap int default null, p_day_cap int default null) returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare a login_attempts;
begin
  delete from login_attempts where updated_at < now() - interval '30 days' and not hard and key <> p_key;
  insert into login_attempts (key) values (p_key) on conflict (key) do nothing;
  select * into a from login_attempts where key = p_key for update;
  if a.hard then return -1; end if;
  if a.locked_until is not null and a.locked_until > now() then
    return ceil(extract(epoch from a.locked_until - now()))::int;
  end if;
  if a.updated_at < now() - make_interval(secs => p_window) then a.fails := 0; a.rounds := 0; end if;
  if a.day_start is null or a.day_start < now() - interval '1 day' then a.day_start := now(); a.day_fails := 0; end if;
  if (p_cap is not null and a.since_ok >= p_cap) or (p_day_cap is not null and a.day_fails >= p_day_cap) then
    update login_attempts set hard = true, updated_at = now() where key = p_key;
    return -1;
  end if;
  a.fails := a.fails + 1; a.since_ok := a.since_ok + 1; a.day_fails := a.day_fails + 1;
  if a.fails >= p_max then
    a.locked_until := now() + make_interval(secs => p_seconds * power(2, least(a.rounds, p_max_rounds)));
    a.rounds := a.rounds + 1; a.fails := 0;
  end if;
  update login_attempts set fails = a.fails, rounds = a.rounds, locked_until = a.locked_until, since_ok = a.since_ok,
    day_fails = a.day_fails, day_start = a.day_start, updated_at = now() where key = p_key;
  return 0;
end $$;

-- Lần thử vừa đếm hóa ra đúng. p_reset: xóa lượt hiện tại và số lần sai kể từ lần đúng (dùng cho PIN của chính hồ sơ);
-- không thì chỉ trừ lần vừa đếm (bộ đếm theo người gọi, theo gia đình). Không bao giờ mở khóa hẳn.
create function attempt_done(p_key text, p_reset boolean) returns void
language sql security definer set search_path = public, pg_temp as $$
  update login_attempts set
    fails = case when p_reset then 0 else greatest(fails - 1, 0) end,
    since_ok = case when p_reset then 0 else greatest(since_ok - 1, 0) end,
    day_fails = greatest(day_fails - 1, 0),
    locked_until = case when p_reset then null else locked_until end,
    updated_at = now()
  where key = p_key and not hard
$$;

-- Người lớn đặt lại PIN: xóa mọi bộ đếm PIN của hồ sơ (cả khóa hẳn).
create function attempt_reset_profile(p_profile uuid) returns void
language sql security definer set search_path = public, pg_temp as $$
  delete from login_attempts where key = 'pin:' || p_profile or key like 'pin:' || p_profile || ':%'
$$;

-- Tra mã gia đình, đếm lần nhập sai theo các khóa p_keys (người gọi, IP) trong cùng một giao dịch có khóa dòng,
-- nên nhiều yêu cầu cùng lúc cũng chỉ được thử đúng số lần cho phép.
create function family_by_code(p_code text, p_keys text[], p_max int, p_seconds int, p_window int) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare k text; a login_attempts; w int := 0; f families;
begin
  foreach k in array coalesce(p_keys, '{}') loop
    insert into login_attempts (key) values (k) on conflict (key) do nothing;
    select * into a from login_attempts where key = k for update;
    if a.locked_until is not null and a.locked_until > now() then
      w := greatest(w, ceil(extract(epoch from a.locked_until - now()))::int);
    end if;
  end loop;
  if w > 0 then return jsonb_build_object('wait', w); end if;
  select * into f from families where join_code = p_code;
  if f.id is not null then return jsonb_build_object('id', f.id, 'name', f.name); end if;
  foreach k in array coalesce(p_keys, '{}') loop
    perform attempt_begin(k, p_max, p_seconds, 2, p_window);
  end loop;
  return jsonb_build_object('miss', true);
end $$;

-- ============================== HÀM GỌI TỪ APP (RPC) ==============================
-- Mọi hàm security definer tự kiểm tra quyền của người gọi.

-- Người dùng email (có trong allowed_creators) chưa thuộc family nào: tạo family mới, mình là quản trị, chép lịch thi mặc định.
create function create_family(p_name text, p_school_year text, p_admin_name text, p_avatar text,
                              p_events jsonb, p_seed_banks text[]) returns uuid
language plpgsql security definer set search_path = public, pg_temp as $$
declare fid uuid; pid uuid; code text;
begin
  if auth.uid() is null or is_anonymous_user() then raise exception 'Cần đăng nhập bằng email.'; end if;
  if current_profile_id() is not null then raise exception 'Tài khoản này đã thuộc một gia đình.'; end if;
  if not exists (select 1 from allowed_creators c join auth.users u on lower(u.email) = c.email where u.id = auth.uid()) then
    raise exception 'Email này chưa được phép tạo gia đình mới. Nếu bạn là phụ huynh, hãy nhờ người quản trị gửi mã mời.';
  end if;
  if jsonb_typeof(coalesce(p_events, '[]'::jsonb)) <> 'array' or jsonb_array_length(coalesce(p_events, '[]'::jsonb)) > 200 then
    raise exception 'Lịch thi không hợp lệ.';
  end if;
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

-- Phụ huynh/quản trị đã đăng nhập email nhập mã mời quản trị viên đưa cho.
create function claim_invite(p_code text) returns uuid
language plpgsql security definer set search_path = public, pg_temp as $$
declare pid uuid; wait int; k text := 'invite:' || auth.uid();
begin
  if auth.uid() is null or is_anonymous_user() then raise exception 'Cần đăng nhập bằng email.'; end if;
  if current_profile_id() is not null then raise exception 'Tài khoản này đã thuộc một gia đình.'; end if;
  wait := attempt_begin(k, 5, 30);
  if wait > 0 then raise exception 'Sai nhiều lần. Đợi % giây rồi thử lại.', wait; end if;
  update profiles set auth_user_id = auth.uid(), invite_code = null
    where invite_code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'))
      and auth_user_id is null and role in ('admin','parent')
    returning id into pid;
  -- Mã sai: trả về null thay vì báo lỗi, để lần thử sai vẫn được đếm (báo lỗi sẽ hủy cả giao dịch).
  if pid is not null then perform attempt_done(k, true); end if;
  return pid;
end $$;

-- Mã gia đình: chỉ quản trị và phụ huynh đọc được (học sinh không cần, đã có trên máy).
create function get_join_code() returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select join_code from families where id = current_family_id() and current_role_name() in ('admin','parent')
$$;

-- Tình trạng PIN của các con mà người gọi quản lý: bị khóa vì thử sai nhiều; còn PIN cũ (chuyển từ máy, nên đặt lại).
create function child_pin_status() returns table (profile_id uuid, locked boolean, legacy boolean)
language sql stable security definer set search_path = public, pg_temp as $$
  select p.id,
    exists (select 1 from login_attempts a where (a.key = 'pin:' || p.id or a.key like 'pin:' || p.id || ':%') and a.hard),
    coalesce((select sp.pin_hash !~ '^pbkdf2' from student_pins sp where sp.profile_id = p.id), false)
  from profiles p
  where p.role = 'student' and (is_admin_of(p.family_id) or is_parent_of(p.id))
$$;

-- Đăng xuất con khỏi mọi máy (quản trị hoặc phụ huynh của con).
create function sign_out_child(p_profile uuid) returns int
language plpgsql security definer set search_path = public, pg_temp as $$
declare n int;
begin
  if not (is_admin_of(family_of(p_profile)) or is_parent_of(p_profile)) then raise exception 'Không có quyền.'; end if;
  delete from student_sessions where profile_id = p_profile;
  get diagnostics n = row_count;
  return n;
end $$;

-- Quản trị tạo mã mời mới cho một hồ sơ quản trị/phụ huynh (gỡ email đang gắn, nếu có).
create function new_invite(p_profile uuid) returns text
language plpgsql security definer set search_path = public, pg_temp as $$
declare code text := random_code(12);
begin
  if not is_admin_of(family_of(p_profile)) then raise exception 'Không có quyền.'; end if;
  if p_profile = current_profile_id() then raise exception 'Không tạo mã mời cho chính mình.'; end if;
  update profiles set invite_code = code, auth_user_id = null where id = p_profile and role in ('admin','parent');
  if not found then raise exception 'Chỉ tạo mã mời cho phụ huynh hoặc quản trị.'; end if;
  return code;
end $$;

-- Quản trị đổi mã gia đình (khi lỡ để lộ). Mọi máy của học sinh bị đăng xuất.
create function new_join_code() returns text
language plpgsql security definer set search_path = public, pg_temp as $$
declare code text; fid uuid := current_family_id();
begin
  if not is_admin_of(fid) then raise exception 'Không có quyền.'; end if;
  loop
    code := random_code(6);
    exit when not exists (select 1 from families where join_code = code);
  end loop;
  update families set join_code = code where id = fid;
  delete from student_sessions s using profiles p where p.id = s.profile_id and p.family_id = fid;
  return code;
end $$;

-- Phụ huynh tự thêm con (hồ sơ học sinh và quan hệ phụ huynh–con được tạo cùng lúc).
create function add_child(p_id uuid, p_name text, p_avatar text, p_grade smallint, p_class text) returns uuid
language plpgsql security definer set search_path = public, pg_temp as $$
declare me uuid := current_profile_id(); fid uuid := current_family_id();
begin
  if current_role_name() is distinct from 'parent' then raise exception 'Không có quyền.'; end if;
  insert into profiles (id, family_id, role, name, avatar, grade, class_name)
    values (coalesce(p_id, gen_random_uuid()), fid, 'student', left(btrim(p_name), 40), left(coalesce(nullif(p_avatar, ''), '🐣'), 16), p_grade, left(coalesce(btrim(p_class), ''), 20))
    returning id into p_id;
  insert into parent_child (parent_id, child_id) values (me, p_id);
  return p_id;
end $$;

-- Quản trị xóa toàn bộ dữ liệu của family trên đám mây (email đăng nhập của người lớn vẫn còn trong Supabase Auth).
create function delete_family() returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare fid uuid := current_family_id();
begin
  if not is_admin_of(fid) then raise exception 'Không có quyền.'; end if;
  delete from families where id = fid;
end $$;

-- Chuyển dữ liệu từ máy cục bộ (định dạng của js/store.js / file sao lưu) lên family của quản trị đang đăng nhập.
-- Chạy lại nhiều lần không bị trùng (dựa vào import_key = mã cũ, hoặc mã trên máy chủ). Quản trị cục bộ trùng tên
-- với người đang chuyển thì gộp vào hồ sơ của người đang chuyển. Phụ huynh/quản trị khác nhận mã mời mới.
-- PIN học sinh: giữ dạng băm cũ ("legacy$salt$hash"); Edge Function bọc lại bằng PBKDF2 ngay sau khi chuyển.
-- Trả về ids: bảng đổi mã cũ → mã mới (để app chép tiến độ trong bài ôn sang mã mới).
create function import_local(p_data jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  fid uuid := current_family_id(); me uuid := current_profile_id(); my_name text;
  u jsonb; pid uuid; ids jsonb := '{}'::jsonb; n_users int := 0; n_res int := 0; invites jsonb := '[]'::jsonb;
  ev jsonb; bk jsonb; rs jsonb; par text; seen text[];
begin
  if not is_admin_of(fid) then raise exception 'Chỉ quản trị mới chuyển được dữ liệu.'; end if;
  if jsonb_typeof(p_data->'users') <> 'array' then raise exception 'Dữ liệu không đúng định dạng.'; end if;
  if p_data->>'from' = 'cloud' then raise exception 'File này là bản sao lưu từ đám mây, dữ liệu đã có trên máy chủ.'; end if;
  perform set_config('app.importing', 'on', true);
  select name into my_name from profiles where id = me;

  for u in select * from jsonb_array_elements(p_data->'users') loop
    continue when coalesce(u->>'role', '') not in ('admin','parent','student') or coalesce(btrim(u->>'name'), '') = '';
    continue when u->>'role' = 'student' and coalesce((u->>'grade')::int, 0) not in (4, 6);
    pid := null;
    if u->>'role' = 'admin' and btrim(u->>'name') = my_name then pid := me; end if;
    if pid is null then
      select id into pid from profiles where family_id = fid and (import_key = u->>'id' or id::text = u->>'id');
    end if;
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
      continue when exists (select 1 from results where id::text = rs->>'id');
      insert into results (profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics, import_key, at)
        values ((ids->>(rs->>'userId'))::uuid, rs->>'source', left(coalesce(rs->>'refId', ''), 80), left(coalesce(rs->>'subject', ''), 60),
                left(coalesce(rs->>'label', ''), 120), left(coalesce(rs->>'mode', ''), 20),
                least(greatest(coalesce((rs->>'r')::int, 0), 0), least((rs->>'t')::int, 1000)), least((rs->>'t')::int, 1000),
                greatest(coalesce((rs->>'s')::int, 0), 0),
                case when jsonb_typeof(rs->'wrongTopics') = 'array' then (select array_agg(x) from (select left(x, 100) x from jsonb_array_elements_text(rs->'wrongTopics') x limit 50) w) end,
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

  perform trim_results_of(array(select id from profiles where family_id = fid and role = 'student'));
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'role', role, 'code', invite_code) order by role, name), '[]')
    into invites from profiles where family_id = fid and invite_code is not null;
  return jsonb_build_object('users', n_users, 'results', n_res, 'invites', invites, 'ids', ids);
end $$;

-- Quyền gọi hàm: bỏ hết rồi cấp lại đúng chỗ cần. Các hàm hỗ trợ RLS phải gọi được bởi authenticated
-- vì chính sách chạy với quyền của người đăng nhập. Hàm đếm lần thử chỉ dành cho Edge Function (service role).
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function current_profile_id(), current_family_id(), current_role_name(), is_admin_of(uuid),
  is_parent_of(uuid), family_of(uuid),
  create_family(text, text, text, text, jsonb, text[]), claim_invite(text), get_join_code(), child_pin_status(),
  sign_out_child(uuid), new_invite(uuid), new_join_code(), add_child(uuid, text, text, smallint, text), delete_family(), import_local(jsonb)
  to authenticated;
grant execute on all functions in schema public to service_role;
grant all on all tables in schema public to service_role;
