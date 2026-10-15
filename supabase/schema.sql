-- Giai đoạn 2: đồng bộ đám mây. CHƯA dùng trong bản 1.0 (bản 1.0 lưu trong trình duyệt).
-- Chạy trong Supabase → SQL Editor. Xem docs/TINH-NANG.md mục 7.

create table families (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  join_code text unique not null,          -- mã gia đình/lớp để học sinh đăng nhập bằng PIN
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  auth_user_id uuid unique references auth.users(id) on delete set null,  -- chỉ phụ huynh/quản trị có tài khoản email
  role text not null check (role in ('admin','parent','student')),
  name text not null check (char_length(name) between 1 and 40),
  avatar text not null default '🙂',
  grade smallint check (grade in (4,6)),
  class_name text default '',
  pin_hash text,                           -- học sinh: băm PIN phía máy chủ (Edge Function), không lưu PIN gốc
  created_at timestamptz not null default now(),
  check (role <> 'student' or grade is not null)
);

create table parent_child (
  parent_id uuid references profiles(id) on delete cascade,
  child_id uuid references profiles(id) on delete cascade,
  primary key (parent_id, child_id)
);

create table exam_events (
  id text not null,
  family_id uuid not null references families(id) on delete cascade,
  title text not null, kind text not null,
  grades smallint[] not null, start_date date, end_date date,
  tentative boolean not null default true,
  subjects text[] not null default '{}', scope text default '', note text default '',
  modules text[] not null default '{}', banks text[] not null default '{}',
  primary key (family_id, id)
);

create table question_banks (
  id text not null,
  family_id uuid not null references families(id) on delete cascade,
  title text not null, grade smallint not null, subject text default '',
  minutes int default 0, note text default '', src text default '',
  questions jsonb not null,
  primary key (family_id, id)
);

create table results (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  source text not null check (source in ('module','bank')),
  ref_id text not null, subject text default '', label text default '', mode text default '',
  r int not null check (r >= 0), t int not null check (t > 0 and r <= t), s int default 0,
  wrong_topics text[],
  at timestamptz not null default now()
);
create index on results (profile_id, at desc);

-- Bật RLS cho mọi bảng. Quy tắc cần viết (gợi ý):
--  * admin: đọc/ghi mọi thứ trong family của mình.
--  * parent: đọc profiles/results của các con trong parent_child; đọc exam_events, question_banks của family.
--  * student: chỉ đọc/ghi results của chính mình, qua phiên do Edge Function cấp sau khi kiểm tra join_code + PIN.
alter table families enable row level security;
alter table profiles enable row level security;
alter table parent_child enable row level security;
alter table exam_events enable row level security;
alter table question_banks enable row level security;
alter table results enable row level security;
