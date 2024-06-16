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
  IconButton,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useFormState } from "react-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const LoginForm: FC = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              Bejelentkezés
            </Typography>
            <TextField
              fullWidth
              type="text"
              name="username"
              required
              label="Felhasználónév"
              margin="normal"
              variant="outlined"
            />
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              name="password"
              required
              label="Jelszó"
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                ),
              }}
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
              Bejelentkezés
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
        <Typography fontSize={14}>Még nincs fiókja?</Typography>

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
          Regisztráció
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
