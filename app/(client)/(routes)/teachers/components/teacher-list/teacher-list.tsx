"use client";
import React, { FC, useEffect, useState } from "react";
import Item from "../teacher-item/teacher-item";
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

type Props = {
  isSession: boolean;
};

const TeacherList: FC<Props> = ({ isSession }) => {
  const { getTeachers } = useTeachersService();
  const { getCategories } = useCategoriesService();
  const { filteredTeachers, setFilteredTeachers, allTeachers, setAllTeachers } =
    useSearchContext();
  const { getUserById } = useUsersService();
  const { userInfo, setUserInfo } = useUserContext();
  const { to } = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

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

        // Extract unique locations from fetched teachers
        const uniqueLocations = Array.from(
          new Set(fetchedTeachers.map((teacher) => teacher.location))
        );
        setLocations(uniqueLocations);
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

  const filteredByCategory = filterTeachersByCategory(
    allTeachers,
    selectedCategory
  );
  const finalFilteredTeachers = filterTeachersByLocation(
    filteredByCategory,
    selectedLocations
  );

  return (
    <Grid container spacing={2} marginBottom={6}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>
      <Grid item xs={12}>
        <InputLabel
          id="category-select-label"
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            color: colors.primary,
          }}
        >
          Choose a category
        </InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleChange}
          style={{ width: "200px", marginBottom: "16px" }}
          sx={{
            width: "200px",
            marginBottom: "16px",
            backgroundColor: "background.paper",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.dark",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.dark",
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
                    backgroundColor: colors.primary,
                  },
                },
                "& ul": {
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: colors.primary,
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: colors.primary,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: colors.primary,
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="">All categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <InputLabel
          id="location-select-label"
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            color: colors.primary,
          }}
        >
          Choose locations
        </InputLabel>
        <Select
          multiple
          value={selectedLocations}
          onChange={handleLocationChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(", ")}
          style={{ width: "200px", marginBottom: "16px" }}
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
                    backgroundColor: colors.primary,
                  },
                },
                "& ul": {
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: colors.primary,
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: colors.primary,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: colors.primary,
                  },
                },
              },
            },
          }}
        >
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              <Checkbox checked={selectedLocations.indexOf(location) > -1} />
              <ListItemText primary={location} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {allTeachers &&
        filteredTeachers.length == allTeachers.length &&
        allTeachers
          .filter(
            (teacher) =>
              !selectedCategory ||
              filterTeachersByCategory([teacher], selectedCategory).length > 0
          )
          .filter(
            (teacher) =>
              !selectedLocations ||
              filterTeachersByLocation([teacher], selectedLocations).length > 0
          )
          .map((teacher, index) => (
            <Grid key={teacher.teacherId} item xs={12} sm={6} md={4} lg={4}>
              <Link href={`/teachers/${teacher.teacherId}`}>
                <TeacherItem teacher={teacher} />
              </Link>
            </Grid>
          ))}
      {filteredTeachers &&
        filteredTeachers.length != allTeachers.length &&
        filteredTeachers
          .filter(
            (teacher) =>
              !selectedCategory ||
              filterTeachersByCategory([teacher], selectedCategory).length > 0
          )
          .filter(
            (teacher) =>
              !selectedLocations ||
              filterTeachersByLocation([teacher], selectedLocations).length > 0
          )
          .map((teacher, index) => (
            <Grid key={teacher.teacherId} item xs={12} sm={6} md={4} lg={4}>
              <Link href={`/teachers/${teacher.teacherId}`}>
                <TeacherItem teacher={teacher} />
              </Link>
            </Grid>
          ))}
      {filteredTeachers.length == 0 && (
        <Grid item xs={12}>
          <Typography textAlign={"center"}>No items found</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default TeacherList;
