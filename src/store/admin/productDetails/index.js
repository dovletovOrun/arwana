import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../interceptor";

const initialState = {};

export const createProductOptions = createAsyncThunk(
  "productDetails/createProductOptions",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/products/options/${data.productId}`,
        data.details
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const updateProductOptions = createAsyncThunk(
  "productDetails/updateProductOptions",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(
        `/api/products/options/${data.optionsId}`,
        data.details
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductOptions = createAsyncThunk(
  "productDetails/deleteProductOptions",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/products/options/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const uploadProductOptionsImage = createAsyncThunk(
  "productDetails/uploadProductOptionsImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/products/options/image/${data.optionsId}`,
        data.image
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductOptionsImage = createAsyncThunk(
  "productDetails/deleteProductOptionsImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(
        `/api/products/options/${data.optionsId}/image/${data.imageId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const productDetails = createSlice({
  name: "productDetails",
  initialState,
});

export default productDetails.reducer;
