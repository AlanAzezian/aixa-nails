'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { NailDesign } from '@/types/showcase3d';
import { createAlmondNailGeometry, createNailTexture } from '@/lib/nail3dGeometry';
import { Rotate3d, Play, Pause, Sparkles } from 'lucide-react';

interface NailCanvas3DProps {
  selectedDesign: NailDesign;
}

export default function NailCanvas3D({ selectedDesign }: NailCanvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction & animation control states
  const [isRotating, setIsRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // References to keep Three.js instances across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nailGroupRef = useRef<THREE.Group | null>(null);
  const nailMeshRef = useRef<THREE.Mesh | null>(null);
  const nailMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  // Texture cache to prevent recreating canvas textures on every toggle
  const textureCacheRef = useRef<Map<string, THREE.CanvasTexture>>(new Map());

  // Interaction motion physics for free 360 rotation
  const dragPhysicsRef = useRef<{
    startX: number;
    startY: number;
    velocityX: number;
    velocityY: number;
    isPointerDown: boolean;
  }>({
    startX: 0,
    startY: 0,
    velocityX: 0,
    velocityY: 0,
    isPointerDown: false,
  });

  const animationFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const autoRotateRef = useRef<boolean>(true);

  // Sync autoRotate state with ref for animation loop
  useEffect(() => {
    autoRotateRef.current = isRotating;
  }, [isRotating]);

  // Reset rotation to clean frontal perspective
  const handleResetView = useCallback(() => {
    if (!nailGroupRef.current) return;
    nailGroupRef.current.rotation.x = -0.1;
    nailGroupRef.current.rotation.y = 0;
    nailGroupRef.current.rotation.z = 0;
    dragPhysicsRef.current.velocityX = 0;
    dragPhysicsRef.current.velocityY = 0;
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 540;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0.05, 5.0);
    cameraRef.current = camera;

    // 3. Renderer with clean tone mapping (no harsh contrast)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // 4. Soft, uniform studio lighting rig (zero blinding glare)
    // Generous ambient fill so the true colors and lines are 100% visible
    const ambientLight = new THREE.AmbientLight(0xfffdfc, 1.2);
    scene.add(ambientLight);

    // Soft top-right key light (diffuse, non-glaring)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(2.0, 3.5, 3.0);
    scene.add(keyLight);

    // Soft left fill light to eliminate dark shadows
    const fillLight = new THREE.DirectionalLight(0xfffaf8, 0.5);
    fillLight.position.set(-2.5, 1.5, 2.5);
    scene.add(fillLight);

    // Gentle back light for tip edge contour
    const backLight = new THREE.DirectionalLight(0xfff6ee, 0.4);
    backLight.position.set(0, 3.0, -3.0);
    scene.add(backLight);

    // 5. Build procedural 3D Almond Nail
    const nailGroup = new THREE.Group();
    nailGroup.rotation.x = -0.1;
    scene.add(nailGroup);
    nailGroupRef.current = nailGroup;

    const geometry = createAlmondNailGeometry();

    // Initial clean texture
    const texture = createNailTexture(selectedDesign.id);
    textureCacheRef.current.set(selectedDesign.id, texture);

    // Clean salon satin material: low clearcoat, medium roughness, zero glare
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: selectedDesign.roughness,
      metalness: 0.0,
      clearcoat: selectedDesign.clearcoat,
      clearcoatRoughness: selectedDesign.clearcoatRoughness,
      transmission: 0.0,
      side: THREE.DoubleSide,
    });
    nailMaterialRef.current = material;

    const nailMesh = new THREE.Mesh(geometry, material);
    nailGroup.add(nailMesh);
    nailMeshRef.current = nailMesh;

    // 6. Discreet contact shadow disc on the base
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.8, 0);

    const shadowGeo = new THREE.RingGeometry(0.1, 1.45, 48);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x3d0714,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    pedestalGroup.add(shadowMesh);
    scene.add(pedestalGroup);

    // 7. Performance Optimization: Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    // 9. Animation Loop (60 FPS, silky smooth 360 free orbit)
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Free 360 rotation with momentum & decay
      if (nailGroupRef.current) {
        if (!dragPhysicsRef.current.isPointerDown) {
          nailGroupRef.current.rotation.y += dragPhysicsRef.current.velocityX;
          nailGroupRef.current.rotation.x += dragPhysicsRef.current.velocityY;

          dragPhysicsRef.current.velocityX *= 0.94;
          dragPhysicsRef.current.velocityY *= 0.94;

          // Smooth auto-rotation when user is not interacting
          if (autoRotateRef.current && Math.abs(dragPhysicsRef.current.velocityX) < 0.001) {
            nailGroupRef.current.rotation.y += 0.006;
          }

          // Gently pull tilt X towards neutral resting angle
          nailGroupRef.current.rotation.x +=
            (-0.1 - nailGroupRef.current.rotation.x) * 0.02;
        }

        // Very subtle floating motion
        nailGroupRef.current.position.y = Math.sin(elapsedTime * 1.4) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      observer.disconnect();
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();

      textureCacheRef.current.forEach((t) => t.dispose());
      textureCacheRef.current.clear();

      renderer.dispose();
    };
  }, []);

  // Update material and textures when selected design changes
  useEffect(() => {
    if (!nailMaterialRef.current) return;

    let texture = textureCacheRef.current.get(selectedDesign.id);
    if (!texture) {
      texture = createNailTexture(selectedDesign.id);
      textureCacheRef.current.set(selectedDesign.id, texture);
    }

    const mat = nailMaterialRef.current;
    mat.map = texture;
    mat.roughness = selectedDesign.roughness;
    mat.metalness = selectedDesign.metalness;
    mat.clearcoat = selectedDesign.clearcoat;
    mat.clearcoatRoughness = selectedDesign.clearcoatRoughness;
    mat.needsUpdate = true;
  }, [selectedDesign]);

  // Free 360 pointer drag handler
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragPhysicsRef.current.isPointerDown && nailGroupRef.current) {
      const deltaX = e.clientX - dragPhysicsRef.current.startX;
      const deltaY = e.clientY - dragPhysicsRef.current.startY;

      const rotSpeed = 0.009;
      // Complete 360-degree free orbit on Y axis
      nailGroupRef.current.rotation.y += deltaX * rotSpeed;
      nailGroupRef.current.rotation.x += deltaY * rotSpeed * 0.65;

      // Soft clamp on X tilt so user doesn't flip the nail completely upside down
      nailGroupRef.current.rotation.x = Math.max(
        -0.75,
        Math.min(0.75, nailGroupRef.current.rotation.x)
      );

      dragPhysicsRef.current.velocityX = deltaX * rotSpeed * 0.5;
      dragPhysicsRef.current.velocityY = deltaY * rotSpeed * 0.35;

      dragPhysicsRef.current.startX = e.clientX;
      dragPhysicsRef.current.startY = e.clientY;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragPhysicsRef.current.isPointerDown = true;
    dragPhysicsRef.current.startX = e.clientX;
    dragPhysicsRef.current.startY = e.clientY;
    dragPhysicsRef.current.velocityX = 0;
    dragPhysicsRef.current.velocityY = 0;
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    dragPhysicsRef.current.isPointerDown = false;
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        setIsHovered(false);
      }}
      onPointerEnter={() => setIsHovered(true)}
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-brand-bg-light/90 via-brand-bg/50 to-brand-bg-light/90 border border-brand-burgundy/15 shadow-lg select-none touch-none cursor-grab active:cursor-grabbing flex items-center justify-center"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Badges & Hint Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-bg-light/95 backdrop-blur-md text-brand-burgundy border border-brand-burgundy/15 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-burgundy" />
          Visor 3D Interactivo
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] text-brand-dark/65 bg-brand-bg/85 backdrop-blur-sm">
          {isDragging
            ? 'Rotando 360°...'
            : isHovered
            ? 'Arrastrá para girar en 360 grados'
            : 'Tocá o arrastrá para inspeccionar la uña'}
        </span>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all border shadow-sm ${
            isRotating
              ? 'bg-brand-burgundy text-brand-bg-light border-brand-burgundy'
              : 'bg-brand-bg-light/90 text-brand-dark hover:text-brand-burgundy border-brand-burgundy/20'
          }`}
          title={isRotating ? 'Pausar rotación' : 'Activar rotación continua'}
          aria-label="Alternar rotación automática"
        >
          {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={handleResetView}
          className="p-2.5 rounded-full bg-brand-bg-light/90 backdrop-blur-md text-brand-dark hover:text-brand-burgundy border border-brand-burgundy/20 shadow-sm transition-all"
          title="Restablecer ángulo frontal"
          aria-label="Restablecer vista 3D"
        >
          <Rotate3d className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
