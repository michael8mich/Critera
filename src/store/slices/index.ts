import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import languageSlice from './languageSlice';
import entrepreneurSlice from './entrepreneurSlice';

const rootReducer = combineReducers({
  app: appSlice,
  language: languageSlice,
  entrepreneur: entrepreneurSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;