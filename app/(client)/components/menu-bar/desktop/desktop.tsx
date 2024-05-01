import {
  Button,
  Container,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./desktop.scss";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { colors } from "@/app/(client)/constants/color.constant";

const Desktop = () => {
  const { to } = useNavigation();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    handleCloseMenu();
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
  };

  const handleSettingsClick = () => {
    handleCloseMenu();
    to("/profile/settings");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("menu-open");
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      style={{ backgroundColor: colors.primary }}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <h1 style={{ color: colors.secondary }}>Private Teacher App</h1>
        </Grid>
        <IconButton
          onClick={handleOpenMenu}
          edge="start"
          color="inherit"
          aria-label="menu"
          disableTouchRipple
        >
          <img
            src="images/test-image.jpg"
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
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              // maxWidth: 300,
              backgroundColor: "pink",
            },
          }}
          disableScrollLock={false}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Container>
  );
};

export default Desktop;
