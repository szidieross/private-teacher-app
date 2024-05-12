"use client";

import { Box, Toolbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Mobile from "./mobile/mobile";
import Desktop from "./desktop/desktop";
import "./menu-bar.scss";
import { colors } from "../../constants/color.constant";
import { getSession, isLoggedIn } from "@/app/actions";
import useUsersService from "../../services/user.service";
import useTeachersService from "../../services/teacher.service";
import { UserModel } from "@/app/api/models/user.model";
import { TeacherModel } from "@/app/api/models/teacher.model";
import { useUserContext } from "../../hooks/context.hook";

const MenuBar: FC = () => {
  const { getUserById } = useUsersService();
  const { getTeacherByUserId } = useTeachersService();
  const { user, setUser, teacher, setTeacher, setIsLoggedIn, setUserType } =
    useUserContext();

  // const [user, setUser] = useState<UserModel | null>(null);
  // const [teacher, setTeacher] = useState<TeacherModel | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await isLoggedIn();
    };
    checkLoggedIn();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();

      setIsLoggedIn(session.isLoggedIn);
      setUserType(session.role);
      // setImg(session.img);

      // const session = await getSession();
      // console.log("session",session.userId)
      if (session.userId) {
        const fetchedUser = await getUserById(session.userId);
        if (fetchedUser) {
          // console.log("user context user", fetchedUser);
          setUser(fetchedUser);

          if (fetchedUser.role === "teacher") {
            const fetchedTeacher = await getTeacherByUserId(session.userId);
            // console.log("user context teacher", fetchedTeacher);
            if (fetchedTeacher) {
              setTeacher(fetchedTeacher);
            }
          }
        }
      }
    };
    fetchData();
  }, [getSession, setUser]);

  return (
    <Box
      sx={{ position: "fixed", backgroundColor: colors.primary }}
      className="menu-bar--box"
    >
      <Toolbar className="menu-bar--toolbar">
        <Mobile profilePicture={user?.profilePicture} />
        <Desktop profilePicture={user?.profilePicture} />
      </Toolbar>
    </Box>
  );
};

export default MenuBar;
