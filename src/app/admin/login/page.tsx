'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import BrandLogo from '@/components/BrandLogo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(
          error.message === 'Invalid login credentials'
            ? 'Email o contraseña incorrectos. Por favor, verificá tus datos.'
            : error.message
        );
        setLoading(false);
        return;
      }

      if (data.user) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setErrorMessage('Ocurrió un error inesperado al intentar iniciar sesión.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-brand-bg-light/95 backdrop-blur-md rounded-[32px] p-8 sm:p-10 border border-brand-accent/40 shadow-[0_16px_50px_rgba(107,15,36,0.08)]">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <BrandLogo />
        <span className="font-script text-2xl text-brand-burgundy mt-2">
          Panel de Aixa
        </span>
        <h1 className="font-cormorant text-3xl font-semibold text-brand-dark mt-1 tracking-tight">
          Iniciar sesión
        </h1>
        <p className="font-jost text-xs text-brand-dark/60 mt-1">
          Ingresá tus credenciales para administrar tus turnos
        </p>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
          >
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-burgundy/50">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aixa@ejemplo.com"
              required
              autoComplete="email"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-brand-bg/40 border border-brand-accent/40 text-brand-dark text-sm placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15 transition-all shadow-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
          >
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-burgundy/50">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full pl-10 pr-11 py-3 rounded-2xl bg-brand-bg/40 border border-brand-accent/40 text-brand-dark text-sm placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15 transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-dark/40 hover:text-brand-burgundy transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-full bg-brand-burgundy hover:bg-brand-dark text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_6px_20px_rgba(107,15,36,0.25)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Iniciando sesión...</span>
            </span>
          ) : (
            <>
              <span>Ingresar al panel</span>
              <Sparkles className="w-4 h-4 text-brand-accent" />
            </>
          )}
        </button>
      </form>

      {/* Back to public link */}
      <div className="mt-8 pt-5 border-t border-brand-accent/20 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-burgundy/80 hover:text-brand-burgundy font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al sitio público</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F5CCD3]/40 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-brand-bg-light/95 rounded-[32px] p-10 border border-brand-accent/40 shadow-lg flex items-center justify-center">
            <span className="w-6 h-6 border-2 border-brand-burgundy/30 border-t-brand-burgundy rounded-full animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
