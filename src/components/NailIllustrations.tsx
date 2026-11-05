'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SparkleStar({
  className = 'w-6 h-6 text-brand-burgundy',
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

export function HeroManicureArch() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] mx-auto flex flex-col items-center justify-end">
      {/* Decorative floating sparkle stars */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.75, 1, 0.75],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 left-4 sm:left-6 z-20 text-brand-burgundy pointer-events-none"
      >
        <SparkleStar size={26} className="text-brand-burgundy/80 drop-shadow-sm" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
          rotate: [0, -6, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-8 -right-2 sm:right-2 z-20 text-brand-burgundy pointer-events-none"
      >
        <SparkleStar size={34} className="text-brand-burgundy drop-shadow-sm" />
      </motion.div>

      {/* The Iconic Brand Arch */}
      <div className="relative w-full h-[400px] sm:h-[460px] bg-[#F7D8DD] rounded-t-[170px] sm:rounded-t-[210px] border border-brand-accent/40 shadow-[0_12px_40px_rgba(107,15,36,0.06)] overflow-hidden flex items-end justify-center px-4 sm:px-8 pb-0">
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F2]/60 via-transparent to-transparent pointer-events-none" />

        {/* The 4 Iconic Stylized Manicure Nails */}
        <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-3.5 w-full max-w-[320px]">
          {/* Nail 1: Lilac / Purple Gradient */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center flex-1"
          >
            <div className="w-full h-56 sm:h-64 rounded-t-full bg-gradient-to-b from-[#7F7FC5] via-[#5C5BA8] to-[#393881] relative overflow-hidden shadow-md group hover:scale-[1.03] transition-transform duration-300">
              {/* Glossy reflection */}
              <div className="absolute top-2 left-2 w-1.5 h-16 bg-white/30 rounded-full blur-[0.5px]" />
            </div>
          </motion.div>

          {/* Nail 2: Deep Crimson Burgundy */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center flex-1"
          >
            <div className="w-full h-72 sm:h-80 rounded-t-full bg-gradient-to-b from-[#8C142B] to-[#590717] relative overflow-hidden shadow-lg group hover:scale-[1.03] transition-transform duration-300">
              {/* Glossy reflection */}
              <div className="absolute top-3 left-2.5 w-2 h-24 bg-white/25 rounded-full blur-[0.5px]" />
            </div>
          </motion.div>

          {/* Nail 3: Midnight Onyx with Signature Sparkle Star */}
          <motion.div
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center flex-1"
          >
            <div className="w-full h-80 sm:h-92 rounded-t-full bg-[#181517] relative overflow-hidden shadow-xl flex items-center justify-center group hover:scale-[1.03] transition-transform duration-300">
              {/* Central Sparkle Star */}
              <div className="absolute top-8 sm:top-10 flex items-center justify-center">
                <SparkleStar size={24} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
              </div>
              {/* Glossy reflection */}
              <div className="absolute top-3 left-2.5 w-2 h-28 bg-white/20 rounded-full blur-[0.5px]" />
            </div>
          </motion.div>

          {/* Nail 4: Nude / Rose Gradient */}
          <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center flex-1"
          >
            <div className="w-full h-64 sm:h-72 rounded-t-full bg-gradient-to-b from-[#F2C1B9] via-[#E28E9E] to-[#B74056] relative overflow-hidden shadow-md group hover:scale-[1.03] transition-transform duration-300">
              {/* Glossy reflection */}
              <div className="absolute top-2 left-2 w-1.5 h-16 bg-white/35 rounded-full blur-[0.5px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
