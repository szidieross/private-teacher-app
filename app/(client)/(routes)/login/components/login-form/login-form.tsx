"use client";

import { colors } from "@/app/(client)/constants/color.constant";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import { login } from "@/app/actions";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useFormState } from "react-dom";

const LoginForm: FC = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { to } = useNavigation();

  useEffect(() => {
    if (state?.error) {
      setSnackbarOpen(true);
    }
  }, [state]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={3}
    >
      <form action={formAction}>
        <Paper sx={{ maxWidth: "fit-content" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              type="text"
              name="username"
              required
              label="Username"
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="password"
              name="password"
              required
              label="Password"
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "16px",
                bgcolor: colors.primary,
                "&:hover": {
                  bgcolor: colors.mediumPurple,
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </form>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        marginY={4}
      >
        <Typography fontSize={14}>Don&apos;t have an account yet?</Typography>

        <Button
          onClick={() => to("/signup")}
          variant="contained"
          sx={{
            marginTop: "16px",
            bgcolor: colors.primary,
            "&:hover": {
              bgcolor: colors.mediumPurple,
            },
          }}
        >
          Signup
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {state?.error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
