"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import { LessonModel } from "@/app/api/models/lesson.model";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

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

  return (
    <Grid container spacing={2} justifyContent="center">
      {teacher && (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="360"
                width="auto"
                image={
                  image
                    ? `/images/uploads/${image}`
                    : "/images/default/person.jpg"
                }
                alt="Profile"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Card sx={{ backgroundColor: "beige", minHeight: "100%" }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {teacher.userData.firstName} {teacher.userData.lastName}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <LocationOnRoundedIcon /> {teacher.location}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Price/hour: {teacher.price}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Bio: {teacher.bio}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <SchoolRoundedIcon /> {teacher.qualification}
                </Typography>
                {/* <Typography variant="body1" color="textSecondary" gutterBottom>
                  Subject: {lessons?.map((item, index) => item.categoryName)}
                </Typography> */}
                <a
                  href={`mailto:${teacher.userData.email}`}
                  title="Send an email"
                >
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <EmailRoundedIcon /> {teacher.userData.email}
                  </Typography>
                </a>
                <a href={`tel:${teacher.userData.phone}`} title="Make a call">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <LocalPhoneRoundedIcon /> {teacher.userData.phone}
                  </Typography>
                </a>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PersonalData;
