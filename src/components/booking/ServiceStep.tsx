'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Service } from '@/types/database';

interface ServiceStepProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
  isLoading?: boolean;
}

export default function ServiceStep({
  services,
  selectedService,
  onSelectService,
  isLoading = false,
}: ServiceStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="font-cormorant italic text-3xl font-light text-brand-burgundy">1</span>
        <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark">
          Elegí el servicio
        </h2>
      </div>

      {isLoading ? (
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-12 w-48 rounded-full bg-brand-accent/20 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {services.map((service) => {
            const isSelected = selectedService?.id === service.id;

            return (
              <motion.button
                key={service.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectService(service)}
                className={`group relative inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-brand-burgundy text-brand-bg-light border-brand-burgundy shadow-[0_4px_16px_rgba(107,15,36,0.25)] ring-2 ring-brand-burgundy/20'
                    : 'bg-brand-bg-light/90 hover:bg-brand-bg-light text-brand-dark border-brand-accent/40 hover:border-brand-burgundy/60 shadow-sm'
                }`}
              >
                <span className="tracking-wide">{service.name}</span>

                <span
                  className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-brand-bg-light font-normal'
                      : 'bg-brand-accent/20 text-brand-burgundy/90 group-hover:bg-brand-burgundy/10'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{service.duration_minutes}m</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {selectedService && selectedService.description && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm text-brand-dark/70 italic pl-1"
        >
          {selectedService.description}
        </motion.p>
      )}
    </div>
  );
}
