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
  reload: boolean
}

const initialState: LanguageState = {
  languageData: [],
  reload: false
}

export const siteLanguageSlice = createSlice({
  name: 'languageList',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<Language[]>) => {
      state.languageData = action.payload
    },
    mapLanguage: (state, action) => {
      state.reload = action.payload.reload;
    },
  },
});

export const {
  updateLanguage,
  mapLanguage
} = siteLanguageSlice.actions;

// Selectors
export const selectLanguage = (state: RootState) => state.siteLanguage;
export default siteLanguageSlice.reducer;
