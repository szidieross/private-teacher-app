"use client";

import { UserModel } from "@/app/api/models/user.model";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import React, { FC } from "react";

type Props = {
  user: UserModel;
};

const UserItem: FC<Props> = ({ user }) => {
  const imageSrc = user.profilePicture
    ? `/images/uploads/${user.profilePicture}`
    : "/images/default/person.jpg";

  return (
    <Card className="card">
      <CardContent className="card-content">
        <CardMedia
          className="card-media"
          component="img"
          height="320"
          image={imageSrc}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <Box className="content-box">
          <Typography gutterBottom variant="h5" component="div" className="">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserItem;
