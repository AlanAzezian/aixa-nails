'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorksGallery from '@/components/gallery/WorksGallery';

export default function TrabajosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-burgundy selection:text-brand-bg-light">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1"
            >
              Mis uñas
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark tracking-tight mb-4"
            >
              Trabajos recientes
            </motion.h1>
          </div>

          {/* Galería: fotos reales desde Supabase, con fallback de ilustraciones */}
          <div className="mb-14">
            <WorksGallery />
          </div>

          {/* Bottom Dark Burgundy Callout (from PDF page 4) */}
          <div className="bg-brand-dark rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-medium tracking-tight mb-1">
                ¿Te gustó alguno?
              </h2>
              <p className="font-jost text-sm sm:text-base text-brand-bg-light/80">
                Reservá tu turno y llevá la foto de referencia.
              </p>
            </div>

            <Link
              href="/reservar"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-bg-light hover:bg-white text-brand-dark font-medium text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0"
            >
              <span>Reservar turno</span>
              <Sparkles className="w-4 h-4 text-brand-burgundy" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
