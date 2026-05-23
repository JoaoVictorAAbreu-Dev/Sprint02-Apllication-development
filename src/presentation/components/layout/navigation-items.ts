export type NavigationItem = {
  label: string;
  to: string;
};

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', to: '/' },
  { label: 'Mapa', to: '/map' },
  { label: 'Sensoriamento', to: '/sensing' },
  { label: 'Alertas', to: '/alerts' },
];
