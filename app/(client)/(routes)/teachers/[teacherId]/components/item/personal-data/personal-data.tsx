"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";
import { useUserContext } from "@/app/(client)/hooks/context.hook";

type Props = {
  teacher: TeacherModel;
  lessons: LessonModel[] | null;
};

const PersonalData: FC<Props> = ({ teacher, lessons }) => {
  const { userInfo } = useUserContext();
  const { getTeacherById } = useTeachersService();
  const { getLessonsByTeacherId } = useLessonsService();
  // const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  // const [lessons, setLessons] = useState<LessonModel[] | null>(null);

  useEffect(() => {
    if (teacher && teacher.userData.profilePicture) {
      setImage(teacher.userData.profilePicture);
    }
  }, [teacher]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {teacher && (
        <>
          <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: 345 }}>
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
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {teacher.userData.firstName} {teacher.userData.lastName}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Location: {teacher.location}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Price: {teacher.price}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Bio: {teacher.bio}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Qualification: {teacher.qualification}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Subject: {lessons?.map((item, index) => item.categoryName)}
                </Typography>
                <a
                  href={`mailto:${teacher.userData.email}`}
                  title="Send an email"
                >
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Email: {teacher.userData.email}
                  </Typography>
                </a>
                <a href={`tel:${teacher.userData.phone}`} title="Make a call">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Phone: {teacher.userData.phone}
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
