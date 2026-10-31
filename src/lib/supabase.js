const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClientPromise = null;

export function getSupabaseClient() {
    if (!isSupabaseConfigured) return Promise.resolve(null);

    if (!supabaseClientPromise) {
        supabaseClientPromise = import('@supabase/supabase-js').then(({ createClient }) => (
            createClient(supabaseUrl, supabaseAnonKey)
        ));
    }

    return supabaseClientPromise;
}
