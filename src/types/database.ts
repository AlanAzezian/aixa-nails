export interface Service {
  id: string;
  name: string;
  description?: string | null;
  duration_minutes: number;
  price: number;
  base_price?: number;
  is_active: boolean;
  order_index?: number;
}

export interface WeeklySchedule {
  id?: string;
  day_of_week: number; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  is_open: boolean;
  start_time?: string;
  end_time?: string;
}

export interface BlockedDate {
  id?: string;
  blocked_date: string; // YYYY-MM-DD
  reason?: string | null;
}

export interface Appointment {
  id?: string;
  service_id: string;
  client_name: string;
  client_phone: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // HH:mm
  notes?: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
}

export const WORK_CATEGORIES = ['Semipermanente', 'Polygel', 'Soft gel'] as const;
export type WorkCategory = string;

export interface Category {
  id: string;
  name: string;
  order_index?: number;
  created_at?: string;
}

export interface Work {
  id: string;
  title: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  order_index?: number;
  created_at?: string;
}

export interface SiteSettings {
  id?: number;
  whatsapp_number?: string | null;
  whatsapp_phone?: string | null;
  location_text?: string | null;
  updated_at?: string;
}

export interface BookingFormData {
  service: Service | null;
  date: string | null; // YYYY-MM-DD
  dateDisplay: string | null; // e.g. "Lun 26 oct"
  time: string | null; // e.g. "11:30"
  clientName: string;
  clientPhone: string;
  notes: string;
}
