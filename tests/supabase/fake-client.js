/* Client giả có cùng cách gọi như supabase-js (phần app dùng): auth, from(...).select/insert/upsert/update/delete,
   eq/in/order/range/maybeSingle, rpc, functions.invoke. Mọi lời gọi được đóng gói thành tin nhắn JSON và gửi qua
   transport(msg) tới máy chủ giả (tests/supabase/fake-backend.js). Dùng được trong Node và trong trình duyệt
   (Playwright chuyển tin nhắn về Node bằng page.exposeFunction). */
(function (root) {
  "use strict";
  function createFakeSupabase(transport, opts) {
    opts = opts || {};
    const storage = (opts.auth && opts.auth.storage) || opts.storage || (typeof localStorage !== "undefined" ? localStorage : null);
    const key = (opts.auth && opts.auth.storageKey) || "sb-fake-auth";
    let mem = null;
    const listeners = [];
    const readSession = () => {
      if (opts.service) return null;
      try { return storage ? JSON.parse(storage.getItem(key) || "null") : mem; } catch (e) { return null; }
    };
    const writeSession = (s) => {
      mem = s;
      try { if (storage) { if (s) storage.setItem(key, JSON.stringify(s)); else storage.removeItem(key); } } catch (e) {}
    };
    const token = () => { const s = readSession(); return s ? s.access_token : null; };
    const emit = (ev, s) => listeners.slice().forEach((cb) => { try { cb(ev, s); } catch (e) {} });
    const send = (msg) => Promise.resolve(transport(Object.assign({ token: token(), service: !!opts.service }, msg)));

    class Query {
      constructor(table) { this.d = { table, op: "select", cols: "*", filters: [], orders: [] }; }
      select(cols) { if (this.d.op === "select") this.d.cols = cols || "*"; else this.d.returning = cols || "*"; return this; }
      insert(v) { this.d.op = "insert"; this.d.values = [].concat(v); return this; }
      upsert(v, o) { this.d.op = "upsert"; this.d.values = [].concat(v); this.d.onConflict = o && o.onConflict; this.d.ignoreDuplicates = !!(o && o.ignoreDuplicates); return this; }
      update(p) { this.d.op = "update"; this.d.patch = p; return this; }
      delete() { this.d.op = "delete"; return this; }
      eq(c, v) { this.d.filters.push(["eq", c, v]); return this; }
      neq(c, v) { this.d.filters.push(["neq", c, v]); return this; }
      in(c, v) { this.d.filters.push(["in", c, v]); return this; }
      order(c, o) { this.d.orders.push([c, !(o && o.ascending === false)]); return this; }
      range(a, b) { this.d.range = [a, b]; return this; }
      maybeSingle() { this.d.single = "maybe"; return this; }
      single() { this.d.single = "one"; return this; }
      then(ok, bad) { return send({ kind: "query", q: JSON.parse(JSON.stringify(this.d)) }).then(ok, bad); }
    }

    const auth = {
      async getSession() { return { data: { session: readSession() }, error: null }; },
      async getUser(t) {
        const r = await send({ kind: "auth", op: "getUser", args: { token: t || token() } });
        return r.error ? { data: { user: null }, error: r.error } : { data: { user: r.user }, error: null };
      },
      onAuthStateChange(cb) { listeners.push(cb); return { data: { subscription: { unsubscribe() { listeners.splice(listeners.indexOf(cb), 1); } } } }; },
      async signInWithOtp(a) { const r = await send({ kind: "auth", op: "otp", args: { email: a.email } }); return { data: {}, error: r.error || null }; },
      async verifyOtp(a) {
        const r = await send({ kind: "auth", op: "verify", args: { email: a.email, token: a.token } });
        if (r.error) return { data: { session: null, user: null }, error: r.error };
        writeSession(r.session); emit("SIGNED_IN", r.session);
        return { data: { session: r.session, user: r.session.user }, error: null };
      },
      async signInAnonymously() {
        const r = await send({ kind: "auth", op: "anon", args: {} });
        if (r.error) return { data: { session: null, user: null }, error: r.error };
        writeSession(r.session); emit("SIGNED_IN", r.session);
        return { data: { session: r.session, user: r.session.user }, error: null };
      },
      async signOut(o) { await send({ kind: "auth", op: "signOut", args: { scope: (o && o.scope) || "global" } }); writeSession(null); emit("SIGNED_OUT", null); return { error: null }; }
    };
    return {
      auth,
      from: (t) => new Query(t),
      rpc: (name, args) => send({ kind: "rpc", name, args: args || {} }),
      functions: {
        async invoke(name, o) {
          const r = await send({ kind: "invoke", name, body: (o && o.body) || {} });
          if (r.status >= 200 && r.status < 300) return { data: r.body, error: null };
          const err = new Error("Edge Function returned a non-2xx status code");
          err.context = { status: r.status, json: async () => r.body };
          return { data: null, error: err };
        }
      }
    };
  }
  if (typeof module !== "undefined" && module.exports) module.exports = { createFakeSupabase };
  if (root && root.document && root.__fakeSupabase) {
    root.supabase = { createClient: (url, k, o) => createFakeSupabase((m) => root.__fakeSupabase(m), o) };
  }
})(typeof window !== "undefined" ? window : globalThis);
