// src/slices/wishlistApi.ts
import { toast } from "react-toastify";
import { apiSlice } from "../slices/api/apiSlice";
import { wishlistItemsSet } from "../slices/wishlist/wishlistSlice";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRemoveToWishlist: builder.mutation({
      query: ({ user_id, product_id, variant_id }) => ({
        // url: 'add-remove-favourite-product',
        url: 'add-remove-favourite-product',
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
          console.error('Add to Cart Error:', error);
        }
      },
    }),
    wishlistDetailsGet: builder.mutation({
      query: ({ user_id }) => ({
        url: 'favourite-product-list',
        method: 'POST',
        body: {
          user_id
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.data) {
            dispatch(wishlistItemsSet(result.data.data))
          }
        } catch (error) {
          // console.error('Add to Cart Error:', error);
        }
      },
    })
  }),
});

export const { useAddRemoveToWishlistMutation, useWishlistDetailsGetMutation } = wishlistApi;
