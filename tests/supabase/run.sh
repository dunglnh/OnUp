#!/bin/sh
# Chạy supabase/schema.sql, nạp đề từ supabase/banks-to-sql.js và kiểm thử RLS trên một PostgreSQL tạm
# (cần PostgreSQL 15+ và Node đã cài trong máy).
# Dùng: sh tests/supabase/run.sh
set -e
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../.." && pwd)
BIN=${PG_BIN:-$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)}
TMP=$(mktemp -d); chmod 777 "$TMP"
AS=""; [ "$(id -u)" = 0 ] && AS="runuser -u postgres --"
cleanup() { $AS "$BIN/pg_ctl" -D "$TMP/db" stop -m immediate >/dev/null 2>&1 || true; rm -rf "$TMP"; }
trap cleanup EXIT
$AS "$BIN/initdb" -D "$TMP/db" -U postgres --auth=trust >/dev/null
$AS "$BIN/pg_ctl" -D "$TMP/db" -o "-k $TMP -c listen_addresses=''" -l "$TMP/log" start -w >/dev/null
PSQL="$AS $BIN/psql -h $TMP -U postgres -d postgres -v ON_ERROR_STOP=1 -q -t -A -o /dev/null"
$PSQL < "$HERE/auth-stub.sql"
$PSQL < "$ROOT/supabase/schema.sql"
echo "schema.sql: OK"
node "$ROOT/supabase/banks-to-sql.js" > "$TMP/paid-banks.sql"
$PSQL < "$TMP/paid-banks.sql"
$PSQL < "$TMP/paid-banks.sql"   # chạy lại lần hai không lỗi, không trùng
echo "banks-to-sql.js: OK"
# Số đề trong data/banks.js, đếm thẳng từ file (không qua banks-to-sql.js): rls-test.sql so với số này.
BANKS=$(node -e 'const c={window:{}};require("vm").runInNewContext(require("fs").readFileSync(process.argv[1],"utf8"),c);console.log(c.window.ONTAP_SEED_BANKS.length)' "$ROOT/data/banks.js")
if $PSQL -v banks="$BANKS" < "$HERE/rls-test.sql" > "$TMP/out" 2>&1; then OK=1; else OK=0; fi
sed "s/^psql:[^ ]* NOTICE:  //" "$TMP/out"
[ $OK = 1 ] || { echo "RLS FAILED"; exit 1; }
echo "RLS OK: $(grep -c "ok  " "$TMP/out") kiểm tra"
