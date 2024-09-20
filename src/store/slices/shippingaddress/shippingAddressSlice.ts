import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface ShippingAddressSlice {
  user_id: number
  first_name: string
  last_name: string
  phone: number
  email: string
  address_line1: string
  address_line2: string
  province: string
  district: string
  village: string
  postal_code: number
}

const initialState: ShippingAddressSlice = {
  user_id: 0,
  first_name: "",
  last_name: "",
  phone: 0,
  email: "",
  address_line1: "",
  address_line2: "",
  province: "",
  district: "",
  village: "",
  postal_code: 0
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
