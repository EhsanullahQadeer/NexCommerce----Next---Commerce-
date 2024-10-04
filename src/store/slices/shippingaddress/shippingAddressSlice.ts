import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface ShippingAddressSlice {
  id: string
  user_id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  address: string;
  provinces: string | number
  disctrict: string | number
  village: string | number
  postal_code: string
  neighborhood: string
  address_name: string
}

const initialState: ShippingAddressSlice = {
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
  address_name: ""
}

export const siteShippingAddressSlice = createSlice({
  name: 'shippingaddress',
  initialState,
  reducers: {
    updateShippingAddress: (state, action: PayloadAction<Partial<ShippingAddressSlice>>) => {
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
