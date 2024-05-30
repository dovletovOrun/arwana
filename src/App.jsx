import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setLang } from "./store/lang";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import CustomCursor from "./components/Cursor";
import CustomCursorManager from "./components/Cursor/context/manager";
// import ProtectedRoute from "./ProtectedRoutes";
import { BounceLoader } from "react-spinners";

const Home = lazy(() => import("./pages/Home"));
const Main = lazy(() => import("./pages/Main"));
const Brand = lazy(() => import("./components/Brand"));
const Category = lazy(() => import("./components/Category"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./components/Product"));
// const LoginAdmin = lazy(() => import("./pages/Admin/Login"));
// const AdminMain = lazy(() => import("./pages/Admin/Main"));
const AllCats = lazy(() => import("./pages/AllCategories"));
const AllBrands = lazy(() => import("./pages/AllBrands"));

const override = {
  display: "block",
  margin: "auto",
};

export default function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const lang = localStorage.getItem("lang");
  const location = useLocation();
  useEffect(() => {
    if (lang) {
      dispatch(setLang(lang));
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage("ru");
    }
    window.scrollTo(0, 0);
  }, [location]);

  

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "grid",
            width: "100%",
            height: "100vh",
            alignContent: "center",
            backgroundColor: "#1c1e1f",
          }}
        >
          <BounceLoader
            cssOverride={override}
            color={"#d3cfbe"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            loading={true}
          />
        </div>
      }
    >
      <CustomCursorManager>
        <CustomCursor />

        <Routes>
          <Route index element={<Home />} path="/" />
          <Route element={<Main />} path="/home" />
          <Route element={<AllCats />} path="/allcategories" />
          <Route element={<AllBrands />} path="/allbrands" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Brand />} path="/brand/:id" />
          <Route element={<Category />} path="/category/:id" />
          <Route element={<Product />} path="/product/:id" />
          {/* <Route element={<LoginAdmin />} path="/loginadmin" />
          <Route element={<Navigate to="/" replace={true} />} path="*" />
          <Route
            element={
              <ProtectedRoute>
                <AdminMain />
              </ProtectedRoute>
            }
            path="/admin/*"
          /> */}
        </Routes>
      </CustomCursorManager>
    </Suspense>
  );
}
