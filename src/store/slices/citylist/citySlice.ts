import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface City {
  value: number
  label: string
}

export interface CityState {
  cityData: City[]
}

const initialState: CityState = {
  cityData: []
}

export const siteCitySlice = createSlice({
  name: 'citylist',
  initialState,
  reducers: {
    saveCityList: (state, action: PayloadAction<{ id: number, name: string }[]>) => {
      state.cityData = action.payload.map((row) => { return { value: row.id, label: row.name } })
    }
  },
});

export const {
  saveCityList
} = siteCitySlice.actions;

// Selectors
export const selectCityList = (state: RootState) => state.siteCity;

export default siteCitySlice.reducer;
