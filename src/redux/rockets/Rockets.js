import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetRockets } from '../api';

export const getList = createAsyncThunk('rockets/fetch', axiosGetRockets, {
  condition: (_, { getState }) => {
    const { status } = getState().rocketsReducer;
    return status === 'idle' || status === 'failed';
  },
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    reserveRocket: (state, action) => ({
      ...state,
      items: state.items.map((rocket) => (rocket.id === action.payload
        ? { ...rocket, reserved: !rocket.reserved } : rocket)),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => ({ ...state, status: 'loading', error: null }))
      .addCase(getList.fulfilled, (state, action) => ({
        ...state, items: action.payload, status: 'succeeded',
      }))
      .addCase(getList.rejected, (state) => ({
        ...state, status: 'failed', error: 'Unable to load rockets. Please try again.',
      }));
  },
});

export const { reserveRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
