'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { DEFAULT_SERVICES } from '@/lib/bookingService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
  selectedServiceId: string;
}

export default class BookingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      selectedServiceId: DEFAULT_SERVICES[0]?.id || '1',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BookingErrorBoundary capturó un error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };

  handleServiceChange = (id: string) => {
    this.setState({ selectedServiceId: id });
  };

  render() {
    if (this.state.hasError) {
      const selectedService =
        DEFAULT_SERVICES.find((s) => s.id === this.state.selectedServiceId) || DEFAULT_SERVICES[0];
      const whatsappMsg = encodeURIComponent(
        `Hola Aixa! Quiero coordinar un turno para *${selectedService.name}* (desde $${selectedService.price.toLocaleString('es-AR')}). ¿Tenés disponibilidad para los próximos días?`
      );
      const whatsappUrl = `https://wa.me/?text=${whatsappMsg}`;

      return (
        <div className="w-full max-w-2xl mx-auto my-8 p-6 sm:p-10 rounded-[32px] bg-brand-bg-light border border-brand-accent/40 shadow-xl text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-brand-bg border border-brand-accent/40 flex items-center justify-center text-brand-burgundy mb-4 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold text-brand-dark mb-2">
            Reservá tu turno directamente
          </h2>

          <p className="font-jost text-sm sm:text-base text-brand-dark/75 mb-6 max-w-lg mx-auto leading-relaxed">
            Estamos actualizando el calendario online, pero podés continuar tu reserva normalmente eligiendo tu servicio y coordinando el horario directo con Aixa.
          </p>

          {/* Selector de servicios fallback */}
          <div className="text-left bg-brand-bg/60 p-5 rounded-2xl border border-brand-accent/30 mb-6 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark/60 block">
              Elegí un servicio para coordinar:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEFAULT_SERVICES.map((srv) => {
                const isSelected = srv.id === this.state.selectedServiceId;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => this.handleServiceChange(srv.id)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs sm:text-sm font-medium flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-burgundy text-white border-brand-burgundy shadow-sm'
                        : 'bg-brand-bg-light hover:bg-brand-bg text-brand-dark border-brand-accent/40'
                    }`}
                  >
                    <span className="font-semibold">{srv.name}</span>
                    <span className={`text-[11px] mt-1 ${isSelected ? 'text-brand-bg-light/90' : 'text-brand-burgundy'}`}>
                      ${srv.price.toLocaleString('es-AR')} · {srv.duration_minutes}m
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 text-brand-accent" />
              <span>Coordinar {selectedService.name} por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={this.handleRetry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-brand-bg hover:bg-brand-accent/20 text-brand-dark border border-brand-accent/50 text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Cargar wizard completo</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
