-- Giả lập phần tối thiểu của Supabase để chạy supabase/schema.sql trên PostgreSQL thường (chỉ dùng khi kiểm thử).
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
grant usage on schema auth to anon, authenticated, service_role;
grant usage on schema public to anon, authenticated, service_role;
create table auth.users (id uuid primary key, email text unique);
create function auth.uid() returns uuid language sql stable as $$
  select (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')::uuid $$;
create function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
grant execute on all functions in schema auth to anon, authenticated, service_role;
-- Như Supabase từ 30/10/2026 (project tạo mới từ 30/5/2026 đã vậy): bảng và sequence mới trong public không tự được
-- cấp quyền cho anon, authenticated, service_role. Stub chặt hơn Supabase ở hàm: hàm mới cũng không được cấp cho ba vai
-- đó (PostgreSQL vẫn cho PUBLIC gọi hàm mới, nên schema.sql thu hồi). Vì vậy supabase/schema.sql và mỗi file
-- supabase/cap-nhat-<phiên>.sql phải tự grant (quy tắc ở CLAUDE.md, mục “Bản đám mây”); rls-test.sql kiểm tra chung
-- mọi bảng public: bật RLS, anon không có quyền, service_role đủ quyền.
