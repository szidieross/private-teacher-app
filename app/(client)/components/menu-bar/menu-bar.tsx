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
  const { userInfo, setUserInfo } = useUserContext();

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

      setUserInfo((prevState) => {
        return {
          ...prevState,
          isLoggedIn: session.isLoggedIn,
          userType: session.role,
          // userId: user?.userId,
          // username: user?.username,
          // firstName: user?.firstName,
          // lastName: user?.lastName,
          // userImg: user?.profilePicture,
        };
      });
      if (session.userId) {
        const fetchedUser = await getUserById(session.userId);
        if (fetchedUser) {
          // setUser(fetchedUser);

          setUserInfo((prevState) => {
            return {
              ...prevState,
              userId: fetchedUser?.userId,
              username: fetchedUser?.username,
              firstName: fetchedUser?.firstName,
              lastName: fetchedUser?.lastName,
              userImg: fetchedUser?.profilePicture,
            };
          });

          if (fetchedUser.role === "teacher") {
            const fetchedTeacher = await getTeacherByUserId(session.userId);
            if (fetchedTeacher) {
              // setTeacher(fetchedTeacher);
              setUserInfo((prevState) => {
                return {
                  ...prevState,
                  teacherId: fetchedTeacher.teacherId,
                };
              });
            }
          }
        }
      }
    };
    fetchData();
  }, [getSession, setUserInfo]);

  return (
    <Box
      sx={{ position: "fixed", backgroundColor: colors.primary }}
      className="menu-bar--box"
    >
      <Toolbar className="menu-bar--toolbar">
        <Mobile profilePicture={userInfo?.userImg} />
        <Desktop profilePicture={userInfo?.userImg} />
      </Toolbar>
    </Box>
  );
};

export default MenuBar;
