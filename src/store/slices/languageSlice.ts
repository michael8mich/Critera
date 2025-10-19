import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguage: string;
  isRtl: boolean;
  availableLanguages: {
    code: string;
    name: string;
    flag: string;
    isRtl: boolean;
  }[];
}

const initialState: LanguageState = {
  currentLanguage: 'he',
  isRtl: true,
  availableLanguages: [
    { code: 'he', name: 'עברית', flag: '🇮🇱', isRtl: true },
    { code: 'en', name: 'English', flag: '🇺🇸', isRtl: false },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const language = state.availableLanguages.find(
        lang => lang.code === action.payload
      );
      if (language) {
        state.currentLanguage = action.payload;
        state.isRtl = language.isRtl;
      }
    },
    toggleDirection: (state) => {
      state.isRtl = !state.isRtl;
    },
  },
});

export const { setLanguage, toggleDirection } = languageSlice.actions;
export default languageSlice.reducer;