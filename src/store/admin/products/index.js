import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import $api from "../../../interceptor";

const server = import.meta.env.VITE_BASE_URL;

const initialState = {
  products: [],
  isProductsLoading: false,
  errorStatus: "",
};

export const getProducts = createAsyncThunk(
  "adminProducts/getProducts",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/products`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "adminProducts/getOneProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/products/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(`/api/products/${data.catId}`, data.product);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(
        `/api/products/${data.productId}`,
        data.product
      );

      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/products/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const uploadProductImage = createAsyncThunk(
  "adminProducts/uploadProductImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(`/api/products/image/${data.id}`, data.image);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "adminProducts/deleteProductImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(
        `/api/products/${data.itemId}/image/${data.imageId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const products = createSlice({
  name: "adminProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.errorStatus = action.payload;
      });
  },
});

export default products.reducer;
