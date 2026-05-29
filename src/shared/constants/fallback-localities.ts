import type { Locality } from '@/domain/entities/locality.entity';

export const FALLBACK_LOCALITIES: Locality[] = [
  { name: 'Sao Paulo', latitude: -23.55052, longitude: -46.633308 },
  { name: 'Rio de Janeiro', latitude: -22.906847, longitude: -43.172897 },
  { name: 'Santos', latitude: -23.960833, longitude: -46.333611 },
  { name: 'Ubatuba', latitude: -23.43389, longitude: -45.083889 },
  { name: 'Paraty', latitude: -23.222222, longitude: -44.717222 },
  { name: 'Ilhabela', latitude: -23.77806, longitude: -45.35806 },
  { name: 'Joinville', latitude: -26.30444, longitude: -48.84861 },
  { name: 'Florianopolis', latitude: -27.59667, longitude: -48.54917 },
  { name: 'Curitiba', latitude: -25.428954, longitude: -49.267137 },
  { name: 'Porto Alegre', latitude: -30.034647, longitude: -51.217658 },
];
