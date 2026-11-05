'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Check,
  RotateCw,
  ShieldCheck,
  MapPin,
  MoveHorizontal,
} from 'lucide-react';
import {
  NAIL_3D_STYLES,
  Nail3DStyle,
  createFingerGeometry,
  createSalonNailGeometry,
  createDesignTexture,
} from '@/lib/fingerNail3D';

export default function NailStudio3D() {
  const [selectedStyle, setSelectedStyle] = useState<Nail3DStyle>(NAIL_3D_STYLES[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Canvas DOM container
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const nailMeshRef = useRef<THREE.Mesh | null>(null);
  const nailMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const textureCacheRef = useRef<Map<string, THREE.CanvasTexture>>(new Map());

  // Interactive 360 drag physics
  const pointerDownRef = useRef(false);
  const prevPointerXRef = useRef(0);
  const prevPointerYRef = useRef(0);
  const targetRotationYRef = useRef(0.25);
  const targetRotationXRef = useRef(0.12);
  const currentRotationYRef = useRef(0.25);
  const currentRotationXRef = useRef(0.12);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize Three.js scene (Dedo Mockup Natural + Tip de Salón)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera: framing the finger & nail tip with high-end portrait depth
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 5.2);
    camera.lookAt(0, 0.1, 0);
    cameraRef.current = camera;

    // 3. Renderer with high color fidelity and antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting System:
    // Key directional light creating sharp specular reflections along the nail ridge
    const keyLight = new THREE.DirectionalLight(0xfff7f0, 2.0);
    keyLight.position.set(3.5, 4.2, 4.0);
    scene.add(keyLight);

    // Fill light with soft cool lavender/rose tone for delicate skin illumination
    const fillLight = new THREE.DirectionalLight(0xf0e4f7, 1.0);
    fillLight.position.set(-3.2, 1.8, 2.5);
    scene.add(fillLight);

    // Rim / Back light for crisp edge separation from background
    const rimLight = new THREE.DirectionalLight(0xffecd9, 1.4);
    rimLight.position.set(0.0, 3.8, -3.5);
    scene.add(rimLight);

    // Ambient light ensuring shadow areas stay warm and natural
    const ambientLight = new THREE.AmbientLight(0xfff5f0, 0.9);
    scene.add(ambientLight);

    // 5. Model Assembly: Dedo Mockup + Tip de Salón
    const modelGroup = new THREE.Group();
    // Default flattering presentation angle: tilted slightly toward viewer
    modelGroup.position.set(0, -0.15, 0);
    modelGroup.rotation.y = targetRotationYRef.current;
    modelGroup.rotation.x = targetRotationXRef.current;
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // --- PART 1: EL DEDO (Base de Maniquí Anatómica) ---
    const fingerGeo = createFingerGeometry();
    const fingerMat = new THREE.MeshStandardMaterial({
      color: 0xdec0b5, // Tono piel rosado cálido natural de salón
      roughness: 0.86, // Mate suave sin brillos especulares
      metalness: 0.0,
    });
    const fingerMesh = new THREE.Mesh(fingerGeo, fingerMat);
    modelGroup.add(fingerMesh);

    // Pedestal de exhibición de salón en la base inferior
    const pedestalGeo = new THREE.CylinderGeometry(1.02, 1.15, 0.22, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xf5eeea,
      roughness: 0.45,
      metalness: 0.1,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.set(0, -1.68, 0);
    modelGroup.add(pedestalMesh);

    // Anillo sutil de sombra suave en el suelo
    const shadowGeo = new THREE.RingGeometry(0.1, 1.6, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x240610,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.set(0, -1.8, 0);
    scene.add(shadowMesh);

    // --- PART 2: LA UÑA (Tip de Salón Independiente Acoplado) ---
    const nailGeo = createSalonNailGeometry();
    const initialTexture = createDesignTexture(selectedStyle.id);
    textureCacheRef.current.set(selectedStyle.id, initialTexture);

    const nailMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: initialTexture,
      roughness: 0.26, // Brillo sedoso de esmalte
      clearcoat: 0.24, // Top coat cristalino
      clearcoatRoughness: 0.14,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
    nailMaterialRef.current = nailMat;

    const nailMesh = new THREE.Mesh(nailGeo, nailMat);
    modelGroup.add(nailMesh);
    nailMeshRef.current = nailMesh;

    // 6. Smooth Animation Loop with 360 Inertia & Lighting Glare
    let lastTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Gentle auto-rotation when user is not manually rotating
      if (autoRotate && !pointerDownRef.current) {
        targetRotationYRef.current += 0.45 * delta;
      }

      // Smooth damped spring interpolation (60 FPS)
      currentRotationYRef.current +=
        (targetRotationYRef.current - currentRotationYRef.current) * 0.085;
      currentRotationXRef.current +=
        (targetRotationXRef.current - currentRotationXRef.current) * 0.085;

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.y = currentRotationYRef.current;
        modelGroupRef.current.rotation.x = currentRotationXRef.current;
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      fingerGeo.dispose();
      fingerMat.dispose();
      nailGeo.dispose();
      nailMat.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, []);

  // Update Nail Texture when Selected Style Changes
  useEffect(() => {
    if (!nailMaterialRef.current) return;

    let texture = textureCacheRef.current.get(selectedStyle.id);
    if (!texture) {
      texture = createDesignTexture(selectedStyle.id);
      textureCacheRef.current.set(selectedStyle.id, texture);
    }

    nailMaterialRef.current.map = texture;

    // Subtle physical material tuning based on specific salon technique
    if (selectedStyle.id === 'ojo-de-gato') {
      nailMaterialRef.current.metalness = 0.12;
      nailMaterialRef.current.roughness = 0.22;
      nailMaterialRef.current.clearcoat = 0.3;
    } else if (selectedStyle.id === 'via-lactea') {
      nailMaterialRef.current.metalness = 0.0;
      nailMaterialRef.current.roughness = 0.28;
      nailMaterialRef.current.clearcoat = 0.25;
    } else {
      nailMaterialRef.current.metalness = 0.02;
      nailMaterialRef.current.roughness = 0.25;
      nailMaterialRef.current.clearcoat = 0.24;
    }

    nailMaterialRef.current.needsUpdate = true;
  }, [selectedStyle]);

  // Pointer Drag Event Handlers for 360° Free Rotation
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    pointerDownRef.current = true;
    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;
    setIsDragging(true);
    setAutoRotate(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current) return;

    const deltaX = e.clientX - prevPointerXRef.current;
    const deltaY = e.clientY - prevPointerYRef.current;

    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;

    // Sensitivity adjusted for buttery smooth drag
    targetRotationYRef.current += deltaX * 0.009;
    targetRotationXRef.current += deltaY * 0.006;

    // Clamp vertical tilt so the finger stays aesthetically upright
    targetRotationXRef.current = Math.max(-0.25, Math.min(0.42, targetRotationXRef.current));
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerDownRef.current = false;
    setIsDragging(false);
  }, []);

  const resetView = useCallback(() => {
    targetRotationYRef.current = 0.25;
    targetRotationXRef.current = 0.12;
    setAutoRotate(true);
  }, []);

  return (
    <section
      id="estudio-3d"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-brand-bg via-brand-bg-light/80 to-brand-bg overflow-hidden border-y border-brand-burgundy/10"
    >
      {/* Editorial Ambient Background Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#F5CCD3]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[#6B0F24]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#6B0F24]/10 text-[#6B0F24] border border-[#6B0F24]/15 mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6B0F24]" />
            <span>Estudio 3D · Dedo Mockup Natural & Tip de Salón</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-dark leading-[1.08] mb-3"
          >
            Explorá los Diseños en 360°
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-jost text-base sm:text-lg text-brand-dark/75 leading-relaxed"
          >
            Arrastrá el dedo interactivo en 360° para ver cómo la luz de salón se desliza sobre la
            curvatura en C y el esmalte brillante, sobre una base mate natural.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout: 3D Interactive Canvas + Vertical ScrollView Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Interactive Canvas Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              className="relative w-full max-w-[480px] h-[480px] sm:h-[530px] rounded-3xl overflow-hidden border border-[#6B0F24]/20 shadow-2xl shadow-brand-dark/15 bg-gradient-to-b from-brand-bg-light/95 via-brand-bg/60 to-brand-bg-light/95 flex items-center justify-center select-none"
              style={{ touchAction: 'none' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* Three.js Canvas Container */}
              <div
                ref={containerRef}
                className={`w-full h-full ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                } flex items-center justify-center`}
              />

              {/* Floating Top Left Badge: Estilo Activo */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-[#6B0F24] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#6B0F24]" />
                <span>{selectedStyle.name}</span>
              </div>

              {/* Floating Top Right Badge: Reset / Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetView}
                  title="Restablecer ángulo frontal"
                  className="p-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-md text-brand-dark/70 hover:text-[#6B0F24] transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dark/75 backdrop-blur-md border border-white/20 shadow-lg text-white text-xs font-medium">
                  <span>Forma: {selectedStyle.shape}</span>
                </div>
              </div>

              {/* Floating Bottom Metadata Card */}
              <div className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-white/92 backdrop-blur-md border border-white/70 shadow-xl">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div>
                    <h3 className="font-cormorant text-2xl font-bold text-brand-dark tracking-tight leading-none">
                      {selectedStyle.name}
                    </h3>
                    <p className="font-jost text-xs text-brand-dark/65 mt-0.5">
                      {selectedStyle.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#6B0F24]/10 text-[#6B0F24] border border-[#6B0F24]/20">
                    {selectedStyle.badge}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 mt-2 border-t border-brand-burgundy/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-brand-dark/60 font-medium">Tonos:</span>
                    <div className="flex -space-x-1.5">
                      {selectedStyle.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-white shadow-xs inline-block"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-brand-dark/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6B0F24]" />
                    <span>{selectedStyle.durability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drag helper hint */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-brand-dark/60">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#6B0F24]" />
              <span>Arrastrá libremente en 360° para inspeccionar el reflejo de la luz</span>
            </div>
          </div>

          {/* Right Column: Catálogo en ScrollView + CTA */}
          <div className="lg:col-span-5 flex flex-col bg-brand-bg-light/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-brand-burgundy/15 shadow-xl shadow-brand-dark/5">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-brand-burgundy/10">
              <div>
                <h3 className="font-cormorant text-2xl font-bold text-brand-dark">
                  Catálogo de Estilos
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-brand-dark/65">
                  <MapPin className="w-3 h-3 text-[#6B0F24]" />
                  <span>Zona Norte (Servicio a domicilio)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#6B0F24]/10 text-[#6B0F24]">
                {NAIL_3D_STYLES.length} estilos
              </span>
            </div>

            {/* Vertical ScrollView Container */}
            <div className="max-h-[520px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-[#6B0F24]/20 scrollbar-track-transparent">
              {NAIL_3D_STYLES.map((style) => {
                const isActive = selectedStyle.id === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 border flex items-center justify-between gap-3 group ${
                      isActive
                        ? 'border-[#6B0F24] bg-[#FDF4F5] shadow-md ring-1 ring-[#6B0F24]/25 scale-[1.01]'
                        : 'border-brand-burgundy/15 bg-white/70 hover:bg-[#FDF7F8] hover:border-brand-burgundy/35'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Color Palette Chips */}
                      <div className="flex -space-x-1.5 shrink-0">
                        {style.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-5 h-5 rounded-full border border-white shadow-xs inline-block"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      {/* Title, Subtitle and Badges */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-cormorant text-lg font-semibold leading-snug truncate ${
                              isActive ? 'text-[#6B0F24]' : 'text-brand-dark'
                            }`}
                          >
                            {style.name}
                          </h4>
                        </div>

                        <p className="font-jost text-xs text-brand-dark/65 truncate">
                          {style.subtitle}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#6B0F24]/10 text-[#6B0F24]">
                            Forma: {style.shape}
                          </span>
                          <span className="text-[10px] text-brand-dark/50">{style.badge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Check Indicator */}
                    <div className="shrink-0">
                      {isActive && (
                        <span className="w-5 h-5 rounded-full bg-[#6B0F24] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="pt-4 mt-3 border-t border-brand-burgundy/10">
              <Link
                href={`/reservar?style=${encodeURIComponent(
                  selectedStyle.name
                )}&serviceId=${selectedStyle.recommendedServiceId}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#6B0F24] text-brand-bg-light font-medium text-sm hover:bg-[#520A1B] transition-all shadow-md hover:shadow-lg active:scale-[0.98] group"
              >
                <span>Pedir turno con este diseño</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
