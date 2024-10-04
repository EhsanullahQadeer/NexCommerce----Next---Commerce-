import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { District, IlocationData, IProvince, Village, } from '@/types/adress';


export const locationInitalData: IlocationData = {
    provinces: { id: 0, name: "" },
    disctrict: { id: 0, name: "" },
    village: { id: 0, name: "" },
};
interface IinitialState {
    provinces: IProvince[]
    districts: District[]
    locationData: IlocationData
    villages: Village[]
}


const initialState: IinitialState = {
    provinces: [],
    districts: [],
    locationData: locationInitalData,
    villages: []
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
        },
        updateVillages: (state, action: PayloadAction<Village[]>) => {
            state.villages = action.payload
        },
        setLocationData: (state, action: PayloadAction<IlocationData>) => {
            state.locationData = action.payload
        }
    },
});

export const {
    updateProvinces,
    updateDistricts,
    setLocationData,
    updateVillages
} = adressSlice.actions;

// Selectors
export const selectAdress = (state: RootState) => state.adress;

export default adressSlice.reducer;
