"use client";

import { colors } from "@/app/(client)/constants/color.constant";
import { login } from "@/app/actions";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { FC } from "react";
import { useFormState } from "react-dom";

const LoginForm: FC = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <Box display={"flex"} justifyContent={"center"} pt={3}>
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
            {state?.error && (
              <Typography
                variant="body2"
                sx={{ marginTop: "16px", color: colors.error }}
              >
                {state.error}
              </Typography>
            )}
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default LoginForm;
