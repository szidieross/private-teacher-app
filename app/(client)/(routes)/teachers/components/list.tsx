"use client";

import React, { useEffect, useState } from "react";
import Item from "./item";
import useUsersService from "@/app/(client)/services/user.service";
import { UserModel } from "@/app/api/models/user.model";

const List = () => {
  const { getUsers, getUserById, createUser,verifyUser } = useUsersService();
  const [users, setUsers] = useState<UserModel[] | null>(null);

  const login = (username: string, password: string) => {
    console.log("hello login")
    verifyUser(username, password);
    console.log("goodbye login")
  };

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
        <button onClick={() => login("tess", "123456")}>Click</button>
      </div>
      return{" "}
      <div>{users && users.map((user, index) => <Item key={index} />)}</div>
    </div>
  );
};

export default List;
