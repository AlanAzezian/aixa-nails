'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  ExternalLink,
  LogOut,
  Sparkles,
  User,
  Menu,
  X,
  Phone,
  RefreshCw,
  Image as ImageIcon,
  Settings,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { fetchWeeklySchedule, fetchServices } from '@/lib/bookingService';
import {
  fetchAllAppointments,
  updateAppointmentStatus,
  toggleDaySchedule,
} from '@/lib/adminService';
import { Appointment, WeeklySchedule, Service } from '@/types/database';
import BrandLogo from '@/components/BrandLogo';
import GalleryManager from '@/components/admin/GalleryManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';

type AdminTab = 'agenda' | 'solicitudes' | 'disponibilidad' | 'galeria' | 'ajustes';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>('agenda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [todayStr, setTodayStr] = useState('2026-11-05');
  const [todayFormatted, setTodayFormatted] = useState('Hoy');
  const [confirmedClientWhatsApp, setConfirmedClientWhatsApp] = useState<{
    phone: string;
    url: string;
    name: string;
  } | null>(null);

  // Load all dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const now = new Date();
      setTodayStr(now.toISOString().split('T')[0]);
      setTodayFormatted(`Hoy ${now.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}`);

      const [appRes, schedRes, servRes] = await Promise.all([
        fetchAllAppointments(),
        fetchWeeklySchedule(),
        fetchServices(),
      ]);

      setAppointments(appRes);
      setWeeklySchedule(schedRes);
      setServices(servRes);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  // Helper to find service name by ID
  const getServiceName = (serviceId: string) => {
    const s = services.find((srv) => srv.id === serviceId);
    return s ? s.name : 'Servicio personalizado';
  };

  // Status updates
  const handleConfirm = async (appointment: Appointment) => {
    if (!appointment.id) return;

    await updateAppointmentStatus(appointment.id, 'confirmed');

    // Update local state
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointment.id ? { ...a, status: 'confirmed' } : a))
    );

    // Build pre-filled WhatsApp message for client
    const cleanPhone = appointment.client_phone.replace(/\D/g, '');
    const serviceName = getServiceName(appointment.service_id);
    const text = encodeURIComponent(
      `Hola ${appointment.client_name}! Te confirmo tu turno para ${serviceName} el ${appointment.appointment_date} a las ${appointment.appointment_time} hs en Aixa Nails (Virreyes). Te espero!`
    );
    const waUrl = `https://wa.me/${cleanPhone.startsWith('54') ? cleanPhone : `549${cleanPhone}`}?text=${text}`;

    setConfirmedClientWhatsApp({
      phone: appointment.client_phone,
      name: appointment.client_name,
      url: waUrl,
    });
  };

  const handleReject = async (appointment: Appointment) => {
    if (!appointment.id) return;

    await updateAppointmentStatus(appointment.id, 'cancelled');

    setAppointments((prev) =>
      prev.map((a) => (a.id === appointment.id ? { ...a, status: 'cancelled' } : a))
    );
  };

  const handleToggleDay = async (dayOfWeek: number, currentIsOpen: boolean) => {
    const newStatus = !currentIsOpen;

    // Optimistic UI update
    setWeeklySchedule((prev) =>
      prev.map((d) => (d.day_of_week === dayOfWeek ? { ...d, is_open: newStatus } : d))
    );

    await toggleDaySchedule(dayOfWeek, newStatus);
  };

  // KPIs
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');
  const todayAppointments = appointments.filter(
    (a) => a.appointment_date === todayStr && a.status === 'confirmed'
  );
  const openDaysCount = weeklySchedule.filter((d) => d.is_open).length;

  // Day of week labels (0=Dom, 1=Lun, ..., 6=Sab)
  const daysMap = [
    { day: 1, name: 'Lun', label: 'Lunes' },
    { day: 2, name: 'Mar', label: 'Martes' },
    { day: 3, name: 'Mié', label: 'Miércoles' },
    { day: 4, name: 'Jue', label: 'Jueves' },
    { day: 5, name: 'Vie', label: 'Viernes' },
    { day: 6, name: 'Sáb', label: 'Sábado' },
    { day: 0, name: 'Dom', label: 'Domingo' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF0F2] flex flex-col md:flex-row text-brand-dark">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-brand-dark text-brand-bg-light p-6 flex-shrink-0 shadow-xl">
        <div>
          {/* Brand Monogram */}
          <div className="pb-8 border-b border-white/10">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-cormorant font-bold text-2xl tracking-wider text-brand-bg-light">
                AN*
              </span>
              <span className="font-script text-2xl text-brand-accent">Aixa nails</span>
            </Link>
            <span className="block text-[11px] uppercase tracking-widest text-brand-accent/70 mt-1">
              Panel Administrativo
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 space-y-1.5 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('agenda')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'agenda'
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'text-brand-bg-light/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-brand-accent" />
              <span>Agenda</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('solicitudes')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'solicitudes'
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'text-brand-bg-light/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-accent" />
                <span>Solicitudes</span>
              </div>
              {pendingAppointments.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-brand-accent text-brand-dark text-xs font-bold">
                  {pendingAppointments.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('disponibilidad')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'disponibilidad'
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'text-brand-bg-light/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4 text-brand-accent" />
              <span>Horarios y Días</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('galeria')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'galeria'
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'text-brand-bg-light/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-brand-accent" />
              <span>Galería de Trabajos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ajustes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'ajustes'
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'text-brand-bg-light/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-brand-accent" />
              <span>Ajustes del Sitio</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 text-xs text-brand-bg-light/80 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-brand-accent" />
            <span>Ver sitio público</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 text-xs text-red-300 hover:text-red-200 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-brand-dark text-brand-bg-light p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-cormorant font-bold text-xl text-brand-bg-light">AN*</span>
          <span className="font-script text-xl text-brand-accent">Aixa nails</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-2 text-brand-bg-light/80 hover:text-white"
            title="Ver sitio público"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-bg-light hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-white/10 px-4 py-4 space-y-2 text-sm text-brand-bg-light"
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab('agenda');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              Agenda y Turnos
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('solicitudes');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5 flex justify-between items-center"
            >
              <span>Solicitudes</span>
              {pendingAppointments.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-brand-accent text-brand-dark text-xs font-bold">
                  {pendingAppointments.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('disponibilidad');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              Mi Disponibilidad
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('galeria');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              Galería de Trabajos
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('ajustes');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              Ajustes del Sitio
            </button>
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left py-2 px-3 text-red-300"
              >
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-6xl overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-script text-3xl text-brand-burgundy block mb-1">
              Hola, Aixa
            </span>
            <h1 className="font-cormorant text-3xl sm:text-4xl font-semibold text-brand-dark tracking-tight">
              {activeTab === 'galeria'
                ? 'Galería de Trabajos'
                : activeTab === 'ajustes'
                ? 'Ajustes del Sitio'
                : activeTab === 'solicitudes'
                ? 'Solicitudes de Turnos'
                : activeTab === 'disponibilidad'
                ? 'Días y Horarios'
                : `Agenda · ${todayFormatted}`}
            </h1>
          </div>

          <button
            type="button"
            onClick={loadDashboardData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-bg-light border border-brand-accent/40 text-xs font-medium text-brand-dark/80 hover:text-brand-burgundy transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar datos</span>
          </button>
        </div>

        {/* Tab 1: Galería de Trabajos */}
        {activeTab === 'galeria' && <GalleryManager />}

        {/* Tab 2: Ajustes del Sitio */}
        {activeTab === 'ajustes' && <SiteSettingsManager />}

        {/* Tab 3, 4, 5: Agenda, Solicitudes, Disponibilidad */}
        {(activeTab === 'agenda' ||
          activeTab === 'solicitudes' ||
          activeTab === 'disponibilidad') && (
          <>
            {/* WhatsApp Confirmation Toast / Banner */}
            <AnimatePresence>
              {confirmedClientWhatsApp && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 p-5 rounded-2xl bg-[#E8F8ED] border border-green-300 text-green-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0" />
                    <p className="text-sm">
                      Turno confirmado para <strong>{confirmedClientWhatsApp.name}</strong>. ¿Querés
                      enviarle la confirmación por WhatsApp ahora?
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={confirmedClientWhatsApp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-green-700 hover:bg-green-800 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Mandar WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setConfirmedClientWhatsApp(null)}
                      className="p-2 text-green-900/60 hover:text-green-950"
                      aria-label="Cerrar aviso"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {/* Confirmed Today */}
              <div className="bg-brand-bg-light rounded-3xl p-6 border border-brand-accent/35 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark/60 block mb-2">
                  Turnos confirmados (hoy)
                </span>
                <div className="font-cormorant text-5xl font-light text-brand-burgundy leading-none">
                  {todayAppointments.length}
                </div>
              </div>

              {/* Pending Requests */}
              <div className="bg-brand-bg-light rounded-3xl p-6 border border-brand-accent/35 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark/60 block mb-2">
                  Solicitudes pendientes
                </span>
                <div className="font-cormorant text-5xl font-light text-brand-burgundy leading-none">
                  {pendingAppointments.length}
                </div>
              </div>

              {/* Open Days */}
              <div className="bg-brand-bg-light rounded-3xl p-6 border border-brand-accent/35 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark/60 block mb-2">
                  Días abiertos esta semana
                </span>
                <div className="font-cormorant text-5xl font-light text-brand-burgundy leading-none">
                  {openDaysCount}
                </div>
              </div>
            </div>

            {/* 2 Main Modules Grid: Solicitudes Nuevas & Turnos del Día */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              {/* Solicitudes Nuevas */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
                    Solicitudes nuevas
                  </h2>
                  <span className="text-xs text-brand-dark/60">
                    {pendingAppointments.length} pendientes
                  </span>
                </div>

                {pendingAppointments.length === 0 ? (
                  <div className="bg-brand-bg-light/60 rounded-3xl p-8 border border-dashed border-brand-accent/40 text-center text-sm text-brand-dark/60">
                    No hay solicitudes pendientes en este momento.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {pendingAppointments.map((app) => (
                      <motion.div
                        key={app.id}
                        layout
                        className="bg-brand-bg-light rounded-2xl p-5 border border-brand-accent/35 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-brand-dark text-base">
                              {app.client_name}
                            </span>
                            <span className="text-xs text-brand-dark/50">·</span>
                            <span className="text-xs font-medium text-brand-burgundy">
                              {app.appointment_date} · {app.appointment_time} hs
                            </span>
                          </div>

                          <p className="text-xs text-brand-dark/75 font-normal">
                            {getServiceName(app.service_id)}
                          </p>

                          {app.notes && (
                            <p className="text-xs text-brand-dark/60 italic mt-1 bg-brand-bg/50 px-2 py-0.5 rounded-md inline-block">
                              Nota: {app.notes}
                            </p>
                          )}

                          <div className="flex items-center gap-1.5 text-xs text-brand-dark/60 mt-1">
                            <Phone className="w-3 h-3 text-brand-accent" />
                            <span>{app.client_phone}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleConfirm(app)}
                            className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
                          >
                            Confirmar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReject(app)}
                            className="px-4 py-2 rounded-full bg-brand-bg hover:bg-brand-accent/20 text-brand-dark/80 text-xs font-medium border border-brand-accent/40 transition-all cursor-pointer"
                          >
                            Rechazar
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Turnos del Día */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
                  Turnos del día
                </h2>

                {todayAppointments.length === 0 ? (
                  <div className="bg-brand-bg-light/60 rounded-3xl p-8 border border-dashed border-brand-accent/40 text-center text-sm text-brand-dark/60">
                    No hay turnos confirmados agendados para hoy.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todayAppointments.map((app) => (
                      <div
                        key={app.id}
                        className="bg-brand-bg-light rounded-2xl p-4 border border-brand-accent/35 shadow-sm flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="font-cormorant text-xl font-semibold text-brand-burgundy">
                            {app.appointment_time}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-brand-dark">{app.client_name}</p>
                            <p className="text-xs text-brand-dark/60">
                              {getServiceName(app.service_id)}
                            </p>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-brand-burgundy text-white text-[10px] font-bold tracking-wider uppercase">
                          Confirmado
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Module: Mi Disponibilidad (Semana) */}
            <div className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm">
              <div className="mb-6">
                <h2 className="font-cormorant text-2xl font-semibold text-brand-dark mb-1">
                  Mi disponibilidad
                </h2>
                <p className="text-xs sm:text-sm text-brand-dark/60">
                  Tocá un día para abrirlo o cerrarlo. Horario base 10:00 a 19:00.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {daysMap.map(({ day, name, label }) => {
                  const schedule = weeklySchedule.find((s) => s.day_of_week === day);
                  const isOpen = schedule ? schedule.is_open : false;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleToggleDay(day, isOpen)}
                      className={`p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer text-center border ${
                        isOpen
                          ? 'bg-brand-burgundy text-brand-bg-light border-brand-burgundy shadow-sm hover:scale-[1.02]'
                          : 'bg-brand-bg/40 text-brand-dark/60 border-dashed border-brand-accent/50 hover:border-brand-burgundy/50'
                      }`}
                    >
                      <span className="text-xs font-semibold tracking-wider mb-1">{name}</span>
                      <span className="text-[11px] uppercase font-bold tracking-wider">
                        {isOpen ? 'Abierto' : 'Cerrado'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
