import React from "react";

import styles from "./product-drawer.module.scss";

export default function ProductDrawer({ children, condition }) {
  return (
    <div className={!condition ? styles.drawerInactive : styles.drawerActive}>
      {children}
    </div>
  );
}
