import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CustomCursorContext from "../Cursor/context/CustomCursorContext";
import furn from "../../assets/home/furn.png";

import styles from "./horizontal-card.module.scss";

export default function HorizontalCard({ isTitle, cat }) {
  const { setType } = useContext(CustomCursorContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = useSelector((state) => state.lang.lang);

  return (
    <div className={`${isTitle ? styles.cardOnlyText : styles.card} h-card`}>
      {isTitle ? (
        <>
          <div
            onMouseEnter={() => setType("clickable")}
            onMouseLeave={() => setType("default")}
            className={styles.horSectionTitle}
          >
            {t("mainpage.allcats")}
          </div>
        </>
      ) : (
        <div
          onClick={() =>
            navigate(`/category/${cat.id}`)
          }
          className={styles.contentContainer}
        >
          <div
            className={styles.cardImageContainer}
            onMouseEnter={() => setType("clickable")}
            onMouseLeave={() => setType("default")}
          >
            <img
              src={
                cat.thumbnail && cat.thumbnail.length > 1 ? cat.thumbnail : furn
              }
              alt="arwana_category"
            />
          </div>
          <div className={styles.mainTextContainer}>
            <h3 className={styles.cardTitle}>
              {lang === "tm"
                ? cat.name_tk
                : lang === "ru"
                ? cat.name_ru
                : cat.name_en}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
