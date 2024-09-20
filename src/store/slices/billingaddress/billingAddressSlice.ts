import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface BillingAddressSlice {
  user_id: number
  first_name: string
  last_name: string
  phone: number
  email: string
  address_line1: string
  // address_line2: string
  province: string
  district: string
  village: string
  postal_code: number
}

const initialState: BillingAddressSlice = {

  user_id: 0,
  first_name: "",
  last_name: "",
  phone: 0,
  email: "",
  address_line1: "",
  // address_line2: "",
  province: "",
  district: "",
  village: "",
  postal_code: 0
}

export const siteBillingAddressSlice = createSlice({
  name: 'billingaddress',
  initialState,
  reducers: {
    updateBillingAddress: (state, action: PayloadAction<BillingAddressSlice>) => {
      Object.assign(state, action.payload);
    }
  },
});

export const {
  updateBillingAddress
} = siteBillingAddressSlice.actions;

// Selectors
export const selectBillingAddress = (state: RootState) => state.siteBillingAddressSlice;

export default siteBillingAddressSlice.reducer;
