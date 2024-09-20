import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface state {
  value: number
  label: string
  villages:[]
}

export interface stateState {
  stateData: state[]
}

const initialState: stateState = {
  stateData: []
}

export const siteStateSlice = createSlice({
  name: 'statelist',
  initialState,
  reducers: {
    saveStateList: (state, action: PayloadAction<{ id: number, district_name: string,villages:[] }[]>) => {
      state.stateData = action.payload.map((row) => { return { value: row.id, label: row.district_name,villages:row.villages } })
      state.stateData=[{ value: 0, label: 'State', villages:[]},...state.stateData]
    }
  },
});

export const {
  saveStateList
} = siteStateSlice.actions;

// Selectors
export const selectstateList = (state: RootState) => state.siteState;

export default siteStateSlice.reducer;
