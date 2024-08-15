export enum ProductLabel {
  OUT_OF_STOCK = 'Out of Stock',
  SALE = 'Sale',
  NEW = 'New',
  TOP = 'Top',
}

export interface Product {
  id: string;
  title: string;
  src: string;
  price?: number;
  oldPrice?: number;
  variants?: ColorVariant[];
  label?: ProductLabel;
  category?: string;
  heading?: string;
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
