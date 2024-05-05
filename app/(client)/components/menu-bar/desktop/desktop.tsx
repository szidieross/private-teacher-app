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

  console.log("isLoggedIn", isLoggedIn);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
  };

  const handleTitleClick = () => {
    handleCloseMenu();
    to("/teachers");
  };

  const handleTeachersClick = () => {
    handleCloseMenu();
    to("/teachers");
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
  const [anchorElCat, setAnchorElCat] = useState<null | HTMLElement>(null);

  const handleOpenCatMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCat(event.currentTarget);
    document.body.classList.add("menu-open");
  };

  const handleCloseCatMenu = () => {
    setAnchorElCat(null);
  };

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
        <Grid item xl={10}>
          <Typography onClick={handleTeachersClick}>Teachers</Typography>
        </Grid>
        <Grid item xl={10}>
          <Typography onClick={handleOpenCatMenu}>Categories</Typography>
          <Menu
            anchorEl={anchorElCat}
            open={Boolean(anchorElCat)}
            onClose={handleCloseCatMenu}
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
            <MenuItem onClick={handleCloseCatMenu}>Category1</MenuItem>
          </Menu>
        </Grid>
        {!isLoggedIn ? (
          <Grid item xl={2}>
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
        ) : (
          <>
            <Grid item xl={1}>
              <Button onClick={() => to("/login")}>Login</Button>
              <Button onClick={() => to("/signup")}>Signup</Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Desktop;
