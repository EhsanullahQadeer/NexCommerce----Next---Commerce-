import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Product } from '@/types/product';

export interface WishlistItem {
  id: number
  user_id: number
  product_id: number
  created_at: string
  updated_at: string
  product: Product | null
}

export interface WishlistState {
  wishListData: WishlistItem[]
}

export interface WishlistUpdate {
  product_id: number
  user_id: number
}

const initialState: WishlistState = {
  wishListData: []
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlistItemsSet: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishListData = action.payload
    }
  },
});

export const {
  wishlistItemsSet
} = wishlistSlice.actions;

export const selectWishlist = (state: RootState) => state.cart;

export default wishlistSlice.reducer;
