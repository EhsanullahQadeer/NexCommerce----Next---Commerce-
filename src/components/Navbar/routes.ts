interface Route {
  name: string;
  url: string;
}

export const routes: Route[] = [
  { name: 'Home', url: '/' },
  { name: 'Dashboard', url: '/dashboard' },
  { name: 'Categories', url: '/categories' },
  { name: 'Products', url: '/products' },
];
