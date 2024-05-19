import React, { FC, useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import useLessonsService from "@/app/(client)/services/lesson.service";
import { LessonModel } from "@/app/api/models/lesson.model";

type Props = {
  teacherId: number;
};

const AddAppointment: FC<Props> = ({ teacherId }) => {
  const { createAppointment } = useAppointmentsService();
  const { getLessonsByTeacherId } = useLessonsService();
  const [formData, setFormData] = useState({
    date: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedDate = new Date(formData.date);
    createAppointment(teacherId, selectedDate);
    setFormData({
      date: "",
    });
  };

  const [lessons, setLessons] = useState<LessonModel[] | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData = await getLessonsByTeacherId(teacherId);
        setLessons(lessonsData);
        console.log("lessonsData", lessonsData);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };

    fetchLessons();
  }, [teacherId]);

  return (
    <Container maxWidth="sm">
      {lessons?.length === 0 ? (
        <Typography>You need to add a lesson to create appointments.</Typography>
      ) : (
        <Paper style={{ padding: 20, marginBottom: 20 }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Add a time to your appointment
          </Typography>
          <form
            style={{ width: "100%", marginTop: 10 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20 }}
                  fullWidth
                >
                  Create Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default AddAppointment;
