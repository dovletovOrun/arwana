import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../interceptor";

const initialState = {
  isSettingsLoading: false,
  errorStatus: "",
  admin: {},
  admins: [],
};

export const getMe = createAsyncThunk(
  "adminSettinsg/getMe",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/admin/users/get-me");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const getAdmins = createAsyncThunk(
  "adminSettings/getAdmins",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("api/admin/users");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "adminSettings/updateAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(`api/admin/users/${data.id}`, data.user);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "adminSettings/deleteAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/admin/users/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const logout = createAsyncThunk(
  "adminSettings/logout",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post("/api/admin/logout");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const adminSettings = createSlice({
  name: "adminSettings",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isSettingsLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isSettingsLoading = false;
        state.admin = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isSettingsLoading = false;
        state.errorStatus = action.payload;
      })
      .addCase(getAdmins.pending, (state) => {
        state.isSettingsLoading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isSettingsLoading = false;
        state.admins = action.payload.users;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.isSettingsLoading = false;
        state.errorStatus = action.payload;
      });
  },
});

export default adminSettings.reducer;
