export type Category = {
  label: string;
  count?: number;
}
export const productCategories: Category[] = [
  { label: 'All', count: 24 },
  { label: 'Furniture', count: 3 },
  { label: 'Lighting', count: 2 },
  { label: 'Accessories', count: 4 },
  { label: 'Sale', count: 2 },
];

export const productSortCategories: Category[] = [
  { label: 'Default' },
  { label: 'Popularity' },
  { label: 'Average Rating' },
  { label: 'Newness' },
  { label: 'Price: Low to High' },
  { label: 'Price: High to Low' },
];
