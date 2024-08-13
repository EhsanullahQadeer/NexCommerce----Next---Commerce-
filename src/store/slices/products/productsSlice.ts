import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import {
  Product,
  ProductCategory,
  products,
  productCategories,
} from './fakeProducts';

// Define a type for the slice state
export interface ProductsState {
  filterKey: string;
  products: Product[];
  productCategories: ProductCategory[];
  isPreviewModalOpen: boolean;
  isGalleryFullView: boolean;
}

// Define the initial state using that type
const initialState: ProductsState = {
  products,
  filterKey: '*',
  productCategories,
  isPreviewModalOpen: false,
  isGalleryFullView: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    handleFilterKeyChange: (state, action: PayloadAction<string>) => {
      state.filterKey = action.payload;
    },
    togglePreviewModal: (state, action: PayloadAction<boolean>) => {
      state.isPreviewModalOpen = action.payload;
    },
    toggleGalleryModal: (state, action: PayloadAction<boolean>) => {
      state.isGalleryFullView = action.payload;
    },
  },
});

export const { handleFilterKeyChange, togglePreviewModal, toggleGalleryModal } =
  productsSlice.actions;

// selectors can use the imported `RootState`
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
