import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import Cookies from 'js-cookie';

interface CoupenCodeSlice {
  coupon_code: string;
  couponData:any
}

const initialState: CoupenCodeSlice = {

  coupon_code: Cookies.get('coupon_code') || "",
  couponData:null
}

export const siteCoupenCodeSlice = createSlice({
  name: 'coupencode',
  initialState,
  reducers: {
    updateCoupenCode: (state, action: PayloadAction<Partial<CoupenCodeSlice>>) => {
      Object.assign(state, action.payload);
    },
    clearCoupon:(state)=>{
      state.coupon_code = "";
      state.couponData = null;
      Cookies.remove("coupon_code");
    }
  },
});

export const {
  updateCoupenCode,
  clearCoupon
} = siteCoupenCodeSlice.actions;

// Selectors
export const selectCoupenCode = (state: RootState) => state.siteCoupenCodeSlice;

export default siteCoupenCodeSlice.reducer;
