import { Button, Container, Grid, List } from "@mui/material";
import React from "react";
// import { colors } from "./colors"; // Importáljuk a színeket
import { colors } from "@/app/(client)/constants/color.constant";

const Desktop = () => {
  const handleLogout = () => {
    localStorage.removeItem("userData");
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
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{ color: colors.secondary }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Desktop;
