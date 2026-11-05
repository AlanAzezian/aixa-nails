import { supabase, isSupabaseConfigured } from './supabase';
import { SiteSettings } from '@/types/database';
import { updateService } from './bookingService';

export const DEFAULT_LOCATION_TEXT = 'Zona Norte (Servicio a domicilio)';

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

/** Construye un enlace wa.me. Sin teléfono, abre WhatsApp para elegir contacto. */
export function buildWhatsAppUrl(text: string, phone?: string | null): string {
  const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Caché de consulta compartida
let settingsPromise: Promise<SiteSettings | null> | null = null;

export function fetchSiteSettings(options: { force?: boolean } = {}): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured) {
    return Promise.resolve({
      id: 1,
      whatsapp_number: null,
      whatsapp_phone: null,
      location_text: DEFAULT_LOCATION_TEXT,
    });
  }
  if (settingsPromise && !options.force) return settingsPromise;

  settingsPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error || !data) {
        return {
          id: 1,
          whatsapp_number: null,
          whatsapp_phone: null,
          location_text: DEFAULT_LOCATION_TEXT,
        };
      }

      const raw = data as Record<string, any>;
      const phone = raw.whatsapp_number ?? raw.whatsapp_phone ?? null;
      const location = raw.location_text || DEFAULT_LOCATION_TEXT;

      return {
        id: 1,
        whatsapp_number: phone,
        whatsapp_phone: phone,
        location_text: location,
        updated_at: raw.updated_at,
      };
    } catch {
      return {
        id: 1,
        whatsapp_number: null,
        whatsapp_phone: null,
        location_text: DEFAULT_LOCATION_TEXT,
      };
    }
  })();

  settingsPromise.then((res) => {
    if (res === null) settingsPromise = null;
  });

  return settingsPromise;
}

export async function updateSiteSettings(values: {
  whatsapp_phone?: string | null;
  location_text?: string | null;
}): Promise<{ ok: boolean; settings?: SiteSettings; error?: string }> {
  const current = (await fetchSiteSettings({ force: false })) || {
    id: 1,
    whatsapp_number: null,
    whatsapp_phone: null,
    location_text: DEFAULT_LOCATION_TEXT,
  };

  let phone = current.whatsapp_phone;
  if (values.whatsapp_phone !== undefined) {
    const trimmed = (values.whatsapp_phone || '').trim();
    phone = trimmed ? normalizeWhatsAppPhone(trimmed) : null;
    if (trimmed && !phone) {
      return { ok: false, error: 'El número no parece válido. Ej: 11 5544 3322 o +54 9 11 5544 3322.' };
    }
  }

  const location =
    values.location_text !== undefined
      ? values.location_text?.trim() || DEFAULT_LOCATION_TEXT
      : current.location_text || DEFAULT_LOCATION_TEXT;

  if (!isSupabaseConfigured) {
    const updated: SiteSettings = {
      id: 1,
      whatsapp_number: phone,
      whatsapp_phone: phone,
      location_text: location,
      updated_at: new Date().toISOString(),
    };
    settingsPromise = Promise.resolve(updated);
    return { ok: true, settings: updated };
  }

  try {
    // Intentamos guardar con whatsapp_number y whatsapp_phone simultáneamente
    const payload: Record<string, any> = {
      id: 1,
      whatsapp_number: phone,
      whatsapp_phone: phone,
      location_text: location,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from('site_settings').upsert(payload);

    if (error && error.message?.includes('whatsapp_number')) {
      delete payload.whatsapp_number;
      const retry = await supabase.from('site_settings').upsert(payload);
      error = retry.error;
    } else if (error && error.message?.includes('whatsapp_phone')) {
      delete payload.whatsapp_phone;
      const retry = await supabase.from('site_settings').upsert(payload);
      error = retry.error;
    }

    if (error && error.message?.includes('location_text')) {
      delete payload.location_text;
      const retry = await supabase.from('site_settings').upsert(payload);
      error = retry.error;
    }

    if (error) return { ok: false, error: error.message };

    const updated: SiteSettings = {
      id: 1,
      whatsapp_number: phone,
      whatsapp_phone: phone,
      location_text: location,
      updated_at: new Date().toISOString(),
    };
    settingsPromise = Promise.resolve(updated);
    return { ok: true, settings: updated };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Error al guardar ajustes' };
  }
}

export async function updateWhatsAppPhone(
  rawPhone: string
): Promise<{ ok: true; phone: string | null } | { ok: false; error: string }> {
  const res = await updateSiteSettings({ whatsapp_phone: rawPhone });
  if (res.ok) {
    return { ok: true, phone: res.settings?.whatsapp_phone ?? null };
  }
  return { ok: false, error: res.error || 'Error al actualizar WhatsApp' };
}

export async function updateLocationText(
  locationText: string
): Promise<{ ok: true; location_text: string } | { ok: false; error: string }> {
  const res = await updateSiteSettings({ location_text: locationText });
  if (res.ok) {
    return { ok: true, location_text: res.settings?.location_text || DEFAULT_LOCATION_TEXT };
  }
  return { ok: false, error: res.error || 'Error al actualizar ubicación' };
}

export async function updateServiceBasics(
  id: string,
  values: { price: number; duration_minutes: number; name?: string; description?: string }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await updateService(id, values);
  if (res.ok) return { ok: true };
  return { ok: false, error: res.error || 'Error al actualizar servicio' };
}
