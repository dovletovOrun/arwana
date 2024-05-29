import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useBound from "../../hooks/useBound";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


import CustomCursorContext from "../Cursor/context/CustomCursorContext";
import FlipButton from "../FlipButton";

import styles from "./product-grid.module.scss";


export default function ProductGrid({
  sectionTitle,
  tabs,
  descData
}) {
  const { setType } = useContext(CustomCursorContext);

  const navigate = useNavigate();
  const gridRef = useRef(null);
  const { t } = useTranslation();
  const location = useLocation();

  const lang = useSelector((state) => state.lang.lang);

  const isOnScreen = useBound(gridRef, 200);
  const [activeTab, setActiveTab] = useState(null);
  const [activeBrand, setActiveBrand] = useState({});
  const [activeCategoryProducts, setActiveCategoryProducts] = useState([]);

  useEffect(() => {
    setActiveCategoryProducts([])
  }, [tabs])




  return (
  
    <section className={styles.gridSection}>
      <h3 className={styles.sectionText}>{sectionTitle}</h3>
      <div className={styles.advantageSection}>
          <p className={styles.advanP}>
            {lang === "tm"
              ? descData?.description_tk
              : lang === "ru"
              ? descData?.description_ru
              : descData?.description_en}
          </p>
        </div>
      <ul className={styles.productTabs}>
        {tabs?.map((tab) => {
          return (
            <li
              onMouseEnter={() => setType("button")}
              onMouseLeave={() => setType("default")}
              key={tab.id}
              style={{
                color: activeTab === tab.id ? "#fff" : "",
              }}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveBrand(tab);
                setActiveCategoryProducts(tab?.products);
              }}
            >
              {lang === "tm"
                ? tab.name_tk
                : lang === "ru"
                ? tab.name_ru
                : tab.name_en}
            </li>
          );
        })}
      </ul>
      <div className={styles.grid} ref={gridRef}>
        {activeCategoryProducts?.map((pr) => {
          return (
            <div
              style={{
                position: "relative",
              }}
              key={pr.id}
              className={styles.gridItem}
              onClick={() =>
                navigate(`/product/${pr.id}`)
              }
            >
              <div>
                <img
                  className={isOnScreen ? styles.gridImg : ""}
                  onMouseEnter={() => setType("clickable")}
                  onMouseLeave={() => setType("default")}
                  src={pr?.thumbnail}
                  alt={pr?.name_en}
                />
              </div>
              <div className={styles.overlayText}>
                <h1>
                  {lang === "tm"
                    ? pr.name_tk
                    : lang === "ru"
                    ? pr.name_ru
                    : pr.name_en}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      {location.pathname === "/allbrands" ? (
        <div
          style={{
            marginTop: 30,
          }}
        >
          <FlipButton
            bgColor={"#000"}
            insideText={t("brands.allproducts")}
            textColor={"#fff"}
            isDownload={true}
            onClick={() => {
              navigate("/brand/" + activeBrand.id);
            }}
          />
        </div>
      ) : null}
    </section>

  );
}
