import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface state {
  value: number
  label: string
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
    saveStateList: (state, action: PayloadAction<{ id: number, district_name: string }[]>) => {
      state.stateData = action.payload.map((row) => { return { value: row.id, label: row.district_name } })
      state.stateData=[{ value: 0, label: 'State' },...state.stateData]
    }
  },
});

export const {
  saveStateList
} = siteStateSlice.actions;

// Selectors
export const selectstateList = (state: RootState) => state.siteState;

export default siteStateSlice.reducer;
