import React, { FC, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const DrawerMenu: FC<Props> = ({ isDrawerOpen, toggleDrawer }) => {
  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
      <div>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <List>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Accordion 1" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={toggleDrawer}>
                  <ListItemText primary="Menu Item 1" />
                </ListItem>
                <ListItem button onClick={toggleDrawer}>
                  <ListItemText primary="Menu Item 2" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Accordion 2" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={toggleDrawer}>
                  <ListItemText primary="Menu Item 3" />
                </ListItem>
                <ListItem button onClick={toggleDrawer}>
                  <ListItemText primary="Menu Item 4" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
