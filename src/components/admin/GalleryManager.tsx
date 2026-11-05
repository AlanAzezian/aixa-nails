'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ImagePlus,
  Trash2,
  Star,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Plus,
  Tag,
} from 'lucide-react';
import {
  createWorkWithImage,
  deleteWork,
  fetchWorks,
  setWorkFeatured,
  validateImageFile,
  fetchCategories,
  createCategory,
  deleteCategory,
  updateWorkOrder,
  DEFAULT_CATEGORIES,
} from '@/lib/worksService';
import { Work } from '@/types/database';

type Notice = { type: 'error' | 'success'; text: string } | null;

export default function GalleryManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Works state
  const [works, setWorks] = useState<Work[]>([]);
  const [loadingWorks, setLoadingWorks] = useState(true);

  // Categories state
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCatName, setNewCatName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);

  // Upload form state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Semipermanente');
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    // Cargar categorías dinámicas
    fetchCategories().then((cats) => {
      if (Array.isArray(cats) && cats.length > 0) {
        setCategories(cats);
        setCategory(cats[0]);
      }
    });

    // Cargar fotos existentes
    fetchWorks().then((data) => {
      setWorks(data);
      setLoadingWorks(false);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setTitle('');
    setIsFeatured(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotice(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = await validateImageFile(selected);
    if (!validation.ok) {
      setNotice({ type: 'error', text: validation.error });
      e.target.value = '';
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  // Crear categoría nueva
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    setAddingCategory(true);
    setNotice(null);

    const res = await createCategory(trimmed);
    if (res.ok && res.category) {
      setCategories((prev) => (prev.includes(res.category!) ? prev : [...prev, res.category!]));
      setCategory(res.category);
      setNewCatName('');
      setNotice({ type: 'success', text: `Categoría "${res.category}" creada con éxito.` });
    } else {
      setNotice({ type: 'error', text: res.error || 'No se pudo crear la categoría.' });
    }
    setAddingCategory(false);
  };

  // Eliminar categoría
  const handleDeleteCategory = async (catName: string) => {
    if (!window.confirm(`¿Eliminar la categoría "${catName}"?`)) return;

    const res = await deleteCategory(catName);
    if (res.ok) {
      const remaining = categories.filter((c) => c !== catName);
      setCategories(remaining.length > 0 ? remaining : DEFAULT_CATEGORIES);
      if (category === catName) {
        setCategory(remaining[0] || 'Semipermanente');
      }
      setNotice({ type: 'success', text: `Categoría "${catName}" eliminada.` });
    } else {
      setNotice({ type: 'error', text: res.error || 'No se pudo eliminar la categoría.' });
    }
  };

  // Subir foto
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || uploading) return;

    setUploading(true);
    setNotice(null);
    try {
      // Nueva foto en la primera posición (orden 1)
      const nextOrder = 1;
      const result = await createWorkWithImage({
        file,
        title,
        category,
        isFeatured,
        orderIndex: nextOrder,
      });

      if (result.ok) {
        setWorks((prev) => [result.work, ...prev]);
        setNotice({ type: 'success', text: `"${result.work.title}" ya está publicado en la galería.` });
        resetForm();
      } else {
        setNotice({ type: 'error', text: result.error });
      }
    } catch (err) {
      setNotice({
        type: 'error',
        text: `Error inesperado al subir: ${err instanceof Error ? err.message : 'revisá tu conexión'}`,
      });
    } finally {
      setUploading(false);
    }
  };

  // Eliminar foto
  const handleDelete = async (work: Work) => {
    if (!window.confirm(`¿Eliminar "${work.title}" de la galería? Esta acción no se puede deshacer.`)) return;
    setDeletingId(work.id);
    setNotice(null);
    try {
      const result = await deleteWork(work);
      if (result.ok) {
        setWorks((prev) => prev.filter((w) => w.id !== work.id));
      } else {
        setNotice({ type: 'error', text: result.error });
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Destacar en Home
  const handleToggleFeatured = async (work: Work) => {
    const next = !work.is_featured;
    setWorks((prev) => prev.map((w) => (w.id === work.id ? { ...w, is_featured: next } : w)));
    const result = await setWorkFeatured(work.id, next);
    if (!result.ok) {
      setWorks((prev) => prev.map((w) => (w.id === work.id ? { ...w, is_featured: !next } : w)));
      setNotice({ type: 'error', text: `No se pudo actualizar: ${result.error}` });
    }
  };

  // Reordenar foto: Mover hacia arriba o hacia abajo
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= works.length) return;

    const currentWork = works[index];
    const targetWork = works[targetIndex];
    if (!currentWork || !targetWork) return;

    setMovingId(currentWork.id);

    // Swap visualmente en local
    const nextWorks = [...works];
    nextWorks[index] = { ...targetWork, order_index: index + 1 };
    nextWorks[targetIndex] = { ...currentWork, order_index: targetIndex + 1 };
    setWorks(nextWorks);

    // Guardar en Supabase
    try {
      await Promise.all([
        updateWorkOrder(currentWork.id, targetIndex + 1),
        updateWorkOrder(targetWork.id, index + 1),
      ]);
    } catch (err) {
      console.warn('Error al persistir orden:', err);
    } finally {
      setMovingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. Gestor de Categorías */}
      <div className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <Tag className="w-5 h-5 text-brand-burgundy" />
          <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
            Categorías y Filtros de la Galería
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-brand-dark/60 mb-5">
          Creá o eliminá categorías de uñas. Estas categorías alimentan tanto las etiquetas de tus fotos como los botones de filtro en el sitio público.
        </p>

        {/* Lista de categorías con chips */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-bg border border-brand-accent/40 text-xs sm:text-sm font-medium text-brand-dark shadow-sm"
            >
              <span>{cat}</span>
              {categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  className="w-4 h-4 rounded-full text-brand-dark/50 hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                  title={`Eliminar categoría ${cat}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>

        {/* Input para agregar categoría */}
        <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Nueva categoría (ej: Kapping, Nail Art)"
            maxLength={60}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-brand-accent/40 text-xs sm:text-sm focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15"
          />
          <button
            type="submit"
            disabled={!newCatName.trim() || addingCategory}
            className="px-5 py-2.5 rounded-2xl bg-brand-burgundy hover:bg-brand-dark disabled:opacity-50 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </form>
      </div>

      {/* 2. Formulario para subir trabajo */}
      <form
        onSubmit={handleUpload}
        className="bg-brand-bg-light rounded-3xl p-6 sm:p-8 border border-brand-accent/35 shadow-sm"
      >
        <h2 className="font-cormorant text-2xl font-semibold text-brand-dark mb-1">
          Subir un nuevo trabajo
        </h2>
        <p className="text-xs sm:text-sm text-brand-dark/60 mb-6">
          JPG, PNG o WEBP. La foto se optimiza automáticamente antes de subirla (máx. 1600px, sin datos de ubicación).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File picker + preview */}
          <div>
            <input
              ref={fileInputRef}
              id="work-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor="work-image"
              className="relative flex flex-col items-center justify-center w-full aspect-square rounded-2xl border-2 border-dashed border-brand-accent/50 hover:border-brand-burgundy/60 bg-brand-bg/40 cursor-pointer overflow-hidden transition-colors"
            >
              {previewUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Previsualización"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-dark/70 text-white text-xs">
                    Tocá para cambiar la foto
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-brand-dark/60 p-6 text-center">
                  <ImagePlus className="w-10 h-10 text-brand-burgundy/60" />
                  <span className="text-sm font-medium">Elegí una foto del trabajo</span>
                  <span className="text-xs">o sacala con la cámara desde el celular</span>
                </div>
              )}
            </label>
            {file && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 inline-flex items-center gap-1 text-xs text-brand-dark/60 hover:text-brand-burgundy cursor-pointer"
              >
                <X className="w-3 h-3" /> Quitar foto
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-5">
            <div>
              <label
                htmlFor="work-title"
                className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5"
              >
                Título del diseño
              </label>
              <input
                id="work-title"
                type="text"
                value={title}
                maxLength={120}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Francesa con glitter"
                className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-accent/40 text-sm focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/15"
              />
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider font-semibold text-brand-dark/70 mb-1.5">
                Categoría
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                      category === c
                        ? 'bg-brand-burgundy text-white border-brand-burgundy shadow-sm'
                        : 'bg-white text-brand-dark/80 border-brand-accent/40 hover:border-brand-burgundy/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-brand-bg/50 border border-brand-accent/30 cursor-pointer">
              <div>
                <span className="block text-sm font-medium text-brand-dark">
                  Destacar en la página de inicio
                </span>
                <span className="block text-xs text-brand-dark/60">
                  Se muestran hasta 4 destacados en la Home.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <span className="relative w-11 h-6 rounded-full bg-brand-accent/40 peer-checked:bg-brand-burgundy transition-colors flex-shrink-0 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
            </label>

            <button
              type="submit"
              disabled={!file || !title.trim() || uploading}
              className="w-full py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-dark disabled:bg-brand-accent/40 disabled:text-brand-dark/40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Subiendo…</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Subir a la galería</span>
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {notice && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-6 p-4 rounded-2xl text-sm flex items-start gap-2 border ${
                notice.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-[#E8F8ED] border-green-300 text-green-950'
              }`}
            >
              {notice.type === 'error' ? (
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              <span>{notice.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* 3. Fotos Publicadas con Reordenamiento */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-cormorant text-2xl font-semibold text-brand-dark">
              Trabajos publicados ({works.length})
            </h2>
            <p className="text-xs text-brand-dark/60">
              Usá las flechas para reordenar las fotos. El orden mostrado aquí es el mismo que verán tus clientas.
            </p>
          </div>
        </div>

        {loadingWorks ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-brand-accent/20 animate-pulse" />
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="bg-brand-bg-light/60 rounded-3xl p-8 border border-dashed border-brand-accent/40 text-center text-sm text-brand-dark/60">
            Todavía no subiste fotos. Mientras tanto, el sitio muestra las ilustraciones de ejemplo.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {works.map((work, index) => {
                const isFirst = index === 0;
                const isLast = index === works.length - 1;
                const isMoving = movingId === work.id;

                return (
                  <motion.div
                    key={work.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-brand-bg-light rounded-2xl border border-brand-accent/35 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div className="relative aspect-square bg-brand-bg">
                      <Image
                        src={work.image_url}
                        alt={work.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />

                      {/* Badge de orden */}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-brand-dark/80 backdrop-blur-sm text-white text-[11px] font-bold">
                        #{index + 1}
                      </span>

                      {/* Botón de destacar */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(work)}
                        title={work.is_featured ? 'Quitar de destacados' : 'Destacar en la Home'}
                        className={`absolute top-2 left-2 p-1.5 rounded-full shadow transition-colors cursor-pointer ${
                          work.is_featured
                            ? 'bg-brand-burgundy text-white'
                            : 'bg-white/90 text-brand-dark/60 hover:text-brand-burgundy'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${work.is_featured ? 'fill-current' : ''}`} />
                      </button>

                      {/* Controles de reordenamiento sobre la foto */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1.5 bg-brand-dark/75 backdrop-blur-sm px-2 py-1 rounded-xl text-white text-xs">
                        <span className="text-[10px] text-white/70">Mover:</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={isFirst || isMoving}
                            onClick={() => handleMove(index, 'up')}
                            className="p-1 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            title="Mover foto a la izquierda / antes"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={isLast || isMoving}
                            onClick={() => handleMove(index, 'down')}
                            className="p-1 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            title="Mover foto a la derecha / después"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-brand-dark truncate">{work.title}</p>
                        <p className="text-[11px] text-brand-burgundy/80 truncate">{work.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(work)}
                        disabled={deletingId === work.id}
                        title="Eliminar foto"
                        className="p-1.5 rounded-full text-red-700/70 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer flex-shrink-0"
                      >
                        {deletingId === work.id ? (
                          <span className="block w-4 h-4 border-2 border-red-300 border-t-red-700 rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
