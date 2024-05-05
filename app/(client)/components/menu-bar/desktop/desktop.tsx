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
import useCategoriesService from "@/app/(client)/services/category.service";
import { CategoryModel } from "@/app/api/models/category.model";

const Desktop = () => {
  const { to } = useNavigation();
  const { isLoggedIn } = useUserContext();
  const { getCategories } = useCategoriesService();
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);

  console.log(isLoggedIn);
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

  const handleAppointmentsClick = () => {
    handleCloseMenu();
    to("/profile/appointments");
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("menu-open");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      className="desktop-container"
      style={{ backgroundColor: colors.primary }}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xl={8}>
          <Typography
            onClick={handleTitleClick}
            style={{ color: colors.secondary }}
            className="desktop-title"
          >
            Private Teacher App
          </Typography>
        </Grid>
        <Grid item xl={1}>
          <Typography onClick={handleTeachersClick}>Teachers</Typography>
        </Grid>
        <Grid item xl={1}>
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
            {categories &&
              categories.map((category) => (
                <MenuItem
                  key={category.categoryId}
                  onClick={handleCloseCatMenu}
                >
                  {category.name}
                </MenuItem>
              ))}
          </Menu>
        </Grid>
        {isLoggedIn ? (
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
            <Grid item xl={2}>
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
