import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getOneBrand } from "../../store/admin/brands";

import { motion } from "framer-motion";

import PageWrapper from "../PageWrapper";

import FlipButton from "../FlipButton";
import ProductGrid from "../ProductGrid";

import brand1 from "../../assets/brand/brand1.png";

import styles from "./brand.module.scss";
import { getAllBrandsApi } from "../../Services/GetAllBrands";

const animationDelay = 150;
const imagePath = import.meta.env.VITE_IMAGE_PATH;

export default function Brand() {
  const {id} = useParams()
  const {data: brandData} = getAllBrandsApi.useGetAllBrandDetailsDataQuery(id)
  console.log(brandData);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const { state } = useLocation();
  const lang = useSelector((state) => state.lang.lang);
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [catalog, setCatalog] = useState({});
  const [brand, setBrand] = useState({});
  const [animatedText, setAnimatedText] = useState("");
  useEffect(() => {
      
      const setAnimatedTextWithLang = () => {
        if (lang === "tm") {
          setAnimatedText(brandData?.name_tk);
        } else if (lang === "ru") {
          setAnimatedText(brandData?.name_ru);
        } else if (lang === "en") {
          setAnimatedText(brandData?.name_en);
        }
      };
      setAnimatedTextWithLang();

      return () => setAnimatedText(""); 

    
    
  }, [lang, brandData?.name_ru, brandData?.name_tk, brandData?.name_en]);

  return (
    <PageWrapper>
      <div className={styles.brandContainer}>
        <div
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${
              brandData?.thumbnail?.length > 0
                ? brandData?.thumbnail
                : brand1
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className={styles.brandMain}
        >
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
            <h3 className={styles.secondaryText}>Arwana mebel</h3>
            {isTablet && (
              <h2 className={styles.resTitle}>
                {state?.name ? state?.name : animatedText}
              </h2>
            )}
          </div>
        </div>

        <ProductGrid sectionTitle={animatedText} descData={brandData}  tabs={brandData?.products} />


        <div className={styles.btnContainer}>
          <FlipButton
            bgColor={"#000"}
            insideText={t("brands.downloadcatalog")}
            textColor={"#fff"}
            isDownload={true}
            href={brandData?.catalog}
          />
        </div>


      </div>
    </PageWrapper>
  );
}
