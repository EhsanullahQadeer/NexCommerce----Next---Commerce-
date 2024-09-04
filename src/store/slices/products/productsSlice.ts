import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import {
  products,
  productCategories,
} from './fakeProducts';
import { Product, ProductCategory, ProductVariant } from '@/types/product';

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
  totalProducts: number;
  max_price: number;
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
  currentVarient: ProductVariant | null
}


// Define the initial state using that type
const initialState: ProductsState = {
  products,
  totalProducts: 0,
  max_price: 10000,
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
  quickViewProduct: null,
  currentVarient: null
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
    handleTotalProduct: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload
    },
    handleMaxPriceProduct: (state, action: PayloadAction<number>) => {
      state.max_price = action.payload
      if(state.max_price !== action.payload){
        state.priceRangeFilter = action.payload.toString()
      }
    },
    handlePriceRange: (state, action: PayloadAction<string>) => {
      state.priceRangeFilter = action.payload
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
      state.skip = 0
      state.currentPage = 1
      state.searchFilter = ""
    },
    addQuickViewProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentVarient = action.payload?.product_variants?.[0] || null
      state.quickViewProduct = action.payload
    },
    changeCurrentVarient: (state, action: PayloadAction<ProductVariant>) => {
      state.currentVarient = action.payload
    },
  },
});

export const { handleProduct, handleTotalProduct, handlePriceRange, handleMaxPriceProduct, handleProductCategories, handleCategoriesFilter, selectCategoryFilter,
  handleSortFilter, handleMoreProduct, handleOtherFilter, handleFilterKeyChange,
  togglePreviewModal, toggleGalleryModal, clearFilter, addQuickViewProduct, changeCurrentVarient } =
  productsSlice.actions;

// selectors can use the imported `RootState`
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
