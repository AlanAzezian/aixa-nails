'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WeeklySchedule } from '@/types/database';

interface CalendarDay {
  dateStr: string; // YYYY-MM-DD
  dayName: string; // LUN, MAR, etc.
  dayNumber: number; // 26, 27
  monthName: string; // oct, nov
  fullDisplay: string; // "Lun 26 oct"
  isAvailable: boolean;
  statusLabel?: string;
}

interface DateStepProps {
  selectedDate: string | null;
  onSelectDate: (dateStr: string, display: string) => void;
  weeklySchedule: WeeklySchedule[];
  blockedDates: string[];
}

export default function DateStep({
  selectedDate,
  onSelectDate,
  weeklySchedule,
  blockedDates,
}: DateStepProps) {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Generate next 14 days client-side on mount to prevent Next.js prerender date skew
  useEffect(() => {
    const days: CalendarDay[] = [];
    const today = new Date();

    const dayFormatter = new Intl.DateTimeFormat('es-AR', { weekday: 'short' });
    const monthFormatter = new Intl.DateTimeFormat('es-AR', { month: 'short' });

    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday

      // Check weekly schedule
      const scheduleConfig = weeklySchedule.find((s) => s.day_of_week === dayOfWeek);
      const isOpenInSchedule = scheduleConfig
        ? scheduleConfig.is_open
        : dayOfWeek !== 0 && dayOfWeek !== 6;

      // Check blocked dates
      const isBlocked = blockedDates.includes(dateStr);

      const isAvailable = isOpenInSchedule && !isBlocked;

      // Clean day name e.g. "lun." -> "LUN"
      const rawDay = dayFormatter.format(d).replace('.', '').toUpperCase();
      const rawMonth = monthFormatter.format(d).replace('.', '').toLowerCase();

      days.push({
        dateStr,
        dayName: rawDay,
        dayNumber: d.getDate(),
        monthName: rawMonth,
        fullDisplay: `${rawDay.slice(0, 3)} ${d.getDate()} ${rawMonth}`,
        isAvailable,
        statusLabel: isBlocked ? 'No disp.' : !isOpenInSchedule ? 'Cerrado' : undefined,
      });
    }

    setCalendarDays(days);
    setIsReady(true);
  }, [weeklySchedule, blockedDates]);

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="font-cormorant italic text-3xl font-light text-brand-burgundy">2</span>
        <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark">
          Elegí el día
        </h2>
      </div>

      {/* Horizontal Scrollable Days Carousel */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        {!isReady ? (
          <div className="flex gap-2.5 sm:gap-3 overflow-x-hidden pb-3 pt-1">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-16 sm:w-[72px] h-24 sm:h-28 rounded-2xl bg-brand-accent/20 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar snap-x">
            {calendarDays.map((day) => {
              const isSelected = selectedDate === day.dateStr;

              if (!day.isAvailable) {
                return (
                  <div
                    key={day.dateStr}
                    className="flex-shrink-0 w-16 sm:w-[72px] h-24 sm:h-28 rounded-2xl bg-brand-bg/50 border border-brand-accent/20 flex flex-col items-center justify-center p-2 opacity-40 cursor-not-allowed select-none"
                    title={day.statusLabel || 'Día no disponible'}
                  >
                    <span className="text-[10px] sm:text-xs font-semibold text-brand-dark/60 tracking-wider">
                      {day.dayName}
                    </span>
                    <span className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark/50 my-0.5 line-through decoration-brand-accent">
                      {day.dayNumber}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-brand-dark/50 uppercase">
                      {day.monthName}
                    </span>
                  </div>
                );
              }

              return (
                <motion.button
                  key={day.dateStr}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectDate(day.dateStr, day.fullDisplay)}
                  className={`flex-shrink-0 w-16 sm:w-[72px] h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-200 cursor-pointer snap-start border ${
                    isSelected
                      ? 'bg-brand-burgundy text-brand-bg-light border-brand-burgundy shadow-[0_6px_20px_rgba(107,15,36,0.25)] ring-2 ring-brand-burgundy/20 scale-[1.03]'
                    : 'bg-brand-bg-light/95 hover:bg-brand-bg-light text-brand-dark border-brand-accent/35 hover:border-brand-burgundy/50 shadow-sm'
                  }`}
                >
                  <span
                    className={`text-[11px] sm:text-xs font-semibold tracking-wider ${
                      isSelected ? 'text-brand-accent/90' : 'text-brand-burgundy/80'
                    }`}
                  >
                    {day.dayName}
                  </span>

                  <span className="font-cormorant text-2xl sm:text-3xl font-semibold my-0.5">
                    {day.dayNumber}
                  </span>

                  <span
                    className={`text-[10px] uppercase font-medium ${
                      isSelected ? 'text-brand-bg-light/80' : 'text-brand-dark/60'
                    }`}
                  >
                    {day.monthName}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
