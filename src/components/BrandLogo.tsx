'use client';

import React from 'react';
import Link from 'next/link';
import { SparkleStar } from './NailIllustrations';

export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 active:scale-95 ${className}`}
    >
      {/* Monogram AN with Star */}
      <div className="relative flex items-center justify-center font-cormorant font-bold text-2xl tracking-tight text-brand-burgundy">
        <span className="relative">
          A
          <span className="absolute -top-1.5 -right-1 text-brand-burgundy animate-pulse">
            <SparkleStar size={10} className="text-brand-burgundy" />
          </span>
        </span>
        <span className="-ml-0.5">N</span>
      </div>

      {/* Script brand text */}
      <span className="font-script text-2xl sm:text-3xl text-brand-burgundy font-normal tracking-wide group-hover:text-brand-dark transition-colors pt-0.5">
        Aixa nails
      </span>
    </Link>
  );
}
