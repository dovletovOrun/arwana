import { useContext } from "react";
import styles from "./flipBtn.module.scss";
import CustomCursorContext from "../Cursor/context/CustomCursorContext";

export default function FlipButton({
  insideText,
  bgColor,
  border,
  textColor,
  onClick,
  isDownload,
  href,
}) {
  const { setType } = useContext(CustomCursorContext);
  return (
    <a
      style={{
        backgroundColor: bgColor,
        border: border ? "1px solid #fff" : "none",
        width: "fit-content",
        color: textColor,
      }}
      download
      href={href}
      className={`${styles.btnFlip}  `}
      onMouseEnter={() => setType("button")}
      onMouseLeave={() => setType("default")}
      data-back={insideText}
      data-front={insideText}
      data-text-color={"#000"}
      onClick={onClick}
    ></a>
  );
}
