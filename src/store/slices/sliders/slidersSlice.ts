import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface SlidersState {
  id: number
  sub_title: string
  title: string
  titleColor: string
  link: string
  button_text: string
  image: string
  small_image: string
  medium_image: string
  created_at: string
  updated_at: string
  is_deleted: number
}

const initialState: SlidersState = {
  id: 0,
  sub_title: "",
  title: "",
  titleColor: "",
  link: "",
  button_text: "",
  image: "",
  small_image: "",
  medium_image: "",
  created_at: "",
  updated_at: "",
  is_deleted: 0
}

export const siteSettingSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    updateSliders: (state, action: PayloadAction<Partial<SlidersState>>) => {
      Object.assign(state, action.payload);
    }
  },
});

export const {
  updateSliders
} = siteSettingSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.siteSettingSlice;

export default siteSettingSlice.reducer;
