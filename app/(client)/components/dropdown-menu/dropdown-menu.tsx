import { Menu, MenuItem } from "@mui/material";
import React, { FC, useState } from "react";
import useNavigation from "../../hooks/navigation.hook";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
};

const DropdownMenu: FC<Props> = () => {
  const { to } = useNavigation();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleCloseMenu();
    to("/profile");
  };

  const handleAppointmentsClick = () => {
    handleCloseMenu();
    to("/profile/settings");
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
      <MenuItem onClick={handleAppointmentsClick}>My Appointments</MenuItem>
      <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
