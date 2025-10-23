import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import languageSlice from './languageSlice';
import bankerSlice from './bankerSlice';

const rootReducer = combineReducers({
  app: appSlice,
  language: languageSlice,
  banker: bankerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;