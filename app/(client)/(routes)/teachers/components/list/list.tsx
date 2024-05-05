"use client";

import React, { FC, useEffect, useState } from "react";
import Item from "../item/item";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";
import { Grid } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { useUserContext } from "@/app/(client)/hooks/context.hook";

type Props = {
  isSession: boolean;
};

const List: FC<Props> = ({ isSession }) => {
  const { getTeachers } = useTeachersService();
  const { setIsLoggedIn } = useUserContext();
  const [teachers, setTeachers] = useState<TeacherModel[] | null>(null);

  useEffect(() => {
    setIsLoggedIn(isSession);
  }, [isSession]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeachers = await getTeachers();
        // const fetchedUser = await getUserById(1);
        // const user = await createUser(
        //   "charlie",
        //   "jkialtchb",
        //   "charlie@gmail.com",
        //   "1234567890",
        //   "pic2.jpg",
        //   "Charlie",
        //   "Adams",
        //   "user"
        // );

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
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Item teacher={teacher} />
          </Grid>
        ))}
    </Grid>
  );
};

export default List;
