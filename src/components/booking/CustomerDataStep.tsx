'use client';

import React from 'react';
import { User, Phone, MessageSquare } from 'lucide-react';

interface CustomerDataStepProps {
  clientName: string;
  clientPhone: string;
  notes: string;
  onChangeName: (val: string) => void;
  onChangePhone: (val: string) => void;
  onChangeNotes: (val: string) => void;
}

export default function CustomerDataStep({
  clientName,
  clientPhone,
  notes,
  onChangeName,
  onChangePhone,
  onChangeNotes,
}: CustomerDataStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="font-cormorant italic text-3xl font-light text-brand-burgundy">4</span>
        <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark">
          Tus datos
        </h2>
      </div>

      <div className="p-3 bg-brand-bg-light/80 rounded-2xl border border-brand-accent/35 text-xs text-brand-dark/75 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-burgundy shrink-0" />
        <span>
          <strong>Servicio a domicilio en Zona Norte:</strong> al confirmar el turno coordinaremos por WhatsApp tu dirección exacta y requerimientos especiales.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nombre y Apellido */}
        <div>
          <label
            htmlFor="customer-name"
            className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
          >
            Nombre y Apellido <span className="text-brand-burgundy">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-burgundy/50">
              <User className="w-4 h-4" />
            </div>
            <input
              id="customer-name"
              type="text"
              value={clientName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Tu nombre completo"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-bg-light border border-brand-accent/40 text-brand-dark text-sm placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div>
          <label
            htmlFor="customer-phone"
            className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
          >
            WhatsApp (celular) <span className="text-brand-burgundy">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-burgundy/50">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="customer-phone"
              type="tel"
              value={clientPhone}
              onChange={(e) => onChangePhone(e.target.value)}
              placeholder="11 1234 5678"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-bg-light border border-brand-accent/40 text-brand-dark text-sm placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Notas / Observaciones opcionales */}
      <div>
        <label
          htmlFor="customer-notes"
          className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
        >
          Notas u observaciones <span className="text-xs text-brand-dark/40 lowercase">(opcional)</span>
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-3.5 pointer-events-none text-brand-burgundy/50">
            <MessageSquare className="w-4 h-4" />
          </div>
          <textarea
            id="customer-notes"
            rows={2}
            value={notes}
            onChange={(e) => onChangeNotes(e.target.value)}
            placeholder="Ej: Tengo que retirarme esmalte previo o me gustaría consultar por un diseño..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-bg-light border border-brand-accent/40 text-brand-dark text-sm placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15 transition-all shadow-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}
