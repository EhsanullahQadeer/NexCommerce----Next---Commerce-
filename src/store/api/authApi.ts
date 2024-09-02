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
          localStorage.setItem("user", JSON.stringify(result.data.data.user ||''));
          dispatch(
            userLoggedIn({
              user: result.data.data.user,
              isAuthenticated: true
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

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (!result?.data?.data) {
            const message = result.data.message
            toast.error(message)
            throw new Error(message)
          } else {
            const message = result.data.message
            toast.success(message)
          }
          localStorage.setItem("user", JSON.stringify(result.data.data.user ||''));
          dispatch(
            userLoggedIn({
              user: result.data.data.user,
              isAuthenticated: true
            })
          );
        } catch (error: any) {
          if (error?.error?.data?.message) {
            const message = error?.error?.data?.message
            toast.error(message)
          }
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
