import { WorkCategory } from '@/types/database';

/**
 * Trabajos de salón reales de Aixa para exhibición editorial en la galería
 * cuando la base de datos de Supabase no tenga registros remotos o esté en frío.
 */
export interface SampleWork {
  id: string;
  title: string;
  category: WorkCategory;
  imageUrl?: string;
}

export const SAMPLE_WORKS: SampleWork[] = [
  {
    id: 'bordo-pleno',
    title: 'Bordó Pleno / Vino Profundo',
    category: 'Polygel',
    imageUrl: '/showcase/bordo-pleno.jpg',
  },
  {
    id: 'francesita-clasica',
    title: 'Francesita Clásica de Salón',
    category: 'Semipermanente',
    imageUrl: '/showcase/francesita-clasica.jpg',
  },
  {
    id: 'baby-boomer',
    title: 'Baby Boomer Suave',
    category: 'Polygel',
    imageUrl: '/showcase/baby-boomer.jpg',
  },
  {
    id: 'ojo-de-gato',
    title: 'Ojo de Gato Velvet',
    category: 'Soft gel',
    imageUrl: '/showcase/ojo-de-gato.jpg',
  },
  {
    id: 'nude-porcelana',
    title: 'Vía Láctea / Nude Porcelana',
    category: 'Semipermanente',
    imageUrl: '/showcase/nude-porcelana.jpg',
  },
  {
    id: 'francesita-negra',
    title: 'Francesita Doble Negra',
    category: 'Semipermanente',
    imageUrl: '/showcase/francesita-negra.jpg',
  },
  {
    id: 'rojo-clasico',
    title: 'Rojo Clásico Salón',
    category: 'Semipermanente',
    imageUrl: '/showcase/rojo-clasico.jpg',
  },
  {
    id: 'baby-boomer-gold',
    title: 'Baby Boomer & Pan de Oro',
    category: 'Soft gel',
    imageUrl: '/showcase/baby-boomer-gold.jpg',
  },
];
