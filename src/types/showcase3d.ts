export interface NailDesign {
  id: string;
  name: string;
  subtitle: string;
  shape: string;
  image: string;
  technique: string;
  finish: string;
  durability: string;
  description: string;
  recommendedServiceId: string;
  recommendedServiceName: string;
  colors: { name: string; hex: string }[];
  badge: string;
}
