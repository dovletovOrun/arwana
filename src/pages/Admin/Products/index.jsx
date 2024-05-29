import React from "react";

import { Routes, Route } from "react-router-dom";

import {
  uploadProductImage,
  deleteProductImage,
  getOneProduct,
} from "../../../store/admin/products";

import ImageUpload from "../../../components/ImageUpload";
import ProductsList from "./ProductsList";
import ProductDetails from "./ProductDetails";

export default function Categories() {
  return (
    <Routes>
      <Route element={<ProductsList />} path="/" />
      <Route element={<ProductDetails />} path="/productdetails/:id" />
      <Route
        element={
          <ImageUpload
            uploadMethod={uploadProductImage}
            deleteMethod={deleteProductImage}
            updatePageMethod={getOneProduct}
          />
        }
        path="/imageupload"
      />
    </Routes>
  );
}
