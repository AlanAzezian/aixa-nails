'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimeStepProps {
  selectedDate: string | null;
  timeSlots: string[];
  bookedSlots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  isLoading?: boolean;
}

export default function TimeStep({
  selectedDate,
  timeSlots,
  bookedSlots,
  selectedTime,
  onSelectTime,
  isLoading = false,
}: TimeStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="font-cormorant italic text-3xl font-light text-brand-burgundy">3</span>
        <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark">
          Elegí el horario
        </h2>
      </div>

      {!selectedDate ? (
        <p className="text-sm text-brand-dark/60 italic pl-1">
          Primero seleccioná un día en el paso 2 para ver los horarios disponibles.
        </p>
      ) : isLoading ? (
        <div className="flex flex-wrap gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-11 w-20 rounded-full bg-brand-accent/20 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = selectedTime === slot;

              if (isBooked) {
                return (
                  <div
                    key={slot}
                    className="relative px-5 py-2.5 rounded-full text-sm font-medium bg-brand-bg/60 border border-brand-accent/30 text-brand-dark/40 cursor-not-allowed select-none flex items-center justify-center"
                    title="Horario ocupado"
                  >
                    <span className="line-through decoration-brand-burgundy/60 decoration-1">
                      {slot}
                    </span>
                  </div>
                );
              }

              return (
                <motion.button
                  key={slot}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectTime(slot)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-brand-burgundy text-brand-bg-light border-brand-burgundy shadow-[0_4px_16px_rgba(107,15,36,0.25)] ring-2 ring-brand-burgundy/20'
                      : 'bg-brand-bg-light/95 hover:bg-brand-bg-light text-brand-dark border-brand-accent/35 hover:border-brand-burgundy/50 shadow-sm'
                  }`}
                >
                  {slot}
                </motion.button>
              );
            })}
          </div>

          <p className="text-xs text-brand-dark/60 italic pl-1">
            Los horarios tachados ya están ocupados.
          </p>
        </div>
      )}
    </div>
  );
}
