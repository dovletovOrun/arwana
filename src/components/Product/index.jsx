import { useState, useEffect } from "react";
// import useBound from "../../hooks/useBound";
import { useNavigate, useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ReactImageGallery from "react-image-gallery";
// import { getOneProduct } from "../../store/admin/products";
import { useTranslation } from "react-i18next";
// import CustomCursorContext from "../Cursor/context/CustomCursorContext";
import { motion } from "framer-motion";

import FlipButton from "../FlipButton";
// import ShowRoom from "../../components/ShowRoom";
import ProductDrawer from "../ProductDrawer";
import Inputs from "../Inputs";

import styles from "./product.module.scss";
// import product1 from "../../assets/product/product1.png";
// import product2 from "../../assets/product/product2.png";
// import product3 from "../../assets/product/product3.png";

import PageWrapper from "../PageWrapper";
// import { t } from "i18next";
import { getAllBrandsApi } from "../../Services/GetAllBrands";

const animationDelay = 150;
// const imagePath = import.meta.env.VITE_IMAGE_PATH;

export default function Product() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productDetail } =
    getAllBrandsApi.useGetAllProductDetailsDataQuery(id);

  console.log(productDetail);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const [technicalDataDrawer, setTechnicalDataDrawer] = useState(false);
  const [contactDrawer, setContactDrawer] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [product, setProduct] = useState({});

  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    if (lang === "tm") {
      setAnimatedText(productDetail?.name_tk);
    } else if (lang === "ru") {
      setAnimatedText(productDetail?.name_ru);
    } else {
      setAnimatedText(productDetail?.name_en);
    }
  }, [
    lang,
    productDetail?.name_tk,
    productDetail?.name_ru,
    productDetail?.name_en,
  ]);

  const formattedGallery =
    productDetail?.galleries?.map((gallery) => ({
      original: gallery.thumbnail,
      thumbnail: gallery.thumbnail,
    })) || [];
  const formattedFasades =
    productDetail?.fasades?.map((fasade) => ({
      original: fasade.thumbnail,
      thumbnail: fasade.thumbnail,
    })) || [];

  return (
    <PageWrapper>
      <div className={styles.GoBackBtn}>
        <button onClick={() => navigate(-1)}>{t("menu.goback")}</button>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.titleContainer}>
          {!isTablet ? (
            <h1 className={styles.mainText}>
              {animatedText &&
                animatedText.split("").map((char, i) => {
                  return (
                    <motion.div
                      animate={{
                        opacity: [0, 1],
                        translateY: [100, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: (animationDelay + i * 20) / 1000,
                      }}
                      key={char + i}
                    >
                      {char}
                    </motion.div>
                  );
                })}
            </h1>
          ) : (
            <h1 className={styles.resTitle}>{animatedText}</h1>
          )}
        </div>
        {formattedGallery.length > 0 && (
          <ReactImageGallery
            items={formattedGallery}
            thumbnailPosition="bottom"
            showFullscreenButton={true}
            showPlayButton={false}
            showNav={true}
            sizes={100}
          />
        )}
        <div className={styles.productDef}>
          <p>
            {lang === "tm"
              ? productDetail?.description_tk
              : lang === "ru"
              ? productDetail?.description_ru
              : productDetail?.description_en}
          </p>
          <div className={styles.buttons}>
            <FlipButton
              bgColor={"#000"}
              insideText={t("menu.requestinfo")}
              textColor={"#fff"}
              onClick={() => {
                if (technicalDataDrawer) {
                  setTechnicalDataDrawer(false);
                }

                setContactDrawer(!contactDrawer);
              }}
            />
            {product.price ? (
              <div className={styles.price}>{product.price} tmt</div>
            ) : null}
          </div>
          <ProductDrawer condition={contactDrawer}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Inputs />
            </div>
          </ProductDrawer>
        </div>
        {formattedFasades.length > 0 && (
          <div className={styles.fasades}>
            <h1 className={styles.mainTextFasades}>{t("product.facades")}</h1>
            <ReactImageGallery
              items={formattedFasades}
              thumbnailPosition="bottom"
              showFullscreenButton={true}
              showPlayButton={false}
              showNav={true}
              sizes={100}
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
