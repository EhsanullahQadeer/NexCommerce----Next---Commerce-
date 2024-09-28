import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Product } from '@/types/product';
import { calculatePriceInCurrency } from '@/utility/calculatePriceInCurrency';

// Define interfaces for CartItem, Product, and Variant
interface Variant {
  id: number;
  product_id: number;
  sku: string;
  price: string;
  stock: number;
  created_at: string;
  updated_at: string;
  currency_id: number;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
  updated_at: string;
  variant_id: number;
  product: Product;
  variant: Variant;
}

// Define a type for the slice state
interface CartState {
  cartDetails: CartItem[];
  totalAmount: number;
  totalItems: number;
  shipping_amount: number;
}

// Define the initial state using that type
const initialState: CartState = {
  cartDetails: [],
  totalAmount: 0,
  totalItems: 0,
  shipping_amount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeCartItem: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.cartDetails.findIndex(
        (item) => item.id === action.payload
      );

      if (existingItemIndex >= 0) {
        // Update total amount and items
        state.totalAmount -=
          state.cartDetails[existingItemIndex].price_at_purchase;
        state.totalItems -= state.cartDetails[existingItemIndex].quantity;

        // Remove the item from the cart
        state.cartDetails.splice(existingItemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartDetails = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    setCartDetails: (state, action: PayloadAction<CartItem[]>) => {
      state.cartDetails = action.payload;
      state.totalItems = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    setCartTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    setShippingAmount: (state, action: PayloadAction<number>) => {
      state.shipping_amount = action.payload;
    },
  },
});

export const {
  removeCartItem,
  clearCart,
  setCartDetails,
  setCartTotalAmount,
  setShippingAmount
} = cartSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
