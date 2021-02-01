import { createSlice } from "@reduxjs/toolkit";

const settings = createSlice({
  name: "settings",
  initialState: { language: "DE" },
  reducers: {
    updateSettings: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export default settings;
