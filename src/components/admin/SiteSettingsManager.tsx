'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  DollarSign,
  Clock,
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { fetchServices, DEFAULT_SERVICES } from '@/lib/bookingService';
import {
  fetchSiteSettings,
  updateWhatsAppPhone,
  updateServiceBasics,
  normalizeWhatsAppPhone,
  buildWhatsAppUrl,
} from '@/lib/siteSettings';
import { Service } from '@/types/database';

type Notice = { type: 'success' | 'error'; text: string } | null;

export default function SiteSettingsManager() {
  // WhatsApp settings
  const [phoneInput, setPhoneInput] = useState('');
  const [currentPhone, setCurrentPhone] = useState<string | null>(null);
  const [savingPhone, setSavingPhone] = useState(false);
  const [phoneNotice, setPhoneNotice] = useState<Notice>(null);

  // Services settings
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceValues, setServiceValues] = useState<
    Record<string, { price: number; duration_minutes: number }>
  >({});
  const [savingServiceId, setSavingServiceId] = useState<string | null>(null);
  const [servicesNotice, setServicesNotice] = useState<Notice>(null);

  useEffect(() => {
    // Load current WhatsApp settings
    fetchSiteSettings().then((settings) => {
      if (settings?.whatsapp_phone) {
        setCurrentPhone(settings.whatsapp_phone);
        setPhoneInput(settings.whatsapp_phone);
      }
    });

    // Load current services
    fetchServices().then((data) => {
      const activeServices = Array.isArray(data) && data.length > 0 ? data : DEFAULT_SERVICES;
      setServices(activeServices);
      const initialMap: Record<string, { price: number; duration_minutes: number }> = {};
      activeServices.forEach((s) => {
        initialMap[s.id] = {
          price: Number(s.price) || 0,
          duration_minutes: Number(s.duration_minutes) || 60,
        };
      });
      setServiceValues(initialMap);
      setLoadingServices(false);
    });
  }, []);

  const normalizedPreview = normalizeWhatsAppPhone(phoneInput);
  const testWaUrl = buildWhatsAppUrl('Hola Aixa! Mensaje de prueba desde el sitio.', normalizedPreview);

  const handleSavePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPhone(true);
    setPhoneNotice(null);

    try {
      const result = await updateWhatsAppPhone(phoneInput);
      if (result.ok) {
        setCurrentPhone(result.phone);
        setPhoneNotice({
          type: 'success',
          text: result.phone
            ? `Teléfono actualizado: los enlaces de WhatsApp del sitio ahora apuntan a +${result.phone}`
            : 'Teléfono limpiado: los enlaces ahora abren WhatsApp genérico.',
        });
      } else {
        setPhoneNotice({ type: 'error', text: result.error });
      }
    } catch (err) {
      setPhoneNotice({
        type: 'error',
        text: `Error de red: ${err instanceof Error ? err.message : 'intentá nuevamente'}`,
      });
    } finally {
      setSavingPhone(false);
    }
  };

  const handleServiceFieldChange = (
    id: string,
    field: 'price' | 'duration_minutes',
    value: number
  ) => {
    setServiceValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveService = async (service: Service) => {
    const currentValues = serviceValues[service.id];
    if (!currentValues) return;

    setSavingServiceId(service.id);
    setServicesNotice(null);

    try {
      const result = await updateServiceBasics(service.id, {
        price: currentValues.price,
        duration_minutes: currentValues.duration_minutes,
        name: service.name,
        description: service.description || '',
      });

      if (result.ok) {
        setServices((prev) =>
          prev.map((s) =>
            s.id === service.id
              ? {
                  ...s,
                  price: currentValues.price,
                  duration_minutes: currentValues.duration_minutes,
                }
              : s
          )
        );
        setServicesNotice({
          type: 'success',
          text: `"${service.name}" actualizado con éxito ($${currentValues.price.toLocaleString('es-AR')} · ${currentValues.duration_minutes}m).`,
        });
      } else {
        setServicesNotice({ type: 'error', text: result.error });
      }
    } catch (err) {
      setServicesNotice({
        type: 'error',
        text: `Error al guardar: ${err instanceof Error ? err.message : 'intentá nuevamente'}`,
      });
    } finally {
      setSavingServiceId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* WhatsApp settings card */}
      <div className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700">
            <Phone className="w-5 h-5" />
          </div>
          <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
            Teléfono de WhatsApp
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-dark/60 mb-6">
          Configurá el número al que se dirigen todas las clientas desde los botones de reserva, pie de página y consultas del sitio.
        </p>

        <form onSubmit={handleSavePhone} className="space-y-4 max-w-xl">
          <div>
            <label
              htmlFor="wa-phone"
              className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
            >
              Número de celular (con código de área)
            </label>
            <div className="relative">
              <input
                id="wa-phone"
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="Ej: 11 2345 6789 o +54 9 11 2345 6789"
                className="w-full pl-4 pr-24 py-3 rounded-2xl bg-white border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15"
              />
              <button
                type="submit"
                disabled={savingPhone}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                {savingPhone ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Guardar</span>
              </button>
            </div>
          </div>

          {/* Helper format preview */}
          <div className="text-xs text-brand-dark/65 space-y-1 bg-brand-bg/60 p-3.5 rounded-xl border border-brand-accent/30">
            <div className="flex items-center justify-between">
              <span>
                Formato internacional interpretado:{' '}
                <strong>{normalizedPreview ? `+${normalizedPreview}` : '(vacío / sin teléfono)'}</strong>
              </span>
              {normalizedPreview && (
                <a
                  href={testWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-burgundy font-medium hover:underline ml-2"
                >
                  <span>Probar enlace</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-brand-dark/50">
              Acepta formatos como `11 1234 5678`, `15 1234 5678` o con `+54 9`.
            </p>
          </div>

          <AnimatePresence>
            {phoneNotice && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
                  phoneNotice.type === 'error'
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-[#E8F8ED] border-green-300 text-green-950'
                }`}
              >
                {phoneNotice.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{phoneNotice.text}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Services prices and times (CMS) */}
      <div className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-burgundy/10 flex items-center justify-center text-brand-burgundy">
              <DollarSign className="w-5 h-5" />
            </div>
            <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
              Precios y Tiempos de Servicios
            </h2>
          </div>
          <span className="text-xs text-brand-dark/60">{services.length} servicios</span>
        </div>
        <p className="text-xs sm:text-sm text-brand-dark/60 mb-6">
          Modificá los valores base de cada servicio. Se actualizan automáticamente en la página de servicios y en el formulario de reservas.
        </p>

        <AnimatePresence>
          {servicesNotice && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2 border ${
                servicesNotice.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-[#E8F8ED] border-green-300 text-green-950'
              }`}
            >
              {servicesNotice.type === 'error' ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{servicesNotice.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {loadingServices ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-brand-accent/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const currentVals = serviceValues[service.id] || {
                price: service.price,
                duration_minutes: service.duration_minutes,
              };
              const isSaving = savingServiceId === service.id;

              return (
                <div
                  key={service.id}
                  className="bg-brand-bg/50 rounded-2xl p-4 sm:p-5 border border-brand-accent/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cormorant text-xl font-semibold text-brand-dark">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-xs text-brand-dark/70 line-clamp-2 mt-0.5">
                        {service.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Price field */}
                    <div className="w-32">
                      <label className="block text-[10px] uppercase font-semibold text-brand-dark/60 mb-1">
                        Precio ($ ARS)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-brand-dark/50">$</span>
                        <input
                          type="number"
                          step={500}
                          min={0}
                          value={currentVals.price}
                          onChange={(e) =>
                            handleServiceFieldChange(
                              service.id,
                              'price',
                              Number(e.target.value) || 0
                            )
                          }
                          className="w-full pl-6 pr-2 py-2 rounded-xl bg-white border border-brand-accent/40 text-xs font-semibold focus:outline-none focus:border-brand-burgundy"
                        />
                      </div>
                    </div>

                    {/* Duration field */}
                    <div className="w-28">
                      <label className="block text-[10px] uppercase font-semibold text-brand-dark/60 mb-1">
                        Duración (min)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step={15}
                          min={15}
                          max={360}
                          value={currentVals.duration_minutes}
                          onChange={(e) =>
                            handleServiceFieldChange(
                              service.id,
                              'duration_minutes',
                              Number(e.target.value) || 60
                            )
                          }
                          className="w-full pl-3 pr-7 py-2 rounded-xl bg-white border border-brand-accent/40 text-xs font-semibold focus:outline-none focus:border-brand-burgundy"
                        />
                        <span className="absolute right-2.5 top-2.5 text-[11px] text-brand-dark/50">
                          m
                        </span>
                      </div>
                    </div>

                    {/* Save button */}
                    <div className="self-end pt-4 md:pt-0">
                      <button
                        type="button"
                        onClick={() => handleSaveService(service)}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                      >
                        {isSaving ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Save className="w-3.5 h-3.5" />
                        )}
                        <span>Guardar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
