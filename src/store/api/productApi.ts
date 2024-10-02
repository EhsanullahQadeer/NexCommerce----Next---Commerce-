// src/slices/productsApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import {
  handleMaxPriceProduct,
  handleProduct,
  handleProductCategories,
  handleTotalProduct,
} from "../slices/products/productsSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFilteredProducts: builder.mutation({
      query: ({ filters, pagination }) => ({
        url: "filtered-product-list",
        method: "POST",
        body: {
          filters,
          pagination,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          return data
        } catch (error) {
          console.error("Fetch Filtered Products Error:", error);
          return null
        }
      },
    }),
    // fetchFilteredProducts: builder.mutation({
    //   query: ({ filters, pagination }) => ({
    //     url: "filtered-product-list",
    //     method: "POST",
    //     body: {
    //       filters,
    //       pagination,
    //     },
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data?.data?.data?.length) {
    //         dispatch(handleProduct(data.data.data));
    //       } else {
    //         dispatch(handleProduct([]));
    //       }

    //       dispatch(handleTotalProduct(data?.data?.total || 0));
    //       dispatch(handleMaxPriceProduct(data?.data?.max_price || 10000));
    //     } catch (error) {
    //       console.error("Fetch Filtered Products Error:", error);
    //     }
    //   },
    // }),
    fetchCategoriesList: builder.mutation({
      query: () => ({
        url: "categories-list",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.data && result.data.data.length) {
            dispatch(handleProductCategories(result.data.data));
          }
        } catch (error: any) {
          console.error("Fetch Categories List Error:", error);
        }
      },
    }),

    fetchProduct: builder.mutation({
      query: ({ slug }: { slug: string }) => ({
        url: "product-details",
        method: "POST",
        body: {
          slug
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          return data
        } catch (error) {
          debugger
          console.error("Fetch Filtered Products Error:", error);
          return null
        }
      },
    }),
  }),
});

export const {
  useFetchFilteredProductsMutation,
  useFetchCategoriesListMutation,
  useFetchProductMutation
} = productsApi;
