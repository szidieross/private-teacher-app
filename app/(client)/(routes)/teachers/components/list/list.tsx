"use client";
import React, { FC, useEffect, useState } from "react";
import Item from "../item/item";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
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

type Props = {
  isSession: boolean;
};

const List: FC<Props> = ({ isSession }) => {
  const { getTeachers, getTeacherByUserId } = useTeachersService();
  const { getCategories } = useCategoriesService();
  const { filteredTeachers, setFilteredTeachers, allTeachers, setAllTeachers } =
    useSearchContext();
  const { getUserById } = useUsersService();
  const { userInfo, setUserInfo } = useUserContext();
  const { to } = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
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
            console.log(user);
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
        console.log("fetchedTeachers", fetchedTeachers);
        setAllTeachers(fetchedTeachers);
        setFilteredTeachers(fetchedTeachers);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [getTeachers]);

  const filterTeachersByCategory = (
    teachers: TeacherModel[],
    categoryName: string
  ): TeacherModel[] => {
    const filteredTeachers = teachers.filter((teacher) =>
      teacher.lessons?.some((lesson) => lesson.categoryName === categoryName)
    );

    return filteredTeachers;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>
      <Grid item xs={12}>
        <InputLabel id="category-select-label">Válassz kategóriát</InputLabel>
        <Select value={selectedCategory} onChange={handleChange}>
          <MenuItem value="">All categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.name}>
              {category.name}
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
          .map((teacher, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => to(`/teachers/${teacher.teacherId}`)}
            >
              <Item teacher={teacher} />
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
          .map((teacher, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => to(`/teachers/${teacher.teacherId}`)}
            >
              <Item teacher={teacher} />
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

export default List;
