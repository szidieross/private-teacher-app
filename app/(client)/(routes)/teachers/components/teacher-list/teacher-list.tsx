"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
} from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import {
  useSearchContext,
  useUserContext,
} from "@/app/(client)/hooks/context.hook";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import useUsersService from "@/app/(client)/services/user.service";
import { getSession } from "@/app/actions";
import SearchBar from "@/app/(client)/components/searchbar/searchbar";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { CategoryModel } from "@/app/api/models/category.model";
import useCategoriesService from "@/app/(client)/services/category.service";
import Link from "next/link";
import { colors } from "@/app/(client)/constants/color.constant";
import TeacherItem from "../teacher-item/teacher-item";
import SkeletonList from "../skeleton-list/skeleton-list";
import { wrap } from "module";

type Props = {
  isSession: boolean;
};

const TeacherList: FC<Props> = ({ isSession }) => {
  const { getTeachers } = useTeachersService();
  const { getCategories } = useCategoriesService();
  const { filteredTeachers, setFilteredTeachers, allTeachers, setAllTeachers } =
    useSearchContext();
  const { getUserById } = useUsersService();
  const { setUserInfo } = useUserContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleLocationChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedLocations(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        isLoggedIn: isSession,
      };
    });
  }, [isSession, setUserInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSession) {
          const session = await getSession();
          if (session.userId) {
            const user = await getUserById(session.userId);

            setUserInfo((prevState) => {
              return {
                ...prevState,
                userId: user?.userId,
                username: user?.username,
                firstName: user?.firstName,
                lastName: user?.lastName,
                userImg: user?.profilePicture,
                userType: user?.role ? user.role : "user",
                teacherId: session.teacherId,
              };
            });
          }
        }
        const fetchedTeachers = await getTeachers();

        setAllTeachers(fetchedTeachers);
        setFilteredTeachers(fetchedTeachers);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);

        const uniqueLocations = Array.from(
          new Set(
            fetchedTeachers
              .map((teacher) => teacher.location)
              .filter((location) => location && location.trim() !== "")
          )
        );

        setLocations(uniqueLocations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [
    getTeachers,
    getCategories,
    getUserById,
    isSession,
    setAllTeachers,
    setFilteredTeachers,
    setUserInfo,
  ]);

  const filterTeachersByCategory = (
    teachers: TeacherModel[],
    categoryName: string
  ): TeacherModel[] => {
    return teachers.filter((teacher) =>
      teacher.lessons?.some((lesson) => lesson.categoryName === categoryName)
    );
  };

  const filterTeachersByLocation = (
    teachers: TeacherModel[],
    locations: string[]
  ): TeacherModel[] => {
    if (locations.length === 0) return teachers;
    return teachers.filter((teacher) => locations.includes(teacher.location));
  };

  return (
    <Grid container spacing={2} marginBottom={6}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>
      <Grid item xs={12}>
        <Box display={"flex"} flexWrap={"wrap"} gap={4} rowGap={1}>
          <Box>
            <InputLabel
              id="category-select-label"
              style={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                color: colors.primary,
              }}
            >
              Tantárgy választása
            </InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleChange}
              sx={{
                width: { xs: "80vw", sm: "200px" },
                marginBottom: "16px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.mediumPurple,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    maxHeight: 200,
                    "& .MuiMenuItem-root": {
                      "&.Mui-selected": {
                        backgroundColor: colors.primary,
                      },
                      "&:hover": {
                        backgroundColor: colors.mediumPurple,
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="">Minden</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <InputLabel
              id="location-select-label"
              sx={{
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                color: colors.primary,
              }}
            >
              Helység választása
            </InputLabel>
            <Select
              multiple
              value={selectedLocations}
              onChange={handleLocationChange}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                width: { xs: "80vw", sm: "200px" },
                marginBottom: "16px",
                backgroundColor: "background.paper",
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    maxHeight: 200,
                    "& .MuiMenuItem-root": {
                      "&.Mui-selected": {
                        backgroundColor: colors.primary,
                      },
                      "&:hover": {
                        backgroundColor: colors.mediumPurple,
                      },
                    },
                  },
                },
              }}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox
                    checked={selectedLocations.indexOf(location) > -1}
                  />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Grid>
      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {allTeachers &&
            filteredTeachers.length === allTeachers.length &&
            allTeachers
              .filter(
                (teacher) =>
                  !selectedCategory ||
                  filterTeachersByCategory([teacher], selectedCategory).length >
                    0
              )
              .filter(
                (teacher) =>
                  !selectedLocations ||
                  filterTeachersByLocation([teacher], selectedLocations)
                    .length > 0
              )
              .map((teacher, index) => (
                <Grid key={teacher.teacherId} item xs={12} sm={6} md={4} lg={4}>
                  <Link href={`/teachers/${teacher.teacherId}`}>
                    <TeacherItem teacher={teacher} />
                  </Link>
                </Grid>
              ))}
          {filteredTeachers &&
            filteredTeachers.length !== allTeachers.length &&
            filteredTeachers
              .filter(
                (teacher) =>
                  !selectedCategory ||
                  filterTeachersByCategory([teacher], selectedCategory).length >
                    0
              )
              .filter(
                (teacher) =>
                  !selectedLocations ||
                  filterTeachersByLocation([teacher], selectedLocations)
                    .length > 0
              )
              .map((teacher, index) => (
                <Grid key={teacher.teacherId} item xs={12} sm={6} md={4} lg={4}>
                  <Link href={`/teachers/${teacher.teacherId}`}>
                    <TeacherItem teacher={teacher} />
                  </Link>
                </Grid>
              ))}
          {filteredTeachers.length === 0 && (
            <Grid item xs={12}>
              <Typography textAlign={"center"}>No items found</Typography>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default TeacherList;
