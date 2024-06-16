"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import { Container, IconButton, Typography, Paper, Box, CircularProgress } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";
import PersonalData from "./personal-data/personal-data";
import Booking from "./booking/booking";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useNavigation from "@/app/(client)/hooks/navigation.hook";

type Props = {
  teacherId: number;
};

const Item: FC<Props> = ({ teacherId }) => {
  const { getTeacherById } = useTeachersService();
  const { getLessonsByTeacherId } = useLessonsService();
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [lessons, setLessons] = useState<LessonModel[] | null>(null);
  const { to } = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeacher = await getTeacherById(teacherId);
        setTeacher(fetchedTeacher);
        const fetchedLessons = await getLessonsByTeacherId(teacherId);
        setLessons(fetchedLessons);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchData();
  }, [getTeacherById, teacherId, getLessonsByTeacherId]);

  if (!teacher)
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        paddingTop="200px"
        width={"100%"}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => to("/teachers")} title="Back to Homepage">
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>
      <PersonalData teacher={teacher} />
      <Box mt={2}>
        {lessons && lessons.length > 0 ? (
          <Booking teacherId={teacherId} teacher={teacher} lessons={lessons} />
        ) : (
          <Typography>No lesson yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Item;
