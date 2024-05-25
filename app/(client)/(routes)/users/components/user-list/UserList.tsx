"use client";
import React, { FC, useEffect, useState } from "react";
import UserItem from "../user-item/UserItem";
import { Grid } from "@mui/material";
import useUsersService from "@/app/(client)/services/user.service";
import SearchBar from "@/app/(client)/components/searchbar/searchbar";
import Link from "next/link";
import { UserModel } from "@/app/api/models/user.model";

type Props = {
  isSession: boolean;
};

const UserList: FC<Props> = ({ isSession }) => {
  const { getUsers } = useUsersService();
  const [users, setUsers] = useState<UserModel[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers.filter((user) => user.role === "user"));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [getUsers]);

  return (
    <Grid container spacing={2} marginBottom={6}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>
      {users &&
        users.map((user) => (
          <Grid key={user.userId} item xs={12} sm={6} md={4} lg={3}>
            <Link href={`/teachers/${user.userId}`}>
              <UserItem user={user} />
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default UserList;
