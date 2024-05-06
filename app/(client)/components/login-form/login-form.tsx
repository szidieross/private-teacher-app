"use client";

import { login } from "@/app/actions";
import { Button, TextField, Typography, Box } from "@mui/material";
import { FC } from "react";
import { useFormState } from "react-dom";

const LoginForm: FC = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <form action={formAction}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          margin: "auto",
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
          color="primary"
          sx={{ marginTop: "16px" }}
        >
          Login
        </Button>
        {state?.error && (
          <Typography variant="body2" color="error" sx={{ marginTop: "16px" }}>
            {state.error}
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default LoginForm;
