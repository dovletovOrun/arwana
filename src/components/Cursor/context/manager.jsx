import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import CustomCursorContext, { CursorLookType } from "./CustomCursorContext";

const CustomCursorManager = ({ children }) => {
  const [type, setType] = useState("default");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin") ||
      location.pathname === "/loginadmin"
    ) {
      setType("displayNone");
    } else {
      setType("default");
    }
  }, [location]);

  return (
    <CustomCursorContext.Provider value={{ type, setType }}>
      {children}
    </CustomCursorContext.Provider>
  );
};

export default CustomCursorManager;
