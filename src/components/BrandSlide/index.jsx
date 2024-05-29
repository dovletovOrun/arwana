import { useContext, useState, useEffect } from "react";

import CustomCursorContext from "../Cursor/context/CustomCursorContext";

import styles from "./brand-slide.module.scss";

import brand1 from "../../assets/brand/brand1.png";


export default function BrandSlide({ onClick, brand }) {
  const { setType } = useContext(CustomCursorContext);

  return (
    <div className={styles.slide} onClick={onClick}>
      {brand > 0 ? (
        <img
          src={brand1}
          alt="brand"
          onMouseEnter={() => setType("hamburger")}
          onMouseLeave={() => setType("default")}
        />
      ) : (
        <img
          src={brand}
          alt="brand"
          onMouseEnter={() => setType("hamburger")}
          onMouseLeave={() => setType("default")}
        />
      )}
    </div>
  );
}
