import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface Currency {
  id: number
  currency_code: string
  currency_name: string
  created_at: string
  updated_at: string
  exchange_rate_to_usd: string
}

export interface CurrencyState {
  currencyData: Currency[]
}

const initialState: CurrencyState = {
  currencyData: []
}

export const siteCurrencySlice = createSlice({
  name: 'currencylist',
  initialState,
  reducers: {
    updateCurrency: (state, action: PayloadAction<Currency[]>) => {
      state.currencyData = action.payload
    }
  },
});

export const {
  updateCurrency
} = siteCurrencySlice.actions;

// Selectors
export const selectCurrency = (state: RootState) => state.siteCurrency;

export default siteCurrencySlice.reducer;
