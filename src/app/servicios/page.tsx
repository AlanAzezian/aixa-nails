'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchServices, DEFAULT_SERVICES } from '@/lib/bookingService';
import { Service } from '@/types/database';

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-burgundy selection:text-brand-bg-light">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1"
            >
              Elegí lo tuyo
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark tracking-tight mb-4"
            >
              Servicios
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-jost text-sm sm:text-base text-brand-dark/75 max-w-xl leading-relaxed"
            >
              Cada servicio incluye el diseño que elijas. Los precios y tiempos se confirman al
              coordinar el turno.
            </motion.p>
          </div>

          {/* Services List */}
          <div className="space-y-6 mb-16">
            {services.map((service, index) => {
              const formattedNumber = String(index + 1).padStart(2, '0');
              const formattedPrice = `$${service.price.toLocaleString('es-AR')}`;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-brand-bg-light/95 rounded-[28px] p-6 sm:p-8 border border-brand-accent/35 shadow-[0_6px_25px_rgba(107,15,36,0.04)] hover:shadow-[0_12px_35px_rgba(107,15,36,0.09)] hover:border-brand-burgundy/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Number and Details */}
                  <div className="flex items-start gap-5 sm:gap-6">
                    <span className="font-cormorant italic text-3xl sm:text-4xl font-light text-brand-burgundy/60 leading-none pt-1">
                      {formattedNumber}
                    </span>
                    <div>
                      <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark tracking-tight mb-2">
                        {service.name}
                      </h2>
                      <p className="font-jost text-sm sm:text-base text-brand-dark/75 max-w-xl leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Duration, Price and CTA Button */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-brand-accent/20 flex-shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-dark/50 block">
                        Duración [{service.duration_minutes}m]
                      </span>
                      <p className="font-jost text-lg font-bold text-brand-burgundy">
                        Desde [{formattedPrice}]
                      </p>
                    </div>

                    <Link
                      href={`/reservar?serviceId=${service.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <span>Reservar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Custom Design Callout Banner (from PDF page 3) */}
          <div className="rounded-3xl p-8 sm:p-10 border-2 border-dashed border-brand-burgundy/30 bg-brand-bg-light/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-brand-dark mb-1">
                ¿Tenés un diseño en mente?
              </h3>
              <p className="font-jost text-sm sm:text-base text-brand-dark/75">
                Mandale una captura por mensaje y lo coordinan juntas.
              </p>
            </div>

            <a
              href="https://wa.me/?text=Hola%20Aixa!%20Tengo%20una%20foto%20de%20referencia%20para%20hacerme%20las%20u%C3%B1as,%20%C2%BFte%20la%20puedo%20mandar?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white font-medium text-sm tracking-wide shadow-md transition-all self-start sm:self-auto flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-brand-accent" />
              <span>Coordinar turno</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
