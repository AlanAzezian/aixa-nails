'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Sparkle, CheckCircle } from 'lucide-react';

interface Step {
  step: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: '1',
    title: 'Elegí tu servicio',
    description: 'Mirá las opciones y quedate con la que más te guste.',
  },
  {
    step: '2',
    title: 'Elegí día y horario',
    description: 'Ves los horarios libres y mandás tu solicitud.',
  },
  {
    step: '3',
    title: 'Aixa te confirma',
    description: 'Te escribe por WhatsApp o Instagram para dejar el turno cerrado.',
  },
];

export default function HowToBookSection() {
  return (
    <section id="como-reservar" className="py-20 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark Burgundy Container */}
        <div className="relative overflow-hidden bg-brand-dark rounded-[32px] sm:rounded-[40px] px-6 sm:px-12 lg:px-16 py-14 sm:py-20 shadow-[0_20px_60px_rgba(74,7,22,0.3)]">
          {/* Subtle Ambient Glow inside */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-burgundy/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-14 sm:mb-16">
              <span className="font-script text-3xl sm:text-4xl text-brand-accent block mb-2">
                Es muy fácil
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight">
                Cómo reservar tu turno
              </h2>
            </div>

            {/* 3 Steps Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-14">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-start border-l border-brand-accent/25 pl-6 sm:pl-8 relative"
                >
                  {/* Step Number in Serif */}
                  <span className="font-cormorant italic text-5xl sm:text-6xl font-light text-brand-accent/80 mb-3 leading-none">
                    {item.step}
                  </span>

                  {/* Step Title */}
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-white mb-2.5">
                    {item.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-jost text-sm sm:text-base text-brand-bg-light/80 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button in white */}
            <div id="reservar" className="pt-2">
              <Link
                href="https://wa.me/?text=Hola%20Aixa!%20Quiero%20consultar%20por%20un%20turno%20para%20hacerme%20las%20u%C3%B1as"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-brand-bg-light hover:bg-white text-brand-dark font-medium text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Reservar turno</span>
                <Sparkles className="w-4 h-4 text-brand-burgundy transition-transform duration-300 group-hover:rotate-12" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
