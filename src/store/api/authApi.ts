import { apiSlice } from "../slices/api/apiSlice";
import { userLoggedIn } from "../slices/auth/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useLoginMutation } = authApi;
