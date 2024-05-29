import { useContext } from "react";
import { useTranslation } from "react-i18next";

import PageWrapper from "../../components/PageWrapper";
import CustomCursorContext from "../../components/Cursor/context/CustomCursorContext";
import RevealImage from "../../components/RevealingImage";
// import ShowRoom from '../../components/ShowRoom';
// import AdvCard from '../../components/AdvCard';

import main1 from "../../assets/home/main1.jpg";
import main3 from "../../assets/home/main3.png";

import styles from "./main.module.scss";
import { getAllWhyArwanaApi } from "../../Services/WhyArwana";
import { useSelector } from "react-redux";

export default function Main() {
  const { setType } = useContext(CustomCursorContext);
  const { t } = useTranslation();
  const { data } = getAllWhyArwanaApi.useGetAllWhyArwanaDataQuery();

  const lang = useSelector((state) => state.lang.lang);

  return (
    <PageWrapper>
      <main className={styles.mainContainer}>
        <div
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${
              data?.main_image_thumbnail?.length > 0
                ? data.main_image_thumbnail
                : main1
            })`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
          }}
          className={styles.mainWelcome}
        >
          <div>
            <h3 className={styles.secondaryText}>{t("aboutus.welcome")}</h3>
            <div
              className={styles.mainTextContainer}
              onMouseEnter={() => setType("clickable")}
              onMouseLeave={() => setType("default")}
            >
              <h1 className={styles.mainText}>Arwana Mebel</h1>
            </div>
          </div>
        </div>
        <div className={styles.aboutSection}>
          <h2 className={styles.aboutUsHeader}>
            {lang === "tm"
              ? data?.title_tk
              : lang === "ru"
              ? data?.title_ru
              : data?.title_en}
          </h2>
          <p className={styles.aboutUsPar}>
            {lang === "tm"
              ? data?.desc_tk
              : lang === "ru"
              ? data?.desc_ru
              : data?.desc_en}
          </p>
          <RevealImage
            image={
              data?.image_thumbnail?.length > 0 ? data.image_thumbnail : main3
            }
          />
        </div>
        <div className={styles.advantageSection}>
          <h2 className={styles.advanTitle}>
            {lang === "tm"
              ? data?.advantages_title
              : lang === "ru"
              ? data?.advantages_title
              : data?.advantages_title}
          </h2>
          <p className={styles.advanP}>
            {lang === "tm"
              ? data?.advantages_text
              : lang === "ru"
              ? data?.advantages_text
              : data?.advantages_text}
          </p>
        </div>
      </main>
    </PageWrapper>
  );
}
