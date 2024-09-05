// src/slices/wishlistApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import {  updateCoupenCode } from "../slices/coupencode/coupenCodeSlice";

export const coupenCodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCoupenCode: builder.mutation({
      query: ( coupon_code) => ({
        url: 'filter-coupon-list',
        method: 'POST',
        body:{
          coupon_code
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

          console.log("CoupenCode-->  ", data.data);
          dispatch(updateCoupenCode(data.data))
          
        } catch (error) {
          console.error('Fetch Coupen Code Error:', error);
        }
      },
    })
  }),
});


export const {useFetchCoupenCodeMutation } = coupenCodeApi;
