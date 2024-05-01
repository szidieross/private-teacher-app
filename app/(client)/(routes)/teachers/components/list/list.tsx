"use client";

import React, { useEffect, useState } from "react";
import Item from "../item/item";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";
import { Grid } from "@mui/material";

const List = () => {
  const { getUsers, getUserById, createUser, verifyUser } = useUsersService();
  const [users, setUsers] = useState<UserModel[] | null>(null);

  const handleLogin = (username: string, password: string) => {
    console.log("hello login");
    verifyUser(username, password);
    console.log("goodbye login");
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("userData");
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsers();
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

        // console.log(fetchedUsers);
        // console.log(teachers);
        // console.log(fetchedUser);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [getUsers]);

  return (
    <div>
      <div>
        <button onClick={() => handleLogin("tess", "123456")}>Login</button>
      </div>
      {/* <div>
        <button onClick={() => handleLogout()}>Logout</button>
      </div> */}
      return{" "}
      <div>
        <Grid container>
          {users &&
            users.map((user, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Item user={user} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default List;
