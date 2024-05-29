import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";



import PageWrapper from "../PageWrapper";
import ProductGrid from "../ProductGrid";
// import FlipButton from "../FlipButton";
// import ShowRoom from "../ShowRoom";

import styles from "./category.module.scss";

import brand1 from "../../assets/brand/brand1.png";
import { getAllCategoryApi } from "../../Services/Category";

const animationDelay = 150;


export default function Category() {
  const {id} = useParams()

  const {data: categoryData} = getAllCategoryApi.useGetAllSubcategoryDataQuery(id)
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const { state } = useLocation();
  console.log(categoryData)


  const lang = useSelector((state) => state.lang.lang);
  const [animatedText, setAnimatedText] = useState("");
  useEffect(() => {
      
    const setAnimatedTextWithLang = () => {
      if (lang === "tm") {
        setAnimatedText(categoryData?.name_tk);
      } else if (lang === "ru") {
        setAnimatedText(categoryData?.name_ru);
      } else if (lang === "en") {
        setAnimatedText(categoryData?.name_en);
      }
    };
    setAnimatedTextWithLang();

    return () => setAnimatedText(""); // Reset on unmount

  
  
}, [lang, categoryData?.name_ru, categoryData?.name_tk, categoryData?.name_en]);

  // useEffect(() => {
  //   dispatch(getOneCategory(state.id)).then((res) => {
  //     if (lang === "tm") {
  //       setCatName(res.payload.tkmTitle);
  //     } else if (lang === "ru") {
  //       setCatName(res.payload.ruTitle);
  //     } else if (lang === "en") {
  //       setCatName(res.payload.enTitle);
  //     } else {
  //       setCatName("");
  //     }

  //     setCategory(res.payload);
  //     const tabs = res.payload.categoryBrands.map((tab) => {
  //       return {
  //         id: tab.brand.id,
  //         products: tab.products,
  //         tkmTitle: tab.brand.tkmTitle,
  //         ruTitle: tab.brand.ruTitle,
  //         enTitle: tab.brand.enTitle,
  //       };
  //     });

  //     setBrands(tabs);
  //   });
  // }, [dispatch, state]);

  return (
    <PageWrapper>
      <div className={styles.categoryContainer}>
        <div
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${
              categoryData?.thumbnail?.length > 0
                ? categoryData?.thumbnail
                : brand1
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className={styles.categoryMain}
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
        <ProductGrid 
        sectionTitle={animatedText} 
        tabs={categoryData?.products} />

   
      </div>
    </PageWrapper>
  );
}
