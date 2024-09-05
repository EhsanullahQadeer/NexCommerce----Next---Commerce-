// src/slices/cartApi.ts
import { apiSlice } from "../slices/api/apiSlice";


export const visitorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVisitor: builder.mutation({
      query: ({ latitude,longitude, browser }) => ({
        url: 'visitor',
        method: 'POST',
        body: {
          latitude,
          longitude,
          browser
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
         
          if (result?.data) {
            sessionStorage.setItem("browserinfo", JSON.stringify(result.data || `{}`))
          }
        } catch (error) {
          console.error('Add Visitor Error:', error);
        }
      },
    }),

  }),
});

export const { useAddVisitorMutation } = visitorApi;
