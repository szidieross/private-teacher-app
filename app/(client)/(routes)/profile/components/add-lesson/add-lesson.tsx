import React, { useState, useEffect, FC } from "react";
import {
  Container,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import useLessonsService from "@/app/(client)/services/lesson.service";
import useCategoriesService from "@/app/(client)/services/category.service";
import { CategoryModel } from "@/app/api/models/category.model";
import { SelectChangeEvent } from "@mui/material/Select";
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";
import { colors } from "@/app/(client)/constants/color.constant";
import { LessonModel } from "@/app/api/models/lesson.model";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type Props = {
  teacherId: number;
};

interface LessonFormData {
  name: string;
  categoryId: number | null;
}

const AddLesson: FC<Props> = ({ teacherId }) => {
  const { createLesson, getLessonsByTeacherId, deleteLessonsByLessonId } =
    useLessonsService();
  const { getCategories } = useCategoriesService();
  const [formData, setFormData] = useState<LessonFormData>({
    name: "",
    categoryId: null,
  });
  const [lessons, setLessons] = useState<LessonModel[] | null>(null);
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
      setShowForm(false);

      const updatedLessons = await getLessonsByTeacherId(teacherId);
      setLessons(updatedLessons);
    }
  };

  const removeLesson = async (lessonId: number) => {
    await deleteLessonsByLessonId(teacherId, lessonId);

    const updatedLessons = await getLessonsByTeacherId(teacherId);
    setLessons(updatedLessons);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories: CategoryModel[] = await getCategories();
        const lessons = await getLessonsByTeacherId(teacherId);
        setLessons(lessons);
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getCategories, getLessonsByTeacherId, teacherId]);

  return (
    <Container maxWidth="sm">
      {!showForm ? (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: colors.primary,
            "&:hover": {
              bgcolor: colors.mediumPurple,
            },
          }}
        >
          New Lesson <PlaylistAddCircleRoundedIcon sx={{ ml: 1 }} />
        </Button>
      ) : (
        <Paper
          sx={{
            padding: 3,
            marginBottom: 4,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: colors.background,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: 10 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  displayEmpty
                  value={formData.categoryId || ""}
                  onChange={handleChange}
                  name="categoryId"
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>None</em>;
                    }
                    const selectedCategory = categoryOptions.find(
                      (category) => category.categoryId === selected
                    );
                    return selectedCategory ? (
                      selectedCategory.name
                    ) : (
                      <em>None</em>
                    );
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryOptions
                    .filter(
                      (category) =>
                        lessons &&
                        !lessons.some(
                          (lesson) => lesson.categoryId === category.categoryId
                        )
                    )
                    .map((category) => (
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: colors.primary,
                    "&:hover": {
                      bgcolor: colors.mediumPurple,
                    },
                  }}
                >
                  Add Lesson
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
      <Typography variant="h4" fontSize={18} color={colors.secondary}>
        Your lessons
      </Typography>
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
            onClick={() => removeLesson(item.lessonId)}
            variant="contained"
            endIcon={<RemoveCircleOutlineIcon />}
            sx={{
              fontSize: 12,
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
    </Container>
  );
};

export default AddLesson;
