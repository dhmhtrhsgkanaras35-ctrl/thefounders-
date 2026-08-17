import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // During SSR/prerender without env vars — return a no-op stub
      return {
        from: () => ({ select: () => Promise.resolve({ data: [], error: null }), insert: () => Promise.resolve({ error: null }), update: () => Promise.resolve({ error: null }) }),
        channel: () => ({ on: function(){ return this; }, subscribe: function(){ return this; } }),
        removeChannel: () => Promise.resolve(),
      } as unknown as SupabaseClient;
    }
    _client = createClient(url, key);
  }
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    const client = getSupabase();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? val.bind(client) : val;
  },
});
