// src/slices/productsApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { saveStateList } from "../slices/statelist/stateSlice";
export const statesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStates: builder.mutation({
      query: ({cityId}) => ({
        url: 'get-districts/' + cityId,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          // if (data?.data?.length) {
            dispatch(saveStateList(data.data));
          // }
        } catch (error) {
          console.error('Fetch Filtered States Error:', error);
        }
      },
    }),

  }),
});

export const { useFetchStatesMutation } = statesApi;
