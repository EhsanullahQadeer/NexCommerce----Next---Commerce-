// src/slices/siteSettingApi.ts
import { apiSlice } from "../slices/api/apiSlice";

export const siteSettingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSliders: builder.mutation({
      query: () => ({
        url: 'sliders',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

          return data
          
        } catch (error) {
          console.error('Fetch sliders Error:', error);
          return error
        }
      },
    })
  }),
});

export const { useFetchSlidersMutation } = siteSettingApi;
