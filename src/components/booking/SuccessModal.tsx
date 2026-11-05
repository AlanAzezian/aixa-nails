'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, MessageCircle, Home, X } from 'lucide-react';
import { Service } from '@/types/database';
import { useWhatsAppPhone } from '@/components/WhatsAppLink';
import { buildWhatsAppUrl } from '@/lib/siteSettings';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  dateDisplay: string | null;
  time: string | null;
  clientName: string;
  clientPhone: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  service,
  dateDisplay,
  time,
  clientName,
  clientPhone,
}: SuccessModalProps) {
  const whatsappPhone = useWhatsAppPhone();

  useEffect(() => {
    // Only fire confetti in the browser via dynamic import to guarantee SSR safety
    if (isOpen && typeof window !== 'undefined') {
      import('canvas-confetti')
        .then((confettiModule) => {
          const confetti = confettiModule.default || confettiModule;
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6B0F24', '#C9939B', '#FDE8E9', '#FFD700'],
          });
        })
        .catch(() => {
          // Graceful fallback if canvas is not supported
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Build preloaded WhatsApp message (al número configurado por Aixa en el panel)
  const whatsappText =
    `Hola Aixa! Acabo de solicitar un turno en la web:\n` +
    `• Nombre: ${clientName}\n` +
    `• Teléfono: ${clientPhone}\n` +
    `• Servicio: ${service?.name || ''}\n` +
    `• Fecha: ${dateDisplay || ''}\n` +
    `• Horario: ${time || ''} hs\n\n` +
    `¿Me confirmás la reserva? ¡Muchas gracias!`;

  const whatsappUrl = buildWhatsAppUrl(whatsappText, whatsappPhone);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-brand-bg-light rounded-[32px] p-6 sm:p-10 border border-brand-accent/40 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-brand-dark/60 hover:text-brand-burgundy hover:bg-brand-bg transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-brand-bg border border-brand-accent/40 flex items-center justify-center text-brand-burgundy mb-5 shadow-inner">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <span className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1">
              ¡Muchas gracias!
            </span>

            <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-brand-dark tracking-tight mb-2">
              Solicitud de turno enviada
            </h3>

            <p className="font-jost text-sm sm:text-base text-brand-dark/75 max-w-sm mb-6 leading-relaxed">
              Registramos tu solicitud con éxito. Aixa te responderá a la brevedad para confirmar
              tu horario.
            </p>

            {/* Recap card */}
            <div className="w-full bg-brand-bg/60 rounded-2xl p-5 border border-brand-accent/30 text-left space-y-2 mb-8 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-brand-accent/20">
                <span className="text-xs uppercase text-brand-dark/50 font-semibold tracking-wider">
                  Clienta
                </span>
                <span className="font-medium text-brand-dark">{clientName}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-brand-accent/20">
                <span className="text-xs uppercase text-brand-dark/50 font-semibold tracking-wider">
                  Servicio
                </span>
                <span className="font-medium text-brand-burgundy">{service?.name}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-xs uppercase text-brand-dark/50 font-semibold tracking-wider">
                  Fecha y Horario
                </span>
                <span className="font-medium text-brand-dark">
                  {dateDisplay} · {time} hs
                </span>
              </div>
            </div>

            {/* Primary Action: Open WhatsApp */}
            <div className="w-full space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white font-medium text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirmar por WhatsApp con Aixa</span>
              </a>

              <Link
                href="/"
                onClick={onClose}
                className="w-full py-3 px-6 rounded-full bg-transparent hover:bg-brand-bg text-brand-dark/80 hover:text-brand-burgundy font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Volver al inicio</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
