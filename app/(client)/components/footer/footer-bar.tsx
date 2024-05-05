import React, { FC } from "react";
import "./footer-bar.scss";
import { Box, Typography } from "@mui/material";
import { colors } from "../../constants/color.constant";

const FooterBar:FC = () => {
  return (
    <Box className="footer-bar--box" sx={{ backgroundColor: colors.primary }}>
      <Typography color={colors.secondary}>Private Teacher App</Typography>
    </Box>
  );
};

export default FooterBar;
