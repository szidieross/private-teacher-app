"use client";

import React, { FC, useEffect, useState } from "react";
import Item from "../item/item";
import { Grid, Typography } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import {
  useSearchContext,
  useUserContext,
} from "@/app/(client)/hooks/context.hook";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import useUsersService from "@/app/(client)/services/user.service";
import { getSession } from "@/app/actions";
import SearchBar from "@/app/(client)/components/searchbar/searchbar";

type Props = {
  isSession: boolean;
};

const List: FC<Props> = ({ isSession }) => {
  const { getTeachers, getTeacherByUserId } = useTeachersService();
  const { allTeachers, setAllTeachers, filteredTeachers, setFilteredTeachers } =
    useSearchContext();
  const { getUserById } = useUsersService();
  const { userInfo, setUserInfo } = useUserContext();
  const { to } = useNavigation();
  // const [teachers, setTeachers] = useState<TeacherModel[] | null>(null);

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
        // setTeachers(fetchedTeachers);
        setAllTeachers(fetchedTeachers);
        setFilteredTeachers(fetchedTeachers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [getTeachers]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>
      {allTeachers &&
        filteredTeachers.length == allTeachers.length &&
        allTeachers.map((teacher, index) => (
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
        filteredTeachers.map((teacher, index) => (
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
