import { supabase, isSupabaseConfigured } from './supabase';
import { SiteSettings } from '@/types/database';
import { DEFAULT_SERVICES } from './bookingService';

/**
 * Normaliza un teléfono argentino al formato que espera wa.me (solo dígitos, con código de país).
 * Ejemplos: "11 5544-3322" → "5491155443322" · "+54 9 11 5544 3322" → "5491155443322"
 * Devuelve null si el resultado no parece un número válido.
 */
export function normalizeWhatsAppPhone(raw: string): string | null {
  let digits = (raw || '').replace(/\D/g, '');
  if (!digits) return null;
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (!digits.startsWith('54')) {
    if (digits.startsWith('0')) digits = digits.slice(1); // 011... → 11...
    if (digits.length === 10) digits = `549${digits}`;
  }
  return /^[0-9]{8,15}$/.test(digits) ? digits : null;
}

/** Construye un enlace wa.me. Sin teléfono, abre WhatsApp para elegir contacto (comportamiento anterior). */
export function buildWhatsAppUrl(text: string, phone?: string | null): string {
  const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Una sola consulta compartida por todos los componentes de la página
let settingsPromise: Promise<SiteSettings | null> | null = null;

export function fetchSiteSettings(options: { force?: boolean } = {}): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (settingsPromise && !options.force) return settingsPromise;

  settingsPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      if (error || !data) return null;
      return data as SiteSettings;
    } catch {
      return null;
    }
  })();

  // Si falló, permitimos reintentar en la próxima llamada
  settingsPromise.then((res) => {
    if (res === null) settingsPromise = null;
  });

  return settingsPromise;
}

export async function updateWhatsAppPhone(
  rawPhone: string
): Promise<{ ok: true; phone: string | null } | { ok: false; error: string }> {
  const trimmed = rawPhone.trim();
  const phone = trimmed ? normalizeWhatsAppPhone(trimmed) : null;
  if (trimmed && !phone) {
    return { ok: false, error: 'El número no parece válido. Ej: 11 5544 3322 o +54 9 11 5544 3322.' };
  }

  const { error } = await supabase
    .from('site_settings')
    .upsert({ id: 1, whatsapp_phone: phone, updated_at: new Date().toISOString() });

  if (error) return { ok: false, error: error.message };
  settingsPromise = Promise.resolve({ id: 1, whatsapp_phone: phone });
  return { ok: true, phone };
}

export async function updateServiceBasics(
  id: string,
  values: { price: number; duration_minutes: number; name?: string; description?: string }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const price = Math.round(values.price);
  const duration = Math.round(values.duration_minutes);
  if (!Number.isFinite(price) || price < 0) return { ok: false, error: 'Precio inválido.' };
  if (!Number.isFinite(duration) || duration < 15 || duration > 480) {
    return { ok: false, error: 'La duración debe estar entre 15 y 480 minutos.' };
  }

  const { data, error } = await supabase
    .from('services')
    .update({ price, duration_minutes: duration })
    .eq('id', id)
    .select('id');

  if (error) return { ok: false, error: error.message };

  if (!data || data.length === 0) {
    const defaultSrv = DEFAULT_SERVICES.find((s) => s.id === id);
    if (defaultSrv) {
      const { error: upsertErr } = await supabase.from('services').upsert({
        id,
        name: values.name || defaultSrv.name,
        description: values.description || defaultSrv.description,
        price,
        duration_minutes: duration,
        is_active: true,
        order_index: defaultSrv.order_index,
      });
      if (upsertErr) return { ok: false, error: upsertErr.message };
      return { ok: true };
    }

    return {
      ok: false,
      error: 'No se encontró el servicio para actualizar en la base de datos.',
    };
  }
  return { ok: true };
}
