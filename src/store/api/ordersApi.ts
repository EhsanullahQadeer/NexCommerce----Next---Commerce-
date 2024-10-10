'use client'
import { IOrderListParams, IProductReviewParams, OrderPayload } from "@/types/order";
import { apiSlice } from "../slices/api/apiSlice";
import { toast } from "react-toastify";
import { headers } from "next/headers";



export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint here
    fetchOrders: builder.mutation({
      query: (params: IOrderListParams) => ({
        url: `orders-list`,
        method: 'GET',
        params
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          return data
        } catch (error) {
          console.error('Fetch Filtered States Error:', error);
        }
      },
    }),
    // OrderPayload

    addOrder: builder.mutation({
      query: (data: WithLoader<OrderPayload>) => ({
        url: "add-order",
        method: 'POST',
        body: data,
      }
      ),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.error('Add Order Error:', error);
        }
      },
    }),
    getInvoice: builder.mutation({
      query: (data: WithLoader<{ url: string }>) => ({
        url: data.payload.url,
        method: 'GET',
        body: { fullPageLoader: data.fullPageLoader },
        responseHandler: (response: Response) => response.blob(),
      }
      ),
    }),
    addProductReview: builder.mutation({
      query: (body: WithLoader<IProductReviewParams>) => ({
        url: "add-product-review",
        method: 'POST',
        body,
      }
      ),
    }),
    getProductReviewList: builder.mutation({
      query: (body: WithLoader<{ product_id: string | number }>) => ({
        url: "product-review-list",
        method: 'POST',
        body,
      }
      ),
    }),


  }),
});

export const { useFetchOrdersMutation, useAddOrderMutation, useGetInvoiceMutation, useAddProductReviewMutation, useGetProductReviewListMutation } = ordersApi;
