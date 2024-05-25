"use client";
import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import { Card, Typography, Grid, CardMedia, Box, Paper } from "@mui/material";
import { LessonModel } from "@/app/api/models/lesson.model";
import {
  AlternateEmailOutlined as AlternateEmailOutlinedIcon,
  EmailRounded as EmailRoundedIcon,
  LocalPhoneRounded as LocalPhoneRoundedIcon,
  LocationOnRounded as LocationOnRoundedIcon,
  SchoolRounded as SchoolRoundedIcon,
  MoneyRounded as MoneyRoundedIcon,
} from "@mui/icons-material";
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
    <Paper
      sx={{
        padding: 4,
        marginBottom: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: colors.background,
      }}
    >
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Card className="card">
            <CardMedia
              component="img"
              width="auto"
              image={
                image
                  ? `/images/uploads/${image}`
                  : "/images/default/person.jpg"
              }
              alt="Profile"
              className="img"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8} position="relative">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: colors.secondary }}
          >
            {teacher.userData.firstName} {teacher.userData.lastName}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <AlternateEmailOutlinedIcon
              sx={{ mr: 1, color: colors.darkPurple }}
            />
            <Typography variant="subtitle1">
              {teacher.userData.username}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />

            <a href={`mailto:${teacher.userData.email}`}>
              <Typography variant="subtitle1">
                {teacher.userData.email}
              </Typography>
            </a>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <LocalPhoneRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />

            <a href={`tel:${teacher.userData.phone}`}>
              <Typography variant="subtitle1">
                {teacher.userData.phone}
              </Typography>
            </a>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
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
          <Box display="flex" alignItems="center" mb={1}>
            <SchoolRoundedIcon
              sx={{ marginRight: 1, color: colors.darkPurple }}
            />
            <Typography variant="body1">{teacher.qualification}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <MoneyRoundedIcon sx={{ mr: 1, color: colors.darkPurple }} />
            <Typography variant="subtitle1">{teacher.price}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="subtitle1">{teacher.bio}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalData;
