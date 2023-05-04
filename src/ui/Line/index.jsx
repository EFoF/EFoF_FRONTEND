import React from "react";
import { StyledLine } from "./index.styles";

export default function Line({ color = "black", width = "", className =""}) {
  return <StyledLine className={className} color={color} width={width} />;
}