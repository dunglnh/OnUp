-- OnUp · bản đám mây (Supabase). Chạy MỘT LẦN trên project mới: SQL Editor → New query → dán cả file → Run.
-- Hướng dẫn: docs/HUONG-DAN-SUPABASE.md. Thiết kế: docs/THIET-KE-TAI-KHOAN.md.
--
-- Ai là ai:
--  * Chủ app (owner): người dùng Supabase Auth có trong app_owners. Tạo và quản lý tài khoản qua Edge Function
--    "admin" (supabase/functions/admin/index.ts), hàm đó dùng khóa bí mật nên bỏ qua RLS.
--  * Một tài khoản = một gia đình (families), do phụ huynh giữ. Đăng nhập bằng tên đăng nhập + mật khẩu; Supabase Auth
--    lưu tên đăng nhập dạng email nội bộ <tên-đăng-nhập>@users.onup.invalid (đuôi .invalid: không bao giờ gửi thư).
--  * Con là hồ sơ (profiles) trong tài khoản, không có tài khoản riêng: máy của con dùng phiên đăng nhập của bố mẹ.
--    pin_hash của hồ sơ con chỉ là khóa trên giao diện (anh em khỏi dùng nhầm), không phải bảo mật.
--
-- Quyền (khóa anon/publishable là công khai, nên mọi quyền do RLS dưới đây quyết định):
--  * Tài khoản đang hoạt động: đọc/ghi hồ sơ con, kết quả, lịch thi, ngân hàng đề tự nhập của gia đình mình;
--    đọc dòng families của mình, chỉ sửa display_name, school_year, seed_banks_seen.
--  * Tài khoản bị khóa (status = 'locked'): chỉ còn đọc được dòng families của mình (để app báo "đã bị khóa").
--    Edge Function còn cấm đăng nhập (ban) người dùng đó trong Supabase Auth.
--  * plans: ai đã đăng nhập cũng đọc; chỉ owner sửa. paid_banks: đọc được khi đề đã đăng VÀ (là đề thử, hoặc gói
--    đang hiệu lực cho đọc mọi đề); chỉ owner ghi.
--  * app_owners, admin_notes, admin_log, plan_log: chỉ owner.
--
-- Gói: hôm nay mọi tài khoản là 'free', và gói 'free' cho dùng mọi nội dung, tối đa 5 hồ sơ con (chặn lạm dụng).
-- Khi bắt đầu bán (docs/THIET-KE-TAI-KHOAN.md mục 9) chỉ cần sửa bảng plans, ví dụ:
--   update plans set max_children = 1, all_banks = false where id = 'free';
--   update plans set max_children = 3, price = 300000 where id = 'family';
-- Gói trả phí hết hạn (plan_until < hôm nay, giờ Việt Nam) thì tài khoản tự về hạn mức 'free', không mất dữ liệu:
-- hồ sơ con vượt hạn mức bị khóa (locked = true: xem được kết quả cũ, không ghi kết quả mới) tới khi gia hạn.

-- ============================== BẢNG ==============================

-- Hạn mức theo gói.
create table plans (
  id text primary key check (id ~ '^[a-z][a-z0-9_]{1,19}$'),
  name text not null check (char_length(name) between 1 and 60),
  max_children int not null check (max_children between 1 and 50),
  all_banks boolean not null default true,  -- true: đọc mọi đề đã đăng trong paid_banks; false: chỉ đề thử
  price int check (price >= 0),             -- đồng; để trống = chưa bán
  note text not null default '' check (char_length(note) <= 500)
);
insert into plans (id, name, max_children, all_banks) values
  ('free', 'Miễn phí', 5, true),
  ('family', 'Gói Gia đình', 5, true);

-- Chủ app. Thêm bằng SQL Editor (xem hướng dẫn, bước 3), không có cách nào thêm từ trình duyệt.
create table app_owners (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Một dòng mỗi tài khoản (gia đình). Chỉ Edge Function admin tạo, xóa, đổi gói, đổi trạng thái.
create table families (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  -- 4–20 kí tự a-z 0-9 . _, đầu và cuối là chữ hoặc số, không có hai dấu chấm liền nhau (để làm phần trước @ của email)
  username text not null unique check (username ~ '^[a-z0-9][a-z0-9._]{2,18}[a-z0-9]$' and position('..' in username) = 0),
  display_name text not null default '' check (char_length(display_name) <= 80),
  school_year text not null default '2026–2027' check (char_length(school_year) <= 20),
  seed_banks_seen text[] not null default '{}' check (cardinality(seed_banks_seen) <= 1000),  -- như seedBanksSeen trong js/store.js
  plan text not null default 'free' references plans(id),
  plan_until date,                                   -- gói trả phí dùng đến hết ngày này (giờ Việt Nam)
  must_change_password boolean not null default true,  -- mật khẩu tạm: app bắt đổi ở lần đăng nhập tới
  status text not null default 'active' check (status in ('active','locked')),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);
create index on families (plan_until) where plan <> 'free';

-- Hồ sơ con.
create table profiles (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,  -- để trống khi thêm: trigger tự điền gia đình của người gọi
  name text not null check (char_length(btrim(name)) between 1 and 40),
  avatar text not null default '🐣' check (char_length(avatar) <= 16),
  grade smallint not null check (grade between 1 and 12),
  class_name text not null default '' check (char_length(class_name) <= 20),
  pin_hash text check (char_length(pin_hash) <= 200),  -- PIN tùy chọn, app tự băm; máy chủ không đọc
  locked boolean not null default false,             -- vượt hạn mức của gói đang hiệu lực (sync_profile_locks)
  import_key text,                                   -- mã cũ ở máy cục bộ, để chuyển dữ liệu nhiều lần không bị trùng
  created_at timestamptz not null default now(),
  unique (family_id, import_key)
);
create index on profiles (family_id, created_at);

create table exam_events (
  id text not null check (char_length(id) between 1 and 80),
  family_id uuid not null references families(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  kind text not null check (kind in ('dinh-ki','ioe','thi-khac','moc')),
  grades smallint[] not null check (grades <@ '{1,2,3,4,5,6,7,8,9,10,11,12}'), start_date date, end_date date,
  tentative boolean not null default true,
  subjects text[] not null default '{}', scope text not null default '' check (char_length(scope) <= 2000),
  note text not null default '' check (char_length(note) <= 2000),
  modules text[] not null default '{}', banks text[] not null default '{}',
  check (cardinality(grades) <= 12 and cardinality(subjects) <= 30 and cardinality(modules) <= 50 and cardinality(banks) <= 100
         and char_length(array_to_string(subjects || modules || banks, '')) <= 5000),
  primary key (family_id, id)
);

-- Ngân hàng đề phụ huynh tự nhập (như mục Quản trị → Ngân hàng đề của bản lưu trên máy).
create table question_banks (
  id text not null check (char_length(id) between 1 and 80),
  family_id uuid not null references families(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  grade smallint not null check (grade between 1 and 12), subject text not null default '' check (char_length(subject) <= 60),
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

-- Đề của chủ app (chuyển từ data/banks/ bằng supabase/banks-to-sql.js). Câu hỏi cùng dạng với đề có sẵn trong data/banks/.
create table paid_banks (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]{0,79}$'),
  title text not null check (char_length(title) between 1 and 200),
  grade smallint not null check (grade between 1 and 12),
  subject text not null default '' check (char_length(subject) <= 60),
  exam text not null default '' check (char_length(exam) <= 80),  -- mã kì thi trong data/calendar-*.js, ví dụ 'ck1-l4'
  minutes int not null default 0 check (minutes between 0 and 600),
  note text not null default '' check (char_length(note) <= 2000),
  questions jsonb not null check (jsonb_typeof(questions) = 'array' and pg_column_size(questions) <= 1000000),
  free_trial boolean not null default false,  -- đề thử: tài khoản nào cũng đọc được
  published boolean not null default false,   -- chưa đăng thì chỉ owner thấy
  sort int not null default 0,
  updated_at timestamptz not null default now()
);
create index on paid_banks (grade, exam);

-- Ghi chú của chủ app về một tài khoản (tên Zalo, số điện thoại…). Chỉ owner đọc.
create table admin_notes (
  family_id uuid primary key references families(id) on delete cascade,
  note text not null default '' check (char_length(note) <= 2000),
  updated_at timestamptz not null default now()
);

-- Nhật ký đổi gói (đối soát tiền). Giữ lại cả khi tài khoản đã bị xóa. Chỉ Edge Function ghi.
create table plan_log (
  id bigint generated always as identity primary key,
  family_id uuid references families(id) on delete set null,
  username text not null,
  old_plan text, old_until date,
  new_plan text not null, new_until date,
  amount bigint check (amount >= 0),          -- số tiền (đồng), nếu có
  note text not null default '' check (char_length(note) <= 500),
  by_user uuid,                               -- owner đã làm
  at timestamptz not null default now()
);
create index on plan_log (family_id, at desc);

-- Nhật ký mọi thao tác admin (không có khóa ngoại: giữ lại cả khi tài khoản đã bị xóa). Chỉ Edge Function ghi.
create table admin_log (
  id bigint generated always as identity primary key,
  actor uuid,
  action text not null check (char_length(action) <= 40),
  family_id uuid,
  username text,
  detail jsonb not null default '{}',
  at timestamptz not null default now()
);
create index on admin_log (at desc);

-- ============================== HÀM HỖ TRỢ ==============================
-- security definer để đọc bảng mà không vướng chính RLS của bảng đó (tránh đệ quy).

create function today_vn() returns date
language sql stable set search_path = public, pg_temp as $$
  select (now() at time zone 'Asia/Ho_Chi_Minh')::date
$$;

-- Gia đình của người đang đăng nhập; null nếu chưa có hoặc tài khoản đang bị khóa.
create function my_family_id() returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select id from families where auth_user_id = auth.uid() and status = 'active'
$$;

create function is_owner() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from app_owners where user_id = auth.uid())
$$;

-- Gói trả phí còn hạn: gói khác 'free' và plan_until >= hôm nay (giờ Việt Nam).
-- Người đăng nhập chỉ hỏi được về gia đình của mình (owner và khóa bí mật hỏi được mọi gia đình).
create function plan_active(fid uuid) returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce((
    select f.plan <> 'free' and f.plan_until is not null and f.plan_until >= today_vn()
    from families f
    where f.id = fid and (auth.uid() is null or f.auth_user_id = auth.uid() or is_owner())), false)
$$;

-- Gói đang hiệu lực: gói đã mua nếu còn hạn, không thì 'free'.
create function effective_plan(fid uuid) returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select case when plan_active(fid) then (select plan from families where id = fid) else 'free' end
$$;

-- Người đang đăng nhập được đọc mọi đề đã đăng trong paid_banks (không chỉ đề thử).
create function can_read_all_banks() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select coalesce((select all_banks from plans where id = effective_plan(my_family_id())), false)
    and my_family_id() is not null
$$;

-- Đánh dấu hồ sơ vượt hạn mức: giữ max_children hồ sơ tạo sớm nhất, các hồ sơ sau bị khóa.
create function sync_profile_locks(fid uuid) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare lim int;
begin
  select pl.max_children into lim from families f join plans pl on pl.id = effective_plan(f.id) where f.id = fid;
  if lim is null then return; end if;  -- gia đình đang bị xóa
  update profiles p set locked = x.rn > lim
    from (select id, row_number() over (order by created_at, id) rn from profiles where family_id = fid) x
    where p.id = x.id and p.locked is distinct from (x.rn > lim);
end $$;

-- ============================== TRIGGER ==============================

-- Đổi gói hoặc hạn: tính lại hồ sơ bị khóa.
create function families_after_plan() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  perform sync_profile_locks(new.id);
  return null;
end $$;
create trigger families_after_plan after update of plan, plan_until on families
  for each row execute function families_after_plan();

-- Thêm hồ sơ con: gia đình của người gọi (nếu để trống); số hồ sơ phải nhỏ hơn hạn mức của gói đang hiệu lực.
-- Khóa dòng families để hai lệnh thêm cùng lúc không vượt hạn mức.
create function profiles_before_insert() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare lim int; n int;
begin
  new.family_id := coalesce(new.family_id, my_family_id());
  new.name := btrim(new.name);
  new.locked := false;
  new.created_at := clock_timestamp();
  perform 1 from families where id = new.family_id for update;
  select pl.max_children into lim from plans pl where pl.id = effective_plan(new.family_id);
  select count(*) into n from profiles where family_id = new.family_id;
  if n >= coalesce(lim, 0) then
    raise exception 'Tài khoản đã có đủ % hồ sơ con theo gói hiện tại.', coalesce(lim, 0) using errcode = 'P0001';
  end if;
  return new;
end $$;
create trigger profiles_before_insert before insert on profiles for each row execute function profiles_before_insert();

create function profiles_before_update() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  new.name := btrim(new.name);
  return new;
end $$;
create trigger profiles_before_update before update of name on profiles for each row execute function profiles_before_update();

-- Xóa một hồ sơ: hồ sơ đang bị khóa có thể được mở.
create function profiles_after_delete() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  perform sync_profile_locks(old.family_id);
  return null;
end $$;
create trigger profiles_after_delete after delete on profiles for each row execute function profiles_after_delete();

-- Giới hạn số mục mỗi gia đình (chặn làm đầy bộ nhớ của project).
create function enforce_family_quota() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare lim int := TG_ARGV[0]::int; n int;
begin
  execute format('select count(*) from %I where family_id = $1', TG_TABLE_NAME) into n using new.family_id;
  if n >= lim then raise exception 'Tài khoản đã có % mục, không thêm được nữa.', lim; end if;
  return new;
end $$;
create trigger exam_events_quota before insert on exam_events for each row execute function enforce_family_quota('500');
create trigger question_banks_quota before insert on question_banks for each row execute function enforce_family_quota('100');

-- Kết quả: family_id lấy từ hồ sơ; thời điểm do máy chủ đặt; hồ sơ bị khóa (vượt hạn mức) không ghi được;
-- tối đa 60 kết quả mỗi 10 phút cho mỗi hồ sơ. Chuyển dữ liệu cũ (import_local) bỏ qua các bước này.
create function results_before_insert() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  new.family_id := (select family_id from profiles where id = new.profile_id);
  if current_setting('app.importing', true) is distinct from 'on' then
    new.at := now(); new.import_key := null;
    -- khóa theo hồ sơ để nhiều lệnh ghi cùng lúc không vượt giới hạn
    perform pg_advisory_xact_lock(hashtextextended(new.profile_id::text, 0));
    perform sync_profile_locks(new.family_id);  -- gói vừa hết hạn thì khóa ngay, không đợi lần mở app sau
    if (select locked from profiles where id = new.profile_id) then
      raise exception 'Hồ sơ này đang bị khóa vì vượt số hồ sơ của gói. Nhờ bố mẹ gia hạn gói để làm bài tiếp.' using errcode = 'P0001';
    end if;
    if (select count(*) from results where profile_id = new.profile_id and at > now() - interval '10 minutes' and at <= now()) >= 60 then
      raise exception 'Gửi quá nhiều kết quả trong thời gian ngắn. Đợi vài phút rồi thử lại.' using errcode = 'P0001';
    end if;
  end if;
  return new;
end $$;
create trigger results_before_insert before insert on results for each row execute function results_before_insert();

-- Tối đa 2000 kết quả mỗi hồ sơ: bỏ bớt bản ghi cũ nhất của CHÍNH hồ sơ đó, không đụng tới người khác.
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

create function paid_banks_touch() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  new.updated_at := now();
  return new;
end $$;
create trigger paid_banks_touch before insert or update on paid_banks for each row execute function paid_banks_touch();

-- ============================== RLS ==============================

alter table plans enable row level security;
alter table app_owners enable row level security;
alter table families enable row level security;
alter table profiles enable row level security;
alter table exam_events enable row level security;
alter table question_banks enable row level security;
alter table results enable row level security;
alter table paid_banks enable row level security;
alter table admin_notes enable row level security;
alter table plan_log enable row level security;
alter table admin_log enable row level security;

-- Vai trò anon (chưa đăng nhập) không đụng được bảng nào. Rồi cấp lại cho authenticated đúng phần cần.
revoke all on plans, app_owners, families, profiles, exam_events, question_banks, results, paid_banks,
  admin_notes, plan_log, admin_log from anon, authenticated;

grant select on plans to authenticated;
grant insert, update, delete on plans to authenticated;  -- chính sách bên dưới chỉ cho owner
grant select on app_owners to authenticated;
grant select, update (display_name, school_year, seed_banks_seen) on families to authenticated;
grant select, delete, insert (id, family_id, name, avatar, grade, class_name, pin_hash),
  update (name, avatar, grade, class_name, pin_hash) on profiles to authenticated;
grant select, insert, update, delete on exam_events, question_banks to authenticated;
grant select, delete, insert (id, profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics) on results to authenticated;
grant select, insert, update, delete on paid_banks, admin_notes to authenticated;
grant select on plan_log, admin_log to authenticated;

create policy plans_select on plans for select to authenticated using (true);
create policy plans_insert on plans for insert to authenticated with check (is_owner());
create policy plans_update on plans for update to authenticated using (is_owner()) with check (is_owner());
create policy plans_delete on plans for delete to authenticated using (is_owner() and id <> 'free');

create policy owners_select on app_owners for select to authenticated using (user_id = auth.uid());

-- Dòng của mình đọc được cả khi bị khóa (để app báo); sửa chỉ khi đang hoạt động. Owner đọc mọi dòng.
create policy fam_select on families for select to authenticated using (auth_user_id = auth.uid() or is_owner());
create policy fam_update on families for update to authenticated
  using (id = (select my_family_id())) with check (id = (select my_family_id()));

create policy prof_all on profiles for all to authenticated
  using (family_id = (select my_family_id())) with check (family_id = (select my_family_id()));
create policy ev_all on exam_events for all to authenticated
  using (family_id = (select my_family_id())) with check (family_id = (select my_family_id()));
create policy qb_all on question_banks for all to authenticated
  using (family_id = (select my_family_id())) with check (family_id = (select my_family_id()));

create policy res_select on results for select to authenticated using (family_id = (select my_family_id()));
create policy res_insert on results for insert to authenticated with check (family_id = (select my_family_id()));
create policy res_delete on results for delete to authenticated using (family_id = (select my_family_id()));

create policy pb_select on paid_banks for select to authenticated using (
  (select is_owner()) or (published and (select my_family_id()) is not null and (free_trial or (select can_read_all_banks()))));
create policy pb_insert on paid_banks for insert to authenticated with check (is_owner());
create policy pb_update on paid_banks for update to authenticated using (is_owner()) with check (is_owner());
create policy pb_delete on paid_banks for delete to authenticated using (is_owner());

create policy notes_all on admin_notes for all to authenticated using (is_owner()) with check (is_owner());
create policy plan_log_select on plan_log for select to authenticated using (is_owner());
create policy admin_log_select on admin_log for select to authenticated using (is_owner());

-- ============================== HÀM GỌI TỪ APP (RPC) ==============================
-- Mọi hàm security definer tự kiểm tra người gọi.

-- Mở app: ghi lần dùng gần nhất (nhiều nhất 5 phút một lần) và tính lại hồ sơ bị khóa (gói có thể vừa hết hạn).
create function touch() returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare fid uuid := my_family_id();
begin
  if fid is null then return; end if;
  update families set last_seen_at = now() where id = fid and (last_seen_at is null or last_seen_at < now() - interval '5 minutes');
  perform sync_profile_locks(fid);
end $$;

-- Phụ huynh vừa đổi mật khẩu (supabase.auth.updateUser): bỏ cờ bắt đổi mật khẩu tạm.
create function password_changed() returns void
language sql security definer set search_path = public, pg_temp as $$
  update families set must_change_password = false where id = my_family_id()
$$;

-- Chuyển dữ liệu từ máy cục bộ (định dạng của js/store.js / file sao lưu) lên tài khoản đang đăng nhập.
-- Chỉ học sinh thành hồ sơ con (quản trị, phụ huynh cục bộ bỏ qua: tài khoản đã là của phụ huynh); số hồ sơ theo hạn mức
-- của gói. PIN cũ giữ dạng "<muối>$<mã băm>" của js/store.js. Chạy lại nhiều lần không bị trùng (import_key = mã cũ).
-- Trả về ids: bảng đổi mã cũ → mã mới (để app chép tiến độ trong bài ôn sang mã mới).
create function import_local(p_data jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  fid uuid := my_family_id();
  u jsonb; pid uuid; ids jsonb := '{}'::jsonb; n_prof int := 0; n_res int := 0;
  ev jsonb; bk jsonb; rs jsonb; seen text[]; v_at timestamptz; touched uuid[] := '{}';
begin
  if fid is null then raise exception 'Cần đăng nhập bằng tài khoản đang hoạt động.'; end if;
  if jsonb_typeof(p_data->'users') <> 'array' then raise exception 'Dữ liệu không đúng định dạng.'; end if;
  -- Bản sao lưu đám mây (mã dạng mã máy chủ) không được chuyển: dữ liệu đó đã ở trên máy chủ.
  if p_data->>'from' = 'cloud' or exists (select 1 from jsonb_array_elements(p_data->'users') x
       where x->>'id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$') then
    raise exception 'File này là bản sao lưu từ đám mây, dữ liệu đã có trên máy chủ.';
  end if;
  perform set_config('app.importing', 'on', true);

  for u in select * from jsonb_array_elements(p_data->'users') loop
    continue when coalesce(u->>'role', '') <> 'student' or coalesce(btrim(u->>'name'), '') = '' or coalesce(u->>'id', '') = '';
    continue when case when coalesce(u->>'grade', '') ~ '^\d{1,2}$' then (u->>'grade')::int not between 1 and 12 else true end;
    select id into pid from profiles where family_id = fid and import_key = u->>'id';
    if pid is null then
      insert into profiles (family_id, name, avatar, grade, class_name, pin_hash, import_key)
        values (fid, left(btrim(u->>'name'), 40), left(coalesce(nullif(u->>'avatar', ''), '🐣'), 16), (u->>'grade')::smallint,
                left(coalesce(u->>'className', ''), 20),
                case when coalesce(u->>'pinHash', '') <> '' then left(coalesce(u->>'salt', '') || '$' || (u->>'pinHash'), 200) end,
                u->>'id')
        returning id into pid;
      n_prof := n_prof + 1;
    end if;
    ids := ids || jsonb_build_object(u->>'id', pid);
  end loop;

  if jsonb_typeof(p_data->'events') = 'array' then
    for ev in select * from jsonb_array_elements(p_data->'events') loop
      continue when coalesce(ev->>'id', '') = '' or coalesce(btrim(ev->>'title'), '') = '';
      insert into exam_events (id, family_id, title, kind, grades, start_date, end_date, tentative, subjects, scope, note, modules, banks)
      select left(ev->>'id', 80), fid, left(e.title, 200), case when e.kind in ('dinh-ki','ioe','thi-khac','moc') then e.kind else 'dinh-ki' end,
             array(select g from unnest(coalesce(e.grades, '{}')) g where g between 1 and 12), e.start, coalesce(e."end", e.start), coalesce(e.tentative, false),
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
      continue when coalesce(bk->>'id', '') = '' or jsonb_typeof(bk->'questions') <> 'array';
      continue when case when coalesce(bk->>'grade', '') ~ '^\d{1,2}$' then (bk->>'grade')::int not between 1 and 12 else true end;
      insert into question_banks (id, family_id, title, grade, subject, minutes, note, src, questions)
        values (left(bk->>'id', 80), fid, left(coalesce(nullif(btrim(bk->>'title'), ''), 'Ngân hàng'), 200), (bk->>'grade')::smallint,
                left(coalesce(bk->>'subject', ''), 60), least(greatest(coalesce((bk->>'minutes')::int, 0), 0), 600),
                left(coalesce(bk->>'note', ''), 2000), left(coalesce(bk->>'src', ''), 200000), bk->'questions')
        on conflict (family_id, id) do update set title = excluded.title, grade = excluded.grade, subject = excluded.subject,
          minutes = excluded.minutes, note = excluded.note, src = excluded.src, questions = excluded.questions;
    end loop;
  end if;

  if jsonb_typeof(p_data->'results') = 'array' then
    for rs in select * from jsonb_array_elements(p_data->'results') loop
      continue when not coalesce(ids ? (rs->>'userId'), false) or coalesce(rs->>'source', '') not in ('module','bank')
        or coalesce(rs->>'t', '') !~ '^\d{1,9}$';
      continue when (rs->>'t')::int <= 0;
      -- thời điểm cũ: không nhận thời điểm trong tương lai hay sai định dạng
      v_at := now();
      if coalesce(rs->>'at', '') ~ '^\d{4}-\d{2}-\d{2}T' then
        begin v_at := least((rs->>'at')::timestamptz, now()); exception when others then v_at := now(); end;
      end if;
      insert into results (profile_id, source, ref_id, subject, label, mode, r, t, s, wrong_topics, import_key, at)
        values ((ids->>(rs->>'userId'))::uuid, rs->>'source', left(coalesce(rs->>'refId', ''), 80), left(coalesce(rs->>'subject', ''), 60),
                left(coalesce(rs->>'label', ''), 120), left(coalesce(rs->>'mode', ''), 20),
                least(greatest(case when coalesce(rs->>'r', '') ~ '^\d{1,9}$' then (rs->>'r')::int else 0 end, 0), least((rs->>'t')::int, 1000)),
                least((rs->>'t')::int, 1000),
                case when coalesce(rs->>'s', '') ~ '^\d{1,9}$' then (rs->>'s')::int else 0 end,
                case when jsonb_typeof(rs->'wrongTopics') = 'array' then (select array_agg(x) from (select left(x, 100) x from jsonb_array_elements_text(rs->'wrongTopics') x limit 50) w) end,
                coalesce(nullif(rs->>'id', ''), md5(rs::text)), v_at)
        on conflict (family_id, import_key) do nothing;
      if found then n_res := n_res + 1; touched := touched || (ids->>(rs->>'userId'))::uuid; end if;
    end loop;
  end if;

  if jsonb_typeof(p_data->'seedBanksSeen') = 'array' then
    select array(select distinct x from (select unnest(seed_banks_seen) x from families where id = fid
                                         union select jsonb_array_elements_text(p_data->'seedBanksSeen')) s) into seen;
    update families set seed_banks_seen = seen where id = fid;
  end if;
  if coalesce(btrim(p_data#>>'{settings,schoolName}'), '') <> '' then
    update families set display_name = left(btrim(p_data#>>'{settings,schoolName}'), 80) where id = fid and display_name = '';
  end if;

  perform trim_results_of(touched);
  return jsonb_build_object('profiles', n_prof, 'results', n_res, 'ids', ids);
end $$;

-- Quyền gọi hàm: bỏ hết rồi cấp lại đúng chỗ cần. Hàm dùng trong chính sách RLS phải gọi được bởi authenticated
-- vì chính sách chạy với quyền của người đăng nhập.
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function my_family_id(), is_owner(), can_read_all_banks(), plan_active(uuid),
  touch(), password_changed(), import_local(jsonb) to authenticated;
grant execute on all functions in schema public to service_role;
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;
