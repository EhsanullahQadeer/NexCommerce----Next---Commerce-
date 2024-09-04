import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';


export interface Language {
  id: number
  language_code: string
  language_name: string
  created_at: string
  updated_at: string
 
}

export interface LanguageState {
  languageData: Language[]
}

const initialState: LanguageState = {
  languageData: []
}

export const siteLanguageSlice = createSlice({
  name: 'languageList',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<Language[]>) => {
      state.languageData = action.payload
    }
  },
});

export const {
  updateLanguage
} = siteLanguageSlice.actions;

// Selectors
export const selectLanguage = (state: RootState) => state.siteLanguage;

export default siteLanguageSlice.reducer;
