"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import "./item.scss";

type Props = {
  teacher: TeacherModel;
};

const Item: FC<Props> = ({ teacher }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (teacher.userData.profilePicture) {
      setImage(teacher.userData.profilePicture);
    }
  }, [teacher.userData.profilePicture]);

  return (
    <Card className="card">
      <CardContent className="card-content">
        <CardMedia
          className="card-media"
          component="img"
          height="320"
          image={
            image ? `/images/uploads/${image}` : "/images/default/person.jpg"
          }
          alt="Profile"
        />
        <Box className="content-box">
          <Typography gutterBottom variant="h5" component="div" className="">
            {teacher.userData.firstName} {teacher.userData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="">
            Specification:
          </Typography>
          <Typography variant="body2" color="text.secondary" className="">
            Qualification: {teacher.qualification}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="">
            Location: {teacher.location}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
