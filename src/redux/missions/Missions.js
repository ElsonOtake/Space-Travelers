import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGet } from '../api';

const FETCH = 'space-travelers/missions/FETCH';
const urlMissions = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  loading: false,
};

const missionsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    default:
      return state;
  }
};

export const fetchMissions = createAsyncThunk(
  FETCH,
  async (_, { dispatch }) => {
    const res = await axiosGet(urlMissions)
      .then(
        (data) => dispatch({
          type: FETCH,
          payload: data,
        }),
      );
    return res;
  },
);

export const missionsSlice = createSlice({
  name: 'missionsSlice',
  initialState,
  extraReducers: {
    [fetchMissions.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [fetchMissions.fulfilled]: (state) => ({
      ...state,
      loading: false,
    }),
    [fetchMissions.rejected]: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const missionsSliceReducer = missionsSlice.reducer;

export default missionsReducer;
