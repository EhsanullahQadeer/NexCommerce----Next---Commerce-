import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Product, ProductCategory } from '@/types/product';
import { products } from './fakeProducts';
import { productCategories } from '../products/fakeProducts'

// Define a type for the slice state
export interface ProductCategoriesState {
  products: Product[];
  productCategories: ProductCategory[];
  isToggleFilters: boolean;
}

// Define the initial state using that type
const initialState: ProductCategoriesState = {
  products,
  productCategories,
  isToggleFilters: false,
};

export const productCategoriesSlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {
    toggleFilters: (state, action: PayloadAction<boolean>) => {
      state.isToggleFilters = action.payload;
    },
  },
});

export const {
  toggleFilters,
} = productCategoriesSlice.actions;

// selectors can use the imported `RootState`
export const selectProductCategories = (state: RootState) =>
  state.productCategories;

export default productCategoriesSlice.reducer;
