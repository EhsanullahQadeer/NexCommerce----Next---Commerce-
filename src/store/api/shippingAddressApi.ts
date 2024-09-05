// src/slices/cartApi.ts
import { toast } from "react-toastify";
import { apiSlice } from "../slices/api/apiSlice";

export const shippingAddressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchaddShippingAddress: builder.mutation({
      query: ({ user_id, first_name,last_name, phone, email,address_line1,address_line2,city,state,country,postal_code }) => ({
        url: 'add-shipping-address',
        method: 'POST',
        body: {
          user_id,first_name,last_name, phone, email,address_line1,address_line2,city,state,country,postal_code
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;


          // if (result?.data?.message) {
          //   const message = result.data.message
          //   toast.success(message)
          // }
        } catch (error) {
          console.error('Add Shipping Address Api Error:', error);
        }
      },
    }),
   
    fetchgetShippingAddress: builder.mutation({
      query: ({ user_id }) => ({
        url: 'get-shipping-address',
        method: 'POST',
        body: {
          user_id
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;


          // if (result?.data?.message) {
          //   const message = result.data.message
          //   toast.success(message)
          // }
        } catch (error) {
          console.error('Get Shipping Address Api Error:', error);
        }
      },
    }),
  }),
});

export const { useFetchaddShippingAddressMutation, useFetchgetShippingAddressMutation } = shippingAddressApi;
