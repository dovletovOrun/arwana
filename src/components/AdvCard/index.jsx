import { useContext } from "react";
import { useTranslation } from "react-i18next";

import CustomCursorContext from "../Cursor/context/CustomCursorContext";

import styles from "./adv-card.module.scss";

export default function AdvCard({ img, text }) {
  const { setType } = useContext(CustomCursorContext);
  const { t } = useTranslation();
  return (
    <div
      onMouseEnter={() => setType("clickable")}
      onMouseLeave={() => setType("default")}
      className={styles.advCard}
    >
      <div className={styles.img}>
        <img src={img} alt="arwana" />
      </div>
      <div className={styles.advCardText}>{t(`aboutus.${text}`)}</div>
    </div>
  );
}
