import { createBrowserClient } from '@supabase/ssr';

function getValidUrl(url?: string): string {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return 'https://placeholder-url.supabase.co';
  }
  return url.trim();
}

function getValidKey(key?: string): string {
  if (!key || typeof key !== 'string' || key.trim() === '') {
    return 'placeholder-anon-key';
  }
  return key.trim();
}

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  rawUrl &&
    rawUrl.startsWith('http') &&
    rawUrl !== 'https://placeholder-url.supabase.co' &&
    rawKey &&
    rawKey !== 'placeholder-anon-key'
);

const supabaseUrl = getValidUrl(rawUrl);
const supabaseAnonKey = getValidKey(rawKey);

function createSafeBrowserClient() {
  try {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Error inicializando Supabase client:', err);
    // Fallback proxy to prevent runtime crashes during SSR / build
    return {
      from: () => ({
        select: () => ({
          eq: () => Promise.resolve({ data: null, error: new Error('Supabase client uninitialized') }),
          order: () => Promise.resolve({ data: null, error: new Error('Supabase client uninitialized') }),
          neq: () => Promise.resolve({ data: null, error: new Error('Supabase client uninitialized') }),
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: new Error('Supabase client uninitialized') }),
          }),
        }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
    } as unknown as ReturnType<typeof createBrowserClient>;
  }
}

export const supabase = createSafeBrowserClient();
