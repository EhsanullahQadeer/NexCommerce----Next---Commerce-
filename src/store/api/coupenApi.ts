// src/slices/wishlistApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { updateCurrency } from "../slices/currenctlist/currencySlice";

export const coupenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCoupen: builder.mutation({
      query: ( coupon_code) => ({
        url: 'filter-coupon-list',
        method: 'POST',body:{
          coupon_code
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

          console.log("updateCoupen-->  ", data.data);
          // dispatch(updateCoupen(data.data))
          
        } catch (error) {
          console.error('Fetch Coupen Error:', error);
        }
      },
    })
  }),
});


export const { useFetchCoupenMutation } = coupenApi;
