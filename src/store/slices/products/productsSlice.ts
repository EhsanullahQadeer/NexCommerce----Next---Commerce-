import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import {
  products,
  productCategories,
} from './fakeProducts';
import { Product, ProductCategory } from '@/types/product';

export interface categoryPayload {
  id: number;
  isChecked: boolean
}

export interface SortPayload {
  sort_by: string;
  order: string
}

export interface OtherSortPayload {
  key: string;
  value: string | number
}

// Define a type for the slice state
export interface ProductsState {
  filterKey: string;
  products: Product[];
  productCategories: ProductCategory[];
  isPreviewModalOpen: boolean;
  isGalleryFullView: boolean;
  categoriesFilter: number[];
  sortByFilter: SortPayload;
  colorFilter: string;
  priceRangeFilter: string;
  skip: number;
  limitFilter: number;
  currentPage: number;
  searchFilter: string;
  sizeFilter: string;
  quickViewProduct: Product | null;
}


// Define the initial state using that type
const initialState: ProductsState = {
  products,
  filterKey: '*',
  productCategories,
  isPreviewModalOpen: false,
  isGalleryFullView: false,
  categoriesFilter: [],
  sortByFilter: {
    sort_by: "price",
    order: "DESC"
  },
  colorFilter: "",
  priceRangeFilter: '5000',
  skip: 0,
  limitFilter: 8,
  currentPage: 1,
  searchFilter: "",
  sizeFilter: "",
  quickViewProduct: null
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    handleProduct: (state, action: PayloadAction<Product[]>) => {
      let cloneProducts = [...state.products]
      action.payload.forEach(el => {
        if (!cloneProducts.find(item => item.id == el.id)) {
          cloneProducts.push(el)
        }
      })
      state.products = cloneProducts
    },
    handleProductCategories: (state, action: PayloadAction<ProductCategory[]>) => {
      state.productCategories = action.payload;
    },
    handleCategoriesFilter: (state, action: PayloadAction<categoryPayload>) => {
      state.products = []
      if (action.payload.isChecked) {
        state.categoriesFilter.push(action.payload.id)
      } else {
        state.categoriesFilter = state.categoriesFilter.filter(id => id !== action.payload.id)
      }
      state.currentPage = 1
    },
    selectCategoryFilter: (state, action: PayloadAction<number>) => {
      state.products = []
      state.categoriesFilter = [action.payload]
      state.currentPage = 1
    },
    handleSortFilter: (state, action: PayloadAction<SortPayload>) => {
      state.products = []
      state.sortByFilter = action.payload
      state.currentPage = 1
    },
    handleOtherFilter: (state, action: PayloadAction<OtherSortPayload>) => {
      (state as any)[action.payload.key] = action.payload.value;
      state.currentPage = 1
      state.products = []

    },
    handleMoreProduct: (state) => {
      state.currentPage++;
    },
    handleFilterKeyChange: (state, action: PayloadAction<string>) => {
      state.filterKey = action.payload;
    },
    togglePreviewModal: (state, action: PayloadAction<boolean>) => {
      state.isPreviewModalOpen = action.payload;
    },
    toggleGalleryModal: (state, action: PayloadAction<boolean>) => {
      state.isGalleryFullView = action.payload;
    },
    clearFilter: (state) => {
      state.categoriesFilter = [];
      state.categoriesFilter = []
      state.sortByFilter = {
        sort_by: "price",
        order: "DESC"
      }
      state.colorFilter = ""
      state.priceRangeFilter = '100'
      state.skip = 0
      state.currentPage = 1
      state.searchFilter = ""
    },
    addQuickViewProduct: (state, action: PayloadAction<Product | null>) => {
      state.quickViewProduct = action.payload
    },
  },
});

export const { handleProduct, handleProductCategories, handleCategoriesFilter, selectCategoryFilter,
  handleSortFilter, handleMoreProduct, handleOtherFilter, handleFilterKeyChange,
  togglePreviewModal, toggleGalleryModal, clearFilter, addQuickViewProduct } =
  productsSlice.actions;

// selectors can use the imported `RootState`
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
