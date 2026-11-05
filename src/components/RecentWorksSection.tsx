'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SparkleStar } from './NailIllustrations';

interface WorkItem {
  id: string;
  title: string;
  category: 'semi' | 'polygel' | 'softgel';
  categoryLabel: string;
  nails: React.ReactNode;
}

export default function RecentWorksSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'semi' | 'polygel' | 'softgel'>('all');

  const works: WorkItem[] = [
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
  ];

  const filteredWorks =
    activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter);

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'semi', label: 'Semipermanente' },
    { key: 'polygel', label: 'Polygel' },
    { key: 'softgel', label: 'Soft gel' },
  ] as const;

  return (
    <section id="trabajos" className="py-20 relative bg-brand-bg-light/40 border-y border-brand-accent/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1">
              Mis uñas
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-brand-dark tracking-tight">
              Trabajos recientes
            </h2>
          </div>

          <Link
            href="/trabajos"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-burgundy hover:text-brand-dark transition-colors self-start sm:self-auto"
          >
            <span>Ver todos</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                activeFilter === filter.key
                  ? 'bg-brand-burgundy text-brand-bg-light shadow-sm'
                  : 'bg-brand-bg hover:bg-brand-bg-light text-brand-dark/80 border border-brand-accent/30'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Works Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-brand-bg-light rounded-[24px] p-6 border border-brand-accent/35 shadow-[0_4px_20px_rgba(107,15,36,0.03)] hover:shadow-[0_12px_32px_rgba(107,15,36,0.08)] flex flex-col items-center justify-between transition-all"
              >
                {/* Visual Canvas Area */}
                <div className="w-full h-52 bg-gradient-to-b from-[#FDE8E9]/70 to-[#F9D4DA]/70 rounded-[18px] flex items-end justify-center p-4 overflow-hidden relative border border-brand-accent/20 group-hover:border-brand-accent/40 transition-colors">
                  {work.nails}
                </div>

                {/* Footer of Card */}
                <div className="w-full mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-cormorant text-xl font-semibold text-brand-dark group-hover:text-brand-burgundy transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-xs text-brand-burgundy/70 font-medium">
                      {work.categoryLabel}
                    </p>
                  </div>

                  <Link
                    href="/reservar"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-bg text-brand-burgundy group-hover:bg-brand-burgundy group-hover:text-white transition-colors"
                    title={`Pedir diseño similar a ${work.title}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Subtle Footnote Notice from the PDF mockup */}
        <p className="text-center font-jost text-xs sm:text-sm text-brand-dark/60 mt-8 italic">
          Ilustraciones de ejemplo: acá van las fotos reales de los trabajos de Aixa.
        </p>
      </div>
    </section>
  );
}
