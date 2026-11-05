'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export default class BookingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BookingErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: undefined });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-xl mx-auto my-12 p-8 sm:p-10 rounded-[32px] bg-brand-bg-light border border-brand-accent/40 shadow-lg text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-700 mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>

          <h2 className="font-cormorant text-3xl font-semibold text-brand-dark mb-2">
            No pudimos cargar el formulario de reserva
          </h2>

          <p className="font-jost text-sm text-brand-dark/75 mb-6 max-w-md mx-auto leading-relaxed">
            Ocurrió un inconveniente temporal con la conexión. Podés reintentar ahora o coordinar tu
            turno directamente con Aixa por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>

            <a
              href="https://wa.me/?text=Hola%20Aixa!%20Quiero%20consultar%20por%20un%20turno%20para%20hacerme%20las%20u%C3%B1as."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-bg hover:bg-brand-accent/20 text-brand-dark border border-brand-accent/50 text-sm font-medium flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-brand-burgundy" />
              <span>Coordinar por WhatsApp</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
