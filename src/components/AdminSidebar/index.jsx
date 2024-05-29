import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "antd";

import { getMe, logout } from "../../store/admin/adminSettings";

import { FaRectangleList } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStore, FaUser } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

import Cookies from "universal-cookie";

import styles from "./admin-sidebar.module.scss";

const cookies = new Cookies();

const tabs = [
  {
    name: "Категории",
    icon: <FaRectangleList />,
    path: "/admin/categories",
  },
  {
    name: "Товары",
    icon: <MdOutlineShoppingCart />,
    path: "/admin/products",
  },
  {
    name: "Бренды",
    icon: <FaStore />,
    path: "/admin/brands",
  },
  {
    name: "Админы",
    icon: <RiAdminLine />,
    path: "/admin/admins",
  },
];

export default function AdminSidebar() {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.adminSettings.admin);

  useEffect(() => {
    setActiveTab(location.pathname);

    dispatch(getMe());
  }, [location, dispatch]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.adminName}>
        <FaUser />
        {admin && admin.name}
      </div>
      <ul>
        {tabs.map((tab, i) => {
          return (
            <li
              onClick={() => {
                setActiveTab(tab.path);
                navigate(tab.path);
              }}
              className={`${styles.tab} ${
                activeTab === tab.path ? styles.activeTab : null
              }`}
              key={tab.name}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </li>
          );
        })}
      </ul>
      <Button
        type="primary"
        danger
        style={{
          fontSize: 16,
          fontFamily: "MontReg, sans-serif",
          marginTop: "auto",
        }}
        onClick={() => {
          dispatch(logout());
          cookies.remove("adminAccessToken");
          navigate("/");
        }}
      >
        Выйти из профиля
      </Button>
    </div>
  );
}
