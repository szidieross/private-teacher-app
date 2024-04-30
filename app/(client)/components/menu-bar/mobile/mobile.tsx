import { Box, Container, Grid, IconButton, List } from "@mui/material";
import React, { FC, ReactNode, useState } from "react";
// import { useStoreContext, useThemeContext } from "@/app/(client)/hooks/context.hook";
// import MenuItems from "../items/items.component";
// import { KeyboardArrowUp, Menu } from "@mui/icons-material";
// import Collapse from "./collapse/collapse.component";
// import StyledWrapper from "./mobile.style";
// import WalletButton from "../wallet-button/wallet-button.component";
// import SearchBar from "../searchbar/searchbar.component";
import "./mobile.scss";

const Mobile: FC = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <>
      <Container className="mobile-wrapper">
        <Grid container className="mobile--grid-container">
          <Grid item className="mobile--grid-item">
            {/* {navbarSettings.title} */}
            Private Teacher App
          </Grid>
          <Grid item className="mobile--grid-item" xs>
            <IconButton
              className="mobile--icon-button"
              onClick={() => setMenuOpened((prev) => !prev)}
              disableTouchRipple
            >
              hello
              {/* {activeTheme?.palette.mode === "light" ? (
                <>{menuOpened ? <UpIcon /> : <MenuIcon />}</>
              ) : (
                <>{menuOpened ? <UpIcon /> : <MenuIcon />}</>
              )} */}
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Mobile;
