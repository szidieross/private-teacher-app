"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import React, { FC } from "react";
import "./teacher-item.scss";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

type Props = {
  teacher: TeacherModel;
};

const TeacherItem: FC<Props> = ({ teacher }) => {
  const imageSrc = teacher.userData.profilePicture
    ? `/images/uploads/${teacher.userData.profilePicture}`
    : "/images/default/person.jpg";

  return (
    <Card className="teacher-card" sx={{ borderRadius: 2 }}>
      <CardContent className="teacher-content">
        <CardMedia
          className="teacher-media"
          component="img"
          height="320"
          image={imageSrc}
          sx={{ borderRadius: 2 }}
          alt={`${teacher.userData.firstName} ${teacher.userData.lastName}`}
        />
        <Box className="teacher-details" pt={2}>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            className="teacher-name"
            fontSize={21}
          >
            {teacher.userData.firstName} {teacher.userData.lastName}
          </Typography>
          <div className="teacher-info">
            <Typography
              variant="body2"
              color="text.secondary"
              className="teacher-info-item"
            >
              <AutoStoriesIcon sx={{ fontSize: 16, marginRight: 1 }} />{" "}
              {teacher.lessons && teacher.lessons.length > 0
                ? teacher.lessons.map((item, index) => (
                    <React.Fragment key={item.categoryName}>
                      {item.categoryName}
                      {index < (teacher.lessons?.length ?? 0) - 1 && " | "}
                    </React.Fragment>
                  ))
                : " - "}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              className="teacher-info-item"
            >
              <SchoolRoundedIcon sx={{ fontSize: 16, marginRight: 1 }} />{" "}
              {teacher.qualification}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="teacher-info-item"
            >
              <LocationOnRoundedIcon sx={{ fontSize: 16, marginRight: 1 }} />{" "}
              {teacher.location}
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeacherItem;
