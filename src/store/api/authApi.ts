'use client'
import { apiSlice } from "../slices/api/apiSlice";
import { userLoggedIn } from "../slices/auth/authSlice";
import { toast } from "react-toastify";


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint here
    login: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (!result.data.data) {
            const message = result.data.message
            toast.error(message)
            throw new Error(message)
          } else {
            const message = result.data.message
            toast.success(message)
          }

          dispatch(
            userLoggedIn({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {
          return error;
        }
      },
    }),
    // signup endpoint here
    signUp: builder.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (!result.data.data) {
            const message = result.data.message
            toast.error(message)
            throw new Error(message)
          } else {
            const message = result.data.message
            toast.success(message)
          }
        } catch (error: any) {
          console.log("Registration Error:", error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
