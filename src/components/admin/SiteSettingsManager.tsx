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
  MapPin,
  Plus,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import {
  fetchServices,
  createService,
  deleteService,
  DEFAULT_SERVICES,
} from '@/lib/bookingService';
import {
  fetchSiteSettings,
  updateWhatsAppPhone,
  updateLocationText,
  updateServiceBasics,
  normalizeWhatsAppPhone,
  buildWhatsAppUrl,
  DEFAULT_LOCATION_TEXT,
} from '@/lib/siteSettings';
import { Service } from '@/types/database';

type Notice = { type: 'success' | 'error'; text: string } | null;

export default function SiteSettingsManager() {
  // WhatsApp settings
  const [phoneInput, setPhoneInput] = useState('');
  const [currentPhone, setCurrentPhone] = useState<string | null>(null);
  const [savingPhone, setSavingPhone] = useState(false);
  const [phoneNotice, setPhoneNotice] = useState<Notice>(null);

  // Location settings
  const [locationInput, setLocationInput] = useState(DEFAULT_LOCATION_TEXT);
  const [savingLocation, setSavingLocation] = useState(false);
  const [locationNotice, setLocationNotice] = useState<Notice>(null);

  // Services settings
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceValues, setServiceValues] = useState<
    Record<
      string,
      {
        name: string;
        description: string;
        price: number;
        duration_minutes: number;
      }
    >
  >({});
  const [savingServiceId, setSavingServiceId] = useState<string | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);
  const [servicesNotice, setServicesNotice] = useState<Notice>(null);

  // New service form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState<number>(15000);
  const [newDuration, setNewDuration] = useState<number>(60);
  const [creatingService, setCreatingService] = useState(false);

  useEffect(() => {
    // Load current site settings
    fetchSiteSettings().then((settings) => {
      if (settings?.whatsapp_phone) {
        setCurrentPhone(settings.whatsapp_phone);
        setPhoneInput(settings.whatsapp_phone);
      }
      if (settings?.location_text) {
        setLocationInput(settings.location_text);
      }
    });

    // Load current services
    fetchServices().then((data) => {
      const activeServices = Array.isArray(data) && data.length > 0 ? data : DEFAULT_SERVICES;
      setServices(activeServices);
      const initialMap: Record<
        string,
        { name: string; description: string; price: number; duration_minutes: number }
      > = {};
      activeServices.forEach((s) => {
        initialMap[s.id] = {
          name: s.name,
          description: s.description || '',
          price: Number(s.price ?? s.base_price) || 0,
          duration_minutes: Number(s.duration_minutes) || 60,
        };
      });
      setServiceValues(initialMap);
      setLoadingServices(false);
    });
  }, []);

  const normalizedPreview = normalizeWhatsAppPhone(phoneInput);
  const testWaUrl = buildWhatsAppUrl('Hola Aixa! Mensaje de prueba desde el sitio.', normalizedPreview);

  // Guardar WhatsApp
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

  // Guardar Ubicación
  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLocation(true);
    setLocationNotice(null);

    try {
      const result = await updateLocationText(locationInput);
      if (result.ok) {
        setLocationNotice({
          type: 'success',
          text: `Ubicación actualizada a: "${result.location_text}". Se reflejará en todo el sitio.`,
        });
      } else {
        setLocationNotice({ type: 'error', text: result.error });
      }
    } catch (err) {
      setLocationNotice({
        type: 'error',
        text: `Error al guardar ubicación: ${err instanceof Error ? err.message : 'intentá nuevamente'}`,
      });
    } finally {
      setSavingLocation(false);
    }
  };

  // Edición de campos de un servicio existente
  const handleServiceFieldChange = (
    id: string,
    field: 'name' | 'description' | 'price' | 'duration_minutes',
    value: any
  ) => {
    setServiceValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Guardar cambios en un servicio
  const handleSaveService = async (service: Service) => {
    const currentValues = serviceValues[service.id];
    if (!currentValues) return;

    setSavingServiceId(service.id);
    setServicesNotice(null);

    try {
      const result = await updateServiceBasics(service.id, {
        name: currentValues.name,
        description: currentValues.description,
        price: currentValues.price,
        duration_minutes: currentValues.duration_minutes,
      });

      if (result.ok) {
        setServices((prev) =>
          prev.map((s) =>
            s.id === service.id
              ? {
                  ...s,
                  name: currentValues.name,
                  description: currentValues.description,
                  price: currentValues.price,
                  base_price: currentValues.price,
                  duration_minutes: currentValues.duration_minutes,
                }
              : s
          )
        );
        setServicesNotice({
          type: 'success',
          text: `"${currentValues.name}" guardado con éxito ($${currentValues.price.toLocaleString('es-AR')} · ${currentValues.duration_minutes}m).`,
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

  // Eliminar un servicio
  const handleDeleteService = async (service: Service) => {
    const confirmDelete = window.confirm(
      `¿Estás segura de eliminar el servicio "${service.name}"? Ya no aparecerá en el formulario de reservas.`
    );
    if (!confirmDelete) return;

    setDeletingServiceId(service.id);
    setServicesNotice(null);

    try {
      const res = await deleteService(service.id);
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== service.id));
        setServicesNotice({
          type: 'success',
          text: `Servicio "${service.name}" eliminado correctamente.`,
        });
      } else {
        setServicesNotice({ type: 'error', text: res.error || 'No se pudo eliminar el servicio.' });
      }
    } catch (err) {
      setServicesNotice({
        type: 'error',
        text: `Error al eliminar: ${err instanceof Error ? err.message : 'intentá nuevamente'}`,
      });
    } finally {
      setDeletingServiceId(null);
    }
  };

  // Crear nuevo servicio
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setServicesNotice({ type: 'error', text: 'El nombre del servicio es obligatorio.' });
      return;
    }

    setCreatingService(true);
    setServicesNotice(null);

    try {
      const res = await createService({
        name: newName.trim(),
        description: newDescription.trim(),
        price: newPrice,
        duration_minutes: newDuration,
      });

      if (res.ok && res.service) {
        const created = res.service;
        setServices((prev) => [...prev, created]);
        setServiceValues((prev) => ({
          ...prev,
          [created.id]: {
            name: created.name,
            description: created.description || '',
            price: Number(created.price ?? created.base_price) || 0,
            duration_minutes: Number(created.duration_minutes) || 60,
          },
        }));
        setNewName('');
        setNewDescription('');
        setNewPrice(15000);
        setNewDuration(60);
        setShowAddForm(false);
        setServicesNotice({
          type: 'success',
          text: `Servicio "${created.name}" creado con éxito.`,
        });
      } else {
        setServicesNotice({ type: 'error', text: res.error || 'No se pudo crear el servicio.' });
      }
    } catch (err) {
      setServicesNotice({
        type: 'error',
        text: `Error al crear: ${err instanceof Error ? err.message : 'intentá nuevamente'}`,
      });
    } finally {
      setCreatingService(false);
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

      {/* Location / Privacy settings card */}
      <div className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-brand-burgundy/10 flex items-center justify-center text-brand-burgundy">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
            Zona de Atención y Domicilio
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-dark/60 mb-6">
          Texto que se muestra como zona de cobertura en el encabezado, portada y pie de página del sitio. Por privacidad, no pongas tu dirección particular sino la modalidad de servicio a domicilio.
        </p>

        <form onSubmit={handleSaveLocation} className="space-y-4 max-w-xl">
          <div>
            <label
              htmlFor="location-text"
              className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
            >
              Texto de Ubicación / Modalidad
            </label>
            <div className="relative">
              <input
                id="location-text"
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Ej: Zona Norte (Servicio a domicilio)"
                className="w-full pl-4 pr-24 py-3 rounded-2xl bg-white border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15"
              />
              <button
                type="submit"
                disabled={savingLocation}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                {savingLocation ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Guardar</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {locationNotice && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
                  locationNotice.type === 'error'
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-[#E8F8ED] border-green-300 text-green-950'
                }`}
              >
                {locationNotice.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{locationNotice.text}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Services CRUD */}
      <div className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-burgundy/10 flex items-center justify-center text-brand-burgundy">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
                Gestión de Servicios (CRUD)
              </h2>
              <span className="text-xs text-brand-dark/60">{services.length} servicios activos</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showAddForm ? 'Cancelar' : 'Agregar servicio'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-brand-dark/60 mb-6">
          Creá, editá y eliminá servicios. Los cambios se actualizan automáticamente en la página de servicios y en el flujo de reservas.
        </p>

        {/* Formulario para agregar nuevo servicio */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleCreateService}
              className="mb-8 p-5 sm:p-6 bg-white rounded-2xl border-2 border-brand-burgundy/25 shadow-sm space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-brand-accent/30 pb-3">
                <h3 className="font-cormorant text-xl font-semibold text-brand-dark flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-burgundy" />
                  Nuevo Servicio
                </h3>
                <span className="text-[11px] text-brand-dark/60">Completá los datos y guardá</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-brand-dark/70 mb-1">
                    Nombre del Servicio *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej: Nail Art Avanzado"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg/40 border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-brand-dark/70 mb-1">
                    Descripción breve
                  </label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Ej: Diseños a mano alzada, pedrería y efectos especiales."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg/40 border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-brand-dark/70 mb-1">
                    Precio ($ ARS) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg/40 border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-brand-dark/70 mb-1">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={360}
                    step={15}
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value) || 60)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg/40 border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-dark/70 hover:bg-brand-bg transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingService}
                  className="px-5 py-2 rounded-xl bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {creatingService ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Crear Servicio</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

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
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-brand-dark/60 bg-brand-bg/40 rounded-2xl border border-brand-accent/30">
            No hay servicios registrados. Podés crear uno con el botón superior.
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const currentVals = serviceValues[service.id] || {
                name: service.name,
                description: service.description || '',
                price: Number(service.price ?? service.base_price) || 0,
                duration_minutes: Number(service.duration_minutes) || 60,
              };
              const isSaving = savingServiceId === service.id;
              const isDeleting = deletingServiceId === service.id;

              return (
                <div
                  key={service.id}
                  className="bg-brand-bg/50 rounded-2xl p-4 sm:p-5 border border-brand-accent/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Name and Description Inputs */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-brand-dark/60 mb-0.5">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={currentVals.name}
                        onChange={(e) =>
                          handleServiceFieldChange(service.id, 'name', e.target.value)
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-brand-accent/40 text-sm font-semibold text-brand-dark focus:outline-none focus:border-brand-burgundy"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-brand-dark/60 mb-0.5">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={currentVals.description}
                        onChange={(e) =>
                          handleServiceFieldChange(service.id, 'description', e.target.value)
                        }
                        placeholder="Descripción breve..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-brand-accent/40 text-xs text-brand-dark/75 focus:outline-none focus:border-brand-burgundy"
                      />
                    </div>
                  </div>

                  {/* Price, Duration, Save and Delete */}
                  <div className="flex flex-wrap items-end gap-3 pt-2 lg:pt-0">
                    {/* Price field */}
                    <div className="w-28 sm:w-32">
                      <label className="block text-[10px] uppercase font-semibold text-brand-dark/60 mb-1">
                        Precio ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs text-brand-dark/50">$</span>
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
                          className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-white border border-brand-accent/40 text-xs font-semibold focus:outline-none focus:border-brand-burgundy"
                        />
                      </div>
                    </div>

                    {/* Duration field */}
                    <div className="w-24 sm:w-28">
                      <label className="block text-[10px] uppercase font-semibold text-brand-dark/60 mb-1">
                        Duración
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
                          className="w-full pl-3 pr-7 py-1.5 rounded-xl bg-white border border-brand-accent/40 text-xs font-semibold focus:outline-none focus:border-brand-burgundy"
                        />
                        <span className="absolute right-2.5 top-2 text-[11px] text-brand-dark/50">
                          m
                        </span>
                      </div>
                    </div>

                    {/* Save button */}
                    <button
                      type="button"
                      onClick={() => handleSaveService(service)}
                      disabled={isSaving || isDeleting}
                      className="px-3.5 py-2 rounded-xl bg-brand-burgundy hover:bg-brand-dark text-white text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {isSaving ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save className="w-3.5 h-3.5" />
                      )}
                      <span>Guardar</span>
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteService(service)}
                      disabled={isSaving || isDeleting}
                      className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all disabled:opacity-50 cursor-pointer"
                      title="Eliminar servicio"
                    >
                      {isDeleting ? (
                        <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-red-600 rounded-full animate-spin inline-block" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
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
