import React from "react";

import { Routes, Route } from "react-router-dom";

import {
  getOneBrand,
  uploadBrandImage,
  deleteBrandImage,
} from "../../../store/admin/brands";

import ImageUpload from "../../../components/ImageUpload";
import BrandsList from "./BrandsList";

export default function Categories() {
  return (
    <Routes>
      <Route element={<BrandsList />} path="/" />
      <Route
        element={
          <ImageUpload
            uploadMethod={uploadBrandImage}
            deleteMethod={deleteBrandImage}
            updatePageMethod={getOneBrand}
          />
        }
        path="/imageupload"
      />
    </Routes>
  );
}
