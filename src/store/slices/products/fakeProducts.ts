export interface Product {
  id: string;
  title: string;
  src: string;
  price?: number;
  oldPrice?: number;
  variants?: ColorVariant[];
  label?: string;
  category?: string;
}

export interface ProductCategory {
  key: string;
  label: string;
  count?: number;
}

export interface ColorVariant {
  id: number;
  color: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    label: 'Sale',
    category: 'furniture',
  },
  {
    id: '2',
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    category: 'accessories',
  },
  {
    id: '3',
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    label: 'Out of stock',
    category: 'lighting',
    variants: [
      {
        id: 1,
        color: '#cc9999'
      },
      {
        id: 2,
        color: '#999999'
      }
    ],
  },
  {
    id: '4',
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
    category: 'accessories',
  },
  {
    id: '5',
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    label: 'Sale',
    category: 'lighting',
    variants: [
      {
        id: 1,
        color: '#333333'
      },
      {
        id: 2,
        color: '#cba374'
      }
    ]
  },
  {
    id: '6',
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    category: 'furniture',
  },
  {
    id: '7',
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    label: 'Out of stock',
    category: 'sale',
    variants: [
      {
        id: 1,
        color: '#333333'
      },
      {
        id: 2,
        color: '#cba374'
      }
    ]
  },
  {
    id: '8',
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
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
