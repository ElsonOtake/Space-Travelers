import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import crewReducer from './crew/Crew';
import launchesReducer from './launches/Launches';
import rocketsReducer from './rockets/Rockets';

const rootReducer = combineReducers({
  crew: crewReducer,
  launches: launchesReducer,
  rocketsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
