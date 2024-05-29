import { lazy } from "react";

import { Routes, Route } from "react-router-dom";

import AdminSidebar from "../../../components/AdminSidebar";
import ProtectedRoute from "../../../ProtectedRoutes";

import styles from "./admin-main.module.scss";

const Categories = lazy(() => import("../Categories"));
const Products = lazy(() => import("../Products"));
const Brands = lazy(() => import("../Brands"));
const Users = lazy(() => import("../Users"));
const ImageUpload = lazy(() => import("../../../components/ImageUpload"));

export default function AdminMain() {
  return (
    <div className={styles.mainAdmin}>
      <AdminSidebar />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
          path="/categories/*"
        ></Route>
        <Route
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
          path="/products/*"
        />
        <Route
          element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          }
          path="/brands/*"
        />
        <Route
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
          path="/admins"
        />
      </Routes>
    </div>
  );
}
