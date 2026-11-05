'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Inspiración 3D', href: '/#inspiracion-3d' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Trabajos', href: '/trabajos' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-bg/90 backdrop-blur-md shadow-[0_4px_20px_rgba(107,15,36,0.06)] py-3.5 border-b border-brand-accent/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-brand-dark/85 hover:text-brand-burgundy font-jost text-[15px] font-medium tracking-wide transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-burgundy transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/reservar"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-dark text-brand-bg-light text-sm font-medium tracking-wide transition-all duration-300 shadow-[0_4px_14px_rgba(107,15,36,0.18)] hover:shadow-[0_6px_20px_rgba(107,15,36,0.28)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Reservar turno</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-accent transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-brand-burgundy hover:bg-brand-accent/20 transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg-light border-b border-brand-accent/30 overflow-hidden shadow-lg px-4 pt-3 pb-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-brand-dark text-lg font-cormorant font-medium px-2 py-1.5 hover:text-brand-burgundy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reservar"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-brand-burgundy text-brand-bg-light font-medium text-sm shadow-md mt-2"
              >
                <span>Reservar turno</span>
                <Sparkles className="w-4 h-4 text-brand-accent" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
