import React, { FC } from "react";
import "./footer-bar.scss";
import { Box, Typography } from "@mui/material";
import { colors } from "../../constants/color.constant";

const FooterBar: FC = () => {
  return (
    <Box
      className="footer-bar--box"
      sx={{
        backgroundColor: colors.primary,
        color: colors.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Private Teacher App
      </Typography>
    </Box>
  );
};

export default FooterBar;
