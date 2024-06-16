"use client";

import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import "./desktop.scss";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { colors } from "@/app/(client)/constants/color.constant";
import Image from "next/image";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import Link from "next/link";
import useUsersService from "@/app/(client)/services/user.service";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

type Props = {
  profilePicture?: string;
};

const Desktop: FC<Props> = ({ profilePicture }) => {
  const { to } = useNavigation();
  const { userInfo, setUserInfo } = useUserContext();
  const { getUserById } = useUsersService();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo.userId) {
          const user = await getUserById(userInfo.userId);
          setUserInfo((prevState) => {
            return {
              ...prevState,
              userId: user?.userId,
            };
          });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [setUserInfo, getUserById, userInfo.userId]);

  return (
    <Container
      className="desktop-container"
      style={{ backgroundColor: colors.primary }}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box alignItems="center" justifyContent="space-between" display={"flex"}>
        <Box>
          <Link href={"/teachers"} style={{ color: colors.secondary }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
            MagánTanár
            </Typography>
          </Link>
        </Box>
        <Box justifyContent={"flex-end"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ gap: { xs: "14px", lg: "16px" } }}
          >
            <Link href={"/teachers"} style={{ color: colors.secondary }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: { xs: 14, lg: 16 } }}
              >
                Tanárok
              </Typography>
            </Link>
            {userInfo.isLoggedIn ? (
              <>
                <Link
                  href={"/profile/appointments"}
                  style={{ color: colors.secondary }}
                >
                  <Typography
                    sx={{ fontWeight: 600, fontSize: { xs: 13, md: 16 } }}
                  >
                    Időpontjaim
                  </Typography>
                </Link>
                <Box>
                  <IconButton
                    onClick={() => to("/profile")}
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
                </Box>
              </>
            ) : (
              <Box>
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
                  <MenuItem onClick={handleLoginClick}>Bejelentkezés</MenuItem>
                  <MenuItem onClick={handleSignupClick}>Regisztráció</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Desktop;
