'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Layers, Flame } from 'lucide-react';
import { NAIL_DESIGNS } from '@/lib/nail3dGeometry';
import { NailDesign } from '@/types/showcase3d';

// Client-only dynamic WebGL canvas avoiding SSR issues
const NailCanvas3D = dynamic(() => import('./NailCanvas3D'), {
  ssr: false,
  loading: () => <StudioSkeleton />,
});

function StudioSkeleton() {
  return (
    <div className="w-full h-[380px] sm:h-[460px] lg:h-[530px] rounded-3xl bg-brand-bg-light/60 border border-brand-burgundy/10 flex flex-col items-center justify-center p-8 gap-4 animate-pulse">
      <div className="w-16 h-36 rounded-t-full rounded-b-2xl border-2 border-brand-accent/40 bg-brand-bg/40 flex items-center justify-center shadow-inner">
        <Sparkles className="w-6 h-6 text-brand-burgundy/40 animate-spin" />
      </div>
      <div className="h-4 w-44 bg-brand-burgundy/10 rounded-full" />
      <span className="text-xs font-jost text-brand-dark/50 tracking-wide">
        Cargando estudio 3D en tiempo real...
      </span>
    </div>
  );
}

export default function NailStudio3D() {
  const [selectedDesign, setSelectedDesign] = useState<NailDesign>(NAIL_DESIGNS[0]);

  return (
    <section
      id="estudio-3d"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-brand-bg via-brand-bg-light/75 to-brand-bg overflow-hidden border-y border-brand-burgundy/10"
    >
      {/* Editorial Ambient Backdrops */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#F5CCD3]/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/15 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estudio de Diseño Interactivo 3D</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark leading-[1.08] mb-4"
          >
            Experimentá el Acabado de Salón en 3D
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-jost text-base sm:text-lg text-brand-dark/75 leading-relaxed"
          >
            Visualizá la forma, los tonos y el acabado real de cada diseño tal como se realizan en el salón.
            Tocá o arrastrá para girar la uña 360° libremente.
          </motion.p>
        </div>

        {/* Studio Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 3D Canvas + Bottom Capsule Buttons */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* The 3D Canvas Viewport */}
            <NailCanvas3D selectedDesign={selectedDesign} />

            {/* Design Selector Capsule Pills */}
            <div className="bg-brand-bg-light/90 backdrop-blur-md p-2 rounded-2xl border border-brand-burgundy/15 shadow-sm">
              <span className="block text-[11px] font-semibold text-brand-burgundy/70 uppercase tracking-wider px-2 pt-1 pb-1.5">
                Seleccioná un estilo para previsualizar:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {NAIL_DESIGNS.map((design) => {
                  const isActive = selectedDesign.id === design.id;
                  return (
                    <button
                      key={design.id}
                      type="button"
                      onClick={() => setSelectedDesign(design)}
                      className={`relative shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-burgundy text-brand-bg-light shadow-md'
                          : 'bg-brand-bg text-brand-dark hover:bg-brand-burgundy/10 border border-brand-burgundy/10'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-black/15 shadow-inner"
                        style={{ backgroundColor: design.colors[0]?.hex }}
                      />
                      <span className="whitespace-nowrap">{design.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeCapsuleGlow"
                          className="absolute inset-0 rounded-full border-2 border-brand-accent pointer-events-none"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Technique Dossier & CTA */}
          <div className="lg:col-span-5 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDesign.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-brand-bg-light/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-brand-burgundy/15 shadow-xl shadow-brand-dark/5 flex flex-col"
              >
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                    <Flame className="w-3.5 h-3.5" />
                    {selectedDesign.badge}
                  </span>
                  <span className="text-xs font-medium text-brand-dark/70 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    {selectedDesign.durability}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-brand-dark leading-tight mb-1">
                  {selectedDesign.name}
                </h3>
                <p className="font-jost text-xs sm:text-sm text-brand-burgundy font-medium tracking-wide mb-4">
                  {selectedDesign.subtitle}
                </p>

                {/* Description */}
                <p className="font-jost text-sm text-brand-dark/80 leading-relaxed mb-6">
                  {selectedDesign.description}
                </p>

                {/* Technical Specifications Dossier */}
                <div className="bg-brand-bg/70 rounded-2xl p-4 border border-brand-burgundy/10 mb-6 flex flex-col gap-2.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-brand-dark/65 font-medium flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-burgundy" />
                      Técnica:
                    </span>
                    <span className="text-brand-dark font-semibold text-right max-w-[65%]">
                      {selectedDesign.technique}
                    </span>
                  </div>

                  <div className="h-px bg-brand-burgundy/10" />

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-brand-dark/65 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-burgundy" />
                      Acabado:
                    </span>
                    <span className="text-brand-dark font-semibold text-right">
                      {selectedDesign.finish}
                    </span>
                  </div>

                  <div className="h-px bg-brand-burgundy/10" />

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-brand-dark/65 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-burgundy" />
                      Servicio recomendado:
                    </span>
                    <span className="text-brand-burgundy font-semibold text-right">
                      {selectedDesign.recommendedServiceName}
                    </span>
                  </div>
                </div>

                {/* Color Palette Swatches */}
                <div className="mb-6">
                  <span className="block text-xs font-semibold text-brand-dark/70 mb-2.5">
                    Pigmentos & destellos del diseño:
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

                {/* Main Action Button */}
                <div className="pt-2">
                  <Link
                    href={`/reservar?style=${encodeURIComponent(
                      selectedDesign.name
                    )}&serviceId=${selectedDesign.recommendedServiceId}`}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-brand-burgundy text-brand-bg-light font-medium text-sm sm:text-base hover:bg-brand-dark transition-all shadow-md hover:shadow-xl active:scale-[0.98] group"
                  >
                    <span>Quiero este diseño</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
