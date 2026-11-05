'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tag: string;
}

const services: ServiceItem[] = [
  {
    number: '01',
    title: 'Esmaltado semipermanente',
    description: 'Color y brillo que duran, sobre tu uña natural.',
    tag: 'Natural y duradero',
  },
  {
    number: '02',
    title: 'Kapping en polygel',
    description: 'Una capa de refuerzo para darle estructura a tu uña natural.',
    tag: 'Fuerza y cuidado',
  },
  {
    number: '03',
    title: 'Esculpidas en polygel',
    description: 'Largo y forma a elección, esculpidos uña por uña.',
    tag: 'Estructura personalizada',
  },
  {
    number: '04',
    title: 'Soft gel',
    description: 'Extensiones livianas y con acabado natural.',
    tag: 'Ligereza y estilo',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1">
              Lo que hago
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-brand-dark tracking-tight">
              Servicios
            </h2>
          </div>

          <Link
            href="/reservar"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-burgundy hover:text-brand-dark transition-colors self-start sm:self-auto"
          >
            <span>Ver detalle y precios</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-brand-bg-light/95 rounded-[24px] p-7 border border-brand-accent/35 shadow-[0_4px_20px_rgba(107,15,36,0.04)] hover:shadow-[0_12px_32px_rgba(107,15,36,0.1)] hover:border-brand-burgundy/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Number */}
                <div className="font-cormorant italic text-3xl font-light text-brand-burgundy/60 group-hover:text-brand-burgundy transition-colors mb-4">
                  {service.number}
                </div>

                {/* Title */}
                <h3 className="font-cormorant text-2xl font-semibold text-brand-dark leading-snug mb-3 group-hover:text-brand-burgundy transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-jost text-sm text-brand-dark/75 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Bottom detail action */}
              <div className="pt-6 mt-6 border-t border-brand-accent/20 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-brand-burgundy/70 font-medium">
                  {service.tag}
                </span>
                <Link
                  href="/reservar"
                  className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-burgundy group-hover:bg-brand-burgundy group-hover:text-brand-bg-light transition-colors"
                  aria-label={`Reservar ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
