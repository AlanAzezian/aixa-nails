'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { ArrowRight, Sparkles, Check, Heart, ShieldCheck, Sparkle } from 'lucide-react';
import { NAIL_DESIGNS } from '@/lib/nail3dGeometry';
import { NailDesign } from '@/types/showcase3d';

export default function NailStudio3D() {
  const [selectedDesign, setSelectedDesign] = useState<NailDesign>(NAIL_DESIGNS[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  // 3D Tilt & Spring Physics (Framer Motion)
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Smooth rotation angles
  const rotateX = useTransform(smoothMouseY, [0, 1], [11, -11]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-11, 11]);

  // Glare overlay coordinate calculations (silky smooth light reflection)
  const glareX = useTransform(smoothMouseX, [0, 1], ['15%', '85%']);
  const glareY = useTransform(smoothMouseY, [0, 1], ['15%', '85%']);

  const glareBackground = useMotionTemplate`radial-gradient(circle 280px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.14) 32%, rgba(255, 255, 255, 0) 70%)`;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(Math.max(0, Math.min(1, x)));
      mouseY.set(Math.max(0, Math.min(1, y)));
      setIsInteracting(true);
    },
    [mouseX, mouseY]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsInteracting(false);
  }, [mouseX, mouseY]);

  return (
    <section
      id="estudio-3d"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-brand-bg via-brand-bg-light/80 to-brand-bg overflow-hidden border-y border-brand-burgundy/10"
    >
      {/* Editorial Ambient Background Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#F5CCD3]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-brand-burgundy/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#6B0F24]/10 text-[#6B0F24] border border-[#6B0F24]/15 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6B0F24]" />
            <span>Showcase Editorial Interactivo</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark leading-[1.08] mb-3"
          >
            Catálogo Editorial en Vivo
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-jost text-base sm:text-lg text-brand-dark/75 leading-relaxed"
          >
            Explorá el acabado, color y prolijidad de los trabajos reales del salón con perspectiva 3D
            dinámica y reflejo de brillo de esmalte en tiempo real.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout: 3D Tilt Editorial Showcase + Vertical ScrollView Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tarjeta Editorial con 3D Tilt & Glare */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ perspective: 1000 }}
              className="w-full max-w-[480px] h-[480px] sm:h-[520px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-3xl overflow-hidden border border-[#6B0F24]/20 shadow-2xl shadow-brand-dark/15 bg-brand-bg-light/90"
              >
                {/* Salon Photograph with Smooth Fade/Scale Transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDesign.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={selectedDesign.image}
                      alt={selectedDesign.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover"
                    />

                    {/* Subtle aesthetic gradient overlay at base for high readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Glare Effect Overlay (Dynamic Radial Highlight simulating high-gloss top coat) */}
                <motion.div
                  style={{
                    background: glareBackground,
                    opacity: isInteracting ? 1 : 0.45,
                  }}
                  className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 mix-blend-screen"
                />

                {/* Subtle Glass Surface Reflection Border */}
                <div className="absolute inset-0 rounded-3xl border border-white/30 pointer-events-none z-20" />

                {/* Floating 3D Badges (Preserve-3D with Parallax translateZ) */}
                {/* Top Left Badge: Estilo seleccionado */}
                <div
                  style={{ transform: 'translateZ(36px)' }}
                  className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-[#6B0F24] text-xs font-semibold tracking-wide"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6B0F24]" />
                  <span>Estilo seleccionado</span>
                </div>

                {/* Top Right Badge: Forma sugerida */}
                <div
                  style={{ transform: 'translateZ(34px)' }}
                  className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dark/70 backdrop-blur-md border border-white/20 shadow-lg text-white text-xs font-medium"
                >
                  <Sparkle className="w-3 h-3 text-[#F5CCD3]" />
                  <span>Forma sugerida: {selectedDesign.shape}</span>
                </div>

                {/* Bottom Card Content: Design Details */}
                <div
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute bottom-4 inset-x-4 z-30 p-4 sm:p-5 rounded-2xl bg-white/92 backdrop-blur-md border border-white/70 shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className="font-cormorant text-2xl font-bold text-brand-dark tracking-tight leading-none">
                      {selectedDesign.name}
                    </h3>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#6B0F24]/10 text-[#6B0F24] border border-[#6B0F24]/20">
                      {selectedDesign.badge}
                    </span>
                  </div>

                  <p className="font-jost text-xs text-brand-dark/80 line-clamp-2 leading-relaxed mb-3">
                    {selectedDesign.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-brand-burgundy/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-brand-dark/60 font-medium">Tonos:</span>
                      <div className="flex -space-x-1.5">
                        {selectedDesign.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-white shadow-xs inline-block"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-brand-dark/70">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6B0F24]" />
                      <span>{selectedDesign.durability}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Helper interaction hint */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-brand-dark/55">
              <span>Mové el cursor o deslizá sobre la tarjeta para apreciar el reflejo 3D</span>
            </div>
          </div>

          {/* Right Column: Catálogo en ScrollView + CTA */}
          <div className="lg:col-span-5 flex flex-col bg-brand-bg-light/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-brand-burgundy/15 shadow-xl shadow-brand-dark/5">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-brand-burgundy/10">
              <div>
                <h3 className="font-cormorant text-2xl font-bold text-brand-dark">
                  Catálogo de Estilos
                </h3>
                <p className="font-jost text-xs text-brand-dark/60">
                  Fotos reales tomadas en el estudio de Aixa
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#6B0F24]/10 text-[#6B0F24]">
                {NAIL_DESIGNS.length} opciones
              </span>
            </div>

            {/* Vertical ScrollView Container */}
            <div className="max-h-[520px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-[#6B0F24]/20 scrollbar-track-transparent">
              {NAIL_DESIGNS.map((design) => {
                const isActive = selectedDesign.id === design.id;
                return (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 border flex items-center justify-between gap-3 group ${
                      isActive
                        ? 'border-[#6B0F24] bg-[#FDF4F5] shadow-md ring-1 ring-[#6B0F24]/25 scale-[1.01]'
                        : 'border-brand-burgundy/15 bg-white/70 hover:bg-[#FDF7F8] hover:border-brand-burgundy/35'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Photo Thumbnail Preview */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-brand-burgundy/15 shadow-xs bg-brand-bg">
                        <Image
                          src={design.image}
                          alt={design.name}
                          fill
                          sizes="48px"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Title, Subtitle and Badges */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-cormorant text-lg font-semibold leading-snug truncate ${
                              isActive ? 'text-[#6B0F24]' : 'text-brand-dark'
                            }`}
                          >
                            {design.name}
                          </h4>
                        </div>

                        <p className="font-jost text-xs text-brand-dark/65 truncate">
                          {design.subtitle}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#6B0F24]/10 text-[#6B0F24]">
                            Forma: {design.shape}
                          </span>
                          <span className="text-[10px] text-brand-dark/50">
                            {design.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Active Check Indicator */}
                    <div className="shrink-0">
                      {isActive ? (
                        <span className="w-5 h-5 rounded-full bg-[#6B0F24] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      ) : (
                        <div className="flex -space-x-1">
                          {design.colors.slice(0, 2).map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="pt-4 mt-3 border-t border-brand-burgundy/10">
              <Link
                href={`/reservar?style=${encodeURIComponent(
                  selectedDesign.name
                )}&serviceId=${selectedDesign.recommendedServiceId}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#6B0F24] text-brand-bg-light font-medium text-sm hover:bg-[#520A1B] transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
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
