import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Product, ProductVariant } from '@/types/product';

export interface WishlistItem {
  id: number
  user_id: number
  product_id: number
  product_variant_id: number
  product_variant: ProductVariant
  created_at: string
  updated_at: string
  product: Product | null
}

export interface WishlistState {
  wishListData: WishlistItem[]
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

export const selectWishlist = (state: RootState) => state.wishlist;

export default wishlistSlice.reducer;
