import { useState } from "react";
import { Input, Form, Button, Alert } from "antd";

import { useDispatch } from "react-redux";
import { login } from "../../../store/admin/auth";

import { useNavigate } from "react-router-dom";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import styles from "./login-admin.module.scss";

export default function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    password: "",
  });
  const [alertType, setAlertType] = useState({
    type: "",
    message: "",
    isVisible: false,
  });

  const handleLogin = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        setAlertType({
          type: "success",
          message: "Успешно!",
          isVisible: true,
        });
        navigate("/admin", { state: res.accessToken });
      })
      .catch((e) => {
        setAlertType({
          type: "error",
          message: "Ошибка " + e,
          isVisible: true,
        });
      });

    setTimeout(() => {
      setAlertType({
        type: "",
        message: "",
        isVisible: false,
      });
    }, 2000);
  };

  return (
    <main className={styles.loginAdmin}>
      <div className={styles.title}>Arwana dashboard</div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 32,
        }}
        style={{
          maxWidth: 600,
          width: 400,
        }}
        layout="vertical"
        autoComplete="off"
        onFinish={handleLogin}
      >
        <Form.Item
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
          }}
          label={<label className={styles.label}>Логин</label>}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            style={{
              padding: "12px 10px",
              fontSize: 16,
              fontFamily: "MontBold, sans-serif",
            }}
            onChange={(e) => {
              setAdminInfo({
                ...adminInfo,
                name: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label={<label className={styles.label}>Пароль</label>}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input.Password
            style={{
              padding: "12px 10px",
              fontSize: 16,
              fontFamily: "MontBold, sans-serif",
            }}
            iconRender={(visible) => (visible ? <IoIosEye /> : <IoIosEyeOff />)}
            onChange={(e) => {
              setAdminInfo({
                ...adminInfo,
                password: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          style={{
            width: "100%",
          }}
        >
          <Button
            style={{
              width: "100%",
            }}
            className={styles.btn}
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>

      {alertType.isVisible && (
        <Alert
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "20%",
          }}
          type={alertType.type}
          message={alertType.message}
        />
      )}
    </main>
  );
}
