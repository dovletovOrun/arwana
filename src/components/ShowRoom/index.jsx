import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import FlipButton from "../FlipButton";

import show from "../../assets/home/showroom.jpg";

import styles from "./show-room.module.scss";
import useBound from "../../hooks/useBound";

export default function ShowRoom() {
  const textRef = useRef(null);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isOnScreen = useBound(textRef, isTablet ? 50 : 120);
  const { t } = useTranslation();

  const lang = useSelector((state) => state.lang.lang);

  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${show})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 40%",
      }}
      className={styles.showRoom}
    >
      <h2
        className={`${styles.sectionTitle} ${
          isOnScreen && styles.sectionTitleAnimated
        }`}
        ref={textRef}
      >
        {t("menu.showroom")}
      </h2>
      <FlipButton
        bgColor={"#fff"}
        insideText={t("mainpage.explorebtn")}
        textColor={"#000"}
        isAnimated={true}
        isOnScreen={isOnScreen}
      />
    </div>
  );
}
