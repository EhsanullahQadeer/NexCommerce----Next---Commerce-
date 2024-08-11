export interface Product {
  title: string;
  src: string;
  price?: number;
  oldPrice?: number;
  variants: boolean;
  label?: string;
}

export const products: Product[] = [
  {
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    variants: false,
    label: 'Sale',
  },
  {
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    variants: false,
  },
  {
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    variants: false,
    label: 'Out of stock',
  },
  {
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
    variants: false,
  },
  {
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    variants: false,
    label: 'Sale',
  },
  {
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    variants: false,
  },
  {
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    variants: false,
    label: 'Out of stock',
  },
  {
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
    variants: false,
  },
  {
    title: 'Flow Slim Armchair',
    src: '/products/product-card/product-1.jpg',
    variants: false,
    label: 'Sale',
  },
  {
    title: 'Original Stonewashed Beanbag',
    src: '/products/product-card/product-6.jpg',
    price: 209,
    oldPrice: 220,
    variants: false,
  },
  {
    title: 'Cushion Set 3 Pieces',
    src: '/products/product-card/product-8.jpg',
    price: 99,
    variants: false,
    label: 'Out of stock',
  },
  {
    title: 'Butler Stool Ladder',
    src: '/products/product-card/product-11.jpg',
    price: 251,
    oldPrice: 280,
    variants: false,
  },
];
