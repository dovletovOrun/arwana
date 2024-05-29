import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const server = import.meta.env.VITE_BASE_URL;
const cookies = new Cookies();

const initialState = {
  isLoginLoading: false,
  loginErrorStatus: "",
};

export const login = createAsyncThunk(
  "adminAuth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${server}/api/admin/auth/login`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "adminAuth/registration",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await axios.post(
        `${server}/api/admin/auth/registration`,
        data.admin,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const adminAuth = createSlice({
  name: "adminAuth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        cookies.set("adminAccessToken", action.payload.accessToken, {
          path: "/",
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginErrorStatus = action.payload;
      })
      .addCase(registerAdmin.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoginLoading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginErrorStatus = action.payload;
      });
  },
});

export default adminAuth.reducer;
