// src/slices/productsApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { saveCityList } from "../slices/citylist/citySlice";
export const citiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCities: builder.mutation({
      query: () => ({
        url: 'get-provinces',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          return data;
          // if (data?.data?.length) {
          //   dispatch(saveCityList(data.data));
          // }
        } catch (error) {
          console.error('Fetch Filtered Products Error:', error);
        }
      },
    }),

  }),
});

export const { useFetchCitiesMutation } = citiesApi;
