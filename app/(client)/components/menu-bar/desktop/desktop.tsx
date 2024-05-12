"use client";

import {
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import "./desktop.scss";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { colors } from "@/app/(client)/constants/color.constant";
import LogoutForm from "../../logout-form/logout-form";
import Image from "next/image";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import useCategoriesService from "@/app/(client)/services/category.service";
import { CategoryModel } from "@/app/api/models/category.model";
import Link from "next/link";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";

type Props = {
  profilePicture?: string;
};

const Desktop: FC<Props> = ({ profilePicture }) => {
  // console.log("profilePicture",profilePicture)
  const { to } = useNavigation();
  const { isLoggedIn, userId, img, setUser } = useUserContext();
  const { getUserById } = useUsersService();
  const { getCategories } = useCategoriesService();
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  // const [user, setUser] = useState<UserModel | null>(null);

  // console.log("UUUUUSSSSSEEEEERRRRRR", user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElCat, setAnchorElCat] = useState<null | HTMLElement>(null);

  useEffect(() => {
   
  }, [setUser])
  

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
  };

  const handleSettingsClick = () => {
    handleCloseMenu();
    to("/profile/settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    handleCloseMenu();
  };

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
        if (userId) {
          const user = await getUserById(userId);
          console.log(user);
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [getCategories, setUser]);

  return (
    <Container
      className="desktop-container"
      style={{ backgroundColor: colors.primary }}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xl={8}>
          <Link href={"/teachers"} style={{ color: colors.secondary }}>
            Private Teacher App
          </Link>
        </Grid>
        <Grid item xl={1}>
          <Link href={"/teachers"}>Teachers</Link>
        </Grid>
        <Grid item xl={1}>
          <Typography sx={{ cursor: "pointer" }} onClick={handleOpenCatMenu}>
            Categories
          </Typography>
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
