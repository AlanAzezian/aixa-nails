import * as THREE from 'three';

export interface Nail3DStyle {
  id: string;
  name: string;
  subtitle: string;
  shape: string;
  badge: string;
  recommendedServiceId: string;
  colors: { name: string; hex: string }[];
  description: string;
  durability: string;
}

export const NAIL_3D_STYLES: Nail3DStyle[] = [
  {
    id: 'vino-an',
    name: 'Vino AN',
    subtitle: 'Bordó profundo de autor (#6B0F24) con monograma y microdestellos dorados',
    shape: 'Almendra',
    badge: 'Edición de Autor',
    recommendedServiceId: '2',
    colors: [
      { name: 'Bordó Vino', hex: '#6B0F24' },
      { name: 'Oro Imperial', hex: '#D4AF37' },
    ],
    description:
      'Tono insignia de Aixa Nails: fondo vino borgoña profundo con el monograma "AN" en oro fino sobre la cutícula y micropartículas doradas encapsuladas.',
    durability: '25 a 30 días',
  },
  {
    id: 'ojo-de-gato',
    name: 'Ojo de Gato',
    subtitle: 'Efecto magnético plateado terciopelo sobre base ciruela oscuro',
    shape: 'Almendra',
    badge: 'Efecto Magnético',
    recommendedServiceId: '4',
    colors: [
      { name: 'Ciruela Profundo', hex: '#26081E' },
      { name: 'Plata Magnética', hex: '#E2DFEB' },
    ],
    description:
      'Esmalte magnético con haz de luz plateada multidimensional que se desliza y reacciona suavemente con el movimiento de cámara.',
    durability: '21 a 28 días',
  },
  {
    id: 'francesita-clasica',
    name: 'Francesita Clásica',
    subtitle: 'Base nude translúcida con sonrisa blanca arqueada de salón',
    shape: 'Almendra',
    badge: 'Clásico de Salón',
    recommendedServiceId: '1',
    colors: [
      { name: 'Nude Porcelana', hex: '#F2DDD8' },
      { name: 'Blanco Puro', hex: '#FFFFFF' },
    ],
    description:
      'La manicura francesa insuperable: lecho nude lechoso limpio y sonrisa francesa blanca arqueada con simetría milimétrica.',
    durability: '21 a 28 días',
  },
  {
    id: 'baby-boomer',
    name: 'Baby Boomer',
    subtitle: 'Degradé lechoso continuo de rosa suave a blanco marfil',
    shape: 'Almendra',
    badge: 'Degradé Suave',
    recommendedServiceId: '3',
    colors: [
      { name: 'Rosa Pétalo', hex: '#ECC7C0' },
      { name: 'Blanco Lechoso', hex: '#FAF7F5' },
    ],
    description:
      'Transición suave y difusa sin saltos visibles, viajando desde la cutícula rosada natural hasta una punta en blanco lechoso satinado.',
    durability: '25+ días con crecimiento imperceptible',
  },
  {
    id: 'via-lactea',
    name: 'Vía Láctea / Nude natural',
    subtitle: 'Tono translúcido lechoso y limpio con brillo porcelana',
    shape: 'Ovalada',
    badge: 'Elegancia Natural',
    recommendedServiceId: '2',
    colors: [
      { name: 'Nude Porcelana', hex: '#F7E6E2' },
      { name: 'Lechoso Soft', hex: '#FBF2EF' },
    ],
    description:
      'Esmaltado nude porcelana translúcido de aspecto fresco, ultra prolijo y pulido, ideal para manos estilizadas con discreción.',
    durability: '21 a 25 días',
  },
  {
    id: 'francesita-negra',
    name: 'Francesita Doble Negra',
    subtitle: 'Base nude porcelana con doble trazo fino en negro azabache',
    shape: 'Almendra',
    badge: 'Diseño Editorial',
    recommendedServiceId: '1',
    colors: [
      { name: 'Nude Base', hex: '#EED6D0' },
      { name: 'Negro Azabache', hex: '#1C1C1C' },
    ],
    description:
      'Diseño moderno de alta precisión: sonrisa francesa negra arqueada con línea interna de contorno minimalista.',
    durability: '21 a 28 días',
  },
  {
    id: 'rojo-clasico',
    name: 'Rojo Clásico Salón',
    subtitle: 'Rojo carmín vivo con cobertura uniforme y brillo cremoso',
    shape: 'Almendra',
    badge: 'Atemporal',
    recommendedServiceId: '1',
    colors: [
      { name: 'Rojo Carmín', hex: '#C51824' },
      { name: 'Rojo Fuego', hex: '#DF2532' },
    ],
    description:
      'Pigmento rojo puro de alto impacto, perfilado milimétrico en cutícula y esmaltado con brillo espejo duradero.',
    durability: '21 a 28 días',
  },
];

/**
 * Genera la geometría anatómica del dedo maniquí:
 * - Cilindro orgánico continuo sin picos ni aristas
 * - Estrechamiento de la falange distal y yema redondeada
 * - Hendidura / cuna anatómica frontal para acople milimétrico del tip de uña
 * - Borde cuticular eponiquio suave que previene que la uña flote
 */
export function createFingerGeometry(): THREE.BufferGeometry {
  const ny = 64;
  const ntheta = 64;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const yMin = -1.65;
  const yMax = 1.35;
  const totalH = yMax - yMin;

  for (let j = 0; j <= ny; j++) {
    const v = j / ny; // 0 (base) a 1 (yema superior)
    const y = yMin + v * totalH;

    // Perfil elíptico base del dedo (ligeramente más ancho en X que en Z)
    let rx = 0.74;
    let rz = 0.70;

    // Conicidad natural y redondeo de la yema
    if (v < 0.2) {
      // Base ensanchada tipo base de apoyo
      const baseFactor = 1.0 + 0.14 * Math.cos((v / 0.2) * Math.PI * 0.5);
      rx *= baseFactor;
      rz *= baseFactor;
    } else if (v > 0.82) {
      // Yema distal redondeada suave (domo hemisférico)
      const topT = (v - 0.82) / 0.18;
      const cap = Math.sqrt(Math.max(0, 1.0 - topT * topT));
      rx = rx * cap;
      rz = rz * cap;
    }

    for (let i = 0; i <= ntheta; i++) {
      const u = i / ntheta;
      const theta = u * Math.PI * 2;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta); // Frontal > 0 (dorsal/uña), Trasero < 0 (yema)

      let curRx = rx;
      let curRz = rz;
      let zOffset = 0;

      // Hendidura anatómica en la cara dorsal (frontal, sinT > 0)
      // para encastrar el lecho ungueal y la uña
      if (sinT > 0 && v >= 0.52 && v <= 0.94) {
        const vBed = (v - 0.52) / (0.94 - 0.52); // 0 a 1
        const bedProfile = Math.sin(vBed * Math.PI); // suave en extremos
        const latProfile = Math.pow(sinT, 2.8); // concentrado al frente

        // Rebaje cóncavo uniforme (~0.11 unidades hacia adentro)
        zOffset -= 0.11 * bedProfile * latProfile;

        // Borde cuticular eponiquio suave en la base del lecho
        if (vBed < 0.2) {
          const cutRidge = Math.sin((vBed / 0.2) * Math.PI);
          zOffset += 0.025 * cutRidge * latProfile;
        }
      }

      // La yema posterior (ventral, sinT < 0) es ligeramente más pulposa y redondeada
      if (sinT < 0 && v >= 0.7 && v <= 0.95) {
        const pulpT = Math.sin(((v - 0.7) / 0.25) * Math.PI);
        zOffset -= 0.04 * pulpT * Math.pow(Math.abs(sinT), 1.5);
      }

      const x = cosT * curRx;
      const z = sinT * curRz + zOffset;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  // Generación de triángulos con índices
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < ntheta; i++) {
      const a = j * (ntheta + 1) + i;
      const b = (j + 1) * (ntheta + 1) + i;
      const c = (j + 1) * (ntheta + 1) + (i + 1);
      const d = j * (ntheta + 1) + (i + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

/**
 * Genera el tip de uña independiente (perfil Almendra de salón):
 * - Curvatura transversal en C (arco ungueal del 28%)
 * - Encastre milimétrico sobre la hendidura del dedo
 * - Punta almendra suave y estilizada que sobresale limpiamente de la falange
 * - Cutícula arqueada sin dejar bordes flotando en el aire
 */
export function createSalonNailGeometry(): THREE.BufferGeometry {
  const ny = 48;
  const nx = 48;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const yCuticle = 0.12;
  const yApex = 1.62;
  const nailLength = yApex - yCuticle;

  for (let j = 0; j <= ny; j++) {
    const v = j / ny; // 0 (cutícula) a 1 (borde libre / punta almendra)

    // Curva longitudinal de altura:
    // La cutícula en los laterales sube suavemente (arco cuticular)
    // El centro en v=0 se posiciona a yCuticle
    const yCenter = yCuticle + v * nailLength;

    // Perfil de ancho de forma Almendra
    let halfWidth: number;
    if (v < 0.32) {
      // De la cutícula hasta el punto de tensión / laterales
      const t = v / 0.32;
      halfWidth = 0.38 + 0.11 * Math.sin(t * Math.PI * 0.5);
    } else {
      // Taper suave y continuo hacia la punta almendra convexa
      const t = (v - 0.32) / 0.68;
      halfWidth = 0.49 * (1.0 - 0.78 * Math.pow(t, 1.35));
    }

    // Posición Z base longitudinal:
    // Sigue la cuna del dedo hasta y ~ 1.25, luego sale en el aire con suave curvatura hacia abajo
    let zBase: number;
    if (v <= 0.68) {
      // Sobre el lecho ungueal del dedo
      zBase = 0.59 + 0.04 * Math.sin((v / 0.68) * Math.PI);
    } else {
      // Extensión de salón que sobresale de la yema
      const extT = (v - 0.68) / 0.32;
      zBase = 0.59 - 0.09 * extT;
    }

    for (let i = 0; i <= nx; i++) {
      const uNorm = (i / nx) * 2 - 1; // -1 a +1
      const x = uNorm * halfWidth;

      // Arco transversal C-curve de salón:
      // El centro está elevado y los laterales bajan abrazando el dedo
      const cCurve = 0.13 * (1.0 - uNorm * uNorm);

      // Arco cuticular: en v bajo, los extremos laterales suben levemente en Y
      const yCuticleOffset = (1 - v) * 0.045 * (uNorm * uNorm);
      const y = yCenter + yCuticleOffset;

      const z = zBase + cCurve;

      positions.push(x, y, z);
      uvs.push(i / nx, v);
    }
  }

  // Generar caras
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

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

/**
 * Genera texturas dinámicas de alta definición para el tip de uña
 * con fidelidad a las terminaciones de salón reales de Aixa.
 */
export function createDesignTexture(designId: string): THREE.CanvasTexture {
  if (typeof document === 'undefined') {
    // Fallback seguro en SSR
    const canvas = { width: 1, height: 1 } as unknown as HTMLCanvasElement;
    return new THREE.CanvasTexture(canvas);
  }

  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, size, size);

  switch (designId) {
    case 'vino-an': {
      // 1. Vino AN: Bordó vino profundo de autor (#6B0F24) con monograma dorado "AN"
      const grad = ctx.createRadialGradient(
        size * 0.5,
        size * 0.6,
        size * 0.1,
        size * 0.5,
        size * 0.5,
        size * 0.75
      );
      grad.addColorStop(0, '#82132C');
      grad.addColorStop(0.5, '#6B0F24');
      grad.addColorStop(1, '#3A0512');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Microdestellos dorados sutiles encapsulados
      ctx.save();
      for (let i = 0; i < 90; i++) {
        const x = (0.2 + 0.6 * Math.sin(i * 12.3)) * size;
        const y = (0.15 + 0.7 * Math.cos(i * 7.7)) * size;
        const r = 1.2 + (i % 3) * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(235, 195, 95, 0.55)' : 'rgba(255, 235, 180, 0.4)';
        ctx.fill();
      }
      ctx.restore();

      // Monograma de autor "AN" en la base ungueal
      ctx.save();
      ctx.translate(size * 0.5, size * 0.28);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 88px "Cormorant Garamond", Georgia, serif';

      // Sombra dorada suave
      ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#F5D77F';
      ctx.fillText('AN', 0, 0);

      // Trazo fino dorado
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.strokeText('AN', 0, 0);

      // Mini detalle inferior
      ctx.beginPath();
      ctx.arc(0, 52, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#F5D77F';
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'ojo-de-gato': {
      // 2. Ojo de Gato: Efecto magnético plateado terciopelo sobre base ciruela
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, '#190414');
      grad.addColorStop(0.35, '#2D0823');
      grad.addColorStop(0.7, '#24061C');
      grad.addColorStop(1, '#150311');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Haz magnético diagonal plateado suave
      ctx.save();
      ctx.translate(size * 0.5, size * 0.5);
      ctx.rotate(-Math.PI / 4.2);

      const magGrad = ctx.createLinearGradient(0, -size * 0.4, 0, size * 0.4);
      magGrad.addColorStop(0, 'rgba(225, 220, 240, 0.0)');
      magGrad.addColorStop(0.35, 'rgba(225, 220, 240, 0.18)');
      magGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      magGrad.addColorStop(0.65, 'rgba(225, 220, 240, 0.18)');
      magGrad.addColorStop(1, 'rgba(225, 220, 240, 0.0)');

      ctx.fillStyle = magGrad;
      ctx.fillRect(-size * 0.8, -size * 0.25, size * 1.6, size * 0.5);

      // Micropartículas magnéticas aterciopeladas
      for (let i = 0; i < 180; i++) {
        const px = (Math.random() - 0.5) * size * 1.2;
        const py = (Math.random() - 0.5) * 80;
        const pr = Math.random() * 2.2;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
      }
      ctx.restore();
      break;
    }

    case 'francesita-clasica': {
      // 3. Francesita Clásica: Base nude lechosa con sonrisa blanca arqueada
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, '#F5E4E0');
      grad.addColorStop(0.65, '#EED5CF');
      grad.addColorStop(1, '#E6CAC4');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Sonrisa blanca de precisión en el borde libre (superior en la textura)
      ctx.save();
      ctx.beginPath();
      // Curva arqueada de salón
      ctx.moveTo(size * 0.08, size * 0.68);
      ctx.quadraticCurveTo(size * 0.5, size * 0.82, size * 0.92, size * 0.68);
      ctx.lineTo(size * 0.96, size);
      ctx.lineTo(size * 0.04, size);
      ctx.closePath();

      const frenchGrad = ctx.createLinearGradient(0, size * 0.68, 0, size);
      frenchGrad.addColorStop(0, '#FFFFFF');
      frenchGrad.addColorStop(1, '#F8F6F6');
      ctx.fillStyle = frenchGrad;
      ctx.fill();

      // Línea de sonrisa nítida
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'baby-boomer': {
      // 4. Baby Boomer: Degradé suave de rosa cutícula a blanco punta
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, '#ECC7C0');
      grad.addColorStop(0.35, '#F2D3CD');
      grad.addColorStop(0.6, '#F8E6E3');
      grad.addColorStop(0.85, '#FAF6F4');
      grad.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Microtextura lechosa difusa
      ctx.save();
      const milkyGrad = ctx.createRadialGradient(
        size * 0.5,
        size * 0.85,
        size * 0.1,
        size * 0.5,
        size * 0.85,
        size * 0.55
      );
      milkyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      milkyGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = milkyGrad;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();
      break;
    }

    case 'via-lactea': {
      // 5. Vía Láctea / Nude natural: Brillo translúcido y limpio de salón
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, '#F9EBE7');
      grad.addColorStop(0.5, '#F5DDD7');
      grad.addColorStop(1, '#EFD2CC');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Suave velo lechoso central
      const milkLayer = ctx.createRadialGradient(
        size * 0.5,
        size * 0.5,
        size * 0.15,
        size * 0.5,
        size * 0.5,
        size * 0.65
      );
      milkLayer.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      milkLayer.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
      milkLayer.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = milkLayer;
      ctx.fillRect(0, 0, size, size);
      break;
    }

    case 'francesita-negra': {
      // 6. Francesita Doble Negra
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, '#F4DFDA');
      grad.addColorStop(0.6, '#EBD0CA');
      grad.addColorStop(1, '#E2C3BC');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      ctx.save();
      // Arco francés negro
      ctx.beginPath();
      ctx.moveTo(size * 0.08, size * 0.72);
      ctx.quadraticCurveTo(size * 0.5, size * 0.84, size * 0.92, size * 0.72);
      ctx.lineTo(size * 0.96, size);
      ctx.lineTo(size * 0.04, size);
      ctx.closePath();
      ctx.fillStyle = '#181818';
      ctx.fill();

      // Doble trazo fino interior
      ctx.beginPath();
      ctx.moveTo(size * 0.14, size * 0.64);
      ctx.quadraticCurveTo(size * 0.5, size * 0.75, size * 0.86, size * 0.64);
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#181818';
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'rojo-clasico': {
      // 7. Rojo Clásico Salón
      const grad = ctx.createRadialGradient(
        size * 0.5,
        size * 0.55,
        size * 0.15,
        size * 0.5,
        size * 0.5,
        size * 0.75
      );
      grad.addColorStop(0, '#E02532');
      grad.addColorStop(0.65, '#C51824');
      grad.addColorStop(1, '#8B0A13');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      break;
    }

    default: {
      ctx.fillStyle = '#6B0F24';
      ctx.fillRect(0, 0, size, size);
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}
