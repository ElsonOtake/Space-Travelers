import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import missionsReducer from "./missions/Missions";

const rootReducer = combineReducers({
  missionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;