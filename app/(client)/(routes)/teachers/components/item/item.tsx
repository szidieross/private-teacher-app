"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import "./item.scss";

type Props = {
  teacher: TeacherModel;
};

const Item: FC<Props> = ({ teacher }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (teacher.userData.profilePicture) {
      setImage(`/images/uploads/${teacher.userData.profilePicture}`);
    }
  }, [teacher.userData.profilePicture]);

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {teacher.userData.firstName} {teacher.userData.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Qualification: {teacher.qualification}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {teacher.location}
        </Typography>
      </CardContent>
      {image && (
        <CardMedia
          component="img"
          height="360"
          width="100%"
          image={image}
          alt="Profile"
        />
      )}
    </Card>
  );
};

export default Item;
