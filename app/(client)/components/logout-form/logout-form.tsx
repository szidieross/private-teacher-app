"use client";

import { logout } from "@/app/actions";
import { Typography } from "@mui/material";
import { FC } from "react";
import "./logout-form.scss";

const LogoutForm: FC = () => {
  return (
    <form action={logout}>
      <button className="logout-button">
        <Typography>Logout</Typography>
      </button>
    </form>
  );
};

export default LogoutForm;
