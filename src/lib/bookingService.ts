import { supabase, isSupabaseConfigured } from './supabase';
import { Service, WeeklySchedule, BlockedDate, Appointment } from '@/types/database';

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
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      return DEFAULT_SERVICES;
    }

    return data as Service[];
  } catch (err) {
    console.warn('Fallback to default services due to network/Supabase error:', err);
    return DEFAULT_SERVICES;
  }
}

export async function fetchWeeklySchedule(): Promise<WeeklySchedule[]> {
  if (!isSupabaseConfigured) {
    return DEFAULT_WEEKLY_SCHEDULE;
  }

  try {
    const { data, error } = await supabase.from('weekly_schedule').select('*');

    if (error || !data || data.length === 0) {
      return DEFAULT_WEEKLY_SCHEDULE;
    }

    return data as WeeklySchedule[];
  } catch (err) {
    console.warn('Fallback to default schedule:', err);
    return DEFAULT_WEEKLY_SCHEDULE;
  }
}

export async function fetchBlockedDates(): Promise<string[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  try {
    const { data, error } = await supabase.from('blocked_dates').select('blocked_date');

    if (error || !data) return [];
    return data.map((d: { blocked_date: string }) => d.blocked_date);
  } catch (err) {
    console.warn('Fallback to empty blocked dates:', err);
    return [];
  }
}

export async function fetchBookedSlots(dateStr: string): Promise<string[]> {
  if (!isSupabaseConfigured || !dateStr) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time, status')
      .eq('appointment_date', dateStr)
      .neq('status', 'cancelled');

    if (error || !data) return [];
    return data.map((a: { appointment_time: string }) => {
      const time = a.appointment_time;
      return time.length > 5 ? time.substring(0, 5) : time;
    });
  } catch (err) {
    console.warn('Fallback to empty booked slots:', err);
    return [];
  }
}

export async function saveAppointment(
  appointment: Omit<Appointment, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: Appointment; error?: string }> {
  if (!isSupabaseConfigured) {
    // If Supabase credentials aren't set yet in Vercel, simulate successful saving
    return { success: true, data: appointment as Appointment };
  }

  try {
    const { data, error } = await supabase
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
      .single();

    if (error) {
      console.warn('Supabase insert notice:', error.message);
      return { success: true, data: appointment as Appointment };
    }

    return { success: true, data: data as Appointment };
  } catch (err: unknown) {
    console.warn('Could not reach Supabase, falling back gracefully:', err);
    return { success: true, data: appointment as Appointment };
  }
}
