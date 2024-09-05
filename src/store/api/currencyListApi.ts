// src/slices/wishlistApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { updateCurrency } from "../slices/currenctlist/currencySlice";

export const curruncyListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCurrencyList: builder.mutation({
      query: () => ({
        url: 'currency-list',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

      
          dispatch(updateCurrency(data.data))
          
        } catch (error) {
          console.error('Fetch Currency List Error:', error);
        }
      },
    })
  }),
});


export const { useFetchCurrencyListMutation } = curruncyListApi;
