// src/slices/wishlistApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { updateLanguage } from "../slices/languagelist/languageSlice";

export const languageListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchLanguageList: builder.mutation({
      query: () => ({
        url: 'language-list',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

         
          dispatch(updateLanguage(data.data))
          
        } catch (error) {
          console.error('Fetch Language List Error:', error);
        }
      },
    })
  }),
});


export const { useFetchLanguageListMutation } = languageListApi;
