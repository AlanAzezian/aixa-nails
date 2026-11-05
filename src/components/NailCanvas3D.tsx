'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { NailDesign } from '@/types/showcase3d';
import {
  createAlmondNailGeometry,
  createNailTexture,
  createNailNormalMap,
  createSalonStudioEnvironment,
} from '@/lib/nail3dGeometry';
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
  const ringLightRef = useRef<THREE.PointLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const studioEnvRef = useRef<THREE.WebGLRenderTarget | null>(null);

  // Texture caches to prevent recreating canvas textures on every toggle
  const textureCacheRef = useRef<Map<string, THREE.CanvasTexture>>(new Map());
  const normalCacheRef = useRef<Map<string, THREE.CanvasTexture>>(new Map());

  // Interaction motion physics
  const pointerRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

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

  // Reset rotation to front-facing editorial angle
  const handleResetView = useCallback(() => {
    if (!nailGroupRef.current) return;
    nailGroupRef.current.rotation.x = -0.12;
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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.1, 4.9);
    cameraRef.current = camera;

    // 3. High-performance WebGL Renderer with tone mapping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    rendererRef.current = renderer;

    // 4. Studio Lighting & Manicurist Ring Light Environment
    // Generate photorealistic salon HDRI environment with circular ring light reflection
    const studioEnv = createSalonStudioEnvironment(renderer);
    scene.environment = studioEnv.texture;
    studioEnvRef.current = studioEnv;

    // Ambient light preserving the warm brand mood
    const ambientLight = new THREE.AmbientLight(0xfff5f3, 0.85);
    scene.add(ambientLight);

    // Front-facing Manicurist Ring Light (moves subtly with cursor)
    const ringLight = new THREE.PointLight(0xffffff, 4.2, 8, 1.2);
    ringLight.position.set(0, 1.4, 2.6);
    scene.add(ringLight);
    ringLightRef.current = ringLight;

    // Key directional light for crisp apex highlight
    const keyLight = new THREE.DirectionalLight(0xfff2eb, 2.2);
    keyLight.position.set(2.4, 4.2, 3.8);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Soft Fill Light (Warm Blush)
    const fillLight = new THREE.DirectionalLight(0xfdeceb, 1.2);
    fillLight.position.set(-3.2, 1.2, 2.2);
    scene.add(fillLight);

    // Champagne Gold Rim/Back Light for crisp nail edge separation
    const rimLight = new THREE.DirectionalLight(0xffe6a3, 1.9);
    rimLight.position.set(0, 3.6, -3.2);
    scene.add(rimLight);

    // 5. Build procedural 3D Almond Sculpted Nail
    const nailGroup = new THREE.Group();
    nailGroup.rotation.x = -0.12;
    scene.add(nailGroup);
    nailGroupRef.current = nailGroup;

    const geometry = createAlmondNailGeometry();

    // Textures & Normal maps for initial design
    const texture = createNailTexture(selectedDesign.id);
    textureCacheRef.current.set(selectedDesign.id, texture);

    const normalMap = createNailNormalMap(selectedDesign.id);
    normalCacheRef.current.set(selectedDesign.id, normalMap);

    const ns = selectedDesign.normalScale ?? 0.35;

    // High-End PBR Salon Physical Material
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(ns, ns),
      roughness: selectedDesign.roughness,
      metalness: selectedDesign.metalness,
      clearcoat: selectedDesign.clearcoat,
      clearcoatRoughness: selectedDesign.clearcoatRoughness,
      transmission: selectedDesign.transmission,
      thickness: selectedDesign.thickness ?? 1.0,
      ior: selectedDesign.ior ?? 1.54,
      attenuationColor: new THREE.Color(selectedDesign.attenuationColor ?? '#FFE0DB'),
      attenuationDistance: selectedDesign.attenuationDistance ?? 1.6,
      iridescence: selectedDesign.iridescence,
      iridescenceIOR: 1.6,
      sheen: selectedDesign.sheen,
      sheenColor: new THREE.Color(selectedDesign.sheenColor),
      reflectivity: 0.98,
      side: THREE.DoubleSide,
    });
    nailMaterialRef.current = material;

    const nailMesh = new THREE.Mesh(geometry, material);
    nailMesh.castShadow = true;
    nailGroup.add(nailMesh);
    nailMeshRef.current = nailMesh;

    // 6. Luxury Circular Pedestal & Contact Shadow Disc
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.82, 0);

    // Soft radial shadow ring
    const shadowGeo = new THREE.RingGeometry(0.1, 1.65, 48);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x4a0716,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    pedestalGroup.add(shadowMesh);

    // Fine gold decorative orbit ring
    const goldRingGeo = new THREE.RingGeometry(1.6, 1.63, 64);
    goldRingGeo.rotateX(-Math.PI / 2);
    const goldRingMat = new THREE.MeshBasicMaterial({
      color: 0xe5b869,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
    });
    const goldRingMesh = new THREE.Mesh(goldRingGeo, goldRingMat);
    pedestalGroup.add(goldRingMesh);
    scene.add(pedestalGroup);

    // 7. Ambient champagne micro-particles
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.0;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfce38a,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Performance Optimization: Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 9. Resize Observer
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

    // 10. Animation Loop (60 FPS optimized)
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Halt rendering if scrolled outside viewport (0% GPU/CPU idle)
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.06;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.06;

      // Update ring light & key light based on pointer (sweeping salon ring light reflection)
      if (ringLightRef.current) {
        ringLightRef.current.position.x = pointerRef.current.x * 2.2;
        ringLightRef.current.position.y = 1.3 + pointerRef.current.y * 1.6;
      }
      if (keyLightRef.current) {
        keyLightRef.current.position.x = 2.4 + pointerRef.current.x * 1.4;
        keyLightRef.current.position.y = 4.2 + pointerRef.current.y * 1.2;
      }

      // Rotate nail group with momentum & inertia
      if (nailGroupRef.current) {
        if (!dragPhysicsRef.current.isPointerDown) {
          nailGroupRef.current.rotation.y += dragPhysicsRef.current.velocityX;
          nailGroupRef.current.rotation.x += dragPhysicsRef.current.velocityY;

          dragPhysicsRef.current.velocityX *= 0.92;
          dragPhysicsRef.current.velocityY *= 0.92;

          // Gentle auto-rotation when idle
          if (autoRotateRef.current && Math.abs(dragPhysicsRef.current.velocityX) < 0.001) {
            nailGroupRef.current.rotation.y += 0.007;
          }

          // Return X tilt towards natural editorial angle when not dragging
          const defaultTiltX = -0.12 + pointerRef.current.y * 0.16;
          nailGroupRef.current.rotation.x +=
            (defaultTiltX - nailGroupRef.current.rotation.x) * 0.04;
        }

        // Gentle breathing float
        nailGroupRef.current.position.y = Math.sin(elapsedTime * 1.6) * 0.04;
      }

      // Drift ambient champagne particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.04;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on unmount
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      observer.disconnect();
      resizeObserver.disconnect();

      // Dispose Three.js resources
      geometry.dispose();
      material.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      goldRingGeo.dispose();
      goldRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (studioEnvRef.current) {
        studioEnvRef.current.dispose();
      }

      textureCacheRef.current.forEach((t) => t.dispose());
      textureCacheRef.current.clear();

      normalCacheRef.current.forEach((n) => n.dispose());
      normalCacheRef.current.clear();

      renderer.dispose();
    };
  }, []);

  // Update material, textures and normal maps when selected design changes
  useEffect(() => {
    if (!nailMaterialRef.current) return;

    let texture = textureCacheRef.current.get(selectedDesign.id);
    if (!texture) {
      texture = createNailTexture(selectedDesign.id);
      textureCacheRef.current.set(selectedDesign.id, texture);
    }

    let normalMap = normalCacheRef.current.get(selectedDesign.id);
    if (!normalMap) {
      normalMap = createNailNormalMap(selectedDesign.id);
      normalCacheRef.current.set(selectedDesign.id, normalMap);
    }

    const mat = nailMaterialRef.current;
    mat.map = texture;
    mat.normalMap = normalMap;
    const ns = selectedDesign.normalScale ?? 0.35;
    mat.normalScale.set(ns, ns);

    mat.roughness = selectedDesign.roughness;
    mat.metalness = selectedDesign.metalness;
    mat.clearcoat = selectedDesign.clearcoat;
    mat.clearcoatRoughness = selectedDesign.clearcoatRoughness;
    mat.transmission = selectedDesign.transmission;
    mat.thickness = selectedDesign.thickness ?? 1.0;
    mat.ior = selectedDesign.ior ?? 1.54;
    mat.attenuationColor = new THREE.Color(selectedDesign.attenuationColor ?? '#FFE0DB');
    mat.attenuationDistance = selectedDesign.attenuationDistance ?? 1.6;
    mat.iridescence = selectedDesign.iridescence;
    mat.sheen = selectedDesign.sheen;
    mat.sheenColor = new THREE.Color(selectedDesign.sheenColor);
    mat.needsUpdate = true;
  }, [selectedDesign]);

  // Pointer move handler (subtle tilt and highlight tracking)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    pointerRef.current.targetX = nx;
    pointerRef.current.targetY = ny;

    if (dragPhysicsRef.current.isPointerDown && nailGroupRef.current) {
      const deltaX = e.clientX - dragPhysicsRef.current.startX;
      const deltaY = e.clientY - dragPhysicsRef.current.startY;

      const rotSpeed = 0.008;
      nailGroupRef.current.rotation.y += deltaX * rotSpeed;
      nailGroupRef.current.rotation.x += deltaY * rotSpeed * 0.7;

      // Clamp X tilt to prevent flipping upside down
      nailGroupRef.current.rotation.x = Math.max(
        -0.85,
        Math.min(0.85, nailGroupRef.current.rotation.x)
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
        pointerRef.current.targetX = 0;
        pointerRef.current.targetY = 0;
      }}
      onPointerEnter={() => setIsHovered(true)}
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-brand-bg-light/85 via-brand-bg/55 to-brand-bg-light/95 border border-brand-burgundy/15 shadow-xl shadow-brand-dark/5 select-none touch-none cursor-grab active:cursor-grabbing flex items-center justify-center"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Badges & Hint Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-bg-light/95 backdrop-blur-md text-brand-burgundy border border-brand-burgundy/15 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-burgundy" />
          WebGL PBR 3D en tiempo real
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] text-brand-dark/60 bg-brand-bg/80 backdrop-blur-sm">
          {isDragging
            ? 'Rotando perspectiva 360°...'
            : isHovered
            ? 'Arrastrá para inspeccionar la curvatura C'
            : 'Mové el cursor para viajar con la luz de salón'}
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
          title={isRotating ? 'Pausar auto-rotación' : 'Activar auto-rotación'}
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

      {/* Subtle bottom lighting reflection gradient */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-bg/40 to-transparent pointer-events-none" />
    </div>
  );
}
