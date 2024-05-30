import { useContext, useState, Fragment, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Collapse } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";
import { GoArrowLeft } from "react-icons/go";
import CustomCursorContext from "../Cursor/context/CustomCursorContext";
import BrandSlide from "../BrandSlide";
import styles from "./header-menu.module.scss";
import "swiper/css";
import { getBrandsLogoApi } from "../../Services/BrandsLogo";
import { getAllCategoryApi } from "../../Services/Category";

const { Panel } = Collapse;

export default function HeaderMenu({ isActive, setIsMenuActive }) {
  const { setType } = useContext(CustomCursorContext);
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: brandsLogo } = getBrandsLogoApi.useGetAllBrandsLogoDataQuery();
  const { data: categoryData } = getAllCategoryApi.useGetAllCategoryDataQuery();

  const [isProducts, setIsProducts] = useState(false);
  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    if (categoryData) {
      menuLinks[1].subLinks = categoryData.map((cat) => ({
        name:
          lang === "tm"
            ? cat.name_tk
            : lang === "ru"
            ? cat.name_ru
            : cat.name_en,
        path: `/category/${cat.name_en}`,
        id: cat.id,
        cat: cat.subcategory,
      }));
    }
  }, [categoryData, lang]);

  const menuLinks = [
    {
      name: "brands",
      path: "/allbrands",
    },
    {
      name: "category",
      subLinks: categoryData
        ? categoryData.map((cat) => ({
            name:
              lang === "tm"
                ? cat.name_tk
                : lang === "ru"
                ? cat.name_ru
                : cat.name_en,
            path: `/category/${cat.id}`,
            id: cat.id,
            cat: cat.subcategory,
          }))
        : [],
    },
    {
      name: "showroom",
      path: "/category",
    },
    {
      name: "aboutus",
      path: "/home",
    },
    {
      name: "requestinfo",
      path: "/contact",
    },
  ];

  return (
    <div className={isActive ? styles.headerMenuActive : styles.headerMenu}>
      {isActive && (
        <>
          {!isTablet && (
            <Swiper
              direction={"vertical"}
              className={styles.swiper}
              slidesPerView={3}
              spaceBetween={0}
              mousewheel={true}
              modules={[Mousewheel, Autoplay]}
              autoplay={{ delay: 2000 }}
              speed={1200}
              loop={true}
            >
              {brandsLogo?.map((br) => (
                <SwiperSlide key={br.id}>
                  <Link to={`/brand/${br.id}`}>
                    <BrandSlide
                      onClick={() => {
                        setIsMenuActive(false);
                        setType("default");
                      }}
                      brand={br.logo_thumbnail}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div
            className={styles.goBackBtn}
            onMouseEnter={() => setType("clickable")}
            onMouseLeave={() => setType("default")}
            onClick={() => setIsProducts(false)}
          >
            <>
              {isProducts && <GoArrowLeft size={24} />}
              <span
                className={`${styles.flipText} ${
                  isProducts && styles.flipTextAni
                }`}
                data-back={t("menu.goback")}
                data-front={t("menu.goback")}
              ></span>
            </>
          </div>

          <div
            className={styles.menuLinksContainer}
            style={{
              alignItems: isProducts ? "flex-start" : "center",
              justifyContent: isProducts ? "flex-start" : "center",
            }}
          >
            <ul className={styles.mainMenuWrapper}>
              {menuLinks.map((link) => (
                <Fragment key={link.name}>
                  {!isProducts && (
                    <li
                      onMouseEnter={() => setType("clickable")}
                      onMouseLeave={() => setType("default")}
                      onClick={() => {
                        if (link.subLinks) {
                          setIsProducts(true);
                        } else {
                          navigate(link.path);
                          setIsMenuActive(false);
                        }
                      }}
                    >
                      <div className={`${styles.mainTextContainer}`}>
                        <div className={styles.overflow}>
                          <h5
                            className={
                              isProducts
                                ? styles.mainLinksDown
                                : styles.mainLinksUp
                            }
                          >
                            {t(`menu.${link.name}`)}
                          </h5>
                        </div>
                      </div>
                    </li>
                  )}
                  {link.subLinks && isProducts && (
                    <li className={styles.subMenu} style={{ width: "320px" }}>
                      <ul className={styles.subMenuWrapper}>
                        {link.subLinks.map((subLink) => (
                          <Collapse  key={subLink.id}>
                            <Panel className={styles.panelIcons} header={<span style={{ color: "#fff", fontSize: "23px" }}>{subLink.name}</span>}>
                              <li
                              onMouseEnter={() => setType("clickable")}
                              onMouseLeave={() => setType("default")}
                              >
                                {subLink.cat.length > 0
                                  ? subLink.cat?.map((items) => (
                                      <div
                                        key={items.id}
                                        className={styles.mainTextContainer}
                                        onClick={() => {
                                          setIsMenuActive(false)
                                          navigate(`/category/${items.id}`)
                                        }}
                                          
                                      >
                                        <div className={styles.overflow}>
                                          <h5
                                            className={
                                              isProducts
                                                ? styles.subLinksDown
                                                : styles.subLinksUp
                                            }
                                          >
                                            {items.name_en}
                                          </h5>
                                        </div>
                                      </div>
                                    ))
                                  : ""}
                              </li>
                            </Panel>
                          </Collapse>
                        ))}
                      </ul>
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
