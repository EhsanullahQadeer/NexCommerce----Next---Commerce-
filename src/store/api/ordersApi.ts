'use client'
import { apiSlice } from "../slices/api/apiSlice";
import { toast } from "react-toastify";


export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint here
    fetchOrders: builder.mutation({
        query: ({userId}) => ({
            url: `orders-list?user_id=${userId}`,
            method: 'GET',
          }  ),
          async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
              const { data } = await queryFulfilled;
                return data
            } catch (error) {
              console.error('Fetch Filtered States Error:', error);
            }
          },
    }),
    
   
  }),
});

export const { useFetchOrdersMutation } = ordersApi;
