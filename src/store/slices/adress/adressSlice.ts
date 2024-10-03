import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { District, IProvince } from '@/types/adress';

interface IinitialState {
    provinces: IProvince[]
    districts: District[]
}

const initialState: IinitialState = {
    provinces: [],
    districts: []
}

export const adressSlice = createSlice({
    name: 'adress',
    initialState,
    reducers: {
        updateProvinces: (state, action: PayloadAction<IProvince[]>) => {
            state.provinces = action.payload
        },
        updateDistricts: (state, action: PayloadAction<District[]>) => {
            state.districts = action.payload
        }
    },
});

export const {
    updateProvinces,
    updateDistricts
} = adressSlice.actions;

// Selectors
export const selectAdress = (state: RootState) => state.adress;

export default adressSlice.reducer;
