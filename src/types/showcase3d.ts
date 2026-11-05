export interface NailDesign {
  id: string;
  name: string;
  subtitle: string;
  technique: string;
  finish: string;
  durability: string;
  description: string;
  recommendedServiceId: string;
  recommendedServiceName: string;
  colors: { name: string; hex: string }[];
  badge: string;
  // Material physical PBR properties
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  transmission: number;
  iridescence: number;
  sheen: number;
  sheenColor: string;
  thickness?: number;
  ior?: number;
  attenuationColor?: string;
  attenuationDistance?: number;
  normalScale?: number;
}
