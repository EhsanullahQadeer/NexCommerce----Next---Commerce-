import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './slice';
import products from './slices/products/productsSlice';
import productCategories from './slices/categories/categoriesSlice';

const store = configureStore({
  reducer: {
    root: rootReducer,
    products,
    productCategories,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
