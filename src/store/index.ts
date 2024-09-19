import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./slice";
import blogs from "./slices/blogs/blogsSlice";
import products from "./slices/products/productsSlice";
import productCategories from "./slices/categories/categoriesSlice";
import siteSettingSlice from "./slices/siteSetting/siteSettingSlice";
import siteCurrency from "./slices/currenctlist/currencySlice";
import siteLanguage from "./slices/languagelist/languageSlice";
import siteCoupenCodeSlice from "./slices/coupencode/coupenCodeSlice";
import siteShippingAddressSlice from  "./slices/shippingaddress/shippingAddressSlice"
import siteBillingAddressSlice from './slices/billingaddress/billingAddressSlice'

import wishlist from "./slices/wishlist/wishlistSlice";
import slidersSlice from "./slices/sliders/slidersSlice"
import cart from "./slices/cart/cartSlice";
import auth from "./slices/auth/authSlice";
import { apiSlice } from "./slices/api/apiSlice";
import siteCity from "./slices/citylist/citySlice";
import siteState from "./slices/statelist/stateSlice";



const store = configureStore({
  reducer: {
    root: rootReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    blogs,
    products,
    cart,
    slidersSlice,
    wishlist,
    productCategories,
    siteSettingSlice,
    siteCurrency,
    siteLanguage,
    siteCoupenCodeSlice,
    siteShippingAddressSlice,
    siteBillingAddressSlice,
    siteCity,
    siteState
    
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
