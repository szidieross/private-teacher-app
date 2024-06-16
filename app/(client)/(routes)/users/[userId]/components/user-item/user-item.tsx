"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";
import {
  AlternateEmailOutlined as AlternateEmailOutlinedIcon,
  EmailRounded as EmailRoundedIcon,
  LocalPhoneRounded as LocalPhoneRoundedIcon,
} from "@mui/icons-material";
import { colors } from "@/app/(client)/constants/color.constant";

type Props = {
  userId: number;
};

const UserItem: FC<Props> = ({ userId }) => {
  const { getUserById } = useUsersService();
  const [user, setUser] = useState<UserModel | null>(null);
  const { to } = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [getUserById, userId]);

  if (!user)
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        paddingTop="200px"
        width={"100%"}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container>
      <IconButton
        onClick={() => {
          window.history.back();
        }}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Paper
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: colors.background,
        }}
      >
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Card className="card">
              <CardMedia
                component="img"
                width="auto"
                image={
                  user.profilePicture
                    ? `/images/uploads/${user.profilePicture}`
                    : "/images/default/person.jpg"
                }
                alt="Profile"
                className="img"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8} position="relative">
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: colors.secondary }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <AlternateEmailOutlinedIcon
                sx={{ mr: 1, color: colors.darkPurple }}
              />
              <Typography variant="subtitle1">{user.username}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />

              <a href={`mailto:${user.email}`}>
                <Typography variant="subtitle1">{user.email}</Typography>
              </a>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <LocalPhoneRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />

              <a href={`tel:${user.phone}`}>
                <Typography variant="subtitle1">
                  {user.phone ? user.phone : " - "}
                </Typography>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserItem;
