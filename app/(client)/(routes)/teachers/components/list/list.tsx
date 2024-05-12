"use client";

import React, { FC, useEffect, useState } from "react";
import Item from "../item/item";
import { Grid } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import useNavigation from "@/app/(client)/hooks/navigation.hook";
import useUsersService from "@/app/(client)/services/user.service";
import { getSession } from "@/app/actions";

type Props = {
  isSession: boolean;
};

const List: FC<Props> = ({ isSession }) => {
  const { getTeachers, getTeacherByUserId } = useTeachersService();
  const { getUserById } = useUsersService();
  const { userInfo, setUserInfo } = useUserContext();
  const { to } = useNavigation();
  const [teachers, setTeachers] = useState<TeacherModel[] | null>(null);

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
