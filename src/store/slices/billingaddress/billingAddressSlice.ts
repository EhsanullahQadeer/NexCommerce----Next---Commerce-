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

export const siteBillingAddressSlice = createSlice({
  name: 'billingaddress',
  initialState,
  reducers: {
    updateBillingAddress: (state, action: PayloadAction<IaddressResponse>) => {
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
