import React from "react";

import { IoAdd } from "react-icons/io5";

import styles from "./addbutton.module.scss";

import { Button } from "antd";

export default function AdminAddButton({ text, onClick }) {
  return (
    <Button
      icon={<IoAdd size={24} />}
      onClick={onClick}
      className={styles.btn}
      type="primary"
    >
      {text}
    </Button>
  );
}
