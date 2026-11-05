'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  STANDARD_TIME_SLOTS,
} from '@/lib/bookingService';
import { Service, WeeklySchedule } from '@/types/database';

export default function BookingWizard() {
  // Data states from Supabase
  const [services, setServices] = useState<Service[]>([]);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Loading states
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User selection states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch initial services, schedule and blocked dates on mount
  useEffect(() => {
    async function loadData() {
      setLoadingInitialData(true);
      try {
        const [servicesRes, scheduleRes, blockedRes] = await Promise.all([
          fetchServices(),
          fetchWeeklySchedule(),
          fetchBlockedDates(),
        ]);

        setServices(servicesRes);
        setWeeklySchedule(scheduleRes);
        setBlockedDates(blockedRes);

        // Preselect first service as friendly default
        if (servicesRes.length > 0) {
          setSelectedService(servicesRes[0]);
        }
      } catch (err) {
        console.error('Error loading booking data:', err);
      } finally {
        setLoadingInitialData(false);
      }
    }

    loadData();
  }, []);

  // Whenever selectedDate changes, fetch occupied time slots
  useEffect(() => {
    async function loadSlots() {
      if (!selectedDate) {
        setBookedSlots([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const booked = await fetchBookedSlots(selectedDate);
        setBookedSlots(booked);

        // Reset selected time if it's now booked
        if (selectedTime && booked.includes(selectedTime)) {
          setSelectedTime(null);
        }
      } catch (err) {
        console.error('Error loading booked slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    }

    loadSlots();
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
        setSubmitError(result.error || 'Ocurrió un error al guardar el turno. Intentá de nuevo.');
      }
    } catch {
      setSubmitError('Error de conexión al enviar el turno. Podés confirmar directo por WhatsApp.');
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
              services={services}
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
              weeklySchedule={weeklySchedule}
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
