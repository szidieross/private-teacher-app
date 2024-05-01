import React from "react";
import "./footer-bar.scss";
import { Box } from "@mui/material";
import { colors } from "../../constants/color.constant";

const FooterBar = () => {
  return <Box className="footer-bar--box" sx={{backgroundColor:colors.primary}}>FooterBar</Box>;
};

export default FooterBar;
