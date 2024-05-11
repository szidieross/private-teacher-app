import React, { FC, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import useAppointmentsService from "@/app/(client)/services/appointment.service";

const AddAppointment: FC = () => {
  const { createAppointment } = useAppointmentsService();
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
    // Convert formData.date to Date object
    const selectedDate = new Date(formData.date);
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    createAppointment(1, selectedDate);
    // Reset form data
    setFormData({
      date: "", // Reset date field to empty string
    });

    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginBottom: 20 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Add a time to your appointment
        </Typography>
        <form style={{ width: "100%", marginTop: 10 }} onSubmit={handleSubmit}>
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
    </Container>
  );
};

export default AddAppointment;
