// src/slices/cartApi.ts
import { toast } from "react-toastify";
import { apiSlice } from "../slices/api/apiSlice";
import { setCartDetails, setShippingAmount } from "../slices/cart/cartSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ user_id, products }) => ({
        url: 'add-to-cart',
        method: 'POST',
        body: {
          user_id,
          products
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.message) {
            const message = result.data.message
            toast.success(message)
          }
        } catch (error) {
          console.error('Add to Cart Error:', error);
        }
      },
    }),
    deletefromCart: builder.mutation({
      query: ({ user_id, product_id, variant_id }) => ({
        url: 'remove-from-cart',
        method: 'POST',
        body: {
          user_id,
          product_id,
          variant_id
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.message) {
            const message = result.data.message
            toast.success(message)
          }
        } catch (error) {
          console.error('Delete to Cart Error:', error);
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
            dispatch(setCartDetails(result.data.data?.cart_details))
            dispatch(setShippingAmount(result.data.data?.shipping_amount))
          }
        } catch (error) {
          // console.error('Add to Cart Error:', error);
        }
      },
    })
  }),
});

export const { useAddToCartMutation, useDeletefromCartMutation, useCartDetailsGetMutation } = cartApi;
