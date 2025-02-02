import { createSlice } from '@reduxjs/toolkit';

const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState: {
    key: '',
  },
  reducers: {
    setApiKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

export const { setApiKey } = apiKeySlice.actions;

export default apiKeySlice.reducer;
