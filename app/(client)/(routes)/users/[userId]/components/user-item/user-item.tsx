"use client";

import React, { FC, useEffect, useState } from "react";
import { Container, IconButton, Typography } from "@mui/material";
import { LessonModel } from "@/app/api/models/lesson.model";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";

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

  if (!user) return <>No data found.</>;

  return (
    <Container>
      <IconButton onClick={() => to("/teachers")}>
        <KeyboardBackspaceIcon />
      </IconButton>
      <Typography>
        {user.firstName} {user.lastName}
      </Typography>
    </Container>
  );
};

export default UserItem;
