import { supabase, isSupabaseConfigured } from './supabase';
import { Work, WorkCategory, WORK_CATEGORIES } from '@/types/database';

export const WORKS_BUCKET = 'nail-works';
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB (igual al límite del bucket)
const MAX_IMAGE_DIMENSION = 1600; // px, lado mayor tras la compresión

type AllowedMime = 'image/jpeg' | 'image/png' | 'image/webp';

const EXTENSION_BY_MIME: Record<AllowedMime, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// ---------------------------------------------------------------------
// Lectura pública
// ---------------------------------------------------------------------

function isWorkCategory(value: unknown): value is WorkCategory {
  return typeof value === 'string' && (WORK_CATEGORIES as readonly string[]).includes(value);
}

function sanitizeWork(row: Record<string, unknown>): Work | null {
  if (!row || typeof row.image_url !== 'string' || !row.image_url) return null;
  return {
    id: String(row.id),
    title: typeof row.title === 'string' && row.title ? row.title : 'Diseño',
    category: isWorkCategory(row.category) ? row.category : 'Semipermanente',
    image_url: row.image_url,
    is_featured: Boolean(row.is_featured),
    created_at: typeof row.created_at === 'string' ? row.created_at : undefined,
  };
}

/**
 * Trae los trabajos de la galería. Nunca lanza: ante cualquier error devuelve []
 * para que la UI pública use el fallback de ilustraciones.
 */
export async function fetchWorks(options: { featuredOnly?: boolean; limit?: number } = {}): Promise<Work[]> {
  if (!isSupabaseConfigured) return [];

  try {
    let query = supabase.from('works').select('*').order('created_at', { ascending: false });
    if (options.featuredOnly) query = query.eq('is_featured', true);
    if (options.limit) query = query.limit(options.limit);

    const { data, error } = await query;
    if (error || !Array.isArray(data)) {
      if (error) console.warn('No se pudo leer la tabla works:', error.message);
      return [];
    }

    return data
      .map((row) => sanitizeWork(row as Record<string, unknown>))
      .filter((w): w is Work => w !== null);
  } catch (err) {
    console.warn('Error de red al leer works:', err);
    return [];
  }
}

// ---------------------------------------------------------------------
// Validación de archivos (no confiamos en la extensión ni en file.type)
// ---------------------------------------------------------------------

async function detectMimeFromMagicBytes(file: Blob): Promise<AllowedMime | null> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return 'image/png';
  }
  // WEBP: "RIFF" .... "WEBP"
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return 'image/webp';
  }
  return null;
}

export async function validateImageFile(file: File): Promise<{ ok: true } | { ok: false; error: string }> {
  // Límite generoso para el original: luego se comprime antes de subir.
  if (file.size > 20 * 1024 * 1024) {
    return { ok: false, error: 'La imagen es demasiado pesada (máximo 20 MB antes de comprimir).' };
  }
  const mime = await detectMimeFromMagicBytes(file);
  if (!mime) {
    return { ok: false, error: 'Formato no soportado. Usá una foto JPG, PNG o WEBP.' };
  }
  return { ok: true };
}

/**
 * Redimensiona (lado mayor ≤ 1600px) y re-codifica a WEBP en el navegador.
 * Además de optimizar el peso, re-codificar elimina metadatos EXIF (ubicación GPS, etc.).
 * Si el navegador no puede procesarla, devuelve el archivo original.
 */
export async function compressImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/webp', 0.85)
    );
    // Safari antiguo puede ignorar webp y devolver png: lo aceptamos igual si es más liviano
    if (!blob || blob.size >= file.size) return file;
    return blob;
  } catch {
    return file;
  }
}

// ---------------------------------------------------------------------
// Escritura (solo admin autenticada; RLS lo hace cumplir en Supabase)
// ---------------------------------------------------------------------

function storagePathFromPublicUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${WORKS_BUCKET}/`;
  const idx = url.indexOf(marker);
  return idx === -1 ? null : decodeURIComponent(url.slice(idx + marker.length));
}

export async function createWorkWithImage(input: {
  file: File;
  title: string;
  category: WorkCategory;
  isFeatured: boolean;
}): Promise<{ ok: true; work: Work } | { ok: false; error: string }> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'Supabase no está configurado (faltan variables de entorno).' };
  }

  const title = input.title.trim().slice(0, 120);
  if (!title) return { ok: false, error: 'Poné un título para el diseño.' };
  if (!isWorkCategory(input.category)) return { ok: false, error: 'Elegí una categoría válida.' };

  const validation = await validateImageFile(input.file);
  if (!validation.ok) return validation;

  const optimized = await compressImage(input.file);
  if (optimized.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: 'La imagen sigue pesando más de 5 MB tras comprimirla. Probá con otra foto.' };
  }

  const finalMime = await detectMimeFromMagicBytes(optimized);
  if (!finalMime) return { ok: false, error: 'No se pudo procesar la imagen.' };

  // Nombre generado por nosotros: nunca usamos el nombre original (evita path traversal)
  const now = new Date();
  const path = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${crypto.randomUUID()}.${EXTENSION_BY_MIME[finalMime]}`;

  const { error: uploadError } = await supabase.storage
    .from(WORKS_BUCKET)
    .upload(path, optimized, { contentType: finalMime, cacheControl: '31536000', upsert: false });

  if (uploadError) {
    return { ok: false, error: `No se pudo subir la imagen: ${uploadError.message}` };
  }

  const { data: publicData } = supabase.storage.from(WORKS_BUCKET).getPublicUrl(path);

  const { data, error: insertError } = await supabase
    .from('works')
    .insert([{ title, category: input.category, image_url: publicData.publicUrl, is_featured: input.isFeatured }])
    .select()
    .single();

  if (insertError || !data) {
    // Evitamos archivos huérfanos si falló el registro en la tabla
    await supabase.storage.from(WORKS_BUCKET).remove([path]);
    return { ok: false, error: `La imagen se subió pero no se pudo registrar: ${insertError?.message ?? 'error desconocido'}` };
  }

  const work = sanitizeWork(data as Record<string, unknown>);
  return work ? { ok: true, work } : { ok: false, error: 'Respuesta inválida de Supabase.' };
}

export async function deleteWork(work: Work): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabase.from('works').delete().eq('id', work.id);
  if (error) return { ok: false, error: `No se pudo eliminar: ${error.message}` };

  const path = storagePathFromPublicUrl(work.image_url);
  if (path) {
    const { error: storageError } = await supabase.storage.from(WORKS_BUCKET).remove([path]);
    if (storageError) console.warn('Registro eliminado, pero el archivo quedó en Storage:', storageError.message);
  }
  return { ok: true };
}

export async function setWorkFeatured(
  id: string,
  isFeatured: boolean
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabase.from('works').update({ is_featured: isFeatured }).eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
