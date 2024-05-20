import React, { useState, useEffect, FC } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import useLessonsService from "@/app/(client)/services/lesson.service";
import useCategoriesService from "@/app/(client)/services/category.service";
import { CategoryModel } from "@/app/api/models/category.model";
import { SelectChangeEvent } from "@mui/material/Select";
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";

type Props = {
  teacherId: number;
};

interface LessonFormData {
  name: string;
  categoryId: number | null;
}

const AddLesson: FC<Props> = ({ teacherId }) => {
  const { createLesson } = useLessonsService();
  const { getCategories } = useCategoriesService();
  const [formData, setFormData] = useState<LessonFormData>({
    name: "",
    categoryId: null,
  });
  const [categoryOptions, setCategoryOptions] = useState<CategoryModel[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.categoryId) {
      await createLesson(teacherId, formData.categoryId);
      setFormData({
        name: "",
        categoryId: null,
      });
      setShowForm(false); // Hide the form after submission
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories: CategoryModel[] = await getCategories();
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [getCategories]);

  return (
    <Container maxWidth="sm">
      {/* <Paper style={{ padding: 20, marginBottom: 20 }} elevation={3}> */}
      {/* <Typography variant="h5" gutterBottom>
          Add a new Lesson
        </Typography> */}
      {!showForm && (
        <Button variant="contained" onClick={() => setShowForm(true)}>
          new lesson <PlaylistAddCircleRoundedIcon />
        </Button>
      )}
      {showForm && (
        <Paper style={{ padding: 20, marginBottom: 20 }} elevation={3}>
          <form
            style={{ width: "100%", marginTop: 10 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Category"
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryOptions.map((category) => (
                    <MenuItem
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
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
      )}
      {/* </Paper> */}
    </Container>
  );
};

export default AddLesson;
