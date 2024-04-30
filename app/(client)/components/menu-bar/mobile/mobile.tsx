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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Mobile: FC = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <div>
        <IconButton
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
          <List>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1Menu Item 1Menu Item 1Menu Item 1Menu Item 1Menu Item 1Menu Item 1Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Grid item>
        <h1 style={{ color: colors.secondary }}>Private Teacher App</h1>
      </Grid>
    </Container>
  );
};

export default Mobile;
