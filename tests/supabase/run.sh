#!/bin/sh
# Chạy supabase/schema.sql và kiểm thử RLS trên một PostgreSQL tạm (cần PostgreSQL 15+ đã cài trong máy).
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
if $PSQL < "$HERE/rls-test.sql" > "$TMP/out" 2>&1; then OK=1; else OK=0; fi
sed "s/^psql:[^ ]* NOTICE:  //" "$TMP/out"
[ $OK = 1 ] || { echo "RLS FAILED"; exit 1; }
echo "RLS OK: $(grep -c "ok  " "$TMP/out") kiểm tra"
