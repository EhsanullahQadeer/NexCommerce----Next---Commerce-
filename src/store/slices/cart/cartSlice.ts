import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Product } from '@/types/product';

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

interface CartItem {
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
}

// Define the initial state using that type
const initialState: CartState = {
  cartDetails: [],
  totalAmount: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.cartDetails.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // If the item already exists, update its quantity and price
        state.cartDetails[existingItemIndex].quantity += action.payload.quantity;
        state.cartDetails[existingItemIndex].price_at_purchase += action.payload.price_at_purchase;
      } else {
        // Add the new item to the cart
        state.cartDetails.push(action.payload);
      }

      // Update total amount and items
      state.totalAmount += action.payload.price_at_purchase;
      state.totalItems += action.payload.quantity;
    },
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
    updateCartItem: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const existingItemIndex = state.cartDetails.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const item = state.cartDetails[existingItemIndex];

        // Update total amount based on the difference in quantity
        const quantityDifference = action.payload.quantity - item.quantity;
        state.totalAmount += quantityDifference * item.product.price;
        state.totalItems += quantityDifference;

        // Update the item's quantity
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cartDetails = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    setCartDetails: (state, action: PayloadAction<CartItem[]>) => {
      state.cartDetails = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, item) => total + item.price_at_purchase,
        0
      );
      state.totalItems = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  updateCartItem,
  clearCart,
  setCartDetails,
} = cartSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
