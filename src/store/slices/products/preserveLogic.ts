// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/store";
// import { products, productCategories } from "./fakeProducts";
// import { Product, ProductCategory, ProductVariant } from "@/types/product";

// export interface categoryPayload {
//   id: number;
//   isChecked: boolean;
// }

// export interface SortPayload {
//   sort_by: string;
//   order: string;
// }

// export interface OtherSortPayload {
//   key: string;
//   value: string | number;
// }

// // Define a type for the slice state
// export interface ProductsState {
//   filterKey: string;
//   totalProducts: number;
//   max_price: number;
//   products: Product[];
//   productCategories: ProductCategory[];
//   isPreviewModalOpen: boolean;
//   isGalleryFullView: boolean;
//   categoriesFilter: number[];
//   sortByFilter: SortPayload;
//   colorFilter: string;
//   priceRangeFilter: string;
//   skip: number;
//   limitFilter: number;
//   currentPage: number;
//   searchFilter: string;
//   sizeFilter: string;
//   quickViewProduct: Product | null;
//   currentVarient: ProductVariant | null;
//   currentVarientQuantity: number;
// }

// // Define the initial state using that type
// export const productInitialState: ProductsState = {
//   products,
//   totalProducts: 0,
//   max_price: 10000,
//   filterKey: "*",
//   productCategories,
//   isPreviewModalOpen: false,
//   isGalleryFullView: false,
//   categoriesFilter: [],
//   sortByFilter: {
//     sort_by: "price",
//     order: "DESC",
//   },
//   colorFilter: "",
//   priceRangeFilter: "5000",
//   skip: 0,
//   limitFilter: 8,
//   currentPage: 1,
//   searchFilter: "",
//   sizeFilter: "",
//   quickViewProduct: null,
//   currentVarient: null,
//   currentVarientQuantity: 0,
// };
// type Torigin = "homePage" | "productPage"

// const initialState: { homePage: ProductsState; productPage: ProductsState } = {
//   homePage: productInitialState,
//   productPage: productInitialState
// }


// const helper = <P>(
//   callback: (state: ProductsState, action: PayloadAction<P>) => void
// ) => {
//   return (state: { [key in Torigin]: ProductsState }, action: PayloadAction<{ origin: Torigin } & P>) => {
//     // Extract origin and the rest of the payload
//     const { origin, ...restPayload } = action.payload;

//     // Call the callback with the specific state and the modified action payload
//     callback(state[origin], { ...action, payload: restPayload } as PayloadAction<P>);
//   };
// };

// export const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     handleProduct: helper<Product[]>(
//       (state, action) => {
//         const newProducts = action.payload;
//         newProducts.forEach((product) => {
//           if (!state.products.find((p) => p.id === product.id)) {
//             state.products.push(product);
//           }
//         });
//       }
//     ),
//     handleTotalProduct: helper<number>((state, action) => {
//       state.totalProducts = action.payload;
//     }),
//     handleMaxPriceProduct: helper<number>((state, action) => {
//       state.max_price = action.payload;
//     }),
//     handlePriceRange: helper<string>((state, action) => {
//       state.priceRangeFilter = action.payload;
//     }),
//     handleProductCategories: helper<ProductCategory[]>((
//       state,
//       action
//     ) => {
//       state.productCategories = action.payload;
//       console.log(state.productCategories, "categoris");
//     }),
//     handleCategoriesFilter: helper<categoryPayload>((state, action) => {
//       state.products = [];
//       if (action.payload.isChecked) {
//         state.categoriesFilter.push(action.payload.id);
//       } else {
//         state.categoriesFilter = state.categoriesFilter.filter(
//           (id) => id !== action.payload.id
//         );
//       }
//       state.currentPage = 1;
//     }),
//     selectCategoryFilter: helper<number>((state, action) => {
//       state.products = [];
//       state.categoriesFilter = [action.payload];
//       state.currentPage = 1;
//     }),
//     handleSortFilter: helper<SortPayload>((state, action) => {
//       state.products = [];
//       state.sortByFilter = action.payload;
//       state.currentPage = 1;
//     }),
//     handleOtherFilter: helper<OtherSortPayload>((state, action) => {
//       (state as any)[action.payload.key] = action.payload.value;
//       state.currentPage = 1;
//       state.products = [];
//     }),
//     handleMoreProduct: helper((state) => {
//       state.currentPage++;
//     }),
//     handleFilterKeyChange: helper<string>((state, action) => {
//       state.filterKey = action.payload;
//     }),
//     togglePreviewModal: helper<boolean>((state, action) => {
//       state.isPreviewModalOpen = action.payload;
//     }),
//     toggleGalleryModal: helper<boolean>((state, action) => {
//       state.isGalleryFullView = action.payload;
//     }),
//     clearFilter: helper((state) => {
//       state.categoriesFilter = [];
//       state.categoriesFilter = [];
//       state.sortByFilter = {
//         sort_by: "price",
//         order: "DESC",
//       };
//       state.colorFilter = "";
//       state.skip = 0;
//       state.currentPage = 1;
//       state.searchFilter = "";
//     }),
//     addQuickViewProduct: helper<Product | null>((state, action) => {
//       state.currentVarient = action.payload?.product_variants?.[0] || null;
//       state.quickViewProduct = action.payload;
//     }),
//     changeCurrentVarient: helper<ProductVariant>((state, action) => {
//       state.currentVarient = action.payload;
//     }),
//     changeCurrentVarientQuantity: helper<number>((state, action) => {
//       state.currentVarientQuantity = action.payload;
//     }),
//   },
// });

// export const {
//   handleProduct,
//   handleTotalProduct,
//   handlePriceRange,
//   handleMaxPriceProduct,
//   handleProductCategories,
//   handleCategoriesFilter,
//   selectCategoryFilter,
//   handleSortFilter,
//   handleMoreProduct,
//   handleOtherFilter,
//   handleFilterKeyChange,
//   togglePreviewModal,
//   toggleGalleryModal,
//   clearFilter,
//   addQuickViewProduct,
//   changeCurrentVarient,
//   changeCurrentVarientQuantity,
// } = productsSlice.actions;

// // selectors can use the imported `RootState`
// export const selectHomePageProducts = (state: RootState) => state.products.homePage;
// export const selectProductPageProducts = (state: RootState) => state.products.productPage;

// export default productsSlice.reducer;
