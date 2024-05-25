"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  Box,
} from "@mui/material";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { colors } from "@/app/(client)/constants/color.constant";

type Props = {
  teacherId: number;
};

const AddAppointment: FC<Props> = ({ teacherId }) => {
  const { createAppointment } = useAppointmentsService();
  const { getLessonsByTeacherId } = useLessonsService();
  const [formData, setFormData] = useState({ date: "" });
  const [lessons, setLessons] = useState<LessonModel[] | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData = await getLessonsByTeacherId(teacherId);
        setLessons(lessonsData);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };
    fetchLessons();
  }, [teacherId, getLessonsByTeacherId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAppointment(teacherId, new Date(formData.date));
    setFormData({ date: "" });
  };

  return (
    <Container maxWidth="sm">
      {lessons?.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="h6" color="textSecondary" align="center">
            Add a lesson to create appointments.
          </Typography>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor={colors.background}
          padding={2}
        >
          <Card
            sx={{
              padding: 4,
              borderRadius: 3,
              maxWidth: 500,
              width: "100%",
              boxShadow: 5,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Schedule an Appointment
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Date and Time"
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{ cursor: "pointer" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<EditCalendarIcon />}
                    sx={{
                      paddingY: 1.5,
                      backgroundColor: colors.primary,
                      "&:hover": {
                        backgroundColor: colors.mediumPurple,
                      },
                    }}
                  >
                    Create Appointment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default AddAppointment;
