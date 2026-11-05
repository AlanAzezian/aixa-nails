'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import WorksGallery from './gallery/WorksGallery';

export default function RecentWorksSection() {
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

        {/* Destacados (o los más recientes) desde Supabase, con fallback de ilustraciones */}
        <WorksGallery
          preferFeatured
          limit={4}
          inactiveFilterClassName="bg-brand-bg hover:bg-brand-bg-light"
          gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        />
      </div>
    </section>
  );
}
