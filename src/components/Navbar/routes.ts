interface Route {
  name: string;
  url: string;
}

export const routes: Route[] = [
  { name: 'Home', url: '/' },
  { name: 'Account', url: '/account' },
  { name: 'Categories', url: '/categories' },
  { name: 'Products', url: '/products' },
];
