import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import $api from "../../../interceptor";

const server = import.meta.env.VITE_BASE_URL;

const initialState = {
  brands: [],
  isBrandsLoading: false,
  errorStatus: "",
};

// export const getBrands = createAsyncThunk(
//   "adminBrands/getBrands",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${server}/brand/slider`);
//       return res;
//     } catch (e) {
//       return rejectWithValue(e.response.status);
//     }
//   }
// );

export const getOneBrand = createAsyncThunk(
  "adminBrands/getOneBrand",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/brands/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const createBrand = createAsyncThunk(
  "adminBrands/createBrand",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(`/api/brands`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "adminBrands/updateBrand",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(`/api/brands/${data.brandId}`, data.brand);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "adminBrands/deleteBrand",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/brands/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const uploadBrandImage = createAsyncThunk(
  "adminBrands/uploadImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(`/api/brands/image/${data.id}`, data.image);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteBrandImage = createAsyncThunk(
  "adminBrands/deleteBrandImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(
        `/api/brands/${data.itemId}/image/${data.imageId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const uploadCatalog = createAsyncThunk(
  "adminBrands/uploadCatalog",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/brands/catalog/${data.brandId}`,
        data.catalog,
        data.config
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteBrandCatalog = createAsyncThunk(
  "adminBrands/deleteBrandCatalog",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(
        `/api/brands/${data.brandId}/catalog/${data.catalogId}`
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

// const brands = createSlice({
//   name: "adminBrands",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(getBrands.pending, (state) => {
//         state.isBrandsLoading = true;
//       })
//       .addCase(getBrands.fulfilled, (state, action) => {
//         state.isBrandsLoading = false;
//         state.brands = action.payload;
//       })
//       .addCase(getBrands.rejected, (state, action) => {
//         state.isBrandsLoading = false;
//         state.errorStatus = action.payload;
//       });
//   },
// });

// export default brands.reducer;
