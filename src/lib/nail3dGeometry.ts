import * as THREE from 'three';
import { NailDesign } from '@/types/showcase3d';

export const NAIL_DESIGNS: NailDesign[] = [
  {
    id: 'francesita-clasica',
    name: 'Francesita Clásica',
    subtitle: 'Base porcelana translúcida con punta blanca arqueada',
    technique: 'Esmaltado semipermanente con micro-french',
    finish: 'Brillo satinado natural de salón',
    durability: '21 a 28 días',
    description:
      'El clásico por excelencia visto en los trabajos del salón: base nude porcelana suave y lechosa que estiliza la mano, rematada por una sonrisa francesa blanca limpia y de trazo simétrico.',
    recommendedServiceId: '1',
    recommendedServiceName: 'Esmaltado semipermanente',
    colors: [
      { name: 'Nude Porcelana', hex: '#F3DDD8' },
      { name: 'Blanco Puro', hex: '#FFFFFF' },
    ],
    badge: 'Clásico de Salón',
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.18,
    clearcoatRoughness: 0.3,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.1,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'bordo-pleno',
    name: 'Bordó Pleno',
    subtitle: 'Esmaltado liso en tono vino profundo uniforme',
    technique: 'Esmaltado semipermanente o Kapping en polygel',
    finish: 'Brillo uniforme de cobertura plena',
    durability: '21 a 28 días',
    description:
      'Tono bordó vino sólido (#6B0F24) con cobertura total y uniforme en toda la uña. Un diseño sobrio, atemporal y sofisticado presente en los esmaltados lisos de Aixa.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Bordó Vino', hex: '#6B0F24' },
      { name: 'Vino Profundo', hex: '#4D0818' },
    ],
    badge: 'Color Insignia',
    roughness: 0.28,
    metalness: 0.0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.28,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.1,
    sheenColor: '#6B0F24',
  },
  {
    id: 'nude-porcelana',
    name: 'Nude Porcelana',
    subtitle: 'Tono nude lechoso limpio y translúcido',
    technique: 'Kapping en polygel o base niveladora',
    finish: 'Acabado suave natural no invasivo',
    durability: '21 a 25 días',
    description:
      'Tono nude rosado suave y lechoso que unifica el lecho de la uña con elegancia discreta. Destaca por su apariencia limpia, fresca y prolija para uso diario.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Nude Suave', hex: '#EED5CF' },
      { name: 'Porcelana Soft', hex: '#F7E6E2' },
    ],
    badge: 'Elegancia Natural',
    roughness: 0.32,
    metalness: 0.0,
    clearcoat: 0.15,
    clearcoatRoughness: 0.35,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.1,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'baby-boomer',
    name: 'Baby Boomer Suave',
    subtitle: 'Degradé difuminado de rosa natural a punta blanca lechosa',
    technique: 'Ombré difuminado sobre base rosada',
    finish: 'Degradé continuo y satinado',
    durability: '25+ días con crecimiento imperceptible',
    description:
      'Transición suave y continua que viaja desde la cutícula rosa natural hacia el borde libre en blanco lechoso difuso, logrando un degradé limpio y sin cortes.',
    recommendedServiceId: '3',
    recommendedServiceName: 'Esculpidas en polygel',
    colors: [
      { name: 'Rosa Cutícula', hex: '#ECC7C0' },
      { name: 'Blanco Lechoso', hex: '#FAF7F5' },
    ],
    badge: 'Degradé Clásico',
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.18,
    clearcoatRoughness: 0.32,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.1,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'francesita-negra',
    name: 'Francesita Doble Negra',
    subtitle: 'Base nude natural con doble trazo fino en negro azabache',
    technique: 'Nail Art lineal de precisión a mano alzada',
    finish: 'Líneas nítidas sobre base satinada',
    durability: '21 a 28 días',
    description:
      'Inspirado directamente en las fotos del salón: base nude limpia combinada con un arco francés negro en la punta y un trazo interior curvo que estiliza el contorno de la uña.',
    recommendedServiceId: '1',
    recommendedServiceName: 'Esmaltado semipermanente',
    colors: [
      { name: 'Nude Base', hex: '#EED6D0' },
      { name: 'Negro Azabache', hex: '#1C1C1C' },
    ],
    badge: 'Diseño Editorial',
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.18,
    clearcoatRoughness: 0.3,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.1,
    sheenColor: '#FFFFFF',
  },
];

/**
 * Procedural generation of a clean salon almond nail tip.
 * Proportioned naturally with soft transverse curvature and smooth apex.
 */
export function createAlmondNailGeometry(): THREE.BufferGeometry {
  const nx = 40;
  const ny = 80;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  function getWidth(u: number): number {
    if (u < 0.2) {
      const t = u / 0.2;
      return 0.5 + 0.5 * Math.sqrt(Math.max(0, 1 - (1 - t) ** 2));
    } else if (u <= 0.62) {
      return 1.0 - (u - 0.2) * 0.1;
    } else {
      const t = (u - 0.62) / 0.38;
      return (0.958 - 0.82 * Math.pow(t, 1.25)) * Math.sqrt(Math.max(0.01, 1 - t * 0.9));
    }
  }

  function getApex(u: number): number {
    if (u <= 0.36) {
      const t = u / 0.36;
      return 0.05 + 0.28 * Math.sin(t * Math.PI * 0.5);
    } else {
      const t = (u - 0.36) / 0.64;
      return 0.33 - 0.24 * t;
    }
  }

  function getThickness(u: number): number {
    if (u < 0.36) {
      const t = u / 0.36;
      return 0.02 + 0.035 * t;
    } else {
      const t = (u - 0.36) / 0.64;
      return 0.055 - 0.025 * t;
    }
  }

  const topVerts: THREE.Vector3[][] = [];
  const botVerts: THREE.Vector3[][] = [];

  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    const w = getWidth(u);
    const zApex = getApex(u);
    const th = getThickness(u);

    topVerts[j] = [];
    botVerts[j] = [];

    for (let i = 0; i <= nx; i++) {
      const v = (i / nx) * 2 - 1;
      const v2 = v * v;

      // Soft natural transverse C-curve (0.28 depth)
      const zCurve = -v2 * (0.28 * Math.max(0.35, w));

      const x = v * (w * 0.75);
      const y = (u - 0.45) * 3.1;
      const zTop = zApex + zCurve;
      const zBot = zTop - th;

      topVerts[j][i] = new THREE.Vector3(x, y, zTop);
      botVerts[j][i] = new THREE.Vector3(x * 0.97, y, zBot);
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

  // Top faces
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

  // Bottom faces
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

  // Side walls
  for (let j = 0; j < ny; j++) {
    const topA = j * (nx + 1);
    const topB = (j + 1) * (nx + 1);
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, botA, topB);
    indices.push(botA, botB, topB);
  }

  for (let j = 0; j < ny; j++) {
    const topA = j * (nx + 1) + nx;
    const topB = (j + 1) * (nx + 1) + nx;
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, topB, botA);
    indices.push(topB, botB, botA);
  }

  // Cuticle edge
  for (let i = 0; i < nx; i++) {
    const topA = i;
    const topB = i + 1;
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, topB, botA);
    indices.push(botA, botB, botA);
  }

  // Free edge tip
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
 * Creates clean, faithful 1024x1024 2D textures directly matching Aixa's salon photos.
 * Free of artificial glares, noise, or exaggerated reflections.
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

  if (designId === 'francesita-clasica') {
    // 1. Francesita Clásica: Base nude porcelana suave con punta francesa blanca
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#E8CAC3');
    baseGrad.addColorStop(0.3, '#F2DDD8');
    baseGrad.addColorStop(0.7, '#F7E7E3');
    baseGrad.addColorStop(1, '#FAEDED');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Cuticle natural soft lunula
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(size / 2, size * 0.98, 230, 110, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fill();
    ctx.restore();

    // Pure white French tip (clean arched smile line)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, 0);
    ctx.lineTo(80, 190);
    ctx.bezierCurveTo(270, 280, 754, 280, 944, 190);
    ctx.lineTo(944, 0);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();
  } else if (designId === 'bordo-pleno') {
    // 2. Bordó Pleno: Esmaltado liso en vino bordeaux sólido (#6B0F24)
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#4B0716');
    baseGrad.addColorStop(0.2, '#590B1C');
    baseGrad.addColorStop(0.5, '#6B0F24');
    baseGrad.addColorStop(0.85, '#6F1026');
    baseGrad.addColorStop(1, '#5B0C1E');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Subtle edge shading for realistic curvature
    const edgeShade = ctx.createLinearGradient(0, 0, size, 0);
    edgeShade.addColorStop(0, 'rgba(30, 2, 8, 0.28)');
    edgeShade.addColorStop(0.12, 'rgba(0, 0, 0, 0)');
    edgeShade.addColorStop(0.88, 'rgba(0, 0, 0, 0)');
    edgeShade.addColorStop(1, 'rgba(30, 2, 8, 0.28)');
    ctx.fillStyle = edgeShade;
    ctx.fillRect(0, 0, size, size);
  } else if (designId === 'nude-porcelana') {
    // 3. Nude Porcelana: Tono lechoso natural translúcido
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#E4C3BC');
    baseGrad.addColorStop(0.3, '#EED4CE');
    baseGrad.addColorStop(0.7, '#F6E5E1');
    baseGrad.addColorStop(1, '#FAEFEA');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Soft natural lunula
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(size / 2, size * 0.98, 220, 100, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
    ctx.restore();
  } else if (designId === 'baby-boomer') {
    // 4. Baby Boomer: Degradé suave de rosa natural a punta blanca lechosa
    const ombré = ctx.createLinearGradient(0, size, 0, 0);
    ombré.addColorStop(0, '#E5B8B0');
    ombré.addColorStop(0.25, '#ECC7C0');
    ombré.addColorStop(0.48, '#F4DAD4');
    ombré.addColorStop(0.72, '#F9EBE8');
    ombré.addColorStop(0.9, '#FAF6F4');
    ombré.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = ombré;
    ctx.fillRect(0, 0, size, size);

    // Soft milky tip diffusion
    ctx.save();
    const tipGrad = ctx.createLinearGradient(0, size * 0.42, 0, 0);
    tipGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    tipGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
    tipGrad.addColorStop(1, 'rgba(255, 255, 255, 0.92)');
    ctx.fillStyle = tipGrad;
    ctx.fillRect(0, 0, size, size * 0.42);
    ctx.restore();
  } else {
    // 5. Francesita Doble Negra: Base nude natural con doble trazo fino negro (Foto 20240830_194122.jpg)
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#E4C5BD');
    baseGrad.addColorStop(0.3, '#EED5CF');
    baseGrad.addColorStop(0.7, '#F7E7E3');
    baseGrad.addColorStop(1, '#FAEDED');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Black French tip
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, 0);
    ctx.lineTo(80, 175);
    ctx.bezierCurveTo(270, 265, 754, 265, 944, 175);
    ctx.lineTo(944, 0);
    ctx.closePath();
    ctx.fillStyle = '#181818';
    ctx.fill();

    // Inner parallel black contour line
    ctx.beginPath();
    ctx.moveTo(110, 215);
    ctx.bezierCurveTo(290, 315, 734, 315, 914, 215);
    ctx.strokeStyle = '#181818';
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
