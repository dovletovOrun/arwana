import React from "react";

export const CursorLookType = {
  CLICKABLE: "clickable",
  DEFAULT: "default",
  BUTTON: "button",
  DISPLAYNONE: "displayNone",
};

export const CustomCursorContext = React.createContext({
  type: CursorLookType.DEFAULT,
  setType: () => {},
});

export default CustomCursorContext;
