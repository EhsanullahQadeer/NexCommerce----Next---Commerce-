// src/slices/siteSettingApi.ts
import { apiSlice } from "../slices/api/apiSlice";
import { updateSiteSettings } from "../slices/siteSetting/siteSettingSlice";

export const siteSettingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSiteSettings: builder.mutation({
      query: () => ({
        url: 'site-setting',
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

          console.log("data", data);
          dispatch(updateSiteSettings(data.data))
          
        } catch (error) {
          console.error('Fetch Filtered Products Error:', error);
        }
      },
    }),
    fetchupdateSiteSettings: builder.mutation({
      query: ({ key, value }) => ({
        url: 'update-site-setting',
        method: 'POST',
        body: {
          key, value
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {data} = await queryFulfilled;

        } catch (error) {
          console.error('Fetch Update Products Error:', error);
        }
      },
    })
  }),
  
});

export const { useFetchSiteSettingsMutation,useFetchupdateSiteSettingsMutation } = siteSettingApi;
