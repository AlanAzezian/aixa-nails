import * as THREE from 'three';
import { NailDesign } from '@/types/showcase3d';

export const NAIL_DESIGNS: NailDesign[] = [
  {
    id: 'vino-an',
    name: 'Vino AN Insignia',
    subtitle: 'Bordó profundo (#6B0F24) & Pan de Oro con Monograma AN',
    technique: 'Kapping en polygel & Nail Art a mano alzada con pan de oro',
    finish: 'Top Coat Vitrificado Efecto Cristal',
    durability: '21 a 28 días intactas',
    description:
      'El tono bordó insignia de Aixa Nails (#6B0F24) con profundidad de esmalte vitrificado. Incluye una suave media luna nude en la cutícula, coronado con destellos dorados encapsulados y el monograma de autor AN.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Bordó AN', hex: '#6B0F24' },
      { name: 'Vino Noche', hex: '#450714' },
      { name: 'Nude Soft', hex: '#F0D6D2' },
      { name: 'Oro Pulido', hex: '#E5B869' },
    ],
    badge: 'Firma de la Casa',
    roughness: 0.08,
    metalness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    transmission: 0.08,
    iridescence: 0.18,
    sheen: 0.45,
    sheenColor: '#FFDF78',
    thickness: 0.9,
    ior: 1.54,
    attenuationColor: '#FFE2DE',
    attenuationDistance: 1.8,
    normalScale: 0.35,
  },
  {
    id: 'ojo-de-gato',
    name: 'Ojo de Gato Velvet',
    subtitle: 'Efecto magnético plateado multidimensional 9D',
    technique: 'Esmaltado magnético con imán de neodimio sobre base ahumada',
    finish: 'Terciopelo líquido y destellos de prisma reflectante',
    durability: '21+ días de brillo dinámico',
    description:
      'Pigmentos magnéticos ultra finos suspendidos que concentran un haz de luz plateada flotante con textura velvet aterciopelada. Al interactuar con la luz de salón, el destello viaja por la superficie creando un efecto 3D hipnótico.',
    recommendedServiceId: '4',
    recommendedServiceName: 'Soft gel',
    colors: [
      { name: 'Cosmos Plum', hex: '#1E0616' },
      { name: 'Plata Velvet', hex: '#E2DCE6' },
      { name: 'Lavanda Humo', hex: '#876D89' },
      { name: 'Brillo Cristal', hex: '#FFFFFF' },
    ],
    badge: 'Efecto Magnético 9D',
    roughness: 0.06,
    metalness: 0.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.12,
    iridescence: 0.95,
    sheen: 1.0,
    sheenColor: '#E2DCE6',
    thickness: 1.1,
    ior: 1.55,
    attenuationColor: '#F3E8FF',
    attenuationDistance: 1.6,
    normalScale: 0.25,
  },
  {
    id: 'francesita-soft',
    name: 'Francesita Editorial',
    subtitle: 'Base porcelana translúcida con sonrisa fina contorneada',
    technique: 'Micro-French de precisión milimétrica en bordó y ribete oro líquido',
    finish: 'Porcelana Nude & Acabado Espejo',
    durability: '21 a 25 días',
    description:
      'La manicura francesa de autor vista en las fotos reales de Aixa: base lechosa de cobertura translúcida natural rematada por un arco ultra fino de sonrisa profunda que estiliza la uña con bordó de autor y ribete dorado.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Porcelana Nude', hex: '#F6E6E4' },
      { name: 'Bordó Editorial', hex: '#6B0F24' },
      { name: 'Oro Espejo', hex: '#F5CE66' },
      { name: 'Blush Cutícula', hex: '#EBC7C4' },
    ],
    badge: 'Elegancia Minimal',
    roughness: 0.07,
    metalness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    transmission: 0.2,
    iridescence: 0.22,
    sheen: 0.5,
    sheenColor: '#FFEAA7',
    thickness: 1.0,
    ior: 1.53,
    attenuationColor: '#FFDDD8',
    attenuationDistance: 1.5,
    normalScale: 0.4,
  },
  {
    id: 'baby-boomer',
    name: 'Baby Boomer & Flakes',
    subtitle: 'Degradé lechoso suave con pan de oro encapsulado',
    technique: 'Ombré aerografiado de rosa cutícula a blanco con destellos dorados',
    finish: 'Milky Glass & Crecimiento Imperceptible',
    durability: '25+ días con acabado natural',
    description:
      'Transición suave y continua que viaja desde la base rosa translúcida en la cutícula hacia una punta blanco nube lechoso, enriquecida con destellos de pan de oro encapsulados que atrapan la luz como cuarzo pulido.',
    recommendedServiceId: '3',
    recommendedServiceName: 'Esculpidas en polygel',
    colors: [
      { name: 'Rosa Suave', hex: '#FDE8E9' },
      { name: 'Blush Nude', hex: '#F2CEC9' },
      { name: 'Blanco Lechoso', hex: '#FDFBFB' },
      { name: 'Pan de Oro', hex: '#F5D061' },
    ],
    badge: 'Clásico Atemporal',
    roughness: 0.06,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.22,
    iridescence: 0.2,
    sheen: 0.45,
    sheenColor: '#FFFFFF',
    thickness: 1.2,
    ior: 1.52,
    attenuationColor: '#FFEFEB',
    attenuationDistance: 1.7,
    normalScale: 0.3,
  },
  {
    id: 'aura-sunset',
    name: 'Aura Sunset & Estrellas',
    subtitle: 'Degradé etéreo magenta-durazno con constelaciones doradas',
    technique: 'Aura difuminada a mano alzada con micro-estrellas y pedrería',
    finish: 'Lustre Cósmico & Brillo UV Vitrificado',
    durability: '21 a 28 días',
    description:
      'Inspirado directamente en las fotos de trabajos de Aixa: aura concéntrica que funde un núcleo magenta-fucsia vibrante hacia los bordes durazno nude, coronado con estrellas doradas trazadas a mano alzada y micro-relieve.',
    recommendedServiceId: '1',
    recommendedServiceName: 'Esmaltado semipermanente',
    colors: [
      { name: 'Fucsia Aura', hex: '#DF1D7A' },
      { name: 'Peach Nude', hex: '#F8D9CE' },
      { name: 'Oro Estelar', hex: '#FAD02C' },
      { name: 'Cristal Gloss', hex: '#FFFFFF' },
    ],
    badge: 'Tendencia Editorial',
    roughness: 0.07,
    metalness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.025,
    transmission: 0.16,
    iridescence: 0.4,
    sheen: 0.8,
    sheenColor: '#FFD1E6',
    thickness: 1.0,
    ior: 1.54,
    attenuationColor: '#FFE0E5',
    attenuationDistance: 1.5,
    normalScale: 0.45,
  },
  {
    id: 'glazed-donut',
    name: 'Glazed Donut Perlado',
    subtitle: 'Brillo nacarado iridiscente satinado efecto Hailey Bieber',
    technique: 'Polvo cromado de perla frotado sobre gel semi-translúcido',
    finish: 'Perla Iridiscente & Destello Satinado',
    durability: '21 a 28 días de brillo continuo',
    description:
      'Una infusión de pigmentos perlados de micro-refracción que transforma la uña con un lustre irisado que cambia de rosa a plata champagne con el ángulo de la luz de salón, con acabado ultra liso y vitrificado.',
    recommendedServiceId: '1',
    recommendedServiceName: 'Esmaltado semipermanente',
    colors: [
      { name: 'Perla Irisada', hex: '#FFF4FD' },
      { name: 'Champagne Glazed', hex: '#F9ECE5' },
      { name: 'Rosa Nácar', hex: '#FCE7ED' },
      { name: 'Prisma Silver', hex: '#EAE6F0' },
    ],
    badge: 'Tendencia Viral',
    roughness: 0.05,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.2,
    iridescence: 0.98,
    sheen: 0.95,
    sheenColor: '#FFF4FD',
    thickness: 1.1,
    ior: 1.55,
    attenuationColor: '#FFF2F6',
    attenuationDistance: 1.8,
    normalScale: 0.2,
  },
];

/**
 * Procedural generation of a sculpted Almond nail tip based on real salon standards.
 * Features:
 * 1. Longitudinal Russian leveling apex peaking at 35% from cuticle
 * 2. Transverse C-curve (~35% arch) smoothly transitioning along the nail length
 * 3. Graceful almond perimeter taper with rounded apex tip
 * 4. Anatomical variable thickness (0.015 at cuticle up to 0.065 at apex, 0.032 at tip)
 */
export function createAlmondNailGeometry(): THREE.BufferGeometry {
  const nx = 48;
  const ny = 96;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // u: 0 = cuticle (base), 1 = free edge (tip)
  // v: -1 = left lateral margin, +1 = right lateral margin
  function getWidth(u: number): number {
    if (u < 0.2) {
      // Rounded cuticle zone: parabolic smooth curve hugging matrix
      const t = u / 0.2;
      return 0.42 + 0.58 * Math.sqrt(Math.max(0, 1 - (1 - t) ** 2));
    } else if (u <= 0.6) {
      // Lateral walls: clean, slight elegant taper
      return 1.0 - (u - 0.2) * 0.12;
    } else {
      // Almond tip taper: refined arch down to rounded tip (~0.12 width)
      const t = (u - 0.6) / 0.4;
      return (0.952 - 0.832 * Math.pow(t, 1.3)) * Math.sqrt(Math.max(0.01, 1 - t * 0.92));
    }
  }

  function getLongitudinalApex(u: number): number {
    // Peak at 35% (the mechanical stress zone in Russian leveling)
    if (u <= 0.35) {
      const t = u / 0.35;
      return 0.04 + 0.34 * Math.sin(t * Math.PI * 0.5);
    } else {
      const t = (u - 0.35) / 0.65;
      return 0.38 - 0.26 * t - 0.06 * Math.sin(t * Math.PI);
    }
  }

  function getCCurveDepth(u: number): number {
    // Transverse C-curve: flatter at cuticle (0.2), deep at apex (0.36), refined at tip (0.34)
    if (u < 0.35) {
      const t = u / 0.35;
      return 0.2 + 0.16 * t;
    } else {
      const t = (u - 0.35) / 0.65;
      return 0.36 - 0.02 * t;
    }
  }

  function getThickness(u: number): number {
    // Variable thickness: flush at cuticle (0.015), reinforced at apex (0.062), salon edge at tip (0.032)
    if (u < 0.35) {
      const t = u / 0.35;
      return 0.015 + 0.047 * t;
    } else {
      const t = (u - 0.35) / 0.65;
      return 0.062 - 0.03 * t;
    }
  }

  // Precompute vertices
  const topVerts: THREE.Vector3[][] = [];
  const botVerts: THREE.Vector3[][] = [];

  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    const w = getWidth(u);
    const zApex = getLongitudinalApex(u);
    const cCurve = getCCurveDepth(u);
    const th = getThickness(u);

    topVerts[j] = [];
    botVerts[j] = [];

    for (let i = 0; i <= nx; i++) {
      const v = (i / nx) * 2 - 1;
      const v2 = v * v;

      // Transverse arch with natural parabolic curve
      const zCurv = -v2 * (cCurve * Math.max(0.3, w)) * (1.0 + 0.12 * v2);

      const x = v * (w * 0.76);
      const y = (u - 0.44) * 3.15;
      const zTop = zApex + zCurv;
      const zBot = zTop - th;

      topVerts[j][i] = new THREE.Vector3(x, y, zTop);
      // Underside is slightly more inward for natural hollow edge
      botVerts[j][i] = new THREE.Vector3(x * 0.96, y, zBot);
    }
  }

  const vertexOffsetBottom = (ny + 1) * (nx + 1);

  // Top surface
  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    for (let i = 0; i <= nx; i++) {
      const p = topVerts[j][i];
      positions.push(p.x, p.y, p.z);
      uvs.push(i / nx, u);
    }
  }

  // Bottom surface
  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    for (let i = 0; i <= nx; i++) {
      const p = botVerts[j][i];
      positions.push(p.x, p.y, p.z);
      uvs.push(i / nx, u);
    }
  }

  // Top faces (counter-clockwise)
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = j * (nx + 1) + i;
      const b = (j + 1) * (nx + 1) + i;
      const c = (j + 1) * (nx + 1) + (i + 1);
      const d = j * (nx + 1) + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // Bottom faces (clockwise)
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = vertexOffsetBottom + j * (nx + 1) + i;
      const b = vertexOffsetBottom + (j + 1) * (nx + 1) + i;
      const c = vertexOffsetBottom + (j + 1) * (nx + 1) + (i + 1);
      const d = vertexOffsetBottom + j * (nx + 1) + (i + 1);
      indices.push(a, d, b);
      indices.push(b, d, c);
    }
  }

  // Side walls connecting top and bottom (Left edge)
  for (let j = 0; j < ny; j++) {
    const topA = j * (nx + 1);
    const topB = (j + 1) * (nx + 1);
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, botA, topB);
    indices.push(botA, botB, topB);
  }

  // Right edge
  for (let j = 0; j < ny; j++) {
    const topA = j * (nx + 1) + nx;
    const topB = (j + 1) * (nx + 1) + nx;
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, topB, botA);
    indices.push(topB, botB, botA);
  }

  // Cuticle edge (u = 0)
  for (let i = 0; i < nx; i++) {
    const topA = i;
    const topB = i + 1;
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, topB, botA);
    indices.push(topB, botB, botA);
  }

  // Free edge tip (u = 1)
  for (let i = 0; i < nx; i++) {
    const topA = ny * (nx + 1) + i;
    const topB = ny * (nx + 1) + (i + 1);
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, botA, topB);
    indices.push(botA, botB, topB);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates high-resolution 1024x1024 procedural canvas textures
 * inspired directly by Aixa's salon photographs.
 */
export function createNailTexture(designId: string): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, size, size);

  if (designId === 'vino-an') {
    // 1. Vino AN Insignia: Deep lustrous bordeaux (#6B0F24) with gold foil flakes & AN monogram
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#360511');
    grad.addColorStop(0.2, '#50091A');
    grad.addColorStop(0.55, '#6B0F24');
    grad.addColorStop(0.85, '#7B132B');
    grad.addColorStop(1, '#53081A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Natural lateral shading
    const vig = ctx.createRadialGradient(size / 2, size / 2, 220, size / 2, size / 2, 580);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(25, 2, 8, 0.48)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, size, size);

    // Translucent Cuticle Lunula
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(size / 2, size * 0.98, 270, 150, 0, 0, Math.PI * 2);
    const lunulaGrad = ctx.createRadialGradient(size / 2, size, 20, size / 2, size, 250);
    lunulaGrad.addColorStop(0, 'rgba(244, 218, 212, 0.88)');
    lunulaGrad.addColorStop(0.65, 'rgba(235, 195, 190, 0.35)');
    lunulaGrad.addColorStop(1, 'rgba(107, 15, 36, 0)');
    ctx.fillStyle = lunulaGrad;
    ctx.fill();
    ctx.restore();

    // Lunula golden micro-bead border
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size * 0.97, 250, Math.PI * 1.1, Math.PI * 1.9);
    ctx.strokeStyle = 'rgba(245, 206, 102, 0.75)';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 12]);
    ctx.stroke();
    ctx.restore();

    // Scattered gold foil flakes (pan de oro)
    for (let i = 0; i < 70; i++) {
      const px = Math.sin(i * 77.3) * 380 + size / 2;
      const py = Math.cos(i * 43.1) * 390 + size * 0.52;
      const flakeSize = (Math.sin(i * 19.1) + 1.2) * 3.5;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(i * 1.3);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 225, 140, 0.85)' : 'rgba(229, 184, 105, 0.95)';
      ctx.beginPath();
      ctx.moveTo(-flakeSize, -flakeSize * 0.6);
      ctx.lineTo(flakeSize * 1.2, -flakeSize * 0.2);
      ctx.lineTo(flakeSize * 0.8, flakeSize * 0.9);
      ctx.lineTo(-flakeSize * 0.5, flakeSize * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Central Radiant Golden Star
    const starX = size / 2;
    const starY = size * 0.46;

    const starAura = ctx.createRadialGradient(starX, starY, 5, starX, starY, 110);
    starAura.addColorStop(0, 'rgba(255, 235, 175, 0.65)');
    starAura.addColorStop(0.4, 'rgba(212, 175, 55, 0.25)');
    starAura.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = starAura;
    ctx.beginPath();
    ctx.arc(starX, starY, 110, 0, Math.PI * 2);
    ctx.fill();

    drawStar(ctx, starX, starY, 8, 56, 16, '#F8E298', '#D4AF37');

    // Cross glints
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 245, 215, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(starX - 90, starY);
    ctx.lineTo(starX + 90, starY);
    ctx.moveTo(starX, starY - 90);
    ctx.lineTo(starX, starY + 90);
    ctx.stroke();
    ctx.restore();

    // Monogram AN
    ctx.save();
    ctx.font = '600 40px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#F8E298';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.85)';
    ctx.shadowBlur = 14;
    ctx.fillText('A · N', starX, starY + 84);
    ctx.restore();
  } else if (designId === 'ojo-de-gato') {
    // 2. Ojo de Gato Velvet 9D: Silver magnetic shimmer over deep obsidian plum (photos 10 & 11)
    const grad = ctx.createRadialGradient(size / 2, size / 2, 40, size / 2, size / 2, 600);
    grad.addColorStop(0, '#28071E');
    grad.addColorStop(0.5, '#170411');
    grad.addColorStop(1, '#0C0209');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Ethereal smoky purple nebula
    const nebula = ctx.createLinearGradient(0, 0, size, size);
    nebula.addColorStop(0.2, 'rgba(95, 25, 75, 0.42)');
    nebula.addColorStop(0.5, 'rgba(135, 75, 125, 0.3)');
    nebula.addColorStop(0.8, 'rgba(50, 15, 45, 0.45)');
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, size, size);

    // Suspended magnetic silver micro-flakes (300+ particles)
    for (let i = 0; i < 320; i++) {
      const px = Math.sin(i * 88.3) * 450 + size / 2;
      const py = Math.cos(i * 61.1) * 450 + size / 2;
      const alpha = (Math.sin(i * 33.7) * 0.4 + 0.6) * 0.85;
      const r = (Math.cos(i * 19.3) + 1.2) * 1.3;
      ctx.fillStyle = i % 4 === 0 ? `rgba(255, 255, 255, ${alpha})` : `rgba(225, 210, 240, ${alpha * 0.75})`;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 9D Magnetic Velvet Cat-Eye Beam (diagonal glowing ribbon)
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-0.52);

    // Outer velvet magnetic halo
    const beamWide = ctx.createLinearGradient(-380, 0, 380, 0);
    beamWide.addColorStop(0, 'rgba(190, 165, 215, 0)');
    beamWide.addColorStop(0.32, 'rgba(220, 205, 240, 0.22)');
    beamWide.addColorStop(0.5, 'rgba(250, 245, 255, 0.52)');
    beamWide.addColorStop(0.68, 'rgba(220, 205, 240, 0.22)');
    beamWide.addColorStop(1, 'rgba(190, 165, 215, 0)');
    ctx.fillStyle = beamWide;
    ctx.fillRect(-380, -600, 760, 1200);

    // Core crisp magnetic streak
    const beamCore = ctx.createLinearGradient(-90, 0, 90, 0);
    beamCore.addColorStop(0, 'rgba(255, 255, 255, 0)');
    beamCore.addColorStop(0.38, 'rgba(255, 255, 255, 0.75)');
    beamCore.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
    beamCore.addColorStop(0.62, 'rgba(255, 255, 255, 0.75)');
    beamCore.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = beamCore;
    ctx.fillRect(-90, -600, 180, 1200);

    ctx.restore();
  } else if (designId === 'francesita-soft') {
    // 3. Francesita Editorial: Translucent nude porcelain with precision micro-french & gold foil line (photos 0, 4, 10)
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#E8C5C0');
    grad.addColorStop(0.25, '#F5DBD8');
    grad.addColorStop(0.65, '#F8E8E6');
    grad.addColorStop(1, '#FAEDED');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Depth shading on lateral margins
    const edgeShade = ctx.createLinearGradient(0, 0, size, 0);
    edgeShade.addColorStop(0, 'rgba(175, 125, 120, 0.3)');
    edgeShade.addColorStop(0.18, 'rgba(215, 175, 170, 0.08)');
    edgeShade.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
    edgeShade.addColorStop(0.82, 'rgba(215, 175, 170, 0.08)');
    edgeShade.addColorStop(1, 'rgba(175, 125, 120, 0.3)');
    ctx.fillStyle = edgeShade;
    ctx.fillRect(0, 0, size, size);

    // Cuticle natural soft crescent
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(size / 2, size * 0.98, 255, 125, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
    ctx.fill();
    ctx.restore();

    // Micro-French Tip: Deep curved smile line that hugs lateral walls
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(90, 0);
    ctx.lineTo(90, 180);
    ctx.bezierCurveTo(280, 275, 744, 275, 934, 180);
    ctx.lineTo(934, 0);
    ctx.closePath();

    // Bordeaux base tip
    const bordeauxGrad = ctx.createLinearGradient(90, 80, 934, 150);
    bordeauxGrad.addColorStop(0, '#55091C');
    bordeauxGrad.addColorStop(0.5, '#6B0F24');
    bordeauxGrad.addColorStop(1, '#450614');
    ctx.fillStyle = bordeauxGrad;
    ctx.fill();

    // Gold mirror smile line contour
    ctx.beginPath();
    ctx.moveTo(90, 180);
    ctx.bezierCurveTo(280, 275, 744, 275, 934, 180);
    ctx.strokeStyle = '#F6D365';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(90, 184);
    ctx.bezierCurveTo(280, 279, 744, 279, 934, 184);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Subtle micro-crystals accent on lateral smile line
    for (const cx of [260, 764]) {
      const cy = 245;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 8;
      ctx.fill();
    }
    ctx.restore();
  } else if (designId === 'baby-boomer') {
    // 4. Baby Boomer & Flakes: Seamless milky fade from #FDE8E9 to porcelain white + encapsulated gold flakes (photo 6)
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#E8B6AF');
    grad.addColorStop(0.2, '#F2CCC7');
    grad.addColorStop(0.42, '#FDE8E9');
    grad.addColorStop(0.68, '#FBF0F0');
    grad.addColorStop(0.88, '#FAF6F6');
    grad.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Airbrushed soft milky cloud diffusion
    ctx.save();
    const cloud = ctx.createRadialGradient(size / 2, size * 0.45, 90, size / 2, size * 0.45, 420);
    cloud.addColorStop(0, 'rgba(255, 255, 255, 0.48)');
    cloud.addColorStop(0.65, 'rgba(255, 255, 255, 0.16)');
    cloud.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = cloud;
    ctx.fillRect(0, 0, size, size);

    // Tip milky concentration
    const tipMilky = ctx.createLinearGradient(0, size * 0.36, 0, 0);
    tipMilky.addColorStop(0, 'rgba(255, 255, 255, 0)');
    tipMilky.addColorStop(0.5, 'rgba(255, 255, 255, 0.55)');
    tipMilky.addColorStop(1, 'rgba(255, 255, 255, 0.92)');
    ctx.fillStyle = tipMilky;
    ctx.fillRect(0, 0, size, size * 0.36);

    // Encapsulated golden flakes near cuticle & apex (inspired by Photo 6)
    for (let i = 0; i < 48; i++) {
      const px = Math.sin(i * 45.2) * 260 + size / 2;
      const py = Math.cos(i * 32.7) * 220 + size * 0.72;
      const flakeSize = (Math.sin(i * 14.5) + 1.2) * 2.8;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(i * 0.9);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(250, 214, 98, 0.75)' : 'rgba(235, 175, 60, 0.85)';
      ctx.beginPath();
      ctx.moveTo(-flakeSize, -flakeSize * 0.5);
      ctx.lineTo(flakeSize, -flakeSize * 0.2);
      ctx.lineTo(flakeSize * 0.6, flakeSize * 0.8);
      ctx.lineTo(-flakeSize * 0.4, flakeSize * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  } else if (designId === 'aura-sunset') {
    // 5. Aura Sunset & Estrellas: Electric magenta aura fading to peach nude + gold stars (photos 8 & 9)
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#EBBAB0');
    baseGrad.addColorStop(0.4, '#F7D7CE');
    baseGrad.addColorStop(1, '#FCE8E2');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Radiant concentric aura (vibrant magenta-fuchsia core)
    ctx.save();
    const aura = ctx.createRadialGradient(size / 2, size * 0.5, 30, size / 2, size * 0.5, 360);
    aura.addColorStop(0, 'rgba(223, 29, 122, 0.95)'); // Electric magenta core
    aura.addColorStop(0.35, 'rgba(235, 65, 145, 0.65)');
    aura.addColorStop(0.65, 'rgba(247, 130, 160, 0.3)');
    aura.addColorStop(1, 'rgba(248, 217, 206, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(size / 2, size * 0.5, 360, 0, Math.PI * 2);
    ctx.fill();

    // Hand-painted metallic gold stars and constellation dots (Photo 9)
    const stars = [
      { x: size * 0.5, y: size * 0.46, size: 48, inner: 14 },
      { x: size * 0.3, y: size * 0.25, size: 28, inner: 8 },
      { x: size * 0.72, y: size * 0.68, size: 34, inner: 10 },
      { x: size * 0.34, y: size * 0.78, size: 22, inner: 6 },
    ];

    for (const s of stars) {
      drawStar(ctx, s.x, s.y, 8, s.size, s.inner, '#FAD02C', '#D4AF37');
    }

    // Constellation micro-dots
    ctx.fillStyle = '#FAD02C';
    for (let i = 0; i < 35; i++) {
      const px = Math.sin(i * 53.1) * 320 + size / 2;
      const py = Math.cos(i * 37.9) * 360 + size * 0.5;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else {
    // 6. Glazed Donut Perlado: Chrome pearl iridescent satin luster
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#F5DCD8');
    grad.addColorStop(0.25, '#FCE8E5');
    grad.addColorStop(0.5, '#FFF2F5');
    grad.addColorStop(0.75, '#F7ECF8');
    grad.addColorStop(1, '#FFFBFD');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Opalescent sheen streaks
    ctx.save();
    const pearlGlow = ctx.createLinearGradient(0, 0, size, size);
    pearlGlow.addColorStop(0, 'rgba(255, 240, 250, 0.42)');
    pearlGlow.addColorStop(0.3, 'rgba(235, 225, 255, 0.32)');
    pearlGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
    pearlGlow.addColorStop(0.7, 'rgba(255, 245, 230, 0.38)');
    pearlGlow.addColorStop(1, 'rgba(240, 230, 255, 0.42)');
    ctx.fillStyle = pearlGlow;
    ctx.fillRect(0, 0, size, size);

    // Micro pearl shimmer dust
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    for (let i = 0; i < 200; i++) {
      const px = Math.sin(i * 73.1) * 430 + size / 2;
      const py = Math.cos(i * 51.9) * 440 + size / 2;
      const r = (Math.sin(i * 15.7) + 1.2) * 1.1;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central glazed satin light beam (diagonal soft luster)
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-0.42);
    const satinBeam = ctx.createLinearGradient(-190, 0, 190, 0);
    satinBeam.addColorStop(0, 'rgba(255, 255, 255, 0)');
    satinBeam.addColorStop(0.4, 'rgba(255, 255, 255, 0.58)');
    satinBeam.addColorStop(0.5, 'rgba(255, 255, 255, 0.88)');
    satinBeam.addColorStop(0.6, 'rgba(255, 255, 255, 0.58)');
    satinBeam.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = satinBeam;
    ctx.fillRect(-190, -600, 380, 1200);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates 512x512 procedural tangent-space normal maps
 * to provide tangible 3D micro-relief for foil, rhinestones,
 * smile lines, and hand-painted nail art.
 */
export function createNailNormalMap(designId: string): THREE.CanvasTexture {
  const size = 512;
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = size;
  heightCanvas.height = size;
  const hCtx = heightCanvas.getContext('2d');

  if (!hCtx) {
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = 16;
    fallbackCanvas.height = 16;
    const fCtx = fallbackCanvas.getContext('2d');
    if (fCtx) {
      fCtx.fillStyle = '#8080ff';
      fCtx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(fallbackCanvas);
  }

  // Base neutral height: 128 (flat zero relief)
  hCtx.fillStyle = '#808080';
  hCtx.fillRect(0, 0, size, size);

  if (designId === 'vino-an') {
    // Foil flakes crinkle & AN star emboss
    for (let i = 0; i < 70; i++) {
      const px = (Math.sin(i * 77.3) * 380 + 1024 / 2) * (size / 1024);
      const py = (Math.cos(i * 43.1) * 390 + 1024 * 0.52) * (size / 1024);
      hCtx.fillStyle = i % 2 === 0 ? '#989898' : '#707070';
      hCtx.beginPath();
      hCtx.arc(px, py, 4, 0, Math.PI * 2);
      hCtx.fill();
    }

    const starX = size / 2;
    const starY = size * 0.46;
    drawStar(hCtx, starX, starY, 8, 28, 8, '#b5b5b5', '#ffffff');

    // Lunula bead relief
    hCtx.save();
    hCtx.beginPath();
    hCtx.arc(size / 2, size * 0.97, 125, Math.PI * 1.1, Math.PI * 1.9);
    hCtx.strokeStyle = '#a0a0a0';
    hCtx.lineWidth = 3;
    hCtx.stroke();
    hCtx.restore();
  } else if (designId === 'francesita-soft') {
    // French smile line gel step relief
    hCtx.save();
    const scale = size / 1024;
    hCtx.beginPath();
    hCtx.moveTo(90 * scale, 180 * scale);
    hCtx.bezierCurveTo(280 * scale, 275 * scale, 744 * scale, 275 * scale, 934 * scale, 180 * scale);
    hCtx.strokeStyle = '#a8a8a8';
    hCtx.lineWidth = 5;
    hCtx.stroke();

    // Rhinestones 3D dome
    for (const cx of [260 * scale, 764 * scale]) {
      const cy = 245 * scale;
      const grad = hCtx.createRadialGradient(cx, cy, 0, cx, cy, 6);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.7, '#cccccc');
      grad.addColorStop(1, '#808080');
      hCtx.fillStyle = grad;
      hCtx.beginPath();
      hCtx.arc(cx, cy, 6, 0, Math.PI * 2);
      hCtx.fill();
    }
    hCtx.restore();
  } else if (designId === 'aura-sunset') {
    // 3D stars relief
    const scale = size / 1024;
    const stars = [
      { x: size * 0.5, y: size * 0.46, size: 24, inner: 7 },
      { x: size * 0.3, y: size * 0.25, size: 14, inner: 4 },
      { x: size * 0.72, y: size * 0.68, size: 17, inner: 5 },
    ];
    for (const s of stars) {
      drawStar(hCtx, s.x, s.y, 8, s.size, s.inner, '#c0c0c0', '#ffffff');
    }
  }

  // Convert height map to tangent normal map using Sobel operator
  const hData = hCtx.getImageData(0, 0, size, size);
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = size;
  normalCanvas.height = size;
  const nCtx = normalCanvas.getContext('2d')!;
  const nData = nCtx.createImageData(size, size);

  const getH = (x: number, y: number) => {
    const clX = Math.max(0, Math.min(size - 1, x));
    const clY = Math.max(0, Math.min(size - 1, y));
    return hData.data[(clY * size + clX) * 4] / 255.0;
  };

  const strength = 1.8;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = (getH(x + 1, y) - getH(x - 1, y)) * 0.5;
      const dy = (getH(x, y + 1) - getH(x, y - 1)) * 0.5;

      const nx = -dx * strength;
      const ny = -dy * strength;
      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      nData.data[idx] = Math.floor(((nx / len) * 0.5 + 0.5) * 255);
      nData.data[idx + 1] = Math.floor(((ny / len) * 0.5 + 0.5) * 255);
      nData.data[idx + 2] = Math.floor(((nz / len) * 0.5 + 0.5) * 255);
      nData.data[idx + 3] = 255;
    }
  }

  nCtx.putImageData(nData, 0, 0);
  const normalTexture = new THREE.CanvasTexture(normalCanvas);
  normalTexture.needsUpdate = true;
  return normalTexture;
}

/**
 * Creates an Equirectangular Salon Environment Map with
 * a real Manicurist Ring Light, key overhead softbox,
 * and warm interior bounce for physically accurate clearcoat reflections.
 */
export function createSalonStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm luxury salon ambient gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#f5efec');
  bgGrad.addColorStop(0.5, '#eee4e0');
  bgGrad.addColorStop(1, '#dfd5d2');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // 1. Manicurist Ring Light (crisp circular ring reflection directly in front of nail)
  const ringX = 512;
  const ringY = 220;
  ctx.save();
  ctx.beginPath();
  ctx.arc(ringX, ringY, 78, 0, Math.PI * 2);
  ctx.lineWidth = 26;
  ctx.strokeStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 45;
  ctx.stroke();

  // Ring light inner soft glow
  ctx.beginPath();
  ctx.arc(ringX, ringY, 58, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 252, 250, 0.45)';
  ctx.fill();
  ctx.restore();

  // 2. Salon overhead softbox
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 50;
  ctx.fillRect(390, 20, 244, 70);
  ctx.restore();

  // 3. Warm soft fill diffusers (Left & Right)
  ctx.save();
  ctx.fillStyle = 'rgba(255, 225, 215, 0.45)';
  ctx.shadowColor = '#ffdfd8';
  ctx.shadowBlur = 60;
  ctx.beginPath();
  ctx.ellipse(140, 260, 65, 150, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(884, 260, 65, 150, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const renderTarget = pmremGenerator.fromEquirectangular(texture);
  texture.dispose();
  pmremGenerator.dispose();

  return renderTarget;
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  fillColor: string,
  strokeColor: string
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }

  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
