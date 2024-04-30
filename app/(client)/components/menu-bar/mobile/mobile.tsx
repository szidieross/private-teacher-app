import React, { FC, ReactNode, useState } from "react";
// import { useStoreContext, useThemeContext } from "@/app/(client)/hooks/context.hook";
// import SearchBar from "../searchbar/searchbar.component";
import "./mobile.scss";
import { colors } from "@/app/(client)/constants/color.constant";
import {
  Box,
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { pink } from "@mui/material/colors";

const Mobile: FC = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

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

  return (
    <Container
      className="mobile-wrapper"
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      <IconButton
        onClick={toggleDrawer}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      {/* <IconButton
        onClick={toggleProfileDrawer}
        edge="end"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton> */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <div>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <List>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      {/* <Drawer
        anchor="top"
        open={isProfileDrawerOpen}
        onClose={toggleProfileDrawer}
        PaperProps={{ style: { maxWidth: 300 } }}
      >
        <div>
          <IconButton onClick={toggleProfileDrawer}>
            <MenuIcon />
          </IconButton>
          <List>
            <ListItem button onClick={toggleProfileDrawer}>
              <ListItemText primary="Menu Item 1Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleProfileDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
          </List>
        </div>
      </Drawer> */}

      <IconButton
        onClick={handleOpenMenu}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
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
        <MenuItem onClick={handleCloseMenu}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Option 2</MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
      <Grid item>
        <h1 style={{ color: colors.secondary }}>Private Teacher App</h1>
      </Grid>
    </Container>
  );
};

export default Mobile;
