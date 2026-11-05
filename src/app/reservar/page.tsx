import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingWizard from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Reservar Turno | Aixa Nails - San Fernando',
  description:
    'Elegí tu servicio, día y horario para tu cita de manicura en Aixa Nails (Virreyes, San Fernando).',
};

export default function ReservarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-burgundy selection:text-brand-bg-light">
      {/* Sticky header */}
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

          {/* Booking Flow Wizard */}
          <Suspense
            fallback={
              <div className="w-full h-96 flex items-center justify-center">
                <span className="w-8 h-8 border-3 border-brand-burgundy/30 border-t-brand-burgundy rounded-full animate-spin" />
              </div>
            }
          >
            <BookingWizard />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
