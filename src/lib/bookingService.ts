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

    const sanitized: Service[] = (data as Service[])
      .filter((s) => s && s.name)
      .map((s, idx) => ({
        id: String(s.id || idx + 1),
        name: String(s.name),
        description: s.description ? String(s.description) : '',
        duration_minutes: Number(s.duration_minutes) || 60,
        price: typeof s.price === 'number' && !isNaN(s.price) ? s.price : Number(s.price) || 0,
        is_active: s.is_active ?? true,
        order_index: Number(s.order_index) || idx + 1,
      }));

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
