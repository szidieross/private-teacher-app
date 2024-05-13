"use client";

import React, { FC, useEffect, useState } from "react";
// import SearchBar from "../searchbar/searchbar.component";
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
  Menu,
  MenuItem,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import Image from "next/image";
import LogoutForm from "../logout-form/logout-form";
// import useCategoriesService from "@/app/(client)/services/category.service";
// import { CategoryModel } from "@/app/api/models/category.model";
import "./mobile.scss";

type Props = {
  profilePicture?: string;
};

const Mobile: FC<Props> = ({ profilePicture }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  // const { getCategories } = useCategoriesService();
  // const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const { userInfo, setUserInfo } = useUserContext();
  const { to } = useNavigation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const categories = await getCategories();
  //       setCategories(categories);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchData();
  // }, [getCategories]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleProfileDrawer = () => {
    setIsProfileDrawerOpen(!isProfileDrawerOpen);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("menu-open");
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
    toggleDrawer();
  };

  const handleTitleClick = () => {
    handleCloseMenu();
    to("/");
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
    localStorage.removeItem("userData");
    handleCloseMenu();
    toggleDrawer();
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
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            className="drawer"
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
          >
            <Box className="drawer-box" sx={{ backgroundColor: "beige" }}>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <List>
                <ListItem button onClick={handleTeachersClick}>
                  <ListItemText primary="Teachers" />
                </ListItem>
                {/* {categories && (
                  <ListItem
                    button
                    onClick={toggleDrawer}
                    sx={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <ListItemText primary="Categories" />
                    <List>
                      {categories.map((category) => (
                        <ListItem
                          button
                          key={category.name}
                          onClick={() => {
                            toggleDrawer();
                          }}
                        >
                          <ListItemText primary={category.name} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )} */}
                {userInfo.isLoggedIn ? (
                  <>
                    <ListItem onClick={handleProfileClick}>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem onClick={handleAppointmentsClick}>
                      <ListItemText primary=" My Appointments" />
                    </ListItem>
                    <ListItem onClick={handleSettingsClick}>
                      <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem onClick={handleLogout}>
                      <LogoutForm />
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem onClick={() => to("/login")}>
                      <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem onClick={() => to("/signup")}>
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
            onClick={handleTitleClick}
            style={{ color: colors.secondary }}
            className="desktop-title"
          >
            Private Teacher App
          </Typography>
        </Grid>
        {userInfo.isLoggedIn ? (
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
                src={
                  profilePicture
                    ? `/images/uploads/${profilePicture}`
                    : `/images/default/person.jpg`
                }
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
              <MenuItem onClick={handleAppointmentsClick}>
                My Appointments
              </MenuItem>
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

export default Mobile;
