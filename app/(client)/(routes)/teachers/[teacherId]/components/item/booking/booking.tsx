"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import React, { FC, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import AppointmentsTable from "../../appointments-table/appointments-table";

type Props = {
  teacherId: number;
  teacher: TeacherModel;
  lessons: LessonModel[];
};

const Booking: FC<Props> = ({ teacherId, teacher, lessons }) => {
  const { userInfo } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: LessonModel | null;
    categoryId: number | null;
  }>({ lesson: null, categoryId: null });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenModal = (lesson: LessonModel) => {
    if (!userInfo.isLoggedIn) {
      setSnackbarOpen(true);
      return;
    }
    setSelectedLesson({ lesson, categoryId: lesson.categoryId });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" marginTop={"20px"}>
        {teacher && (
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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="info">
            Please log in to see the appointments
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Booking;