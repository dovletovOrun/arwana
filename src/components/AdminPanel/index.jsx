import React from "react";

import { List } from "antd";

import styles from "./panel.module.scss";

export default function Panel({ children, title }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>{title}</div>
      {children}
    </div>
  );
}
