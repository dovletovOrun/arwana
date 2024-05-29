import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setLang } from "../../store/lang";

import CustomCursorContext from "../Cursor/context/CustomCursorContext";

import camel from "../../assets/logo/camel.png";
import logoName from "../../assets/logo/name.png";
import en from "../../assets/footer/en.png";
import tm from "../../assets/footer/tm.png";
import ru from "../../assets/footer/ru.png";

import { FaInstagram } from "react-icons/fa";

import styles from "./footer.module.scss";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(true);
  const { setType } = useContext(CustomCursorContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin") ||
      location.pathname === "/loginadmin"
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location]);

  return (
    <footer
      className={styles.footer}
      style={{
        display: isVisible ? "flex" : "none",
      }}
    >
      <div onClick={() => navigate("/")}>
        <img className={styles.img} src={camel} alt="arwana" />
      </div>
      <div onClick={() => navigate("/")}>
        <img
          className={`${styles.img} ${styles.brandName}`}
          src={logoName}
          alt="arwana"
        />
      </div>
      <p className={styles.footerP}>{t("footer.followus")}</p>
      <div className={styles.contactSection}>
        <div>
          <p>{t("footer.address")}</p>
          <p>73/1 Ashgabat, Turkmenistan</p>
        </div>
        <div>
          <a href="tel:+99312456999">
            <p>T. 45-69-99</p>
          </a>
          <a href="tel:+99371719303">
            <p>T. +993 71719303</p>
          </a>
        </div>
        <div>
          <a href="mailto:info.arwana.mebel@gmail.com">
            <p>info.arwana.mebel@gmail.com</p>
          </a>
        </div>
      </div>

      <div className={styles.langSection}>
        <div
          onMouseEnter={() => setType("button")}
          onMouseLeave={() => setType("default")}
          onClick={() => {
            dispatch(setLang("tm"));
            i18n.changeLanguage("tm");
            localStorage.setItem("lang", "tm");
          }}
        >
          <img src={tm} alt="english" />
          <p>tm</p>
        </div>
        <div
          onMouseEnter={() => setType("button")}
          onMouseLeave={() => setType("default")}
          onClick={() => {
            dispatch(setLang("en"));
            i18n.changeLanguage("en");
            localStorage.setItem("lang", "en");
          }}
        >
          <img src={en} alt="english" />
          <p>en</p>
        </div>
        <div
          onMouseEnter={() => setType("button")}
          onMouseLeave={() => setType("default")}
          onClick={() => {
            dispatch(setLang("ru"));
            i18n.changeLanguage("ru");
            localStorage.setItem("lang", "ru");
          }}
        >
          <img src={ru} alt="english" />
          <p>ru</p>
        </div>
      </div>

      <a href="https://www.instagram.com/arwana_mebel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
        <div
          className={styles.ig}
          onMouseEnter={() => setType("button")}
          onMouseLeave={() => setType("default")}
        >
          <FaInstagram />
        </div>
      </a>
    </footer>
  );
}
