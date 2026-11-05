'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { NAIL_DESIGNS } from '@/lib/nail3dGeometry';
import { NailDesign } from '@/types/showcase3d';

// Client-only dynamic WebGL canvas avoiding SSR issues
const NailCanvas3D = dynamic(() => import('./NailCanvas3D'), {
  ssr: false,
  loading: () => <StudioSkeleton />,
});

function StudioSkeleton() {
  return (
    <div className="w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl bg-brand-bg-light/60 border border-brand-burgundy/10 flex flex-col items-center justify-center p-8 gap-4 animate-pulse">
      <div className="w-14 h-32 rounded-t-full rounded-b-xl border border-brand-accent/40 bg-brand-bg/40 flex items-center justify-center shadow-inner">
        <Sparkles className="w-5 h-5 text-brand-burgundy/40 animate-spin" />
      </div>
      <div className="h-4 w-40 bg-brand-burgundy/10 rounded-full" />
      <span className="text-xs font-jost text-brand-dark/50 tracking-wide">
        Cargando visor 3D en tiempo real...
      </span>
    </div>
  );
}

export default function NailStudio3D() {
  const [selectedDesign, setSelectedDesign] = useState<NailDesign>(NAIL_DESIGNS[0]);

  return (
    <section
      id="estudio-3d"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-brand-bg via-brand-bg-light/70 to-brand-bg overflow-hidden border-y border-brand-burgundy/10"
    >
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#F5CCD3]/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/15 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visor Interactivo 3D de Diseños de Salón</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark leading-[1.08] mb-3"
          >
            Explorá los Diseños Reales en 360°
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-jost text-base sm:text-lg text-brand-dark/75 leading-relaxed"
          >
            Elegí un diseño de la lista para previsualizarlo en el tip anatómico en 3D.
            Tocá o arrastrá para girar la uña libremente en cualquier ángulo.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout: 3D Viewport + Vertical ScrollView Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Column: 3D Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <NailCanvas3D selectedDesign={selectedDesign} />
            <div className="flex items-center justify-between text-xs text-brand-dark/60 px-2">
              <span className="font-medium text-brand-burgundy">
                Diseño activo: <strong className="font-semibold">{selectedDesign.name}</strong>
              </span>
              <span>Forma sugerida: {selectedDesign.shape || 'Almendra'}</span>
            </div>
          </div>

          {/* Right Column: ScrollView Catalog of Real Designs + Sticky CTA */}
          <div className="lg:col-span-5 flex flex-col bg-brand-bg-light/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-brand-burgundy/15 shadow-xl shadow-brand-dark/5">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-brand-burgundy/10">
              <h3 className="font-cormorant text-2xl font-semibold text-brand-dark">
                Catálogo de Estilos
              </h3>
              <span className="text-xs font-jost text-brand-dark/60">
                {NAIL_DESIGNS.length} estilos de salón
              </span>
            </div>

            {/* Vertical ScrollView Container */}
            <div className="max-h-[380px] sm:max-h-[420px] overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-brand-burgundy/20 scrollbar-track-transparent">
              {NAIL_DESIGNS.map((design) => {
                const isActive = selectedDesign.id === design.id;
                return (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-brand-burgundy/8 border-brand-burgundy shadow-sm ring-1 ring-brand-burgundy/20'
                        : 'bg-brand-bg/60 border-brand-burgundy/10 hover:bg-brand-bg-light hover:border-brand-burgundy/25'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Color Palette Chips */}
                      <div className="flex -space-x-1.5 shrink-0">
                        {design.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-5 h-5 rounded-full border border-white/80 shadow-xs"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      {/* Design Title & Subtitle */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-cormorant text-lg font-semibold leading-snug truncate ${
                              isActive ? 'text-brand-burgundy' : 'text-brand-dark'
                            }`}
                          >
                            {design.name}
                          </h4>
                          {isActive && (
                            <span className="shrink-0 w-4 h-4 rounded-full bg-brand-burgundy text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <p className="font-jost text-xs text-brand-dark/65 truncate">
                          {design.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-burgundy/10 text-brand-burgundy">
                            Forma: {design.shape || 'Almendra'}
                          </span>
                          <span className="text-[10px] text-brand-dark/50">
                            {design.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Persistent Action CTA Button at footer */}
            <div className="pt-4 mt-3 border-t border-brand-burgundy/10">
              <Link
                href={`/reservar?style=${encodeURIComponent(
                  selectedDesign.name
                )}&serviceId=${selectedDesign.recommendedServiceId}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-brand-burgundy text-brand-bg-light font-medium text-sm hover:bg-brand-dark transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
              >
                <span>Pedir turno con este diseño</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
