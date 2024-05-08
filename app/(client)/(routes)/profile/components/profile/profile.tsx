"use client";

import { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { UserModel } from "@/app/api/models/user.model";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import useUsersService from "@/app/(client)/services/user.service";
import CustomModal from "../custom-modal/custom-modal";

type Props = {
  userId?: number;
};

const Profile: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const { getUserById } = useUsersService();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const user = await getUserById(userId);
          if (user) {
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [getUserById, userId]);

  if (!user) return <>bye</>;

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={3} container justifyContent="center">
            {/* Wrap the avatar with a button */}
            <Button onClick={handleOpen}>
              <Avatar sx={{ width: 120, height: 120 }}>
                {user.profilePicture ? (
                  <img
                    src={`/images/uploads/${user.profilePicture}`}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <AccountCircle sx={{ width: "100%", height: "100%" }} />
                )}
              </Avatar>
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Username: {user.username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone: {user.phone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Role: {user.role}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Member since: {user.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* Render the modal component */}
      <CustomModal open={open} onClose={handleClose} />
    </Container>
  );
};

export default Profile;
