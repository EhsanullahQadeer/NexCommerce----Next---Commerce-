// src/slices/productsApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { handleProduct, handleProductCategories } from "../slices/products/productsSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProductList: builder.mutation({
      query: ({ tag_name }) => ({
        url: 'product-list',
        method: 'POST',
        body: { tag_name },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("result", result);


          if (result.data.data && result.data.data.length) {
            dispatch(
              handleProduct(result.data.data)
            )
          }


        } catch (error: any) {
          console.error('Fetch Product List Error:', error);
        }
      },
    }),
    fetchCategoriesList: builder.mutation({
      query: () => ({
        url: 'categories-list',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.data && result.data.data.length) {
            
            dispatch(handleProductCategories(result.data.data));
          }

        } catch (error: any) {
          console.error('Fetch Categories List Error:', error);
        }
      },
    }),

  }),
});

export const { useFetchProductListMutation, useFetchCategoriesListMutation } = productsApi;
