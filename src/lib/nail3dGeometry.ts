import * as THREE from 'three';
import { NailDesign } from '@/types/showcase3d';

export const NAIL_DESIGNS: NailDesign[] = [
  {
    id: 'vino-an',
    name: 'Vino AN',
    subtitle: 'Bordó icónico (#6B0F24) con monograma AN',
    technique: 'Kapping en polygel & Nail Art a mano alzada con pan de oro',
    finish: 'Top Coat Ultra Gloss Efecto Cristal',
    durability: '21 a 28 días intactas',
    description:
      'El tono bordó insignia de Aixa Nails (#6B0F24) combinado con una suave media luna nude en la cutícula, coronado con destellos dorados y el monograma de autor AN.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Bordó AN', hex: '#6B0F24' },
      { name: 'Vino Noche', hex: '#4A0716' },
      { name: 'Nude Soft', hex: '#F0D6D2' },
      { name: 'Oro Pulido', hex: '#E5B869' },
    ],
    badge: 'Firma de la Casa',
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    transmission: 0.05,
    iridescence: 0.15,
    sheen: 0.4,
    sheenColor: '#FFDF78',
  },
  {
    id: 'ojo-de-gato',
    name: 'Ojo de Gato',
    subtitle: 'Efecto magnético plateado 9D',
    technique: 'Esmaltado magnético multidimensional con imán de neodimio',
    finish: 'Terciopelo líquido y destellos de prisma',
    durability: '21+ días de brillo dinámico',
    description:
      'Pigmentos magnéticos ultra finos suspendidos que concentran un haz de luz plateada flotante. Al interactuar con la luz, el destello viaja por la superficie creando un efecto 3D hipnótico.',
    recommendedServiceId: '4',
    recommendedServiceName: 'Soft gel',
    colors: [
      { name: 'Cosmos Plum', hex: '#220818' },
      { name: 'Plata Velvet', hex: '#E2DCE6' },
      { name: 'Lavanda Humo', hex: '#876D89' },
      { name: 'Brillo Cristal', hex: '#FFFFFF' },
    ],
    badge: 'Efecto Magnético',
    roughness: 0.07,
    metalness: 0.38,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.08,
    iridescence: 0.92,
    sheen: 0.95,
    sheenColor: '#E2DCE6',
  },
  {
    id: 'francesita-soft',
    name: 'Francesita Soft',
    subtitle: 'Base nude translúcida con sonrisa fina',
    technique: 'Micro-French de precisión en bordó y oro líquido',
    finish: 'Porcelana Nude & Acabado Líquido',
    durability: '21 a 25 días',
    description:
      'La manicura francesa clásica reinventada en clave editorial: base lechosa de cobertura etérea rematada por un arco ultra fino que combina el bordó de autor con un perfil en cromo dorado.',
    recommendedServiceId: '2',
    recommendedServiceName: 'Kapping en polygel',
    colors: [
      { name: 'Porcelana Nude', hex: '#F6E6E4' },
      { name: 'Bordó Editorial', hex: '#6B0F24' },
      { name: 'Oro Espejo', hex: '#F5CE66' },
      { name: 'Blush Cutícula', hex: '#EBC7C4' },
    ],
    badge: 'Elegancia Minimal',
    roughness: 0.08,
    metalness: 0.42,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    transmission: 0.12,
    iridescence: 0.25,
    sheen: 0.55,
    sheenColor: '#FFEAA7',
  },
  {
    id: 'baby-boomer',
    name: 'Baby Boomer',
    subtitle: 'Degradé lechoso suave hacia la punta',
    technique: 'Ombré difuminado con esponja y aerógrafo sobre base rosa suave',
    finish: 'Milky Glass & Crecimiento Imperceptible',
    durability: '25+ días con acabado natural',
    description:
      'Transición suave y continua que viaja desde la base rosa suave (#FDE8E9) en la cutícula hacia una punta blanco nube lechoso, logrando manos estilizadas con una estética limpia.',
    recommendedServiceId: '3',
    recommendedServiceName: 'Esculpidas en polygel',
    colors: [
      { name: 'Rosa Suave', hex: '#FDE8E9' },
      { name: 'Blush Nude', hex: '#F2CEC9' },
      { name: 'Blanco Lechoso', hex: '#FDFBFB' },
      { name: 'Gloss Cristal', hex: '#FFFFFF' },
    ],
    badge: 'Clásico Atemporal',
    roughness: 0.06,
    metalness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.22,
    iridescence: 0.12,
    sheen: 0.35,
    sheenColor: '#FFFFFF',
  },
  {
    id: 'glazed-donut',
    name: 'Glazed Donut / Cromado',
    subtitle: 'Brillo perlado iridiscente satinado',
    technique: 'Polvo cromado de perla frotado sobre gel semi-translúcido',
    finish: 'Perla Iridiscente & Destello Satinado',
    durability: '21 a 28 días de brillo continuo',
    description:
      'El codiciado efecto Hailey Bieber: una infusión de pigmentos perlados de micro-refracción que transforma la uña con un lustre irisado que cambia de rosa a plata champagne con la luz.',
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
    metalness: 0.28,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transmission: 0.18,
    iridescence: 0.95,
    sheen: 0.9,
    sheenColor: '#FFF4FD',
  },
];

/**
 * Procedural generation of a realistic Almond sculpted nail tip.
 * Includes longitudinal apex reinforcement, transverse C-curve,
 * anatomical almond taper and physical edge thickness.
 */
export function createAlmondNailGeometry(): THREE.BufferGeometry {
  const nx = 36;
  const ny = 72;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const thickness = 0.045;

  function getPoint(u: number, v: number): THREE.Vector3 {
    let w = 1.0;
    if (u < 0.22) {
      const t = u / 0.22;
      w = 0.35 + 0.65 * Math.sqrt(Math.max(0, 1 - (1 - t) ** 2));
    } else if (u <= 0.62) {
      w = 1.0 - (u - 0.22) * 0.15;
    } else {
      const t = (u - 0.62) / 0.38;
      w = (0.94 - 0.86 * t ** 1.35) * Math.sqrt(Math.max(0.01, 1 - t * 0.9));
    }

    // Apex longitudinal curvature (peak at 36% from cuticle)
    let zApex = 0;
    if (u <= 0.36) {
      const t = u / 0.36;
      zApex = 0.36 * Math.sin(t * Math.PI * 0.5);
    } else {
      const t = (u - 0.36) / 0.64;
      zApex = 0.36 - 0.22 * t - 0.08 * Math.sin(t * Math.PI);
    }

    // Transverse C-curve
    const zCurve = -v * v * (0.34 * Math.max(0.2, w));

    const x = v * (w * 0.76);
    const y = (u - 0.45) * 3.1;
    const z = zApex + zCurve;

    return new THREE.Vector3(x, y, z);
  }

  // Precompute top surface vertices
  const topVerts: THREE.Vector3[][] = [];
  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    topVerts[j] = [];
    for (let i = 0; i <= nx; i++) {
      const v = (i / nx) * 2 - 1;
      topVerts[j][i] = getPoint(u, v);
    }
  }

  const vertexOffsetBottom = (ny + 1) * (nx + 1);

  // Top surface vertices
  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    for (let i = 0; i <= nx; i++) {
      const p = topVerts[j][i];
      positions.push(p.x, p.y, p.z);
      uvs.push(i / nx, u);
    }
  }

  // Bottom surface vertices (thickness offset)
  for (let j = 0; j <= ny; j++) {
    const u = j / ny;
    for (let i = 0; i <= nx; i++) {
      const p = topVerts[j][i];
      positions.push(p.x * 0.98, p.y, p.z - thickness);
      uvs.push(i / nx, u);
    }
  }

  // Top surface faces (CCW)
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

  // Bottom surface faces (CW)
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

  for (let i = 0; i < nx; i++) {
    const topA = i;
    const topB = i + 1;
    const botA = vertexOffsetBottom + topA;
    const botB = vertexOffsetBottom + topB;
    indices.push(topA, topB, botA);
    indices.push(topB, botB, botA);
  }

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
 * for each signature nail art design.
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
    // 1. Vino AN: Deep burgundy with gold sparkle and AN monogram
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#3A0512');
    grad.addColorStop(0.2, '#50091A');
    grad.addColorStop(0.55, '#6B0F24');
    grad.addColorStop(0.85, '#7B132B');
    grad.addColorStop(1, '#5B0B1E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle edge vignette
    const radVig = ctx.createRadialGradient(size / 2, size / 2, 200, size / 2, size / 2, 550);
    radVig.addColorStop(0, 'rgba(0,0,0,0)');
    radVig.addColorStop(1, 'rgba(30, 3, 9, 0.45)');
    ctx.fillStyle = radVig;
    ctx.fillRect(0, 0, size, size);

    // Cuticle Lunula
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(size / 2, size * 0.98, 260, 140, 0, 0, Math.PI * 2);
    const lunulaGrad = ctx.createRadialGradient(size / 2, size, 20, size / 2, size, 240);
    lunulaGrad.addColorStop(0, 'rgba(244, 215, 210, 0.85)');
    lunulaGrad.addColorStop(0.7, 'rgba(235, 195, 190, 0.4)');
    lunulaGrad.addColorStop(1, 'rgba(107, 15, 36, 0)');
    ctx.fillStyle = lunulaGrad;
    ctx.fill();
    ctx.restore();

    // Lunula golden micro-bead border
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size * 0.97, 245, Math.PI * 1.1, Math.PI * 1.9);
    ctx.strokeStyle = 'rgba(229, 184, 105, 0.65)';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 12]);
    ctx.stroke();
    ctx.restore();

    // Fine golden sparkle dust
    ctx.fillStyle = 'rgba(255, 225, 160, 0.7)';
    for (let i = 0; i < 90; i++) {
      const px = Math.sin(i * 99.7) * 360 + size / 2;
      const py = Math.cos(i * 47.3) * 380 + size * 0.52;
      const r = (Math.sin(i * 12.3) + 1.2) * 1.5;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central Radiant Golden Star
    const starX = size / 2;
    const starY = size * 0.46;

    const starAura = ctx.createRadialGradient(starX, starY, 5, starX, starY, 110);
    starAura.addColorStop(0, 'rgba(255, 235, 175, 0.6)');
    starAura.addColorStop(0.4, 'rgba(212, 175, 55, 0.25)');
    starAura.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = starAura;
    ctx.beginPath();
    ctx.arc(starX, starY, 110, 0, Math.PI * 2);
    ctx.fill();

    drawStar(ctx, starX, starY, 8, 54, 16, '#F8E298', '#D4AF37');

    // Cross glints
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 245, 215, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(starX - 85, starY);
    ctx.lineTo(starX + 85, starY);
    ctx.moveTo(starX, starY - 85);
    ctx.lineTo(starX, starY + 85);
    ctx.stroke();
    ctx.restore();

    // Monogram AN
    ctx.save();
    ctx.font = '600 38px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#F8E298';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
    ctx.shadowBlur = 12;
    ctx.fillText('A · N', starX, starY + 82);
    ctx.restore();
  } else if (designId === 'ojo-de-gato') {
    // 2. Ojo de Gato (Velvet 9D magnetic flash)
    const grad = ctx.createRadialGradient(size / 2, size / 2, 50, size / 2, size / 2, 600);
    grad.addColorStop(0, '#350B24');
    grad.addColorStop(0.5, '#200717');
    grad.addColorStop(1, '#11030C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Ethereal purple nebula
    const nebula = ctx.createLinearGradient(0, 0, size, size);
    nebula.addColorStop(0.2, 'rgba(80, 20, 60, 0.4)');
    nebula.addColorStop(0.5, 'rgba(120, 60, 110, 0.25)');
    nebula.addColorStop(0.8, 'rgba(40, 10, 40, 0.4)');
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, size, size);

    // Micro cosmic dust
    for (let i = 0; i < 220; i++) {
      const px = Math.sin(i * 88.3) * 440 + size / 2;
      const py = Math.cos(i * 61.1) * 440 + size / 2;
      const alpha = (Math.sin(i * 33.7) * 0.4 + 0.6) * 0.75;
      const r = (Math.cos(i * 19.3) + 1.2) * 1.2;
      ctx.fillStyle = i % 3 === 0 ? `rgba(255, 255, 255, ${alpha})` : `rgba(210, 190, 225, ${alpha * 0.7})`;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 9D Magnetic Velvet Cat-Eye Beam
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-0.58);

    const beamWide = ctx.createLinearGradient(-350, 0, 350, 0);
    beamWide.addColorStop(0, 'rgba(180, 150, 200, 0)');
    beamWide.addColorStop(0.35, 'rgba(215, 195, 235, 0.18)');
    beamWide.addColorStop(0.5, 'rgba(245, 235, 255, 0.42)');
    beamWide.addColorStop(0.65, 'rgba(215, 195, 235, 0.18)');
    beamWide.addColorStop(1, 'rgba(180, 150, 200, 0)');
    ctx.fillStyle = beamWide;
    ctx.fillRect(-350, -600, 700, 1200);

    const beamCore = ctx.createLinearGradient(-80, 0, 80, 0);
    beamCore.addColorStop(0, 'rgba(255, 255, 255, 0)');
    beamCore.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)');
    beamCore.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)');
    beamCore.addColorStop(0.6, 'rgba(255, 255, 255, 0.7)');
    beamCore.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = beamCore;
    ctx.fillRect(-80, -600, 160, 1200);

    ctx.restore();
  } else if (designId === 'francesita-soft') {
    // 3. Francesita Soft: Translucent nude with fine bordeaux and gold smile line
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#E8C5C0');
    grad.addColorStop(0.3, '#F5DBD8');
    grad.addColorStop(0.65, '#F8E7E5');
    grad.addColorStop(1, '#FAEDED');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Lateral shading for 3D depth
    const edgeShade = ctx.createLinearGradient(0, 0, size, 0);
    edgeShade.addColorStop(0, 'rgba(180, 130, 125, 0.28)');
    edgeShade.addColorStop(0.18, 'rgba(220, 180, 175, 0.08)');
    edgeShade.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    edgeShade.addColorStop(0.82, 'rgba(220, 180, 175, 0.08)');
    edgeShade.addColorStop(1, 'rgba(180, 130, 125, 0.28)');
    ctx.fillStyle = edgeShade;
    ctx.fillRect(0, 0, size, size);

    // Cuticle natural soft crescent
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(size / 2, size * 0.98, 250, 120, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fill();
    ctx.restore();

    // Micro-French Tip: Dual bordeaux (#6B0F24) & chrome gold smile line
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 170);
    ctx.bezierCurveTo(300, 260, 724, 260, 904, 170);
    ctx.lineTo(904, 0);
    ctx.closePath();

    // Bordeaux base tip
    const bordeauxGrad = ctx.createLinearGradient(120, 80, 904, 140);
    bordeauxGrad.addColorStop(0, '#5A0B1E');
    bordeauxGrad.addColorStop(0.5, '#6B0F24');
    bordeauxGrad.addColorStop(1, '#4A0716');
    ctx.fillStyle = bordeauxGrad;
    ctx.fill();

    // Fine chrome gold smile line edge
    ctx.beginPath();
    ctx.moveTo(120, 170);
    ctx.bezierCurveTo(300, 260, 724, 260, 904, 170);
    ctx.strokeStyle = '#F6D365';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 174);
    ctx.bezierCurveTo(300, 264, 724, 264, 904, 174);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  } else if (designId === 'baby-boomer') {
    // 4. Baby Boomer: Seamless milky fade from #FDE8E9 to porcelain white
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#E8B6AF');
    grad.addColorStop(0.2, '#F2CCC7');
    grad.addColorStop(0.4, '#FDE8E9'); // Brand soft rose base
    grad.addColorStop(0.68, '#FBF0F0');
    grad.addColorStop(0.88, '#FAF6F6');
    grad.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Airbrushed soft cloud transitions
    ctx.save();
    const cloud1 = ctx.createRadialGradient(size / 2, size * 0.45, 80, size / 2, size * 0.45, 400);
    cloud1.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    cloud1.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
    cloud1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = cloud1;
    ctx.fillRect(0, 0, size, size);

    // Tip milky concentration
    const tipMilky = ctx.createLinearGradient(0, size * 0.35, 0, 0);
    tipMilky.addColorStop(0, 'rgba(255, 255, 255, 0)');
    tipMilky.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    tipMilky.addColorStop(1, 'rgba(255, 255, 255, 0.88)');
    ctx.fillStyle = tipMilky;
    ctx.fillRect(0, 0, size, size * 0.35);
    ctx.restore();
  } else {
    // 5. Glazed Donut / Cromado (Hailey Bieber chrome pearl luster)
    const grad = ctx.createLinearGradient(0, size, 0, 0);
    grad.addColorStop(0, '#F5DCD8');
    grad.addColorStop(0.25, '#FCE8E5');
    grad.addColorStop(0.5, '#FFF2F5');
    grad.addColorStop(0.75, '#F7ECF8');
    grad.addColorStop(1, '#FFFBFD');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Satin opalescent sheen streaks
    ctx.save();
    const pearlGlow = ctx.createLinearGradient(0, 0, size, size);
    pearlGlow.addColorStop(0, 'rgba(255, 240, 250, 0.4)');
    pearlGlow.addColorStop(0.3, 'rgba(235, 225, 255, 0.3)');
    pearlGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
    pearlGlow.addColorStop(0.7, 'rgba(255, 245, 230, 0.35)');
    pearlGlow.addColorStop(1, 'rgba(240, 230, 255, 0.4)');
    ctx.fillStyle = pearlGlow;
    ctx.fillRect(0, 0, size, size);

    // Micro pearl shimmer dust
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 180; i++) {
      const px = Math.sin(i * 73.1) * 420 + size / 2;
      const py = Math.cos(i * 51.9) * 440 + size / 2;
      const r = (Math.sin(i * 15.7) + 1.2) * 1.0;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central glazed satin light beam (diagonal soft luster)
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-0.42);
    const satinBeam = ctx.createLinearGradient(-180, 0, 180, 0);
    satinBeam.addColorStop(0, 'rgba(255, 255, 255, 0)');
    satinBeam.addColorStop(0.4, 'rgba(255, 255, 255, 0.55)');
    satinBeam.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
    satinBeam.addColorStop(0.6, 'rgba(255, 255, 255, 0.55)');
    satinBeam.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = satinBeam;
    ctx.fillRect(-180, -600, 360, 1200);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
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
