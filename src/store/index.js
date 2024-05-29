import { configureStore } from "@reduxjs/toolkit";
// import auth from "./admin/auth";
// import adminSettings from "./admin/adminSettings";
// import categories from "./admin/categories";
// import products from "./admin/products";
// import brands from "./admin/brands";
// import contact from "./contact";
import lang from "./lang";
// import productDetails from "./admin/productDetails";
import { getAllBrandsApi } from "../Services/GetAllBrands";
import { getAllWhyArwanaApi } from "../Services/WhyArwana";
import { getBrandsLogoApi } from "../Services/BrandsLogo";
import { getAllCategoryApi } from "../Services/Category";


const store = configureStore({
  reducer: {
    // auth,
    // adminSettings,
    // categories,
    // products,
    // // brands,
    // contact,
    lang,
    // productDetails,
    [getAllBrandsApi.reducerPath]: getAllBrandsApi.reducer,
    [getAllWhyArwanaApi.reducerPath]: getAllWhyArwanaApi.reducer,
    [getBrandsLogoApi.reducerPath]: getBrandsLogoApi.reducer,
    [getAllCategoryApi.reducerPath]: getAllCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getAllBrandsApi.middleware,
      getAllWhyArwanaApi.middleware,
      getBrandsLogoApi.middleware,
      getAllCategoryApi.middleware,
    ),
});

export default store;
