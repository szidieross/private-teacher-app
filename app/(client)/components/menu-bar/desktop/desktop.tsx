import {
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./desktop.scss";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { colors } from "@/app/(client)/constants/color.constant";
import LogoutForm from "../../logout-form/logout-form";
import Image from "next/image";
import { isLoggedIn } from "@/app/actions";
import { useUserContext } from "@/app/(client)/hooks/context.hook";

const Desktop = () => {
  const { to } = useNavigation();
  const { isLoggedIn } = useUserContext();

  console.log("userSettings", isLoggedIn);

  // const logIsLoggedIn = async () => {
  //   console.log(await isLoggedIn());
  // };

  // logIsLoggedIn();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
  };

  const handleTitleClick = () => {
    handleCloseMenu();
    to("/");
  };

  const handleSettingsClick = () => {
    handleCloseMenu();
    to("/profile/settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    handleCloseMenu();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("menu-open");
  };

  return (
    <Container
      className="desktop-container"
      style={{ backgroundColor: colors.primary }}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xl={10}>
          <Typography
            onClick={handleTitleClick}
            style={{ color: colors.secondary }}
            className="desktop-title"
          >
            Private Teacher App
          </Typography>
        </Grid>
        <Grid item xl={1}>
          <Button onClick={() => to("/login")}>Login</Button>
        </Grid>
        <Grid item xl={1}>
          <IconButton
            onClick={handleOpenMenu}
            edge="start"
            color="inherit"
            aria-label="menu"
            disableRipple
          >
            <Image
              width={60}
              height={60}
              src="/images/test-image.jpg"
              alt="Profile"
              className="profile-img"
            />
          </IconButton>
        </Grid>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            style: {
              backgroundColor: "pink",
            },
          }}
          disableScrollLock={false}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutForm />
          </MenuItem>
        </Menu>
      </Grid>
    </Container>
  );
};

export default Desktop;
