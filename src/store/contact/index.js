import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = import.meta.env.VITE_BASE_URL;

const initialState = {
  isContactLoading: false,
  errorStatus: "",
  messageInfo: {},
};

export const sendMail = createAsyncThunk(
  "contact/sendMail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/mails", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const contact = createSlice({
  name: "contact",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.isContactLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.isContactLoading = false;
        state.messageInfo = action.payload;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.isContactLoading = false;
        state.errorStatus = action.payload;
      });
  },
});

export default contact.reducer;
