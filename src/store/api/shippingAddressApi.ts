// src/slices/cartApi.ts
import { toast } from "react-toastify";
import { apiSlice } from "../slices/api/apiSlice";
import { updateShippingAddress } from "../slices/shippingaddress/shippingAddressSlice";
import { IAddress } from "@/types/adress";

export const shippingAddressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addShippingAddress: builder.mutation({
      query: (addressData:IAddress) => ({
        url: 'add-shipping-address',
        method: 'POST',
        body: {
          ...addressData
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
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
          if(result?.data?.data){
            dispatch(updateShippingAddress(result.data.data))
          }
          
        } catch (error) {
          console.error('Get Shipping Address Api Error:', error);
        }
      },
    }),
  }),
});

export const { useAddShippingAddressMutation, useFetchgetShippingAddressMutation } = shippingAddressApi;
