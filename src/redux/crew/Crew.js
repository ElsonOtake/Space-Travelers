import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosGetCrew from '../api';

export const fetchCrew = createAsyncThunk('crew/fetch', axiosGetCrew, {
  condition: (_, { getState }) => {
    const { status } = getState().crew;
    return status === 'idle' || status === 'failed';
  },
});

const crewSlice = createSlice({
  name: 'crew',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    toggleCrew: (state, action) => ({
      ...state,
      items: state.items.map((member) => (member.id === action.payload
        ? { ...member, selected: !member.selected } : member)),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrew.pending, (state) => ({ ...state, status: 'loading', error: null }))
      .addCase(fetchCrew.fulfilled, (state, action) => ({
        ...state, items: action.payload, status: 'succeeded',
      }))
      .addCase(fetchCrew.rejected, (state) => ({
        ...state, status: 'failed', error: 'Unable to load crew. Please try again.',
      }));
  },
});

export const { toggleCrew } = crewSlice.actions;
export default crewSlice.reducer;
