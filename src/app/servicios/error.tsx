'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServiciosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error capturado en /servicios:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-dark">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h1 className="font-cormorant text-4xl font-semibold mb-3">
            Nuestros Servicios
          </h1>
          <p className="font-jost text-sm text-brand-dark/75 mb-6">
            Ocurrió un detalle al sincronizar con el servidor. Podés reintentar o ir directo a reservar tus turnos habituales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-full bg-brand-burgundy text-white text-sm font-medium flex items-center gap-2 cursor-pointer shadow-md hover:bg-brand-dark transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>

            <Link
              href="/reservar"
              className="px-6 py-3 rounded-full bg-brand-bg-light border border-brand-accent/50 text-brand-dark text-sm font-medium flex items-center gap-2 hover:bg-brand-accent/20 transition-all"
            >
              <span>Ir a Reservar</span>
            </Link>

            <a
              href="https://wa.me/?text=Hola%20Aixa!%20Quiero%20consultar%20por%20un%20servicio%20de%20u%C3%B1as."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-brand-bg-light border border-brand-accent/50 text-brand-dark text-sm font-medium flex items-center gap-2 hover:bg-brand-accent/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-brand-burgundy" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
