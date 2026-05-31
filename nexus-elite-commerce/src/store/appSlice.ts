import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  role: string | null;
  tenant: string | null;
}

const initialState: AppState = {
  role: null,
  tenant: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setTenant: (state, action: PayloadAction<string>) => {
      state.tenant = action.payload;
    },
  },
});

export const { setRole, setTenant } = appSlice.actions;
export default appSlice.reducer;
