'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SparkleStar } from '@/components/NailIllustrations';

interface GalleryItem {
  id: string;
  title: string;
  category: 'semi' | 'polygel' | 'softgel';
  categoryLabel: string;
  nails: React.ReactNode;
}

export default function TrabajosPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'semi' | 'polygel' | 'softgel'>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 'degrade-lila',
      title: 'Degradé lila',
      category: 'semi',
      categoryLabel: 'Semipermanente',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-gradient-to-b from-[#A5A5DF] via-[#7B7BBE] to-[#45448C] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-8 bg-white/40 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-gradient-to-b from-[#8E8ECB] via-[#6362AB] to-[#36357B] relative shadow-md">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/35 rounded-full blur-[0.5px]" />
            <div className="absolute top-5 right-2">
              <SparkleStar size={10} className="text-white/80" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#7B7BC2] via-[#4F4E99] to-[#272662] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'rojo-estrellas',
      title: 'Rojo y estrellas',
      category: 'polygel',
      categoryLabel: 'Polygel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-34 rounded-t-full bg-gradient-to-b from-[#B81E3C] to-[#7D0B22] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-42 rounded-t-full bg-[#181517] relative shadow-md flex justify-center">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/20 rounded-full blur-[0.5px]" />
            <div className="absolute top-6">
              <SparkleStar size={18} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#9C132E] to-[#600517] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'nude-dorado',
      title: 'Nude con dorado',
      category: 'softgel',
      categoryLabel: 'Soft gel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-gradient-to-b from-[#F5D8CE] to-[#DFB5A7] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-8 bg-white/40 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-gradient-to-b from-[#EED3C8] to-[#D5A392] relative shadow-md flex justify-center">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/35 rounded-full blur-[0.5px]" />
            <div className="absolute top-6">
              <SparkleStar size={14} className="text-[#FFDF78] drop-shadow-[0_0_6px_rgba(255,223,120,0.8)]" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#E5BEB0] to-[#C99684] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'azul-electrico',
      title: 'Azul eléctrico',
      category: 'semi',
      categoryLabel: 'Semipermanente',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-34 rounded-t-full bg-gradient-to-b from-[#4A7CE8] to-[#1C419E] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/45 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-42 rounded-t-full bg-gradient-to-b from-[#2E68E8] to-[#102B82] relative shadow-md flex justify-center">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/40 rounded-full blur-[0.5px]" />
            <div className="absolute top-6">
              <SparkleStar size={15} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#2452BE] to-[#0A1F62] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/35 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'francesa-negro',
      title: 'Francesa en negro',
      category: 'polygel',
      categoryLabel: 'Polygel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-[#F5DCD6] relative shadow-sm overflow-hidden">
            <div className="w-full h-7 bg-[#1C181B] rounded-t-full" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-[#1C181B] relative shadow-md flex justify-center">
            <div className="absolute top-6">
              <SparkleStar size={16} className="text-white" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-[#F5DCD6] relative shadow-sm overflow-hidden">
            <div className="w-full h-8 bg-[#1C181B] rounded-t-full" />
          </div>
        </div>
      ),
    },
    {
      id: 'degrade-rojo',
      title: 'Degradé rojo',
      category: 'semi',
      categoryLabel: 'Semipermanente',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-34 rounded-t-full bg-gradient-to-b from-[#F2C5BC] to-[#BC2440] relative shadow-sm" />
          <div className="w-9 h-42 rounded-t-full bg-gradient-to-b from-[#EAAFA4] to-[#990D25] relative shadow-md flex justify-center">
            <div className="absolute top-6">
              <SparkleStar size={14} className="text-white/80" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#941126] to-[#5C0513] relative shadow-sm" />
        </div>
      ),
    },
    {
      id: 'ojo-de-gato',
      title: 'Ojo de gato',
      category: 'softgel',
      categoryLabel: 'Soft gel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-[#3D3A40] relative shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-[#6B6873] relative shadow-md flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
            <div className="absolute top-6">
              <SparkleStar size={16} className="text-white" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-[#1C1A1E] relative shadow-sm" />
        </div>
      ),
    },
    {
      id: 'lineas-finas',
      title: 'Líneas finas',
      category: 'polygel',
      categoryLabel: 'Polygel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-[#F5D8CE] relative shadow-sm">
            <div className="absolute top-8 left-2 w-4 h-[1px] bg-white rotate-45" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-[#F3D1C5] relative shadow-md flex justify-center">
            <div className="absolute top-6">
              <SparkleStar size={14} className="text-white" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-[#F5D8CE] relative shadow-sm" />
        </div>
      ),
    },
  ];

  const filteredItems =
    activeFilter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'semi', label: 'Semipermanente' },
    { key: 'polygel', label: 'Polygel' },
    { key: 'softgel', label: 'Soft gel' },
  ] as const;

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

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeFilter === filter.key
                    ? 'bg-brand-burgundy text-brand-bg-light shadow-sm'
                    : 'bg-brand-bg-light hover:bg-brand-bg text-brand-dark/80 border border-brand-accent/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group bg-brand-bg-light rounded-[24px] p-6 border border-brand-accent/35 shadow-[0_4px_20px_rgba(107,15,36,0.03)] hover:shadow-[0_12px_32px_rgba(107,15,36,0.08)] flex flex-col items-center justify-between transition-all"
                >
                  <div className="w-full h-52 bg-gradient-to-b from-[#FDE8E9]/70 to-[#F9D4DA]/70 rounded-[18px] flex items-end justify-center p-4 overflow-hidden relative border border-brand-accent/20 group-hover:border-brand-accent/40 transition-colors">
                    {item.nails}
                  </div>

                  <div className="w-full mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-cormorant text-xl font-semibold text-brand-dark group-hover:text-brand-burgundy transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-brand-burgundy/70 font-medium">
                        {item.categoryLabel}
                      </p>
                    </div>

                    <Link
                      href="/reservar"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-bg text-brand-burgundy group-hover:bg-brand-burgundy group-hover:text-white transition-colors"
                      title={`Reservar turno para ${item.title}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footnote */}
          <p className="text-center font-jost text-xs sm:text-sm text-brand-dark/60 mb-14 italic">
            Ilustraciones de ejemplo: acá van las fotos reales de los trabajos de Aixa.
          </p>

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
