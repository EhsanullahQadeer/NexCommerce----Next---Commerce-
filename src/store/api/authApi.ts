'use client'
import { apiSlice } from "../slices/api/apiSlice";
import { userLoggedIn } from "../slices/auth/authSlice";

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
          dispatch(
            userLoggedIn({
              user: result.data.data.user,
            })
          );
        } catch (error: any) {
          console.log("error", error);
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
        } catch (error: any) {
          console.log("Registration Error:", error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
