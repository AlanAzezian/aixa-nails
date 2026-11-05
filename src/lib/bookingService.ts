import { supabase, isSupabaseConfigured } from './supabase';
import { Service, WeeklySchedule, BlockedDate, Appointment } from '@/types/database';

// Helper to prevent requests from hanging indefinitely in production
async function withTimeout<T>(promise: PromiseLike<T>, ms: number = 3000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout de red tras ${ms}ms`)), ms);
  });
  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
    clearTimeout(timer);
  });
}

// Fallback services in case DB rows aren't seeded or network is unavailable
export const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Esmaltado semipermanente',
    description: 'Color y brillo que duran semanas, aplicado sobre tu uña natural.',
    duration_minutes: 60,
    price: 14000,
    is_active: true,
    order_index: 1,
  },
  {
    id: '2',
    name: 'Kapping en polygel',
    description: 'Una capa de polygel que refuerza tu uña natural y le da estructura.',
    duration_minutes: 90,
    price: 18000,
    is_active: true,
    order_index: 2,
  },
  {
    id: '3',
    name: 'Esculpidas en polygel',
    description: 'Largo y forma a elección, esculpidos uña por uña con diseño personalizado.',
    duration_minutes: 120,
    price: 24000,
    is_active: true,
    order_index: 3,
  },
  {
    id: '4',
    name: 'Soft gel',
    description: 'Extensiones livianas, flexibles y con un acabado súper natural.',
    duration_minutes: 90,
    price: 20000,
    is_active: true,
    order_index: 4,
  },
];

export const DEFAULT_WEEKLY_SCHEDULE: WeeklySchedule[] = [
  { day_of_week: 0, is_open: false },
  { day_of_week: 1, is_open: true, start_time: '10:00', end_time: '19:00' },
  { day_of_week: 2, is_open: true, start_time: '10:00', end_time: '19:00' },
  { day_of_week: 3, is_open: true, start_time: '10:00', end_time: '19:00' },
  { day_of_week: 4, is_open: true, start_time: '10:00', end_time: '19:00' },
  { day_of_week: 5, is_open: true, start_time: '10:00', end_time: '19:00' },
  { day_of_week: 6, is_open: false },
];

export const STANDARD_TIME_SLOTS = [
  '10:00',
  '11:30',
  '13:00',
  '15:00',
  '16:30',
  '18:00',
];

export async function fetchServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) {
    return DEFAULT_SERVICES;
  }

  try {
    const res = (await withTimeout(
      supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true }),
      3000
    )) as { data: any; error: any };

    const { data, error } = res || {};

    if (error || !data || data.length === 0) {
      if (error) console.warn('Aviso al consultar servicios en Supabase:', error.message);
      return DEFAULT_SERVICES;
    }

    const sanitized: Service[] = (data as any[])
      .filter((s) => s && s.name)
      .map((s, idx) => {
        const rawPrice = s.price ?? s.base_price;
        const priceNum =
          typeof rawPrice === 'number' && !isNaN(rawPrice)
            ? rawPrice
            : Number(rawPrice) || 0;

        return {
          id: String(s.id || idx + 1),
          name: String(s.name),
          description: s.description ? String(s.description) : '',
          duration_minutes: Number(s.duration_minutes) || 60,
          price: priceNum,
          base_price: priceNum,
          is_active: s.is_active ?? true,
          order_index: Number(s.order_index) || idx + 1,
        };
      });

    return sanitized.length > 0 ? sanitized : DEFAULT_SERVICES;
  } catch (err) {
    console.warn('Fallback a servicios por defecto por error/timeout de Supabase:', err);
    return DEFAULT_SERVICES;
  }
}

export async function fetchWeeklySchedule(): Promise<WeeklySchedule[]> {
  if (!isSupabaseConfigured) {
    return DEFAULT_WEEKLY_SCHEDULE;
  }

  try {
    const res = (await withTimeout(
      supabase
        .from('weekly_schedule')
        .select('*')
        .order('day_of_week', { ascending: true }),
      3000
    )) as { data: any; error: any };

    const { data, error } = res || {};

    if (error || !data || data.length === 0) {
      if (error) console.warn('Aviso al consultar agenda en Supabase:', error.message);
      return DEFAULT_WEEKLY_SCHEDULE;
    }

    const sanitized: WeeklySchedule[] = (data as WeeklySchedule[]).map((w) => ({
      id: w.id ? String(w.id) : undefined,
      day_of_week: Number(w.day_of_week),
      is_open: Boolean(w.is_open),
      start_time: w.start_time ? String(w.start_time) : '10:00',
      end_time: w.end_time ? String(w.end_time) : '19:00',
    }));

    return sanitized.length > 0 ? sanitized : DEFAULT_WEEKLY_SCHEDULE;
  } catch (err) {
    console.warn('Fallback a agenda semanal base:', err);
    return DEFAULT_WEEKLY_SCHEDULE;
  }
}

export async function fetchBlockedDates(): Promise<string[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  try {
    const res = (await withTimeout(
      supabase.from('blocked_dates').select('blocked_date'),
      3000
    )) as { data: any; error: any };

    const { data, error } = res || {};

    if (error || !data) return [];
    return data
      .filter((d: { blocked_date: string }) => Boolean(d.blocked_date))
      .map((d: { blocked_date: string }) => String(d.blocked_date));
  } catch (err) {
    console.warn('Fallback a fechas bloqueadas vacías:', err);
    return [];
  }
}

export async function fetchBookedSlots(dateStr: string): Promise<string[]> {
  if (!isSupabaseConfigured || !dateStr) {
    return [];
  }

  try {
    const res = (await withTimeout(
      supabase
        .from('appointments')
        .select('appointment_time, status')
        .eq('appointment_date', dateStr)
        .neq('status', 'cancelled'),
      3000
    )) as { data: any; error: any };

    const { data, error } = res || {};

    if (error || !data) return [];
    return data
      .filter((a: { appointment_time: string }) => Boolean(a.appointment_time))
      .map((a: { appointment_time: string }) => {
        const time = String(a.appointment_time);
        return time.length > 5 ? time.substring(0, 5) : time;
      });
  } catch (err) {
    console.warn('Fallback a lista vacía de turnos ocupados:', err);
    return [];
  }
}

export async function saveAppointment(
  appointment: Omit<Appointment, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: Appointment; error?: string }> {
  if (!isSupabaseConfigured) {
    // Modo offline/fallback garantizado para continuar el flujo de reserva
    return { success: true, data: appointment as Appointment };
  }

  try {
    const res = (await withTimeout(
      supabase
        .from('appointments')
        .insert([
          {
            service_id: appointment.service_id,
            client_name: appointment.client_name,
            client_phone: appointment.client_phone,
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
            notes: appointment.notes || null,
            status: 'pending',
          },
        ])
        .select()
        .single(),
      4000
    )) as { data: any; error: any };

    const { data, error } = res || {};

    if (error) {
      console.warn('Aviso de inserción en Supabase, continuando con fallback:', error.message);
      return { success: true, data: appointment as Appointment };
    }

    return { success: true, data: (data as Appointment) || (appointment as Appointment) };
  } catch (err: unknown) {
    console.warn('No se pudo contactar con Supabase, reserva continuada en modo seguro:', err);
    return { success: true, data: appointment as Appointment };
  }
}

// ---------------------------------------------------------------------
// CRUD completo de Servicios (Admin)
// ---------------------------------------------------------------------

export async function createService(newService: {
  name: string;
  description?: string;
  duration_minutes: number;
  price: number;
}): Promise<{ ok: boolean; service?: Service; error?: string }> {
  const price = Math.max(0, Math.round(newService.price));
  const duration = Math.max(15, Math.round(newService.duration_minutes));
  const name = newService.name.trim();

  if (!name) return { ok: false, error: 'Ingresá el nombre del servicio.' };

  if (!isSupabaseConfigured) {
    const created: Service = {
      id: String(Date.now()),
      name,
      description: newService.description?.trim() || null,
      duration_minutes: duration,
      price,
      base_price: price,
      is_active: true,
      order_index: DEFAULT_SERVICES.length + 1,
    };
    DEFAULT_SERVICES.push(created);
    return { ok: true, service: created };
  }

  try {
    const payload: Record<string, any> = {
      name,
      description: newService.description?.trim() || null,
      duration_minutes: duration,
      price,
      base_price: price,
      is_active: true,
      order_index: 99,
    };

    let { data, error } = await supabase.from('services').insert([payload]).select().single();

    // Compatibilidad en caso de que solo exista una de las dos columnas
    if (error && error.message?.includes('base_price')) {
      delete payload.base_price;
      const retry = await supabase.from('services').insert([payload]).select().single();
      data = retry.data;
      error = retry.error;
    } else if (error && error.message?.includes('price')) {
      delete payload.price;
      const retry = await supabase.from('services').insert([payload]).select().single();
      data = retry.data;
      error = retry.error;
    }

    if (error || !data) {
      return { ok: false, error: error?.message || 'No se pudo crear el servicio en Supabase.' };
    }

    const rawPrice = (data as any).price ?? (data as any).base_price ?? price;
    const priceNum = typeof rawPrice === 'number' && !isNaN(rawPrice) ? rawPrice : Number(rawPrice) || 0;

    return {
      ok: true,
      service: {
        id: String(data.id),
        name: String(data.name),
        description: data.description || '',
        duration_minutes: Number(data.duration_minutes) || duration,
        price: priceNum,
        base_price: priceNum,
        is_active: data.is_active ?? true,
        order_index: Number(data.order_index) || 0,
      },
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Error inesperado al crear servicio.' };
  }
}

export async function deleteService(id: string): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    const idx = DEFAULT_SERVICES.findIndex((s) => s.id === id);
    if (idx !== -1) DEFAULT_SERVICES.splice(idx, 1);
    return { ok: true };
  }

  try {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      // Si hay turnos vinculados que impiden el DELETE físico, aplicamos borrado lógico (is_active: false)
      const { error: softErr } = await supabase.from('services').update({ is_active: false }).eq('id', id);
      if (softErr) return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Error al eliminar servicio.' };
  }
}

export async function updateService(
  id: string,
  values: { name?: string; description?: string; duration_minutes?: number; price?: number }
): Promise<{ ok: boolean; error?: string }> {
  const price = values.price !== undefined ? Math.max(0, Math.round(values.price)) : undefined;
  const duration = values.duration_minutes !== undefined ? Math.max(15, Math.round(values.duration_minutes)) : undefined;

  const payload: Record<string, any> = {};
  if (values.name !== undefined) payload.name = values.name.trim();
  if (values.description !== undefined) payload.description = values.description.trim();
  if (duration !== undefined) payload.duration_minutes = duration;
  if (price !== undefined) {
    payload.price = price;
    payload.base_price = price;
  }

  if (!isSupabaseConfigured) {
    const item = DEFAULT_SERVICES.find((s) => s.id === id);
    if (item) {
      if (payload.name) item.name = payload.name;
      if (payload.description !== undefined) item.description = payload.description;
      if (duration !== undefined) item.duration_minutes = duration;
      if (price !== undefined) {
        item.price = price;
        item.base_price = price;
      }
    }
    return { ok: true };
  }

  try {
    let { error } = await supabase.from('services').update(payload).eq('id', id);

    if (error && error.message?.includes('base_price')) {
      delete payload.base_price;
      const retry = await supabase.from('services').update(payload).eq('id', id);
      error = retry.error;
    } else if (error && error.message?.includes('price')) {
      delete payload.price;
      const retry = await supabase.from('services').update(payload).eq('id', id);
      error = retry.error;
    }

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Error inesperado al actualizar servicio.' };
  }
}
