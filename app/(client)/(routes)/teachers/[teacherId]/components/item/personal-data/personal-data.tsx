"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { LessonModel } from "@/app/api/models/lesson.model";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import "./personal-data.scss";

type Props = {
  teacher: TeacherModel;
  lessons: LessonModel[] | null;
};

const PersonalData: FC<Props> = ({ teacher, lessons }) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (teacher && teacher.userData.profilePicture) {
      setImage(teacher.userData.profilePicture);
    }
  }, [teacher]);

  if (!teacher) return <></>;

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      className="grid-container"
    >
      <Grid item xs={12} sm={6} md={5} className="grid-item">
        <Card className="card">
          <CardMedia
            component="img"
            height="360"
            width="auto"
            image={
              image ? `/images/uploads/${image}` : "/images/default/person.jpg"
            }
            alt="Profile"
            className="img"
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={7} className="grid-item">
        {/* <Card sx={{ backgroundColor: "beige", minHeight: "100%" }}>
          <CardContent> */}
        <Box>
          <Typography variant="h4" gutterBottom className="name">
            {teacher.userData.firstName} {teacher.userData.lastName}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className="location"
          >
            <LocationOnRoundedIcon /> {teacher.location}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className="school"
          >
            <SchoolRoundedIcon /> {teacher.qualification}
          </Typography>
        </Box>
        <Box>
          <a href={`mailto:${teacher.userData.email}`} title="Send an email">
            <Typography
              variant="body1"
              color="textSecondary"
              gutterBottom
              className="email"
            >
              <EmailRoundedIcon /> {teacher.userData.email}
            </Typography>
          </a>
        </Box>
        <Box>
          <a href={`tel:${teacher.userData.phone}`} title="Make a call">
            <Typography
              variant="body1"
              color="textSecondary"
              gutterBottom
              className="phone"
            >
              <LocalPhoneRoundedIcon /> {teacher.userData.phone}
            </Typography>
          </a>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className="price"
          >
            Price/hour: {teacher.price}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className="bio"
          >
            {teacher.bio}
          </Typography>
        </Box>
        {/* <Typography variant="body1" color="textSecondary" gutterBottom>
                  Subject: {lessons?.map((item, index) => item.categoryName)}
                </Typography> */}
        {/* </CardContent>
        </Card> */}
      </Grid>
    </Grid>
  );
};

export default PersonalData;
