import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { products, productCategories } from "./fakeProducts";
import { Product, ProductCategory, ProductVariant } from "@/types/product";

export interface categoryPayload {
  id: number | "*";
  isChecked: boolean;
  type?: "single"
}

export interface SortPayload {
  sort_by: string;
  order: string;
}

export interface OtherSortPayload {
  key: string;
  value: string | number;
}

// Define a type for the slice state
export interface ProductsState {
  filterKey: string;
  totalProducts: number;
  max_price: number;
  products: Product[];
  categoriesFilter: number[];
  sortByFilter: SortPayload;
  colorFilter: string;
  priceRangeFilter: string;
  skip: number;
  limitFilter: number;
  currentPage: number;
  searchFilter: string;
  sizeFilter: string;
}
interface IsharedInitialValue {
  productCategories: ProductCategory[];
  isPreviewModalOpen: boolean;
  isGalleryFullView: boolean;
  quickViewProduct: Product | null;
  currentVarient: ProductVariant | null;
  currentVarientQuantity: number;
}
const sharedInitialValue: IsharedInitialValue = {
  productCategories,
  isPreviewModalOpen: false,
  isGalleryFullView: false,
  quickViewProduct: null,
  currentVarient: null,
  currentVarientQuantity: 0,
}

// Define the initial state using that type
const productInitialState: ProductsState = {
  products,
  totalProducts: 0,
  max_price: 0,
  filterKey: "*",
  categoriesFilter: [],
  sortByFilter: {
    sort_by: "price",
    order: "DESC",
  },
  colorFilter: "",
  priceRangeFilter: "",
  skip: 0,
  limitFilter: 8,
  currentPage: 1,
  searchFilter: "",
  sizeFilter: "",
};

export type Torigin = "homePage" | "productPage"

const initialState: { homePage: ProductsState; productPage: ProductsState } & ProductsState & IsharedInitialValue = {
  homePage: { ...productInitialState, max_price: 0, limitFilter: 16 },
  productPage: productInitialState,
  ...sharedInitialValue,
  ...productInitialState
}

const helper = <P>(
  callback: (state: ProductsState, action: PayloadAction<P>) => void
) => {
  return (state: { [key in Torigin]: ProductsState }, action: PayloadAction<{ origin: Torigin, payload: P }>) => {
    // Extract origin and the rest of the payload
    const { origin, ...restPayload } = action.payload;

    // Call the callback with the specific state and the modified action payload
    callback(state[origin], { ...action, payload: restPayload.payload } as PayloadAction<P>);
  };
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleProduct: (state, action: PayloadAction<Product[]>) => {
      let cloneProducts = [...state.products];
      action.payload.forEach((el) => {
        if (!cloneProducts.find((item) => item.id == el.id)) {
          cloneProducts.push(el);
        }
      });
      state.products = cloneProducts;
    },
    _handleProduct: helper<Product[]>(
      (state, action) => {
        const newProducts = action.payload;
        if (state.currentPage > 1) {
          newProducts.forEach((product) => {
            if (!state.products.find((p) => p.id === product.id)) {
              state.products.push(product);
            }
          });
        } else {
          state.products = newProducts
        }

      }
    ),
    handleTotalProduct: helper<number>((state, action) => {
      state.totalProducts = action.payload;
    }),
    handleMaxPriceProduct: (state, action: PayloadAction<number>) => {
      state.max_price = action.payload;
    },
    _handleMaxPriceProduct: helper<number>((state, action) => {
      state.max_price = action.payload;
    }),
    handlePriceRange: helper<string>((state, action) => {
      state.priceRangeFilter = action.payload;
    }),
    handleProductCategories: (
      state,
      action: PayloadAction<ProductCategory[]>
    ) => {
      state.productCategories = action.payload;
    },
    _handleCategoriesFilter: helper<categoryPayload>((state, action) => {
      state.products = [];
      const { id, type } = action.payload
      if (id === "*") {
        state.categoriesFilter = []
      }
      else {
        if (type === "single") {
          state.categoriesFilter = [id]
        } else {
          if (action.payload.isChecked) {
            state.categoriesFilter.push(id);
          } else {
            state.categoriesFilter = state.categoriesFilter.filter(
              (catId) => catId !== id
            );
          }
        }

      }
      state.currentPage = 1;
    }),
    selectCategoryFilter: (state, action: PayloadAction<number>) => {
      state.products = [];
      state.categoriesFilter = [action.payload];
      state.currentPage = 1;
    },
    handleSortFilter: (state, action: PayloadAction<SortPayload>) => {
      state.products = [];
      state.sortByFilter = action.payload;
      state.currentPage = 1;
    },
    _handleSortFilter: helper<SortPayload>((state, action) => {
      state.products = [];
      state.sortByFilter = action.payload;
      state.currentPage = 1;
    }),
    handleOtherFilter: (state, action: PayloadAction<OtherSortPayload>) => {
      (state as any)[action.payload.key] = action.payload.value;
      state.currentPage = 1;
      state.products = [];
    },
    _handleOtherFilter: helper<OtherSortPayload>((state, action) => {
      (state as any)[action.payload.key] = action.payload.value;
      state.currentPage = 1;
      state.products = [];
    }),
    handleMoreProduct: helper((state) => {
      state.currentPage++;
    }),
    handleFilterKeyChange: (state, action: PayloadAction<string>) => {
      state.filterKey = action.payload;
    },
    _handleFilterKeyChange: helper<string>((state, action) => {
      state.filterKey = action.payload;
    }),
    togglePreviewModal: (state, action: PayloadAction<boolean>) => {
      state.isPreviewModalOpen = action.payload;
    },
    toggleGalleryModal: (state, action: PayloadAction<boolean>) => {
      state.isGalleryFullView = action.payload;
    },
    clearFilter: (state) => {
      state.categoriesFilter = [];
      state.categoriesFilter = [];
      state.sortByFilter = {
        sort_by: "price",
        order: "DESC",
      };
      state.colorFilter = "";
      state.skip = 0;
      state.currentPage = 1;
      state.searchFilter = "";
    },
    _clearFilter: helper((state) => {
      state.categoriesFilter = [];
      state.categoriesFilter = [];
      state.sortByFilter = {
        sort_by: "price",
        order: "DESC",
      };
      state.colorFilter = "";
      state.skip = 0;
      state.currentPage = 1;
      state.searchFilter = "";
      state.priceRangeFilter = state.max_price.toString()
    }),
    addQuickViewProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentVarient = action.payload?.product_variants?.[0] || null;
      state.quickViewProduct = action.payload;
    },
    changeCurrentVarient: (state, action: PayloadAction<ProductVariant>) => {
      state.currentVarient = action.payload;
    },
    changeCurrentVarientQuantity: (state, action: PayloadAction<number>) => {
      state.currentVarientQuantity = action.payload;
    },
    resetProductsData: helper((state) => {
      state = initialState
    })
  },
});

export const {
  handleProduct,
  _handleProduct,
  handleTotalProduct,
  handlePriceRange,
  handleMaxPriceProduct,
  _handleMaxPriceProduct,
  handleProductCategories,
  _handleCategoriesFilter,
  selectCategoryFilter,
  handleSortFilter,
  _handleSortFilter,
  handleMoreProduct,
  handleOtherFilter,
  _handleOtherFilter,
  handleFilterKeyChange,
  _handleFilterKeyChange,
  togglePreviewModal,
  toggleGalleryModal,
  clearFilter,
  _clearFilter,
  addQuickViewProduct,
  changeCurrentVarient,
  changeCurrentVarientQuantity,
  resetProductsData
} = productsSlice.actions;

// selectors can use the imported `RootState`
export const selectProducts = (state: RootState) => state.products;
export const selectHomePageProducts = (state: RootState) => state.products.homePage;
export const selectProductPageProducts = (state: RootState) => state.products.productPage;
export const selectProductsRootState = {
  homePage: selectHomePageProducts,
  productPage: selectProductPageProducts,
};

export default productsSlice.reducer;