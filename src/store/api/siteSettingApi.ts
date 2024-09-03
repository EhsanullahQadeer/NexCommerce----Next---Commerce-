// src/slices/siteSettingApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { handleProduct, handleTotalProduct } from "../slices/products/productsSlice";

export const siteSettingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSiteSettings: builder.mutation({
      query: () => ({
        url: 'site-setting',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

          console.log("data", data);
          
        } catch (error) {
          console.error('Fetch Filtered Products Error:', error);
        }
      },
    })
  }),
});

export const { useFetchSiteSettingsMutation } = siteSettingApi;
