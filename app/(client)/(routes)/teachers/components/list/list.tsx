"use client";

import React, { FC, useEffect, useState } from "react";
import Item from "../item/item";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";
import { Grid } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import useNavigation from "@/app/(client)/hooks/navigation.hook";

type Props = {
  isSession: boolean;
};

const List: FC<Props> = ({ isSession }) => {
  const { getTeachers } = useTeachersService();
  const { setIsLoggedIn } = useUserContext();
  const { to } = useNavigation();
  const [teachers, setTeachers] = useState<TeacherModel[] | null>(null);

  useEffect(() => {
    setIsLoggedIn(isSession);
  }, [isSession, setIsLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeachers = await getTeachers();
        setTeachers(fetchedTeachers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [getTeachers]);

  return (
    <Grid container>
      {teachers &&
        teachers.map((teacher, index) => (
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
    </Grid>
  );
};

export default List;
