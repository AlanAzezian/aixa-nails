'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingWizard from '@/components/booking/BookingWizard';
import BookingErrorBoundary from '@/components/booking/BookingErrorBoundary';

export default function ReservarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-burgundy selection:text-brand-bg-light">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-28 lg:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-burgundy/80 hover:text-brand-burgundy transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Volver a la página principal</span>
            </Link>
          </div>

          {/* Protected with Error Boundary and Suspense */}
          <BookingErrorBoundary>
            <Suspense
              fallback={
                <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3">
                  <span className="w-9 h-9 border-3 border-brand-burgundy/30 border-t-brand-burgundy rounded-full animate-spin" />
                  <p className="font-jost text-sm text-brand-dark/60">Cargando sistema de turnos...</p>
                </div>
              }
            >
              <BookingWizard />
            </Suspense>
          </BookingErrorBoundary>
        </div>
      </main>

      <Footer />
    </div>
  );
}
