import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { IaddressResponse } from '@/types/adress';



const initialState: IaddressResponse = {
  id: "",
  user_id: 0,
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  address: "",
  provinces: "",
  disctrict: "",
  village: "",
  postal_code: "",
  neighborhood: "",
  address_name: "",
  province_name: "",
  village_name: "",
  district_name: "",


}

export const siteShippingAddressSlice = createSlice({
  name: 'shippingaddress',
  initialState,
  reducers: {
    updateShippingAddress: (state, action: PayloadAction<Partial<IaddressResponse>>) => {
      Object.assign(state, action.payload);
    }
  },
});

export const {
  updateShippingAddress
} = siteShippingAddressSlice.actions;

// Selectors
export const selectShippingAddress = (state: RootState) => state.siteShippingAddressSlice;

export default siteShippingAddressSlice.reducer;
