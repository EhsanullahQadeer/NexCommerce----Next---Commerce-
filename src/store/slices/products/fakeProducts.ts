import { Product, ProductCategory, ProductSortKeys } from "@/types/product";

export const products: Product[] = []

export const productCategories: ProductCategory[] = []

export const productSortCategories: ProductSortKeys[] = [
  // { key: 'default', label: 'Default', sort: "" },
  { key: 'created_at', label: 'Newness', sort: "ASC" },
  { key: 'popularity', label: 'Popularity', sort: "DESC" },
  { key: 'rating', label: 'Average rating', sort: "ASC" },
  { key: 'price', label: 'Price: Low to High', sort: "ASC" },
  { key: 'price', label: 'Price: High to Low', sort: "DESC" },
];
