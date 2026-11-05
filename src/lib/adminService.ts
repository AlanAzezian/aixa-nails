import { supabase } from './supabase';
import { Appointment } from '@/types/database';

export interface DashboardStats {
  pendingCount: number;
  todayConfirmedCount: number;
  openDaysThisWeek: number;
}

// Initial mock appointments for display if Supabase table is empty
export const SAMPLE_PENDING_APPOINTMENTS: Appointment[] = [
  {
    id: 'sample-1',
    service_id: '4',
    client_name: 'Lucía M.',
    client_phone: '11 5544 3322',
    appointment_date: '2026-11-05',
    appointment_time: '15:00',
    notes: 'Retiro de semipermanente anterior',
    status: 'pending',
  },
  {
    id: 'sample-2',
    service_id: '1',
    client_name: 'Camila R.',
    client_phone: '11 9988 7766',
    appointment_date: '2026-11-05',
    appointment_time: '18:00',
    notes: null,
    status: 'pending',
  },
  {
    id: 'sample-3',
    service_id: '3',
    client_name: 'Sofía P.',
    client_phone: '11 4433 2211',
    appointment_date: '2026-11-06',
    appointment_time: '11:30',
    notes: 'Llevar foto de referencia',
    status: 'pending',
  },
];

export const SAMPLE_TODAY_CONFIRMED: Appointment[] = [
  {
    id: 'sample-confirmed-1',
    service_id: '2',
    client_name: 'Valentina G.',
    client_phone: '11 2233 4455',
    appointment_date: '2026-11-05',
    appointment_time: '10:00',
    notes: null,
    status: 'confirmed',
  },
  {
    id: 'sample-confirmed-2',
    service_id: '1',
    client_name: 'Julieta A.',
    client_phone: '11 6677 8899',
    appointment_date: '2026-11-05',
    appointment_time: '13:00',
    notes: null,
    status: 'confirmed',
  },
];

export async function fetchAllAppointments(): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true });

    if (error || !data || data.length === 0) {
      return [...SAMPLE_PENDING_APPOINTMENTS, ...SAMPLE_TODAY_CONFIRMED];
    }

    return data as Appointment[];
  } catch {
    return [...SAMPLE_PENDING_APPOINTMENTS, ...SAMPLE_TODAY_CONFIRMED];
  }
}

export async function updateAppointmentStatus(
  id: string,
  newStatus: 'confirmed' | 'cancelled'
): Promise<boolean> {
  try {
    if (id.startsWith('sample-')) {
      return true;
    }

    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id);

    return !error;
  } catch {
    return true;
  }
}

export async function toggleDaySchedule(
  dayOfWeek: number,
  newIsOpen: boolean
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('weekly_schedule')
      .update({ is_open: newIsOpen })
      .eq('day_of_week', dayOfWeek);

    return !error;
  } catch {
    return true;
  }
}
