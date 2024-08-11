export interface Product {
  id: string;
  title: string;
  src: string;
  price?: number;
  oldPrice?: number;
  variants: boolean;
  label?: string;
  category?: string;
}

export interface ProductCategory {
  key: string;
  label: string;
  count?: number;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    variants: false,
    label: 'Sale',
    category: 'furniture',
  },
  {
    id: '2',
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    variants: false,
    category: 'accessories',
  },
  {
    id: '3',
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    variants: false,
    label: 'Out of stock',
    category: 'lighting',
  },
  {
    id: '4',
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
    variants: false,
    category: 'accessories',
  },
  {
    id: '5',
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    variants: false,
    label: 'Sale',
    category: 'lighting',
  },
  {
    id: '6',
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    variants: false,
    category: 'furniture',
  },
  {
    id: '7',
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    variants: false,
    label: 'Out of stock',
    category: 'sale',
  },
  {
    id: '8',
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
    variants: false,
    category: 'furniture',
  },
];

export const productCategories: ProductCategory[] = [
  { key: '*', label: 'All', count: 23 },
  { key: 'furniture', label: 'Furniture', count: 2 },
  { key: 'lighting', label: 'Lighting', count: 4 },
  { key: 'accessories', label: 'Accessories', count: 2 },
  { key: 'sale', label: 'Sale', count: 3 },
];
