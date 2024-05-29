import React, { useState } from "react";
import { Button, Drawer as DComp } from "antd";

import { IoIosArrowDropleftCircle } from "react-icons/io";

import "./drawer.scss";

export default function Drawer({ children, onClose, open, name, onSubmit }) {
  return (
    <>
      <DComp
        style={{
          backgroundColor: "#434343",
        }}
        className="custom-drawer"
        closeIcon={<IoIosArrowDropleftCircle size={28} color="#b8b8b8" />}
        title={name}
        onClose={onClose}
        open={open}
      >
        {children}
        <Button onClick={onSubmit} className="save-btn">
          Сохранить
        </Button>
      </DComp>
    </>
  );
}
