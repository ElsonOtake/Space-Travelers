import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetMissions } from '../api';

const FETCH = 'space-travelers/missions/FETCH';
const JOIN_MISSION = 'space-travelers/missions/JOIN_MISSION';
const initialState = {
  loading: false,
};

const missionsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    case JOIN_MISSION:
      return state.map(mission => mission.id !== action.id ? mission : { ...mission, reserved: true });
    default:
      return state;
  }
};

export const fetchMissions = createAsyncThunk(
  FETCH,
  async (_, { dispatch }) => {
    const res = await axiosGetMissions()
      .then(
        (data) => dispatch({
          type: FETCH,
          payload: data,
        }),
      );
    return res;
  },
);

export const joinMission = (id) => ({
  type: JOIN_MISSION,
  id,
});

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
