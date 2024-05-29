import { useRef } from "react";
import styles from "./revimage.module.scss";
import { useMediaQuery } from "react-responsive";

import useBound from "../../hooks/useBound";

export default function RevealImage({ image }) {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const imageRef = useRef(null);
  const isOnScreen = useBound(imageRef, isTablet ? 100 : 300);

  return (
    <div className={styles.mainItem} ref={imageRef}>
      <div className={`${styles.avatar} ${isOnScreen && styles.avatarAni}`}>
        <img src={image} alt="show-room" />
      </div>
    </div>
  );
}
