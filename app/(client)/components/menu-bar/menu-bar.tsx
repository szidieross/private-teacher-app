"use client";

import { Box, Toolbar } from "@mui/material";
import { FC } from "react";
import Mobile from "./mobile/mobile";
import Desktop from "./desktop/desktop";
import  "./menu-bar.scss";

const MenuBar: FC = () => {
  return (
    <Box>
      <Toolbar className="menu-bar--toolbar">
        <Mobile/>
        <Desktop />
      </Toolbar>
    </Box>
  );
};

export default MenuBar;