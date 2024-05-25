"use client";

import React, { FC, useState } from "react";
import "./mobile.scss";
import { colors } from "@/app/(client)/constants/color.constant";
import {
  Container,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import Image from "next/image";
import "./mobile.scss";
import { logout } from "@/app/actions";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

type Props = {
  profilePicture?: string;
};

const Mobile: FC<Props> = ({ profilePicture }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userInfo } = useUserContext();
  const { to } = useNavigation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
    toggleDrawer();
  };

  const handleTeachersClick = () => {
    handleCloseMenu();
    to("/teachers");
    toggleDrawer();
  };

  const handleAppointmentsClick = () => {
    handleCloseMenu();
    to("/profile/appointments");
    toggleDrawer();
  };

  const handleSettingsClick = () => {
    handleCloseMenu();
    to("/profile/settings");
    toggleDrawer();
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    toggleDrawer();
  };

  const handleLoginClick = () => {
    handleCloseMenu();
    to("/login");
  };

  const handleSignupClick = () => {
    handleCloseMenu();
    to("/signup");
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("menu-open");
  };

  return (
    <Container
      className="mobile-container"
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className="grid-container"
      >
        <Grid item xl={1} className="grid-item">
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            aria-label="menu"
            sx={{ color: colors.secondary }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            className="drawer"
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
          >
            <Box
              className="drawer-box"
              sx={{ backgroundColor: colors.background, height: "100%" }}
            >
              <IconButton onClick={toggleDrawer} sx={{ padding: "16px" }}>
                <MenuIcon />
              </IconButton>
              <List>
                <ListItem button onClick={handleTeachersClick}>
                  <ListItemText primary="Teachers" />
                </ListItem>
                {userInfo.isLoggedIn ? (
                  <>
                    <ListItem button onClick={handleProfileClick}>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={handleAppointmentsClick}>
                      <ListItemText primary="My Appointments" />
                    </ListItem>
                    <ListItem button onClick={handleSettingsClick}>
                      <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem button onClick={() => to("/login")}>
                      <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button onClick={() => to("/signup")}>
                      <ListItemText primary="Signup" />
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        </Grid>
        <Grid item xl={1}>
          <Typography
            onClick={() => to("/")}
            sx={{
              color: colors.secondary,
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className="mobile-title"
            variant="h6"
          >
            Private Teacher App
          </Typography>
        </Grid>
        {userInfo.isLoggedIn ? (
          <Grid item xl={2}>
            <Image
              onClick={() => to("/profile")}
              width={60}
              height={60}
              src={
                profilePicture
                  ? `/images/uploads/${profilePicture}`
                  : `/images/default/person.jpg`
              }
              alt="Profile"
              className="profile-img"
            />
          </Grid>
        ) : (
          <Grid item xs={1}>
            <IconButton
              onClick={handleOpenMenu}
              edge="start"
              color="inherit"
              aria-label="menu"
              disableRipple
            >
              <PersonRoundedIcon
                sx={{
                  color: colors.darkPurple,
                  height: "35px",
                  width: "35px",
                }}
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
                  backgroundColor: colors.background,
                },
              }}
              disableScrollLock={false}
            >
              <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              <MenuItem onClick={handleSignupClick}>Signup</MenuItem>
            </Menu>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Mobile;
