-- Cập nhật máy chủ cho Phiên Lịch các khối mới (kì thi năm học 2026–2027 của lớp 5, 7–12 đến gia đình đang dùng). Project đã cài
-- supabase/schema.sql trước phiên này thì chạy file này MỘT LẦN: Supabase → SQL Editor → dán toàn bộ file → Run. Chạy lại cũng không sao.
-- Project cài mới từ schema.sql bản này thì không cần.
--  1. families.seed_events_seen (text[]): khóa "<mã kì thi>:<khối>" của lịch mặc định mà tài khoản đã xét, như seed_banks_seen
--     (seedEventsSeen trong js/store.js). Phụ huynh sửa được cột này (grant theo cột). Chưa có cột thì app bỏ qua bước gộp lịch mặc định:
--     gia đình đang dùng chưa nhận kì thi của lớp 5, 7–12 (tài khoản mới vẫn chép đủ lịch).
--  2. Trần số mã của seed_banks_seen: 1 000 → 5 000 (danh mục đề sẽ vượt 1 000 đề); seed_events_seen cũng 5 000.
--  3. Trần số đề gắn vào một kì thi (exam_events.banks): 100 → 500 (kì thi tốt nghiệp sẽ gắn khoảng 80 đề thi thử cùng các đề khác);
--     tổng độ dài chữ của môn, bài ôn, đề: 5 000 → 20 000.
--  4. import_local (chuyển dữ liệu từ bản lưu trên máy) gộp thêm seedEventsSeen; bản này giống hệt schema.sql.
alter table families add column if not exists seed_events_seen text[] not null default '{}';
alter table families drop constraint if exists families_seed_banks_seen_check;
alter table families add constraint families_seed_banks_seen_check check (cardinality(seed_banks_seen) <= 5000);
alter table families drop constraint if exists families_seed_events_seen_check;
alter table families add constraint families_seed_events_seen_check check (cardinality(seed_events_seen) <= 5000);
grant update (seed_events_seen) on families to authenticated;

alter table exam_events drop constraint if exists exam_events_check;
alter table exam_events add constraint exam_events_check check (cardinality(grades) <= 12 and cardinality(subjects) <= 30 and cardinality(modules) <= 50
  and cardinality(banks) <= 500 and char_length(array_to_string(subjects || modules || banks, '')) <= 20000);

-- import_local: như schema.sql (thêm đoạn gộp seedEventsSeen). create or replace giữ quyền thực thi đã cấp.
create or replace function import_local(p_data jsonb) returns jsonb
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
      insert into question_banks (id, family_id, title, grade, subject, minutes, note, src, questions, passages)
        values (left(bk->>'id', 80), fid, left(coalesce(nullif(btrim(bk->>'title'), ''), 'Ngân hàng'), 200), (bk->>'grade')::smallint,
                left(coalesce(bk->>'subject', ''), 60), least(greatest(coalesce((bk->>'minutes')::int, 0), 0), 600),
                left(coalesce(bk->>'note', ''), 2000), left(coalesce(bk->>'src', ''), 200000), bk->'questions',
                case when jsonb_typeof(bk->'passages') = 'object' then bk->'passages' else '{}'::jsonb end)
        on conflict (family_id, id) do update set title = excluded.title, grade = excluded.grade, subject = excluded.subject,
          minutes = excluded.minutes, note = excluded.note, src = excluded.src, questions = excluded.questions, passages = excluded.passages;
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
                least(greatest(case when coalesce(rs->>'r', '') ~ '^\d{1,9}(\.\d+)?$' then round((rs->>'r')::numeric, 2) else 0 end, 0), least((rs->>'t')::int, 1000)),
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
  if jsonb_typeof(p_data->'seedEventsSeen') = 'array' then  -- kì thi của lịch mặc định đã xét (seedEventsSeen của js/store.js), gộp như trên
    select array(select distinct x from (select unnest(seed_events_seen) x from families where id = fid
                                         union select jsonb_array_elements_text(p_data->'seedEventsSeen')) s) into seen;
    update families set seed_events_seen = seen where id = fid;
  end if;
  if coalesce(btrim(p_data#>>'{settings,schoolName}'), '') <> '' then
    update families set display_name = left(btrim(p_data#>>'{settings,schoolName}'), 80) where id = fid and display_name = '';
  end if;

  perform trim_results_of(touched);
  return jsonb_build_object('profiles', n_prof, 'results', n_res, 'ids', ids);
end $$;
