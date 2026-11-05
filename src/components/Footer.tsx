'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, MessageCircle, Heart } from 'lucide-react';
import BrandLogo from './BrandLogo';
import WhatsAppLink from './WhatsAppLink';
import { fetchSiteSettings, DEFAULT_LOCATION_TEXT } from '@/lib/siteSettings';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const [locationText, setLocationText] = useState(DEFAULT_LOCATION_TEXT);

  useEffect(() => {
    fetchSiteSettings().then((settings) => {
      if (settings?.location_text) {
        setLocationText(settings.location_text);
      }
    });
  }, []);

  return (
    <footer className="border-t border-brand-accent/25 bg-brand-bg-light/60 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <BrandLogo />
            <p className="font-jost text-xs sm:text-sm text-brand-dark/70 font-normal">
              Manicura profesional y diseño de autor
            </p>
          </div>

          {/* Contact Details & Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 text-sm font-medium text-brand-dark/85">
            {/* Location */}
            <div className="inline-flex items-center gap-1.5 text-brand-dark/80">
              <MapPin className="w-4 h-4 text-brand-burgundy" />
              <span>{locationText}</span>
            </div>

            {/* Instagram */}
            <Link
              href="https://instagram.com/aaixa.nailss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-burgundy hover:text-brand-dark transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-brand-burgundy" />
              <span>@aaixa.nailss</span>
            </Link>

            {/* WhatsApp */}
            <WhatsAppLink
              text="Hola Aixa! Te escribo desde la web para coordinar un turno."
              className="inline-flex items-center gap-1.5 text-brand-burgundy hover:text-brand-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-brand-burgundy" />
              <span>WhatsApp</span>
            </WhatsAppLink>
          </div>
        </div>

        {/* Bottom subtle copyright */}
        <div className="mt-10 pt-6 border-t border-brand-accent/20 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-dark/60 gap-3">
          <p>© 2026 Aixa Nails. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-brand-burgundy fill-brand-burgundy inline" /> en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
