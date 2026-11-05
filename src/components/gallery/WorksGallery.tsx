'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fetchWorks, fetchCategories, DEFAULT_CATEGORIES } from '@/lib/worksService';
import { Work } from '@/types/database';
import { SAMPLE_WORKS } from './sampleWorks';

interface DisplayItem {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  illustration?: React.ReactNode;
}

interface WorksGalleryProps {
  preferFeatured?: boolean;
  limit?: number;
  inactiveFilterClassName?: string;
  gridClassName?: string;
}

function toDisplayItems(works: Work[]): DisplayItem[] {
  return works.map((w) => ({
    id: w.id,
    title: w.title,
    category: w.category,
    imageUrl: w.image_url,
  }));
}

export default function WorksGallery({
  preferFeatured = false,
  limit,
  inactiveFilterClassName = 'bg-brand-bg-light hover:bg-brand-bg',
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
}: WorksGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [works, setWorks] = useState<Work[] | null>(null);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    let active = true;

    // Cargar categorías dinámicas
    fetchCategories().then((cats) => {
      if (active && Array.isArray(cats) && cats.length > 0) {
        setCategories(cats);
      }
    });

    // Cargar fotos de trabajos
    (async () => {
      let result: Work[] = [];
      if (preferFeatured) {
        result = await fetchWorks({ featuredOnly: true, limit });
      }
      if (result.length === 0) {
        result = await fetchWorks({ limit });
      }
      if (active) setWorks(result);
    })();

    return () => {
      active = false;
    };
  }, [preferFeatured, limit]);

  const isLoading = works === null;
  const usingFallback = !isLoading && works.length === 0;

  const items: DisplayItem[] = useMemo(() => {
    if (isLoading) return [];
    if (usingFallback) {
      const samples = SAMPLE_WORKS.map((s) => ({
        id: s.id,
        title: s.title,
        category: s.category,
        illustration: s.nails,
      }));
      return limit ? samples.slice(0, limit) : samples;
    }
    return toDisplayItems(works);
  }, [isLoading, usingFallback, works, limit]);

  const filters = useMemo(() => {
    return [
      { key: 'all', label: 'Todos' },
      ...categories.map((c) => ({ key: c, label: c })),
    ];
  }, [categories]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter(
      (item) => item.category.trim().toLowerCase() === activeFilter.trim().toLowerCase()
    );
  }, [items, activeFilter]);

  return (
    <>
      {/* Filter Pills dinámicos */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {filters.map((filter) => {
          const isSelected = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-brand-burgundy text-brand-bg-light shadow-sm scale-[1.02]'
                  : `${inactiveFilterClassName} text-brand-dark/80 border border-brand-accent/30 hover:border-brand-burgundy/40`
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className={gridClassName}>
        {isLoading ? (
          Array.from({ length: limit ?? 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-brand-bg-light rounded-[24px] p-6 border border-brand-accent/35 animate-pulse"
            >
              <div className="w-full h-52 rounded-[18px] bg-brand-accent/20" />
              <div className="mt-4 h-5 w-2/3 rounded bg-brand-accent/20" />
              <div className="mt-2 h-3 w-1/3 rounded bg-brand-accent/15" />
            </div>
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
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
                {item.imageUrl ? (
                  <div className="w-full h-52 rounded-[18px] overflow-hidden relative border border-brand-accent/20 group-hover:border-brand-accent/40 transition-colors bg-brand-bg">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} · ${item.category}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index < 2}
                    />
                  </div>
                ) : (
                  <div className="w-full h-52 bg-gradient-to-b from-[#FDE8E9]/70 to-[#F9D4DA]/70 rounded-[18px] flex items-end justify-center p-4 overflow-hidden relative border border-brand-accent/20 group-hover:border-brand-accent/40 transition-colors">
                    {item.illustration}
                  </div>
                )}

                <div className="w-full mt-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-cormorant text-xl font-semibold text-brand-dark group-hover:text-brand-burgundy transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-burgundy/70 font-medium">{item.category}</p>
                  </div>

                  <Link
                    href="/reservar"
                    className="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full bg-brand-bg text-brand-burgundy group-hover:bg-brand-burgundy group-hover:text-white transition-colors"
                    title={`Pedir un diseño similar a ${item.title}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {!isLoading && filteredItems.length === 0 && (
        <p className="text-center font-jost text-sm text-brand-dark/60 italic py-8">
          Todavía no hay trabajos cargados en esta categoría.
        </p>
      )}

      {usingFallback && (
        <p className="text-center font-jost text-xs sm:text-sm text-brand-dark/60 mt-8 italic">
          Ilustraciones de ejemplo: muy pronto vas a ver acá las fotos reales de los trabajos de Aixa.
        </p>
      )}
    </>
  );
}
