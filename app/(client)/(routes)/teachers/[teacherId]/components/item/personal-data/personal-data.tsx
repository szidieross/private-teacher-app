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
import { colors } from "@/app/(client)/constants/color.constant";

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
        <Card className="info-card">
          <CardContent>
            <Typography variant="h4" gutterBottom className="name">
              {teacher.userData.firstName} {teacher.userData.lastName}
            </Typography>
            <Box display="flex" alignItems="center" className="location">
              <LocationOnRoundedIcon
                sx={{ marginRight: 1, color: colors.darkPurple }}
              />
              <Typography variant="body1" color={colors.secondary}>
                {teacher.location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" className="school">
              <SchoolRoundedIcon
                sx={{ marginRight: 1, color: colors.darkPurple }}
              />
              <Typography variant="body1" color="textSecondary">
                {teacher.qualification}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" className="email">
              <EmailRoundedIcon
                sx={{ marginRight: 1, color: colors.darkPurple }}
              />
              <Typography variant="body1" color="textSecondary">
                {teacher.userData.email}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" className="phone">
              <LocalPhoneRoundedIcon
                sx={{ marginRight: 1, color: colors.darkPurple }}
              />
              <Typography variant="body1" color="textSecondary">
                {teacher.userData.phone}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="textSecondary"
              gutterBottom
              className="price"
            >
              Price/hour: {teacher.price}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              gutterBottom
              className="bio"
            >
              {teacher.bio}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalData;
