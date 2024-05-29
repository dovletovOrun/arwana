import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { sendMail } from "../../store/contact";

import FlipButton from "../FlipButton";

import styles from "./inputs.module.scss";

export default function Inputs() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isFocusedArr, setIsFocusedArr] = useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false,
    input5: false,
  });
  const [isChangedArr, setIsChangedArr] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    message: false,
  });

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    company: "TM",
    country: "TM",
  });

  const handleSendMessage = () => {
    dispatch(sendMail(userData));
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputCol}>
        <label>
          <span className={styles.inputWrapper}>
            <input
              onBlur={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input1: false,
                })
              }
              onFocus={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input1: true,
                })
              }
              type="text"
              onChange={(e) => {
                setUserData({
                  ...userData,
                  firstName: e.target.value,
                });
                if (e.target.value === "") {
                  setIsChangedArr({
                    ...isChangedArr,
                    firstname: false,
                  });
                  return;
                }
                setIsChangedArr({
                  ...isChangedArr,
                  firstname: true,
                });
              }}
            />
          </span>
          <span
            className={`${styles.placeholder} ${
              isFocusedArr.input1 || isChangedArr.firstname
                ? styles.placeholderActive
                : null
            } `}
          >
            {t("contact.firstname")}
          </span>
        </label>
      </div>

      <div className={styles.inputCol}>
        <label>
          <span className={styles.inputWrapper}>
            <input
              onBlur={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input2: false,
                })
              }
              onFocus={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input2: true,
                })
              }
              onChange={(e) => {
                setUserData({
                  ...userData,
                  lastName: e.target.value,
                });
                if (e.target.value === "") {
                  setIsChangedArr({
                    ...isChangedArr,
                    lastname: false,
                  });
                  return;
                }
                setIsChangedArr({
                  ...isChangedArr,
                  lastname: true,
                });
              }}
              type="text"
            />
          </span>
          <span
            className={`${styles.placeholder} ${
              isFocusedArr.input2 || isChangedArr.lastname
                ? styles.placeholderActive
                : null
            }`}
          >
            {t("contact.lastname")}
          </span>
        </label>
      </div>
      <div className={styles.inputCol}>
        <label>
          <span className={styles.inputWrapper}>
            <input
              onBlur={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input3: false,
                })
              }
              onFocus={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input3: true,
                })
              }
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value,
                });
                if (e.target.value === "") {
                  setIsChangedArr({
                    ...isChangedArr,
                    email: false,
                  });
                  return;
                }
                setIsChangedArr({
                  ...isChangedArr,
                  email: true,
                });
              }}
              type="email"
            />
          </span>
          <span
            className={`${styles.placeholder} ${
              isFocusedArr.input3 || isChangedArr.email
                ? styles.placeholderActive
                : null
            }`}
          >
            E-mail*
          </span>
        </label>
      </div>
      <div className={styles.inputCol}>
        <label>
          <span className={styles.inputWrapper}>
            <input
              onBlur={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input4: false,
                })
              }
              onFocus={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input4: true,
                })
              }
              onChange={(e) => {
                setUserData({
                  ...userData,
                  phoneNumber: e.target.value,
                });
                if (e.target.value === "") {
                  setIsChangedArr({
                    ...isChangedArr,
                    phone: false,
                  });
                  return;
                }
                setIsChangedArr({
                  ...isChangedArr,
                  phone: true,
                });
              }}
              type="text"
            />
          </span>
          <span
            className={`${styles.placeholder} ${
              isFocusedArr.input4 || isChangedArr.phone
                ? styles.placeholderActive
                : null
            }`}
          >
            {t("contact.phone")}
          </span>
        </label>
      </div>
      <div
        className={styles.inputCol}
        style={{
          width: "100%",
        }}
      >
        <label>
          <span className={styles.inputWrapper}>
            <textarea
              onBlur={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input5: false,
                })
              }
              onFocus={() =>
                setIsFocusedArr({
                  ...isFocusedArr,
                  input5: true,
                })
              }
              onChange={(e) => {
                setUserData({
                  ...userData,
                  message: e.target.value,
                });
                if (e.target.value === "") {
                  setIsChangedArr({
                    ...isChangedArr,
                    message: false,
                  });
                  return;
                }
                setIsChangedArr({
                  ...isChangedArr,
                  message: true,
                });
              }}
            ></textarea>
          </span>
          <span
            className={`${styles.placeholder}  ${
              isFocusedArr.input5 || isChangedArr.message
                ? styles.placeholderActiveArea
                : null
            }`}
          >
            {t("contact.message")}
          </span>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <FlipButton
          bgColor={"#000"}
          insideText={t("contact.sendmessage")}
          textColor={"#fff"}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
