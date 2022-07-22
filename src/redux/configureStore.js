import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import missionsReducer, { missionsSliceReducer } from './missions/Missions';
import rocketsReducer from './rockets/Rockets';

const rootReducer = combineReducers({
  missionsReducer,
  missionsSliceReducer,
  rocketsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
