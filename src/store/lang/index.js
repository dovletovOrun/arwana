import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "ru",
};

const lang = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = lang.actions;

export default lang.reducer;
