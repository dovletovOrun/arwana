import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../interceptor";
import axios from "axios";

const server = import.meta.env.VITE_BASE_URL;

const initialState = {
  isCategoriesLoading: false,
  errorStatus: "",
  categories: [],
};

export const getCategories = createAsyncThunk(
  "categories/getAllCats",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}category`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const getOneCategory = createAsyncThunk(
  "categories/getOneCat",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}category/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post("/api/category", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCat",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(`/api/category/${data.id}`, data.category);
      return res.data;
    } catch {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCat",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/category/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const uploadCatImage = createAsyncThunk(
  "categories/uploadCatImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(`/api/category/image/${data.id}`, data.image);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCatImage = createAsyncThunk(
  "categories/deletecatImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(
        `/api/category/${data.itemId}/image/${data.imageId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const bindBrandCat = createAsyncThunk(
  "categories/bindBrandCat",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/brand-category/${data.brandId}/${data.catId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);
export const deleteCatBrand = createAsyncThunk(
  "categories/deleteCatBrand",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(
        `/api/brand-category/${data.brandId}/${data.catId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const categories = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isCategoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isCategoriesLoading = false;
        if (action.payload) {
          state.categories = action.payload.categories;
        }
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isCategoriesLoading = false;
        state.errorStatus = action.payload;
      });
  },
});

export default categories.reducer;
