'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, DollarSign, Check } from 'lucide-react';
import { Service } from '@/types/database';

interface BookingSummaryCardProps {
  selectedService: Service | null;
  selectedDateDisplay: string | null;
  selectedTime: string | null;
  clientName: string;
  clientPhone: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  isMobileDrawer?: boolean;
}

export default function BookingSummaryCard({
  selectedService,
  selectedDateDisplay,
  selectedTime,
  clientName,
  clientPhone,
  isSubmitting,
  onSubmit,
  isMobileDrawer = false,
}: BookingSummaryCardProps) {
  const isComplete = Boolean(
    selectedService &&
      selectedDateDisplay &&
      selectedTime &&
      clientName.trim().length >= 2 &&
      clientPhone.trim().length >= 6
  );

  const formattedPrice = selectedService
    ? `$${selectedService.price.toLocaleString('es-AR')}`
    : '[$ PRECIO]';

  // Desktop Sticky Card view
  if (!isMobileDrawer) {
    return (
      <div className="sticky top-28 bg-brand-bg-light rounded-[32px] p-7 sm:p-8 border border-brand-accent/40 shadow-[0_12px_40px_rgba(107,15,36,0.06)] flex flex-col justify-between">
        <div>
          <h3 className="font-cormorant text-3xl font-semibold text-brand-dark mb-6 tracking-tight">
            Tu turno
          </h3>

          <div className="space-y-5 text-sm">
            {/* SERVICIO */}
            <div className="border-b border-brand-accent/20 pb-3.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-dark/50 block mb-1">
                Servicio
              </span>
              <p className="font-cormorant text-xl font-medium text-brand-dark">
                {selectedService ? selectedService.name : 'Sin elegir'}
              </p>
            </div>

            {/* DÍA Y HORA */}
            <div className="border-b border-brand-accent/20 pb-3.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-dark/50 block mb-1">
                Día y hora
              </span>
              <p className="font-cormorant text-xl font-medium text-brand-dark">
                {selectedDateDisplay && selectedTime
                  ? `${selectedDateDisplay} · ${selectedTime} hs`
                  : selectedDateDisplay
                  ? `${selectedDateDisplay} · (hora pendiente)`
                  : 'Sin elegir'}
              </p>
            </div>

            {/* PRECIO */}
            <div className="border-b border-brand-accent/20 pb-3.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-dark/50 block mb-1">
                Precio
              </span>
              <p className="font-jost text-base font-semibold text-brand-burgundy">
                {formattedPrice}{' '}
                <span className="text-xs font-normal text-brand-dark/60">
                  · se confirma al coordinar
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 pt-4">
          <motion.button
            type="button"
            whileHover={isComplete ? { scale: 1.02 } : {}}
            whileTap={isComplete ? { scale: 0.98 } : {}}
            disabled={!isComplete || isSubmitting}
            onClick={onSubmit}
            className={`w-full py-4 px-6 rounded-full font-medium text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
              isComplete && !isSubmitting
                ? 'bg-brand-burgundy hover:bg-brand-dark text-white cursor-pointer shadow-[0_8px_24px_rgba(107,15,36,0.3)]'
                : 'bg-brand-accent/30 text-brand-dark/40 border border-brand-accent/30 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Enviando solicitud...</span>
              </span>
            ) : (
              <>
                <span>Solicitar turno</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-brand-dark/60 mt-3 font-normal">
            {isComplete
              ? 'Listo para enviar. Aixa te responderá a la brevedad.'
              : 'Completá los 4 pasos para solicitar tu turno.'}
          </p>
        </div>
      </div>
    );
  }

  // Mobile Bottom Bar view
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-bg-light/95 backdrop-blur-md border-t border-brand-accent/30 shadow-[0_-8px_30px_rgba(107,15,36,0.12)] px-4 py-3 sm:px-6">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-brand-burgundy truncate">
            {selectedService ? selectedService.name : 'Elegí un servicio'}
          </p>
          <p className="text-xs text-brand-dark/70 truncate">
            {selectedDateDisplay && selectedTime
              ? `${selectedDateDisplay} · ${selectedTime} hs`
              : 'Fecha y hora pendientes'}
          </p>
        </div>

        <motion.button
          type="button"
          whileTap={isComplete ? { scale: 0.96 } : {}}
          disabled={!isComplete || isSubmitting}
          onClick={onSubmit}
          className={`flex-shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 transition-all ${
            isComplete && !isSubmitting
              ? 'bg-brand-burgundy text-white shadow-md'
              : 'bg-brand-accent/30 text-brand-dark/40 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Solicitar</span>
              <Sparkles className="w-3.5 h-3.5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
