import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  const token = localStorage.getItem('access_token');
  return token || "";
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = getAuthToken() || (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["User", "Product", "Category", "Cart", "SiteSetting", "Sliders", "Wishlist","Currencylist","CoupenCode","SiteCity"],
  endpoints: () => ({}),
});
