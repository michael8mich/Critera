import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import languageSlice from './languageSlice';

const rootReducer = combineReducers({
  app: appSlice,
  language: languageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;