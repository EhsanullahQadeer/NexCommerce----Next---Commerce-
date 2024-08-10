import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store';

// Define a type for the slice state
export interface ProductsState {
  products: [];
}

// Define the initial state using that type
const initialState: ProductsState = {
  products: []
}

export const productsSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // TODO: actions related to products will be handled here.
  }
})

// selectors can use the imported `RootState`
export const selectCount = (state: RootState) => state.products.products;

export default productsSlice.reducer;
