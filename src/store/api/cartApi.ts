// src/slices/cartApi.ts
import { toast } from "react-toastify";
import { apiSlice } from "../slices/api/apiSlice";
import { setCartDetails, setShippingAmount } from "../slices/cart/cartSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ user_id, product_id, variant_id, price, quantity }) => ({
        url: 'add-to-cart',
        method: 'POST',
        body: {
          user_id,
          product_id,
          variant_id,
          price,
          quantity,

        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("result", result);

          if (result?.data?.message) {
            const message = result.data.message
            toast.success(message)
          }
        } catch (error) {
          console.error('Add to Cart Error:', error);
        }
      },
    }),
    cartDetailsGet: builder.mutation({
      query: ({ user_id }) => ({
        url: 'cart-details',
        method: 'POST',
        body: {
          user_id
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data && result.data.data) {
            console.log('cart:', result.data.data);
            dispatch(setCartDetails(result.data.data?.cart_details))
            dispatch(setShippingAmount(result.data.data?.shipping_amount))
          }
        } catch (error) {
          console.error('Add to Cart Error:', error);
        }
      },
    }),
    cartDetailsUpdate: builder.mutation({
      query: ({ user_id, product_id, quantity }) => ({
        url: 'quantity',
        method: 'POST',
        body: {
          user_id,
          product_id,
          quantity
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Update Cart Error:', error);
        }
      },
    }),
  }),
});

export const { useAddToCartMutation, useCartDetailsGetMutation, useCartDetailsUpdateMutation } = cartApi;
