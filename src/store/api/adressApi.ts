import { updateDistricts, updateProvinces } from "../slices/adress/adressSlice";
import { apiSlice } from "../slices/api/apiSlice";

export const addressApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProvinces: builder.mutation({
            query: () => ({
                url: 'get-provinces',
                method: 'GET',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateProvinces(data.data))
                } catch (error) {
                    console.error("Error fetching provinces:", error);
                }
            }
        }),
        fetchDistricts: builder.mutation({
            query: ({ provinceId }) => ({
                url: 'get-districts/' + provinceId,
                method: 'GET',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(updateDistricts(data.data))

                } catch (error) {
                    console.error('Fetch Filtered States Error:', error);
                }
            },
        }),
    }),
});

export const { useFetchProvincesMutation, useFetchDistrictsMutation } =
    addressApi;
