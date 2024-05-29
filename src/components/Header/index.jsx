import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import HeaderMenu from "../HeaderMenu";
import { Dropdown, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { setLang } from "../../store/lang";

import camel from "../../assets/logo/camel.png";
import logo from "../../assets/logo/name.png";
import logoMobile from "../../assets/logo/logoMobile.png";

import { IoCaretDown } from "react-icons/io5";

import CustomCursorContext from "../Cursor/context/CustomCursorContext";

import styles from "./header.module.scss";
import { getAllCategoryApi } from "../../Services/Category";

const langs = ["ru", "tm", "en"];

export default function Header() {
  const navigate = useNavigate()
  const { setType } = useContext(CustomCursorContext);
  const [headerBgChange, setHeaderBgChange] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { data } = getAllCategoryApi.useGetAllCategoryDataQuery();

  const location = useLocation();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const lang = useSelector((state) => state.lang.lang);

  const isTablet = useMediaQuery({ query: "(max-width: 1024px" });

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setHeaderBgChange(true);
      } else {
        setHeaderBgChange(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const renderDropdownMenu = (smallgroupcodes) => (
    <Menu>
      {smallgroupcodes.map((item) => (
        <Menu.Item 
        onClick={() => navigate(`/category/${item.id}`)}
        key={item.id} style={{fontSize: 20}}>
          {lang === "tm"
            ? item.name_tk
            : lang === "ru"
            ? item.name_ru
            : item.name_en}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <header
      className={`${styles.header} ${styles.headerActive}`}
      style={{
        display: isVisible ? "flex" : "none",
      }}
    >
      <Link to="/">
        <div
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className={styles.logo}
        >
          <img
            onMouseEnter={() => {
              setType("clickable");
            }}
            onMouseLeave={() => {
              setType("default");
            }}
            src={camel}
            alt="camel"
            className={styles.camel}
          />
          <div className={styles.mainItem}>
            <div
              className={`${styles.avatar} ${
                headerBgChange || isTablet ? styles.avatarAni : null
              }`}
              onMouseEnter={() => {
                setType("clickable");
              }}
              onMouseLeave={() => {
                setType("default");
              }}
            >
              <picture>
                <source media="(max-width: 660px)" srcSet={logoMobile} />
                <img src={logo} alt="arwana" />
              </picture>
            </div>
          </div>
        </div>
      </Link>
      <ul className={styles.navSingleDataCol}>
        {data?.map((items) => (
          <li key={items.id}>
            <Dropdown
              overlay={data && renderDropdownMenu(items.subcategory)}
              trigger={["hover"]}
              placement="bottom"
              arrow
            >
              <span>
                {lang === "tm"
                  ? items.name_tk
                  : lang === "ru"
                  ? items.name_ru
                  : items.name_en}
              </span>
            </Dropdown>
          </li>
        ))}
      </ul>
      <nav className={styles.nav}>
        <div
          onMouseEnter={() => setType("clickable")}
          onMouseLeave={() => setType("default")}
          className={styles.lang}
        >
          <div>{lang}</div>
          <IoCaretDown />
          <ul className={styles.dropdown}>
            {langs.map((l) => {
              if (l !== lang) {
                return (
                  <li
                    onClick={() => {
                      dispatch(setLang(l));
                      i18n.changeLanguage(l);
                      localStorage.setItem("lang", l);
                    }}
                    key={l}
                  >
                    {l}
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div
          onMouseEnter={() => setType("button")}
          onMouseLeave={() => setType("default")}
          className={`${styles.menu}`}
          onClick={(e) => {
            if (!isMenuActive) {
              setIsMenuActive(true);
              document.body.style.overflow = "hidden";
            } else {
              setIsMenuActive(false);
            }
          }}
        >
          <div
            className={`${styles.menuText} ${
              isMenuActive && styles.menuTextActive
            }`}
            data-back={t("menu.close")}
            data-front={t("menu.menu")}
          ></div>
          <div
            className={`${styles.burger} ${
              isMenuActive && styles.burgerActive
            }`}
          >
            <div
              className={`${styles.burgerLine} ${
                isMenuActive && styles.burgerLineOne
              }`}
            ></div>
            <div
              className={`${styles.burgerLine} ${
                isMenuActive && styles.burgerLineTwo
              }`}
            ></div>
          </div>
        </div>
      </nav>
      <HeaderMenu isActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
    </header>
  );
}
