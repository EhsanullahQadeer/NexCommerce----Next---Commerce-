import { Product } from "../products/fakeProducts";

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
    title: 'Nunc dignissim risus',
    heading: 'Women',
    src: '/categories/product-1.jpg',
    label: 'Sale',
    category: 'furniture',
  },
  {
    id: '2',
    title: 'Cras ornare tristique',
    heading: 'Accessories',
    src: '/categories/product-2.jpg',
    price: 209,
    oldPrice: 220,
    category: 'accessories',
  },
  {
    id: '3',
    title: 'Aliquam tincidunt mauris',
    heading: 'Dresses',
    src: '/categories/product-3.jpg',
    price: 99,
    label: 'Out of stock',
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
    title: 'Brown paperbag waist pencil skirt',
    heading: 'Women',
    src: '/categories/product-4.jpg',
    price: 251,
    oldPrice: 280,
    category: 'accessories',
  },
  {
    id: '5',
    title: 'Dark yellow lace cut out swing dress',
    heading: 'Dresses',
    src: '/categories/product-3.jpg',
    label: 'Sale',
    category: 'lighting',
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
    title: 'Khaki utility boiler jumpsuit',
    heading: 'Women',
    src: '/categories/product-1.jpg',
    price: 209,
    oldPrice: 220,
    category: 'furniture',
  },
  {
    id: '7',
    title: 'Blue utility pinafore denim dress',
    heading: 'Dresses',
    src: '/categories/product-4.jpg',
    price: 99,
    label: 'Out of stock',
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
    title: 'Beige knitted elastic runner shoes',
    heading: 'Women',
    src: '/categories/product-2.jpg',
    price: 251,
    oldPrice: 280,
    category: 'furniture',
  },
];


export const categoryFiltersResults: ProductCategory[] = [
  { key: 'dresses', label: 'Dresses', count: 23 },
  { key: 't-shirts', label: 'T-Shirts', count: 2 },
  { key: 'bags', label: 'Bags', count: 4 },
  { key: 'jackets', label: 'Jackets', count: 2 },
  { key: 'shoes', label: 'Shoes', count: 3 },
];

export const sizeFiltersResults: ProductCategory[] = [
  { key: 'xs', label: 'XS' },
  { key: 's', label: 'S' },
  { key: 'm', label: 'M' },
  { key: 'l', label: 'L' }
];


export const brandResults: ProductCategory[] = [
  { key: 'next', label: 'Next' },
  { key: 'river-island', label: 'River Island' },
  { key: 'geox', label: 'Geox' },
  { key: 'new-balance', label: 'New Balance' },
  { key: 'f-and-f', label: 'F&F' },
  { key: 'nike', label: 'Nike' },
];
