// src/slices/cartApi.ts
import { apiSlice } from "../slices/api/apiSlice";

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

          if (result.data && result.data.cart) {
            console.log('Product added to cart:', result.data.cart);
          }
        } catch (error) {
          console.error('Add to Cart Error:', error);
        }
      },
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
