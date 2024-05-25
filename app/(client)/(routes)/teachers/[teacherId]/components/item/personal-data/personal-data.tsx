"use client";
import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import { Card, Typography, Grid, CardMedia, Box } from "@mui/material";
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
      spacing={6}
      justifyContent="center"
      className="grid-container"
    >
      <Grid item xs={12} sm={6} md={5} className="grid-item">
        <Card className="card">
          <CardMedia
            component="img"
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
        <Typography variant="h4" gutterBottom className="name">
          {teacher.userData.firstName} {teacher.userData.lastName}
        </Typography>
        {/* <Box display="flex" alignItems="center" className="location">
          <LocationOnRoundedIcon
            sx={{ marginRight: 1, color: colors.darkPurple }}
          />
          <Typography variant="body1" color={colors.secondary}>
            {`${teacher.houseNumber ? teacher.houseNumber + " " : ""}
            ${teacher.street ? teacher.street + ", " : ""}
            ${teacher.location}`}
          </Typography>
        </Box> */}
        <Box display="flex" alignItems="center" className="location" mt={2}>
          <LocationOnRoundedIcon
            sx={{ marginRight: 1, color: colors.darkPurple }}
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${teacher.location}`}
            target="_blank"
          >
            <Typography variant="body1" color={colors.secondary}>
              {`${teacher.houseNumber ? teacher.houseNumber + " " : ""}
            ${teacher.street ? teacher.street + ", " : ""}
            ${teacher.location}`}
            </Typography>
          </a>
        </Box>
        <Box display="flex" alignItems="center" className="school" mt={1}>
          <SchoolRoundedIcon
            sx={{ marginRight: 1, color: colors.darkPurple }}
          />
          <Typography variant="body1" color="textSecondary">
            {teacher.qualification}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className="email" mt={1}>
          <EmailRoundedIcon sx={{ marginRight: 1, color: colors.darkPurple }} />
          <a href={`mailto:${teacher.userData.email}`}>
            <Typography variant="body1" color="textSecondary">
              {teacher.userData.email}
            </Typography>
          </a>
        </Box>
        <Box display="flex" alignItems="center" className="phone" mt={1}>
          <LocalPhoneRoundedIcon
            sx={{ marginRight: 1, color: colors.darkPurple }}
          />
          <a href={`tel:${teacher.userData.phone}`}>
            <Typography variant="body1" color="textSecondary">
              {teacher.userData.phone}
            </Typography>
          </a>
        </Box>
        {/* <Box display="flex" alignItems="center" className="phone" mt={1}>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className="price"
          >
            Price/hour: {teacher.price}
          </Typography>
        </Box> */}
        <Box display="flex" alignItems="center" className="phone" mt={3}>
          <Typography variant="body1" color="textSecondary" className="bio">
            {teacher.bio}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonalData;
