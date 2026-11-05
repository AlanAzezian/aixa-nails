import * as THREE from 'three';
import { NailDesign } from '@/types/showcase3d';

export const NAIL_DESIGNS: NailDesign[] = [
  {
    id: 'francesita-clasica',
    name: 'Francesita Clásica',
    subtitle: 'Base nude porcelana con punta blanca arqueada',
    shape: 'Almendra',
    technique: 'Esmaltado semipermanente con micro-french',
    finish: 'Brillo satinado natural de salón',
    durability: '21 a 28 días',
    description:
      'El clásico indiscutido visto en los trabajos del salón: base nude porcelana lechosa que estiliza la mano con una sonrisa francesa blanca pura y arqueada con máxima prolijidad.',
    recommendedServiceId: '1',
    recommendedServiceName: 'Esmaltado semipermanente',
    colors: [
      { name: 'Nude Porcelana', hex: '#F2DDD8' },
      { name: 'Blanco Puro', hex: '#FFFFFF' },
    ],
    badge: 'Clásico de Salón',
    roughness: 0.36,
    metalness: 0.0,
    clearcoat: 0.12,
    clearcoatRoughness: 0.35,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.05,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'bordo-pleno',
    name: 'Bordó Pleno',
    subtitle: 'Esmaltado liso en tono vino profundo uniforme',
    shape: 'Almendra',
    technique: 'Esmaltado semipermanente o Kapping en polygel',
    finish: 'Cobertura plena y uniforme',
    durability: '21 a 28 días',
    description:
      'Tono bordó vino sólido (#6B0F24) con cobertura total y pareja en toda la superficie. Un color icónico, sobrio y atemporal presente en los esmaltados lisos de Aixa.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Bordó Vino', hex: '#6B0F24' },
      { name: 'Vino Profundo', hex: '#4D0818' },
    ],
    badge: 'Color Insignia',
    roughness: 0.34,
    metalness: 0.0,
    clearcoat: 0.14,
    clearcoatRoughness: 0.32,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.05,
    sheenColor: '#6B0F24',
  },
  {
    id: 'nude-porcelana',
    name: 'Nude Porcelana / Vía Láctea',
    subtitle: 'Tono nude lechoso translúcido y natural',
    shape: 'Ovalada',
    technique: 'Kapping en polygel o base niveladora',
    finish: 'Acabado suave y limpio de salón',
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
    roughness: 0.38,
    metalness: 0.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.38,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.05,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'baby-boomer',
    name: 'Baby Boomer Suave',
    subtitle: 'Degradé difuminado de rosa a blanco lechoso',
    shape: 'Almendra',
    technique: 'Ombré difuminado sobre base rosada',
    finish: 'Degradé continuo y satinado',
    durability: '25+ días con crecimiento imperceptible',
    description:
      'Transición suave y continua que viaja desde la cutícula rosa natural hacia la punta en blanco lechoso difuso, logrando un degradé limpio y sin cortes.',
    recommendedServiceId: '3',
    recommendedServiceName: 'Esculpidas en polygel',
    colors: [
      { name: 'Rosa Cutícula', hex: '#ECC7C0' },
      { name: 'Blanco Lechoso', hex: '#FAF7F5' },
    ],
    badge: 'Degradé Clásico',
    roughness: 0.36,
    metalness: 0.0,
    clearcoat: 0.12,
    clearcoatRoughness: 0.35,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.05,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'francesita-negra',
    name: 'Francesita Doble Negra',
    subtitle: 'Base nude natural con doble trazo fino en negro azabache',
    shape: 'Almendra',
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
    roughness: 0.35,
    metalness: 0.0,
    clearcoat: 0.12,
    clearcoatRoughness: 0.35,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.05,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'ojo-de-gato',
    name: 'Ojo de Gato Velvet',
    subtitle: 'Tono ciruela ahumado con destello magnético plata suave',
    shape: 'Almendra',
    technique: 'Esmaltado magnético con imán de salón',
    finish: 'Terciopelo líquido suave',
    durability: '21 a 28 días',
    description:
      'Esmaltado magnético con pigmentos plateados ultra finos que concentran un haz de luz suave y aterciopelado sobre fondo ciruela oscuro, visto en las fotos de Aixa.',
    recommendedServiceId: '4',
    recommendedServiceName: 'Soft gel',
    colors: [
      { name: 'Ciruela Oscuro', hex: '#26081E' },
      { name: 'Plata Velvet', hex: '#DCD8E2' },
    ],
    badge: 'Efecto Magnético',
    roughness: 0.32,
    metalness: 0.15,
    clearcoat: 0.15,
    clearcoatRoughness: 0.3,
    transmission: 0.0,
    iridescence: 0.05,
    sheen: 0.2,
    sheenColor: '#DCD8E2',
  },
  {
    id: 'rojo-clasico',
    name: 'Rojo Clásico Salón',
    subtitle: 'Rojo carmín vivo y homogéneo',
    shape: 'Cuadrado Redondeado',
    technique: 'Esmaltado semipermanente clásico',
    finish: 'Brillo cremoso de alta cobertura',
    durability: '21 a 25 días',
    description:
      'Rojo vivo de salón clásico, con acabado liso, pigmentación intensa y perfilado prolijo en el área de cutícula para unas manos protagonistas.',
    recommendedServiceId: '1',
    recommendedServiceName: 'Esmaltado semipermanente',
    colors: [
      { name: 'Rojo Carmín', hex: '#C51824' },
      { name: 'Rojo Fuego', hex: '#E02632' },
    ],
    badge: 'Clásico Atemporal',
    roughness: 0.34,
    metalness: 0.0,
    clearcoat: 0.14,
    clearcoatRoughness: 0.32,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.05,
    sheenColor: '#C51824',
  },
  {
    id: 'baby-boomer-gold',
    name: 'Baby Boomer & Pan de Oro',
    subtitle: 'Degradé lechoso con micro-copos dorados en cutícula',
    shape: 'Almendra',
    technique: 'Ombré con encapsulado sutil de foil',
    finish: 'Milky glass con destellos suaves',
    durability: '25+ días',
    description:
      'Base degradé lechosa suave enriquecida con delicados micro-copos de pan de oro encapsulados cerca del nacimiento de la uña, aportando un toque cálido y sutil.',
    recommendedServiceId: '3',
    recommendedServiceName: 'Esculpidas en polygel',
    colors: [
      { name: 'Nude Rosa', hex: '#EAC1B8' },
      { name: 'Blanco Nube', hex: '#FAF7F5' },
      { name: 'Pan de Oro', hex: '#E8BE58' },
    ],
    badge: 'Detalle de Autor',
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.14,
    clearcoatRoughness: 0.34,
    transmission: 0.0,
    iridescence: 0.0,
    sheen: 0.08,
    sheenColor: '#E8BE58',
  },
];

/**
 * Procedural generation of a clean, solid, closed salon Almond nail tip
 * modeled strictly according to professional nail anatomy and the shape infographic:
 * 1. Curved, clean cuticle base matching natural nail matrix
 * 2. Parallel lateral walls near base with gentle taper from stress zone
 * 3. Convex, rounded almond tip (NOT a pointed cone nor triangular)
 * 4. Solid closed geometry with top surface, bottom concave surface, and beveled perimeter walls
 * 5. Natural 25-28% transverse C-curve arch
 */
export function createAlmondNailGeometry(): THREE.BufferGeometry {
  const nx = 40;
  const ny = 80;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // u: 0 (cuticle) to 1 (free edge tip)
  // v: -1 (left margin) to +1 (right margin)
  function getWidth(u: number): number {
    if (u < 0.22) {
      // Rounded cuticle zone following natural nail fold
      const t = u / 0.22;
      return 0.62 + 0.38 * Math.sqrt(Math.max(0, 1 - (1 - t) ** 2));
    } else if (u <= 0.58) {
      // Parallel lateral walls with subtle elegant taper
      return 1.0 - (u - 0.22) * 0.08;
    } else {
      // Almond tip taper ending in a gentle rounded tip (width ~0.36 of max width)
      const t = (u - 0.58) / 0.42;
      return (0.97 - 0.61 * Math.pow(t, 1.35)) * Math.sqrt(Math.max(0.01, 1 - t * 0.65));
    }
  }

  function getLongitudinalApex(u: number): number {
    // Natural salon apex elevation (peaking gently at 36% from cuticle)
    if (u <= 0.36) {
      const t = u / 0.36;
      return 0.06 + 0.22 * Math.sin(t * Math.PI * 0.5);
    } else {
      const t = (u - 0.36) / 0.64;
      return 0.28 - 0.2 * t;
    }
  }

  function getThickness(u: number): number {
    // Physical variable thickness: thin at cuticle, reinforced at apex, clean tip edge
    return 0.02 + 0.025 * Math.sin(Math.PI * Math.min(1, u * 1.2));
  }

  const topVerts: THREE.Vector3[][] = [];
  const botVerts: THREE.Vector3[][] = [];

  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    const w = getWidth(u);
    const zApex = getLongitudinalApex(u);
    const th = getThickness(u);

    topVerts[j] = [];
    botVerts[j] = [];

    // Additional convex curvature for the tip to ensure a smooth almond round contour
    const tipConvexity = u > 0.6 ? Math.pow((u - 0.6) / 0.4, 2) * 0.12 : 0;

    for (let i = 0; i <= nx; i++) {
      const v = (i / nx) * 2 - 1;
      const v2 = v * v;

      // Natural 25-28% transverse C-curve
      const zCurve = -v2 * (0.24 * Math.max(0.35, w));

      const x = v * (w * 0.74);
      const y = (u - 0.45) * 3.1 - tipConvexity * v2;
      const zTop = zApex + zCurve;
      const zBot = zTop - th;

      topVerts[j][i] = new THREE.Vector3(x, y, zTop);
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

  // Bottom surface (underside of the tip)
  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    for (let i = 0; i <= nx; i++) {
      const p = botVerts[j][i];
      positions.push(p.x, p.y, p.z);
      uvs.push(i / nx, u * 0.3);
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

  // Side perimeter walls - Left edge
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
    indices.push(botA, botB, botA);
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
    ctx.moveTo(70, 0);
    ctx.lineTo(70, 190);
    ctx.bezierCurveTo(270, 280, 754, 280, 954, 190);
    ctx.lineTo(954, 0);
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
    edgeShade.addColorStop(0, 'rgba(30, 2, 8, 0.25)');
    edgeShade.addColorStop(0.12, 'rgba(0, 0, 0, 0)');
    edgeShade.addColorStop(0.88, 'rgba(0, 0, 0, 0)');
    edgeShade.addColorStop(1, 'rgba(30, 2, 8, 0.25)');
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
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
  } else if (designId === 'francesita-negra') {
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
    ctx.moveTo(70, 0);
    ctx.lineTo(70, 175);
    ctx.bezierCurveTo(270, 265, 754, 265, 954, 175);
    ctx.lineTo(954, 0);
    ctx.closePath();
    ctx.fillStyle = '#181818';
    ctx.fill();

    // Inner parallel black contour line
    ctx.beginPath();
    ctx.moveTo(100, 215);
    ctx.bezierCurveTo(290, 315, 734, 315, 924, 215);
    ctx.strokeStyle = '#181818';
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();
  } else if (designId === 'ojo-de-gato') {
    // 6. Ojo de Gato Velvet: Fondo ciruela ahumado con haz plateado suave
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#1C0515');
    baseGrad.addColorStop(0.3, '#2A0821');
    baseGrad.addColorStop(0.7, '#350C29');
    baseGrad.addColorStop(1, '#200518');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Diagonal soft magnetic beam
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-0.52);

    const beam = ctx.createLinearGradient(-180, 0, 180, 0);
    beam.addColorStop(0, 'rgba(215, 205, 230, 0)');
    beam.addColorStop(0.4, 'rgba(225, 218, 235, 0.4)');
    beam.addColorStop(0.5, 'rgba(250, 246, 255, 0.85)');
    beam.addColorStop(0.6, 'rgba(225, 218, 235, 0.4)');
    beam.addColorStop(1, 'rgba(215, 205, 230, 0)');
    ctx.fillStyle = beam;
    ctx.fillRect(-180, -600, 360, 1200);
    ctx.restore();
  } else if (designId === 'rojo-clasico') {
    // 7. Rojo Clásico Salón: Tono rojo carmín vibrante y sólido
    const baseGrad = ctx.createLinearGradient(0, size, 0, 0);
    baseGrad.addColorStop(0, '#9E0E18');
    baseGrad.addColorStop(0.2, '#B8141F');
    baseGrad.addColorStop(0.55, '#C51824');
    baseGrad.addColorStop(0.85, '#D31E2A');
    baseGrad.addColorStop(1, '#B0121D');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Subtle edge shading
    const edgeShade = ctx.createLinearGradient(0, 0, size, 0);
    edgeShade.addColorStop(0, 'rgba(40, 2, 5, 0.22)');
    edgeShade.addColorStop(0.12, 'rgba(0, 0, 0, 0)');
    edgeShade.addColorStop(0.88, 'rgba(0, 0, 0, 0)');
    edgeShade.addColorStop(1, 'rgba(40, 2, 5, 0.22)');
    ctx.fillStyle = edgeShade;
    ctx.fillRect(0, 0, size, size);
  } else {
    // 8. Baby Boomer & Pan de Oro: Degradé lechoso suave con copos dorados en cutícula
    const ombré = ctx.createLinearGradient(0, size, 0, 0);
    ombré.addColorStop(0, '#E5B8B0');
    ombré.addColorStop(0.25, '#ECC7C0');
    ombré.addColorStop(0.5, '#F4DAD4');
    ombré.addColorStop(0.75, '#F9EBE8');
    ombré.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = ombré;
    ctx.fillRect(0, 0, size, size);

    // Soft milky tip
    const tipGrad = ctx.createLinearGradient(0, size * 0.4, 0, 0);
    tipGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    tipGrad.addColorStop(1, 'rgba(255, 255, 255, 0.88)');
    ctx.fillStyle = tipGrad;
    ctx.fillRect(0, 0, size, size * 0.4);

    // Encapsulated golden micro flakes near cuticle
    for (let i = 0; i < 28; i++) {
      const px = Math.sin(i * 37.1) * 220 + size / 2;
      const py = Math.cos(i * 29.3) * 160 + size * 0.78;
      const flakeSize = (Math.sin(i * 12.3) + 1.2) * 2.4;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(i * 0.8);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(235, 190, 88, 0.85)' : 'rgba(245, 210, 110, 0.75)';
      ctx.beginPath();
      ctx.moveTo(-flakeSize, -flakeSize * 0.6);
      ctx.lineTo(flakeSize, -flakeSize * 0.3);
      ctx.lineTo(flakeSize * 0.7, flakeSize * 0.8);
      ctx.lineTo(-flakeSize * 0.4, flakeSize * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
