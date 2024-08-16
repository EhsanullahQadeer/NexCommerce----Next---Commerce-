import { Product, ProductCategory, ProductLabel } from "@/types/product";

export const products: Product[] = [
  {
    id: '1',
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    category: 'accessories',
  },
  {
    id: '2',
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    category: 'sale',
    label: ProductLabel.SALE,
  },
  {
    id: '3',
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    label: ProductLabel.OUT_OF_STOCK,
    category: 'lighting',
    variants: [
      {
        id: 1,
        color: '#cc9999',
      },
      {
        id: 2,
        color: '#999999',
      },
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
    label: ProductLabel.NEW,
    category: 'sale',
    variants: [
      {
        id: 1,
        color: '#333333',
      },
      {
        id: 2,
        color: '#cba374',
      },
    ],
  },
  {
    id: '6',
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    label: ProductLabel.SALE,
    category: 'furniture',
  },
  {
    id: '7',
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    label: ProductLabel.OUT_OF_STOCK,
    category: 'sale',
    variants: [
      {
        id: 1,
        color: '#333333',
      },
      {
        id: 2,
        color: '#cba374',
      },
    ],
  },
  {
    id: '8',
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    label: ProductLabel.TOP,
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

export const productSortCategories: ProductCategory[] = [
  { key: 'default', label: 'Default' },
  { key: 'popularity', label: 'Popularity' },
  { key: 'average-rating', label: 'Average Rating' },
  { key: 'Newness', label: 'Newness' },
  { key: 'price-low-to-high', label: 'Price: Low to High' },
  { key: 'price-high-to-low', label: 'Price: High to Low' },
];
