"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import "./signup.scss";

type Role = "user" | "teacher";

const Signup = () => {
  //   const [isTeacher, setIsTeacher] = useState<boolean>(false);

  //   const handleToggle = () => {
  //     setIsTeacher((prev) => !prev);
  //   };

  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newType: boolean
  ) => {
    console.log(newType);
    setIsTeacher(newType);
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <ToggleButtonGroup
          value={isTeacher}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value={false} aria-label="left aligned" disableRipple>
            User
          </ToggleButton>
          <ToggleButton value={true} aria-label="centered" disableRipple>
            Teacher
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <form action="/api/register" method="POST">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Username" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Phone" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              label="Profile Picture"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {isTeacher && (
            <>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  label="Price"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Qualification" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Bio" variant="outlined" fullWidth multiline />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Location" variant="outlined" fullWidth />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signup;
