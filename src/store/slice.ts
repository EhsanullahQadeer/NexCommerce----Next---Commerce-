import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// Define a type for the slice state
export interface RootSlice {
  toggleSidebar: boolean;
  fullPageLoader: boolean;
}

// Define the initial state using that type
const initialState: RootSlice = {
  toggleSidebar: false,
  fullPageLoader: false
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    hideSidebarOutSideClick: (state) => {
      state.toggleSidebar = false;
    },
    setFullScreenLoader: (state, action: PayloadAction<boolean>) => {
      state.fullPageLoader = action.payload;
    }
  },
});

export const { toggleSidebar, hideSidebarOutSideClick, setFullScreenLoader } = rootSlice.actions

export const selectSidebarToggle = (state: RootState) =>
  state.root.toggleSidebar;

export default rootSlice.reducer;
