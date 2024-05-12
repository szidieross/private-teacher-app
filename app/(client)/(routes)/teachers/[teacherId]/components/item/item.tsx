"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Modal,
  Box,
} from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";
import AppointmentsTable from "../appointments-table/appointments-table";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import { isLoggedIn } from "@/app/actions";

type Props = {
  teacherId: number;
};

const Item: FC<Props> = ({ teacherId }) => {
  const { userInfo } = useUserContext();
  const { getTeacherById } = useTeachersService();
  const { getLessonsByTeacherId } = useLessonsService();
  const [teacher, setTeacher] = useState<TeacherModel | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lessons, setLessons] = useState<LessonModel[] | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: LessonModel | null;
    categoryId: number | null;
  }>({ lesson: null, categoryId: null });

  useEffect(() => {
    if (teacher && teacher.userData.profilePicture) {
      // setImage(`/images/uploads/${teacher.userData.profilePicture}`);
      setImage(teacher.userData.profilePicture);
    }
  }, [teacher]);

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
  }, [getTeacherById, teacherId]);

  const handleOpenModal = (lesson: LessonModel) => {
    if (!userInfo.isLoggedIn) {
      console.log("NO")
      alert("To see the appointments you have to log in.");
      return;
    }
    setSelectedLesson({ lesson, categoryId: lesson.categoryId });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
                // image={image}
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
          <Grid xs={12}>
            Book appointment for
            {lessons?.map((item, index) => (
              <Button
                variant="outlined"
                onClick={() => handleOpenModal(item)}
                key={index}
              >
                {item.categoryName}
              </Button>
            ))}
          </Grid>
        </>
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            overflowY: "scroll",
            backgroundColor: "white",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              {selectedLesson.lesson?.categoryName} Appointment
            </Typography>
            <Button onClick={handleCloseModal}>
              <CloseIcon />
            </Button>
          </Box>
          {selectedLesson && selectedLesson.lesson?.lessonId && (
            <>
              <AppointmentsTable
                teacherId={teacherId}
                lessonId={selectedLesson.lesson?.lessonId}
              />
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
};

export default Item;
