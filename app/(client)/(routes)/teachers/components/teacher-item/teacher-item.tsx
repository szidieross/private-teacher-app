"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import React, { FC } from "react";
import "./teacher-item.scss";

type Props = {
  teacher: TeacherModel;
};

const TeacherItem: FC<Props> = ({ teacher }) => {
  const imageSrc = teacher.userData.profilePicture
    ? `/images/uploads/${teacher.userData.profilePicture}`
    : "/images/default/person.jpg";

  return (
    <Card className="card">
      <CardContent className="card-content">
        <CardMedia
          className="card-media"
          component="img"
          height="320"
          image={imageSrc}
          alt={`${teacher.userData.firstName} ${teacher.userData.lastName}`}
        />
        <Box className="content-box">
          <Typography gutterBottom variant="h5" component="div" className="">
            {teacher.userData.firstName} {teacher.userData.lastName}
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

export default TeacherItem;
