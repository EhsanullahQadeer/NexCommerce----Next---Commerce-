// src/slices/cartApi.ts
import { toast } from "react-toastify";
import { apiSlice } from "../slices/api/apiSlice";
import { updateBillingAddress } from "../slices/billingaddress/billingAddressSlice";
import { IAddress } from "@/types/adress";


export const billingAddressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBillingAddress: builder.mutation({
      query: (addressData: IAddress) => ({
        url: 'add-billing-address',
        method: 'POST',
        body: {
          ...addressData
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

        } catch (error) {
          console.error('Add Billing Address Api Error:', error);
        }
      },
    }),

    fetchgetBillingAddress: builder.mutation({
      query: ({ user_id }) => ({
        url: 'get-billing-address',
        method: 'POST',
        body: {
          user_id
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.data) {
            dispatch(updateBillingAddress(result.data.data))
          }
        } catch (error) {
          console.error('Get Billing Address Api Error:', error);
        }
      },
    }),
  }),
});

export const { useAddBillingAddressMutation, useFetchgetBillingAddressMutation } = billingAddressApi;
