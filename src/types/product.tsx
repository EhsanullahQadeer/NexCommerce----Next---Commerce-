export enum ProductLabel {
  OUT_OF_STOCK = 'Out of Stock',
  SALE = 'Sale',
  NEW = 'New',
  TOP = 'Top',
}

export interface Product {
  id: number
  name: string
  image: string
  small_image: string
  medium_image: string
  description: string
  price: number
  is_active: number
  is_deleted: number
  created_at: string
  updated_at: string
  currency_id: number
  images: any[]
  product_tags: ProductTag[]
  product_categories: Category[]
  product_variants: ProductVariant[]
  reviews: any[]
}

export interface ProductCategory {
  id: number
  name: string
  image: string
  description: string
  is_active: number
  is_deleted: number
  created_at: string
  updated_at: string
  products_count: number
}


export interface ColorVariant {
  id: number;
  color: string;
}

export interface ProductTag {
  id: number
  product_id: number
  tags_id: number
  created_at: any
  updated_at: any
  tag: Tag
}

export interface Tag {
  id: number
  name: string
  image: string
  description: string
  is_active: number
  is_deleted: number
  created_at: any
  updated_at: string
}

export interface Category {
  id: number
  product_id: number
  category_id: number
  sub_category_id: number
  created_at: any
  updated_at: any
}

export interface ProductVariant {
  id: number
  product_id: number
  sku: string
  price: string
  stock: number
  created_at: string
  updated_at: string
  currency_id: number
  attribute_values: AttributeValue[]
}

export interface AttributeValue {
  id: number
  variant_id: number
  attribute_id: number
  value: string
  created_at: string
  updated_at: string
  variant_attribute: VariantAttribute
}

export interface VariantAttribute {
  id: number
  attribute_name: string
  subcategory_id: number
  created_at: string
  updated_at: string
}