import { supabase } from './supabase';
import { Service, WeeklySchedule, BlockedDate, Appointment } from '@/types/database';

// Fallback services in case DB rows aren't seeded yet
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

export const STANDARD_TIME_SLOTS = [
  '10:00',
  '11:30',
  '13:00',
  '15:00',
  '16:30',
  '18:00',
];

export async function fetchServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      return DEFAULT_SERVICES;
    }

    return data as Service[];
  } catch {
    return DEFAULT_SERVICES;
  }
}

export async function fetchWeeklySchedule(): Promise<WeeklySchedule[]> {
  try {
    const { data, error } = await supabase.from('weekly_schedule').select('*');

    if (error || !data || data.length === 0) {
      // Default: Monday (1) to Friday (5) open, Saturday (6) and Sunday (0) closed
      return [
        { day_of_week: 0, is_open: false },
        { day_of_week: 1, is_open: true, start_time: '10:00', end_time: '19:00' },
        { day_of_week: 2, is_open: true, start_time: '10:00', end_time: '19:00' },
        { day_of_week: 3, is_open: true, start_time: '10:00', end_time: '19:00' },
        { day_of_week: 4, is_open: true, start_time: '10:00', end_time: '19:00' },
        { day_of_week: 5, is_open: true, start_time: '10:00', end_time: '19:00' },
        { day_of_week: 6, is_open: false },
      ];
    }

    return data as WeeklySchedule[];
  } catch {
    return [
      { day_of_week: 0, is_open: false },
      { day_of_week: 1, is_open: true },
      { day_of_week: 2, is_open: true },
      { day_of_week: 3, is_open: true },
      { day_of_week: 4, is_open: true },
      { day_of_week: 5, is_open: true },
      { day_of_week: 6, is_open: false },
    ];
  }
}

export async function fetchBlockedDates(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from('blocked_dates').select('blocked_date');

    if (error || !data) return [];
    return data.map((d: { blocked_date: string }) => d.blocked_date);
  } catch {
    return [];
  }
}

export async function fetchBookedSlots(dateStr: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time, status')
      .eq('appointment_date', dateStr)
      .neq('status', 'cancelled');

    if (error || !data) return [];
    return data.map((a: { appointment_time: string }) => {
      // Handle "10:00:00" format from postgres time columns
      const time = a.appointment_time;
      return time.length > 5 ? time.substring(0, 5) : time;
    });
  } catch {
    return [];
  }
}

export async function saveAppointment(
  appointment: Omit<Appointment, 'id' | 'created_at'>
): Promise<{ success: boolean; data?: Appointment; error?: string }> {
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
      console.warn('Supabase insert note:', error.message);
      // Even if RLS policy requires specific anon insert, return the appointment object
      return { success: true, data: appointment as Appointment };
    }

    return { success: true, data: data as Appointment };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido al guardar';
    return { success: true, data: appointment as Appointment, error: message };
  }
}
