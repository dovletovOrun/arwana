import { useContext, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import PageWrapper from "../../components/PageWrapper";
import FlipButton from "../../components/FlipButton";
import RevealImage from "../../components/RevealingImage";
import CustomCursorContext from "../../components/Cursor/context/CustomCursorContext";
import HorizontalCard from "../../components/HorizontalCard";
import ShowRoom from "../../components/ShowRoom";
import main1 from "../../assets/home/main1.jpg";
import main2 from "../../assets/home/main2.png";
import card1 from "../../assets/home/card1.png";
import styles from "./home.module.scss";
import "./buttons.scss";
import "swiper/css";
import "swiper/css/navigation";

import { getAllBrandsApi } from "../../Services/GetAllBrands";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { setType } = useContext(CustomCursorContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = getAllBrandsApi.useGetHomePageDataQuery();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const lang = useSelector((state) => state.lang.lang);

  const horizontalSection = useRef();
  const wrapperRef = useRef();

  const isTablet = useMediaQuery({ query: "(max-width: 1024px" });


  return (
    <PageWrapper>
      <main className={styles.homeContainer} ref={wrapperRef}>
        <div className={styles.homeWelcome}>
          <Swiper
            direction={"horizontal"}
            className={styles.swiper}
            slidesPerView={1}
            spaceBetween={0}
            speed={1200}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
            }}
            loop={true}
            onSlideChange={(swiperCore) => {
              setActiveSlide(swiperCore.realIndex);
            }}
          >
            {data?.sliders.map((slider) => (
              <SwiperSlide
                key={slider.id}
                onClick={() => {
                  navigate(`brand/${slider.id}`);
                }}
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${
                      slider.slider_thumbnail?.length > 0
                        ? slider.slider_thumbnail
                        : main1
                    }) `,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    height: "100%",
                    width: "100%",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.5s",
                  }}
                  className={styles.slide}
                >
                  <div
                    className={styles.welcomeText}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => navigate(`brand/${slider.id}`)}
                  >
                    <h3 className={styles.secondaryText}>
                      {t("mainpage.newbrand")}
                    </h3>
                    <div
                      className={styles.mainTextContainer}
                      onMouseEnter={() => setType("clickable")}
                      onMouseLeave={() => setType("default")}
                    >
                      <h1 className={styles.mainText}>
                        {lang === "tm"
                          ? slider?.name_tk
                          : lang === "ru"
                          ? slider?.name_ru
                          : slider?.name_en}
                      </h1>
                    </div>
                    <FlipButton
                      bgColor={"transparent"}
                      insideText={t("mainpage.openbtn")}
                      border={true}
                      textColor={"#fff"}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.sliderNav}>
            <div
              className={styles.sliderNavInside}
              style={{
                left: activeSlide === 0 ? 0 : "51%",
              }}
            ></div>
          </div>
        </div>
        <div className={styles.aboutSection}>
          <h2 className={styles.aboutUsHeader}>
            {lang === "tm"
              ? data?.about_arwana?.title_tk
              : lang === "ru"
              ? data?.about_arwana?.title_ru
              : data?.about_arwana?.title_en}
          </h2>
          <p className={styles.aboutUsPar}>
            {lang === "tm"
              ? data?.about_arwana?.desc_tk
              : lang === "ru"
              ? data?.about_arwana?.desc_ru
              : data?.about_arwana?.desc_en}
          </p>
          <FlipButton
            bgColor={"rgba(0,0,0,0.6)"}
            insideText={t("mainpage.explorebtn")}
            textColor={"#fff"}
            onClick={() => navigate("/home")}
          />
          <RevealImage
            image={
              data?.about_arwana?.image.length > 0
                ? data?.about_arwana?.image
                : main2
            }
          />
        </div>
        <div className={styles.horizontalSection} ref={horizontalSection}>
          <Swiper
            direction={"horizontal"}
            className={styles.swiper}
            slidesPerView={2}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            loop={true}
            speed={900}
          >
            {!isTablet && (
              <SwiperSlide
                style={{
                  minWidth: 400,
                }}
              >
                <HorizontalCard image={card1} isTitle={true} />
              </SwiperSlide>
            )}
            {!isTablet &&
              data?.subcategories
              &&
              data?.subcategories.map((cat) => {
                return (
                  <SwiperSlide key={cat.id}>
                    <HorizontalCard cat={cat} isTitle={false} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div> 
        {isTablet && (
          <div className={styles.responsiveCards}>
            {data?.subcategories
              &&
              data?.subcategories.map((cat) => {
                return <HorizontalCard key={cat.id} cat={cat} />;
              })}
          </div>
        )}

        <ShowRoom />
      </main>
    </PageWrapper>
  );
}
