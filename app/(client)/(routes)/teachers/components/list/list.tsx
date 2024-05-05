"use client";

import React, { useEffect, useState } from "react";
import Item from "../item/item";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";
import { Grid } from "@mui/material";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { TeacherModel } from "@/app/api/models/teacher.model";

const List = () => {
  const { getUsers, getUserById, createUser, verifyUser } = useUsersService();
  const { getTeachers } = useTeachersService();
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const [teachers, setTeachers] = useState<TeacherModel[] | null>(null);

  const handleLogin = (username: string, password: string) => {
    verifyUser(username, password);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("userData");
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const fetchedUsers = await getUsers();
        const fetchedTeachers = await getTeachers();
        // console.log(fetchedTeachers);
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
  }, [getUsers]);

  return (
    <div>
      {/* <div>
        <button onClick={() => handleLogin("tess", "123456")}>Login</button>
      </div> */}
      <div>
        <Grid container>
          {teachers &&
            teachers.map((teacher, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Item teacher={teacher} />
              </Grid>
            ))}
        </Grid>
        {/* <Grid container>
          {users &&
            users.map((user, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Item user={user} />
              </Grid>
            ))}
        </Grid> */}
      </div>
    </div>
  );
};

export default List;
