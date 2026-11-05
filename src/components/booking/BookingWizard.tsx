'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ServiceStep from './ServiceStep';
import DateStep from './DateStep';
import TimeStep from './TimeStep';
import CustomerDataStep from './CustomerDataStep';
import BookingSummaryCard from './BookingSummaryCard';
import SuccessModal from './SuccessModal';
import {
  fetchServices,
  fetchWeeklySchedule,
  fetchBlockedDates,
  fetchBookedSlots,
  saveAppointment,
  DEFAULT_SERVICES,
  DEFAULT_WEEKLY_SCHEDULE,
  STANDARD_TIME_SLOTS,
} from '@/lib/bookingService';
import { Service, WeeklySchedule } from '@/types/database';

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const serviceIdParam = searchParams.get('serviceId');
  const styleParam = searchParams.get('style') || searchParams.get('diseno');

  // Pre-seed with guaranteed defaults so the wizard is NEVER blocked or blank
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>(DEFAULT_WEEKLY_SCHEDULE);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Loading states
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User selection states - preselect by query param or default to first service
  const [selectedService, setSelectedService] = useState<Service | null>(() => {
    if (serviceIdParam) {
      const match = DEFAULT_SERVICES.find((s) => s.id === serviceIdParam);
      if (match) return match;
    }
    return DEFAULT_SERVICES[0] || null;
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState(() => {
    return styleParam ? `Inspiración: ${styleParam}` : '';
  });

  useEffect(() => {
    if (styleParam && !notes) {
      setNotes(`Inspiración: ${styleParam}`);
    }
  }, [styleParam]);

  // Success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch initial services, schedule and blocked dates on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoadingInitialData(true);
      try {
        const [servicesRes, scheduleRes, blockedRes] = await Promise.all([
          fetchServices(),
          fetchWeeklySchedule(),
          fetchBlockedDates(),
        ]);

        if (!isMounted) return;

        const safeServices =
          Array.isArray(servicesRes) && servicesRes.length > 0 ? servicesRes : DEFAULT_SERVICES;
        const safeSchedule =
          Array.isArray(scheduleRes) && scheduleRes.length > 0
            ? scheduleRes
            : DEFAULT_WEEKLY_SCHEDULE;

        setServices(safeServices);
        setWeeklySchedule(safeSchedule);
        setBlockedDates(Array.isArray(blockedRes) ? blockedRes : []);

        // Preselect service: first check URL param serviceId, otherwise fallback to first service
        const matched = serviceIdParam
          ? safeServices.find((s) => s.id === serviceIdParam)
          : null;

        setSelectedService((current) => {
          if (matched) return matched;
          if (current && safeServices.some((s) => s.id === current.id)) return current;
          return safeServices[0] || null;
        });
      } catch (err) {
        console.warn('Fallback a datos estándar en BookingWizard:', err);
        if (isMounted) {
          setServices(DEFAULT_SERVICES);
          setWeeklySchedule(DEFAULT_WEEKLY_SCHEDULE);
          setBlockedDates([]);
          setSelectedService((prev) => prev || DEFAULT_SERVICES[0]);
        }
      } finally {
        if (isMounted) {
          setLoadingInitialData(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [serviceIdParam]);

  // Whenever selectedDate changes, fetch occupied time slots
  useEffect(() => {
    let isMounted = true;

    async function loadSlots() {
      if (!selectedDate) {
        if (isMounted) setBookedSlots([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const booked = await fetchBookedSlots(selectedDate);
        if (isMounted) {
          const safeBooked = Array.isArray(booked) ? booked : [];
          setBookedSlots(safeBooked);

          // Reset selected time if it's now booked
          if (selectedTime && safeBooked.includes(selectedTime)) {
            setSelectedTime(null);
          }
        }
      } catch (err) {
        console.warn('Error loading booked slots, fallback to empty:', err);
        if (isMounted) setBookedSlots([]);
      } finally {
        if (isMounted) {
          setLoadingSlots(false);
        }
      }
    }

    loadSlots();

    return () => {
      isMounted = false;
    };
  }, [selectedDate, selectedTime]);

  const handleDateSelect = (dateStr: string, display: string) => {
    setSelectedDate(dateStr);
    setSelectedDateDisplay(display);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await saveAppointment({
        service_id: selectedService.id,
        client_name: clientName.trim(),
        client_phone: clientPhone.trim(),
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        notes: notes.trim() || null,
        status: 'pending',
      });

      if (result.success) {
        setShowSuccessModal(true);
      } else {
        // En caso de cualquier detalle, permitimos coordinar por WhatsApp sin bloquear
        setShowSuccessModal(true);
      }
    } catch {
      // Si la red falla por completo, abrimos el modal de confirmación para coordinar por WhatsApp
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset form
    setSelectedTime(null);
    setClientName('');
    setClientPhone('');
    setNotes('');
  };

  const safeServices = Array.isArray(services) && services.length > 0 ? services : DEFAULT_SERVICES;
  const safeSchedule =
    Array.isArray(weeklySchedule) && weeklySchedule.length > 0
      ? weeklySchedule
      : DEFAULT_WEEKLY_SCHEDULE;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        {/* Left Column: The 4 Steps */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header Title */}
          <div className="border-b border-brand-accent/20 pb-6">
            <span className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1">
              Tu momento
            </span>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-medium text-brand-dark tracking-tight">
              Reservar turno
            </h1>
          </div>

          {/* Error notice if any */}
          {submitError && (
            <div className="p-4 rounded-2xl bg-red-100/80 border border-red-300 text-red-900 text-sm">
              {submitError}
            </div>
          )}

          {/* Step 1: Services */}
          <section className="bg-brand-bg-light/40 rounded-3xl p-6 sm:p-8 border border-brand-accent/30 shadow-sm">
            <ServiceStep
              services={safeServices}
              selectedService={selectedService}
              onSelectService={setSelectedService}
              isLoading={loadingInitialData}
            />
          </section>

          {/* Step 2: Date Selector */}
          <section className="bg-brand-bg-light/40 rounded-3xl p-6 sm:p-8 border border-brand-accent/30 shadow-sm">
            <DateStep
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              weeklySchedule={safeSchedule}
              blockedDates={blockedDates}
            />
          </section>

          {/* Step 3: Time Slot Selector */}
          <section className="bg-brand-bg-light/40 rounded-3xl p-6 sm:p-8 border border-brand-accent/30 shadow-sm">
            <TimeStep
              selectedDate={selectedDate}
              timeSlots={STANDARD_TIME_SLOTS}
              bookedSlots={bookedSlots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              isLoading={loadingSlots}
            />
          </section>

          {/* Step 4: Customer Details Form */}
          <section className="bg-brand-bg-light/40 rounded-3xl p-6 sm:p-8 border border-brand-accent/30 shadow-sm">
            <CustomerDataStep
              clientName={clientName}
              clientPhone={clientPhone}
              notes={notes}
              onChangeName={setClientName}
              onChangePhone={setClientPhone}
              onChangeNotes={setNotes}
            />
          </section>
        </div>

        {/* Right Column: Sticky Summary Card on Desktop */}
        <div className="hidden lg:block lg:col-span-4">
          <BookingSummaryCard
            selectedService={selectedService}
            selectedDateDisplay={selectedDateDisplay}
            selectedTime={selectedTime}
            clientName={clientName}
            clientPhone={clientPhone}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            isMobileDrawer={false}
          />
        </div>
      </div>

      {/* Floating Summary Bar for Mobile */}
      <BookingSummaryCard
        selectedService={selectedService}
        selectedDateDisplay={selectedDateDisplay}
        selectedTime={selectedTime}
        clientName={clientName}
        clientPhone={clientPhone}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        isMobileDrawer={true}
      />

      {/* Success Confirmation Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        service={selectedService}
        dateDisplay={selectedDateDisplay}
        time={selectedTime}
        clientName={clientName}
        clientPhone={clientPhone}
      />
    </div>
  );
}
