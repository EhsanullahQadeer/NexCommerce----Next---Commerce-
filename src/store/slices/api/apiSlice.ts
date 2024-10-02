import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setOpenAuthModal } from "../auth/authSlice";
import { toast } from "react-toastify";
import { showToast } from "@/utility/showToast";
import { handleLogout } from "@/utility/handleLogout";

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
const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle global error detection
  if (result.error) {
    if (result.error.status === 401) {
      handleLogout()
    } else {
      showToast('An error occurred. Please try again later.', 'general_error');
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Product", "Category", "Cart", "SiteSetting", "Sliders", "Wishlist", "Currencylist", "CoupenCode", "SiteCity"],
  endpoints: () => ({}),
});
