import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import useLessonsService from "@/app/(client)/services/lesson.service";

interface LessonFormData {
  name: string;
  description: string;
}

const AddLesson: React.FC = () => {
  const { createLesson } = useLessonsService();
  const [formData, setFormData] = useState<LessonFormData>({
    name: "",
    description: "",
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
    createLesson(1, 1);
    // Reset form data
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginBottom: 20 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Add a new Lesson
        </Typography>
        <form style={{ width: "100%", marginTop: 10 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lesson Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Lesson
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddLesson;
