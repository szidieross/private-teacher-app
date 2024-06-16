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
  IconButton,
} from "@mui/material";
import { LessonModel } from "@/app/api/models/lesson.model";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import AppointmentsTable from "../../appointments-table/appointments-table";
import { getSession } from "@/app/actions";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import "./booking.scss";
import { colors } from "@/app/(client)/constants/color.constant";

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
  const [ownTeacherId, setOwnTeacherId] = useState<number | null>(null);

  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession();
      if (session.teacherId) {
        setOwnTeacherId(session.teacherId);
      }
    };
    getSessionData();
  }, []);

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
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, mb: 6 }}>
      {teacher && (
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color={colors.mediumPurple} fontWeight={"bold"} align="center">
            Időpont foglalás
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            {lessons?.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleOpenModal(item)}
                variant="contained"
                endIcon={<AddCircleRoundedIcon />}
                sx={{
                  textTransform: "none",
                  marginBottom: 1,
                  bgcolor: colors.primary,
                  "&:hover": {
                    bgcolor: colors.mediumPurple,
                  },
                }}
              >
                {item.categoryName}
              </Button>
            ))}
          </Box>
        </Grid>
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
            boxShadow: 24,
            maxWidth: 1000,
            mx: "auto",
            my: "10%",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {selectedLesson.lesson?.categoryName} Appointment
          </Typography>
          {selectedLesson && selectedLesson.lesson?.lessonId && (
            <AppointmentsTable
              teacherId={teacherId}
              lessonId={selectedLesson.lesson?.lessonId}
              categoryName={selectedLesson.lesson.categoryName}
              ownTeacherId={ownTeacherId}
            />
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          Please log in to see the appointments
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Booking;
