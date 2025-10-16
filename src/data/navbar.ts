export const menuItemsData = [
  { name: 'Dashboard', path: '/', icon: null },
  { name: 'Progress Petugas', path: '/progress_petugas', icon: null },
  { name: 'Progress Wilayah', path: '/progress_wilayah', icon: null },
  { name: 'Hasil Cacah', path: '/hasil', icon: null },
];

export type MenuItem = (typeof menuItemsData)[number];
