import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


interface CoupenCodeSlice {
  coupon_code: string
}

const initialState: CoupenCodeSlice = {

  coupon_code: ""
}

export const siteCoupenCodeSlice = createSlice({
  name: 'coupencode',
  initialState,
  reducers: {
    updateCoupenCode: (state, action: PayloadAction<Partial<CoupenCodeSlice>>) => {
      Object.assign(state, action.payload);
    }
  },
});

export const {
  updateCoupenCode
} = siteCoupenCodeSlice.actions;

// Selectors
export const selectCoupenCode = (state: RootState) => state.siteCoupenCodeSlice;

export default siteCoupenCodeSlice.reducer;
