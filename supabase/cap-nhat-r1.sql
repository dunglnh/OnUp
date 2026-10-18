-- Cập nhật máy chủ cho Phiên R1 (nút "Báo câu này sai"). Project đã cài supabase/schema.sql trước Phiên R1 thì chạy file này
-- MỘT LẦN: Supabase → SQL Editor → dán toàn bộ file → Run. Chạy lại cũng không sao. Project cài mới từ schema.sql bản này
-- thì không cần.
--  Thêm bảng question_reports (giống hệt schema.sql): câu bị báo sai từ app, kèm trigger (gia đình của người gọi, tối đa
--  30 báo cáo mỗi ngày mỗi gia đình), RLS (gia đình chỉ thêm và đọc của mình; chủ app đọc tất cả, chỉ đổi status).
--  Chưa chạy thì app vẫn chạy bình thường, chỉ khi bấm Gửi báo cáo mới báo "Máy chủ chưa cập nhật để nhận báo cáo";
--  trang admin báo chưa có bảng ở tab Câu bị báo.
create table if not exists question_reports (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references families(id) on delete cascade,
  profile_id uuid references profiles(id) on delete set null,
  bank_id text not null check (char_length(bank_id) between 1 and 80),
  q_key text not null check (char_length(q_key) between 1 and 40),
  q_text text not null default '' check (char_length(q_text) <= 500),
  reason text not null check (reason in ('wrong','unclear','typo','other')),
  note text not null default '' check (char_length(note) <= 200),
  status text not null default 'new' check (status in ('new','fixed','rejected')),
  created_at timestamptz not null default now()
);
create index if not exists question_reports_family_idx on question_reports (family_id, created_at desc);
create index if not exists question_reports_created_idx on question_reports (created_at desc);

create or replace function question_reports_before_insert() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  new.family_id := coalesce(new.family_id, my_family_id());
  if new.profile_id is not null and not exists (select 1 from profiles where id = new.profile_id and family_id = new.family_id) then
    raise exception 'Hồ sơ không thuộc tài khoản này.' using errcode = 'P0001';
  end if;
  new.status := 'new'; new.created_at := now(); new.note := left(btrim(new.note), 200);
  perform pg_advisory_xact_lock(hashtextextended('question_reports:' || new.family_id::text, 0));
  if (select count(*) from question_reports where family_id = new.family_id
        and created_at >= (today_vn()::timestamp at time zone 'Asia/Ho_Chi_Minh')) >= 30 then
    raise exception 'Mỗi gia đình báo được tối đa 30 câu một ngày. Mai báo tiếp nhé.' using errcode = 'P0001';
  end if;
  return new;
end $$;
drop trigger if exists question_reports_before_insert on question_reports;
create trigger question_reports_before_insert before insert on question_reports for each row execute function question_reports_before_insert();
revoke execute on function question_reports_before_insert() from public, anon, authenticated;
grant execute on function question_reports_before_insert() to service_role;

alter table question_reports enable row level security;
revoke all on question_reports from public, anon, authenticated;
grant select, insert (id, profile_id, bank_id, q_key, q_text, reason, note), update (status) on question_reports to authenticated;
grant all on question_reports to service_role;
drop policy if exists qr_select on question_reports;
drop policy if exists qr_insert on question_reports;
drop policy if exists qr_update on question_reports;
create policy qr_select on question_reports for select to authenticated using (family_id = (select my_family_id()) or (select is_owner()));
create policy qr_insert on question_reports for insert to authenticated with check (family_id = (select my_family_id()));
create policy qr_update on question_reports for update to authenticated using (is_owner()) with check (is_owner());
