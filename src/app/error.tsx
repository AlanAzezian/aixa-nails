'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, MessageCircle, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppLink from '@/components/WhatsAppLink';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error no controlado capturado por app/error.tsx:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="font-script text-3xl sm:text-4xl text-brand-burgundy block mb-1">
            Aixa Nails
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl font-semibold mb-3">
            Ocurrió un inconveniente temporal
          </h1>
          <p className="font-jost text-sm sm:text-base text-brand-dark/75 mb-6 leading-relaxed">
            No te preocupes: podés continuar reservando tu turno directamente por WhatsApp o reintentar cargar la página.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>

            <WhatsAppLink
              text="Hola Aixa! Quiero consultar por un turno para uñas."
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-brand-bg-light hover:bg-brand-accent/20 border border-brand-accent/50 text-brand-dark text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-brand-burgundy" />
              <span>Coordinar por WhatsApp</span>
            </WhatsAppLink>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-transparent hover:bg-brand-bg-light border border-transparent hover:border-brand-accent/30 text-brand-dark text-sm font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
