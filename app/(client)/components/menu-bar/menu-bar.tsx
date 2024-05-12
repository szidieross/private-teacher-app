"use client";

import { Box, Toolbar } from "@mui/material";
import { FC, useEffect } from "react";
import Mobile from "./mobile/mobile";
import Desktop from "./desktop/desktop";
import "./menu-bar.scss";
import { colors } from "../../constants/color.constant";
import { isLoggedIn } from "@/app/actions";

const MenuBar: FC = () => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      await isLoggedIn();
    };
    checkLoggedIn();
  }, [isLoggedIn]);

  return (
    <Box
      sx={{ position: "fixed", backgroundColor: colors.primary }}
      className="menu-bar--box"
    >
      <Toolbar className="menu-bar--toolbar">
        <Mobile />
        <Desktop />
      </Toolbar>
    </Box>
  );
};

export default MenuBar;
