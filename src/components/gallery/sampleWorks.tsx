'use client';

import React from 'react';
import { SparkleStar } from '@/components/NailIllustrations';
import { WorkCategory } from '@/types/database';

/**
 * Ilustraciones vectoriales de ejemplo. Solo se muestran como fallback
 * mientras la tabla `works` de Supabase no tenga fotos cargadas.
 */
export interface SampleWork {
  id: string;
  title: string;
  category: WorkCategory;
  nails: React.ReactNode;
}

export const SAMPLE_WORKS: SampleWork[] = [
    {
      id: 'degrade-lila',
      title: 'Degradé lila',
      category: 'Semipermanente',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-gradient-to-b from-[#A5A5DF] via-[#7B7BBE] to-[#45448C] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-8 bg-white/40 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-gradient-to-b from-[#8E8ECB] via-[#6362AB] to-[#36357B] relative shadow-md">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/35 rounded-full blur-[0.5px]" />
            <div className="absolute top-5 right-2">
              <SparkleStar size={10} className="text-white/80" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#7B7BC2] via-[#4F4E99] to-[#272662] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'rojo-estrellas',
      title: 'Rojo y estrellas',
      category: 'Polygel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-34 rounded-t-full bg-gradient-to-b from-[#B81E3C] to-[#7D0B22] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-42 rounded-t-full bg-[#181517] relative shadow-md flex justify-center">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/20 rounded-full blur-[0.5px]" />
            <div className="absolute top-6">
              <SparkleStar size={18} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#9C132E] to-[#600517] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'nude-dorado',
      title: 'Nude con dorado',
      category: 'Soft gel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-gradient-to-b from-[#F5D8CE] to-[#DFB5A7] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-8 bg-white/40 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-gradient-to-b from-[#EED3C8] to-[#D5A392] relative shadow-md flex justify-center">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/35 rounded-full blur-[0.5px]" />
            <div className="absolute top-6">
              <SparkleStar size={14} className="text-[#FFDF78] drop-shadow-[0_0_6px_rgba(255,223,120,0.8)]" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#E5BEB0] to-[#C99684] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/30 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'azul-electrico',
      title: 'Azul eléctrico',
      category: 'Semipermanente',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-34 rounded-t-full bg-gradient-to-b from-[#4A7CE8] to-[#1C419E] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/45 rounded-full blur-[0.5px]" />
          </div>
          <div className="w-9 h-42 rounded-t-full bg-gradient-to-b from-[#2E68E8] to-[#102B82] relative shadow-md flex justify-center">
            <div className="absolute top-2 left-1.5 w-1 h-12 bg-white/40 rounded-full blur-[0.5px]" />
            <div className="absolute top-6">
              <SparkleStar size={15} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#2452BE] to-[#0A1F62] relative shadow-sm">
            <div className="absolute top-2 left-1.5 w-1 h-10 bg-white/35 rounded-full blur-[0.5px]" />
          </div>
        </div>
      ),
    },
    {
      id: 'francesa-negro',
      title: 'Francesa en negro',
      category: 'Polygel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-[#F5DCD6] relative shadow-sm overflow-hidden">
            <div className="w-full h-7 bg-[#1C181B] rounded-t-full" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-[#1C181B] relative shadow-md flex justify-center">
            <div className="absolute top-6">
              <SparkleStar size={16} className="text-white" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-[#F5DCD6] relative shadow-sm overflow-hidden">
            <div className="w-full h-8 bg-[#1C181B] rounded-t-full" />
          </div>
        </div>
      ),
    },
    {
      id: 'degrade-rojo',
      title: 'Degradé rojo',
      category: 'Semipermanente',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-34 rounded-t-full bg-gradient-to-b from-[#F2C5BC] to-[#BC2440] relative shadow-sm" />
          <div className="w-9 h-42 rounded-t-full bg-gradient-to-b from-[#EAAFA4] to-[#990D25] relative shadow-md flex justify-center">
            <div className="absolute top-6">
              <SparkleStar size={14} className="text-white/80" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-gradient-to-b from-[#941126] to-[#5C0513] relative shadow-sm" />
        </div>
      ),
    },
    {
      id: 'ojo-de-gato',
      title: 'Ojo de gato',
      category: 'Soft gel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-[#3D3A40] relative shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-[#6B6873] relative shadow-md flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
            <div className="absolute top-6">
              <SparkleStar size={16} className="text-white" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-[#1C1A1E] relative shadow-sm" />
        </div>
      ),
    },
    {
      id: 'lineas-finas',
      title: 'Líneas finas',
      category: 'Polygel',
      nails: (
        <div className="flex items-end justify-center gap-2 h-44">
          <div className="w-8 h-32 rounded-t-full bg-[#F5D8CE] relative shadow-sm">
            <div className="absolute top-8 left-2 w-4 h-[1px] bg-white rotate-45" />
          </div>
          <div className="w-9 h-40 rounded-t-full bg-[#F3D1C5] relative shadow-md flex justify-center">
            <div className="absolute top-6">
              <SparkleStar size={14} className="text-white" />
            </div>
          </div>
          <div className="w-8 h-36 rounded-t-full bg-[#F5D8CE] relative shadow-sm" />
        </div>
      ),
    },
];
