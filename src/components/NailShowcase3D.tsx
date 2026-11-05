'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { NAIL_DESIGNS } from '@/lib/nail3dGeometry';
import { NailDesign } from '@/types/showcase3d';

// Dynamic import with ssr: false for safe WebGL rendering and client-side 3D context
const NailCanvas3D = dynamic(() => import('./NailCanvas3D'), {
  ssr: false,
  loading: () => <ShowcaseSkeleton />,
});

function ShowcaseSkeleton() {
  return (
    <div className="w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl bg-brand-bg-light/60 border border-brand-burgundy/10 flex flex-col items-center justify-center p-8 gap-4 animate-pulse">
      <div className="w-16 h-36 rounded-t-full rounded-b-2xl border-2 border-brand-accent/40 bg-brand-bg/40 flex items-center justify-center shadow-inner">
        <Sparkles className="w-6 h-6 text-brand-burgundy/40 animate-spin" />
      </div>
      <div className="h-4 w-44 bg-brand-burgundy/10 rounded-full" />
      <span className="text-xs font-jost text-brand-dark/50 tracking-wide">
        Inicializando motor WebGL 3D...
      </span>
    </div>
  );
}

export default function NailShowcase3D() {
  const [selectedDesign, setSelectedDesign] = useState<NailDesign>(NAIL_DESIGNS[0]);

  return (
    <section
      id="inspiracion-3d"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-brand-bg via-brand-bg-light/70 to-brand-bg overflow-hidden border-y border-brand-burgundy/10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#F5CCD3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-script text-3xl sm:text-4xl text-brand-burgundy mb-2"
          >
            Inspiración & Estilos 3D
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark leading-[1.1] mb-5"
          >
            Exhibidor Digital de Diseños de Autor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-jost text-base sm:text-lg text-brand-dark/75 leading-relaxed"
          >
            Descubrí la anatomía del esculpido profesional: curvatura C natural, ápice reforzado y el
            brillo hiper reflectante del top coat de salón. Arrastrá la uña para explorarla en 360°.
          </motion.p>
        </div>

        {/* 3D Showcase Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D WebGL Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <NailCanvas3D selectedDesign={selectedDesign} />

            {/* Quick Design Switcher Badges (Mobile & Desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {NAIL_DESIGNS.map((design) => {
                const isActive = selectedDesign.id === design.id;
                return (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-left transition-all border text-xs sm:text-sm font-medium ${
                      isActive
                        ? 'bg-brand-burgundy text-brand-bg-light border-brand-burgundy shadow-md scale-[1.02]'
                        : 'bg-brand-bg-light/80 hover:bg-brand-bg-light text-brand-dark border-brand-burgundy/15 hover:border-brand-burgundy/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10 shadow-inner"
                      style={{ backgroundColor: design.colors[0]?.hex }}
                    />
                    <span className="truncate">{design.name.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Design Card & Action Dossier */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDesign.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-brand-bg-light/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-brand-burgundy/15 shadow-xl shadow-brand-dark/5 flex flex-col"
              >
                {/* Badge & Title */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedDesign.badge}
                  </span>
                  <span className="text-xs font-medium text-brand-dark/60 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    {selectedDesign.durability}
                  </span>
                </div>

                <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-brand-dark leading-tight mb-1">
                  {selectedDesign.name}
                </h3>
                <p className="font-jost text-xs sm:text-sm text-brand-burgundy font-medium tracking-wide mb-4">
                  {selectedDesign.subtitle}
                </p>

                <p className="font-jost text-sm text-brand-dark/80 leading-relaxed mb-6">
                  {selectedDesign.description}
                </p>

                {/* Technical Dossier Grid */}
                <div className="bg-brand-bg/60 rounded-2xl p-4 border border-brand-burgundy/10 mb-6 flex flex-col gap-2.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-brand-dark/60 font-medium">Técnica:</span>
                    <span className="text-brand-dark font-semibold text-right max-w-[65%]">
                      {selectedDesign.technique}
                    </span>
                  </div>
                  <div className="h-px bg-brand-burgundy/10" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-brand-dark/60 font-medium">Acabado:</span>
                    <span className="text-brand-dark font-semibold text-right">
                      {selectedDesign.finish}
                    </span>
                  </div>
                  <div className="h-px bg-brand-burgundy/10" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-brand-dark/60 font-medium">Servicio base sugerido:</span>
                    <span className="text-brand-burgundy font-semibold text-right">
                      {selectedDesign.recommendedServiceName}
                    </span>
                  </div>
                </div>

                {/* Color Palette Swatches */}
                <div className="mb-6">
                  <span className="block text-xs font-medium text-brand-dark/70 mb-2.5">
                    Paleta de pigmentos del diseño:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedDesign.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-bg-light border border-brand-burgundy/15 shadow-2xs"
                        title={color.name}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[11px] font-medium text-brand-dark/80">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA: Carry design into booking wizard */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/reservar?style=${encodeURIComponent(
                      selectedDesign.name
                    )}&serviceId=${selectedDesign.recommendedServiceId}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-burgundy text-brand-bg-light font-medium text-sm hover:bg-brand-dark transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
                  >
                    <span>Inspirarme con este diseño</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={`https://wa.me/5491123456789?text=${encodeURIComponent(
                      `Hola Aixa! Vi el Showcase 3D en la web y me encantó el diseño "${selectedDesign.name}". ¿Tenés disponibilidad para coordinar un turno con este estilo?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-brand-bg text-brand-dark font-medium text-sm hover:bg-brand-accent/20 border border-brand-burgundy/20 transition-colors"
                    title="Consultar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-burgundy" />
                    <span className="sm:hidden">Consultar</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
