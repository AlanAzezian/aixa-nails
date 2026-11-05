'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroManicureArch } from './NailIllustrations';

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#F5CCD3]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Script Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-script text-3xl sm:text-4xl text-brand-burgundy mb-3 tracking-wide"
            >
              Manicurista / Diseño de uñas
            </motion.p>

            {/* Editorial Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-semibold text-brand-dark leading-[1.08] tracking-tight mb-6"
            >
              Uñas con diseño,
              <br />
              <span className="italic font-light text-brand-burgundy">hechas a tu</span>
              <br />
              medida.
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="font-jost text-base sm:text-lg text-brand-dark/80 max-w-lg mb-8 leading-relaxed font-normal"
            >
              Esmaltado semipermanente, polygel y soft gel en Virreyes, San Fernando. Elegí tu
              servicio y coordiná tu turno en un minuto.
            </motion.p>

            {/* Double CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/reservar"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-dark text-brand-bg-light font-medium text-sm sm:text-base tracking-wide shadow-[0_8px_24px_rgba(107,15,36,0.22)] hover:shadow-[0_10px_28px_rgba(107,15,36,0.32)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
              >
                <span>Reservar turno</span>
                <Sparkles className="w-4 h-4 text-brand-accent transition-transform duration-300 group-hover:rotate-12" />
              </Link>

              <Link
                href="#trabajos"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-bg-light/80 hover:bg-brand-bg-light text-brand-burgundy border border-brand-accent/50 hover:border-brand-burgundy text-sm sm:text-base font-medium tracking-wide shadow-sm hover:shadow transition-all duration-300 w-full sm:w-auto"
              >
                <span>Ver mis trabajos</span>
                <ArrowRight className="w-4 h-4 text-brand-burgundy/70 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Iconic Arch & Nails Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeroManicureArch />
          </div>
        </div>
      </div>
    </section>
  );
}
