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

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
