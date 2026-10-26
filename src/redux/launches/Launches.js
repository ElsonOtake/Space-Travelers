import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetLaunches } from '../api';

export const fetchLaunches = createAsyncThunk('launches/fetch', axiosGetLaunches, {
  condition: (_, { getState }) => {
    const { status } = getState().launches;
    return status === 'idle' || status === 'failed';
  },
});

const launchesSlice = createSlice({
  name: 'launches',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    toggleLaunch: (state, action) => ({
      ...state,
      items: state.items.map((launch) => (launch.id === action.payload
        ? { ...launch, reserved: !launch.reserved } : launch)),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => ({ ...state, status: 'loading', error: null }))
      .addCase(fetchLaunches.fulfilled, (state, action) => ({
        ...state, items: action.payload, status: 'succeeded',
      }))
      .addCase(fetchLaunches.rejected, (state) => ({
        ...state, status: 'failed', error: 'Unable to load launches. Please try again.',
      }));
  },
});

export const { toggleLaunch } = launchesSlice.actions;
export default launchesSlice.reducer;
