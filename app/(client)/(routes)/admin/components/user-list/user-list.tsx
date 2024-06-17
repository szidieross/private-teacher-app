"use client";
import React, { FC, useEffect, useState } from "react";
import { Container, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { getSession } from "@/app/actions";
import { colors } from "@/app/(client)/constants/color.constant";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useUsersService from "@/app/(client)/services/user.service";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import { UserModel } from "@/app/api/models/user.model";
import { TeacherModel } from "@/app/api/models/teacher.model";

type Props = {
  isSession: boolean;
};

const UserList: FC<Props> = ({ isSession }) => {
  const { getUsers, deleteUserById } = useUsersService();
  const { getTeachers, deleteTeacherById } = useTeachersService();
  const { setUserInfo } = useUserContext();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      isLoggedIn: isSession,
    }));
  }, [isSession, setUserInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSession) {
          const session = await getSession();
          if (session.userId) {
            // Handle session-based logic here if needed
          }
        }
        const fetchedTeachers = await getTeachers();
        const teacherUsers = fetchedTeachers.map((teacher) => ({
          ...teacher.userData,
          teacherId: teacher.teacherId,
        }));

        const fetchedUsers = await getUsers();

        setUsers([...teacherUsers, ...fetchedUsers]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [getTeachers, getUsers, isSession]);

  const confirmDelete = (user: UserModel, teacherId?: number) => {
    if (user.userId && !teacherId) {
      handleDeleteUser(user.userId);
    } else if (user.userId && teacherId) {
      handleDeleteTeacher(user.userId, teacherId);
    }
  };
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserById(userId);
    } catch (error) {
      console.error("Failed deleting user", error);
    }
  };

  const handleDeleteTeacher = async (userId: number, teacherId: number) => {
    try {
      await deleteTeacherById(teacherId);
    } catch (error) {
      console.error("Failed deleting teacher", error);
    }
  };

  const handleCellClick = (params: any) => {
    params.event?.stopPropagation();
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 50,
    },
    {
      field: "name",
      headerName: "User",
      width: 140,
      editable: false,
      renderCell: (params) =>
        params.row.userId ? (
          <Link href={`/users/${params.row.userId}`} color={colors.mediumPurple}>
            {params.row.name}
          </Link>
        ) : null,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <IconButton
          sx={{ color: colors.error }}
          onClick={() => confirmDelete(params.row, params.row.teacherId)}
          title="Delete user"
        >
          delete
        </IconButton>
      ),
    },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    userId: user.userId,
    name: `${user.lastName} ${user.firstName}`,
    teacherId: (user as any).teacherId,
  }));

  return (
    <Container>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        disableRowSelectionOnClick
        onCellClick={handleCellClick}
        autoHeight
        autosizeOnMount
        sx={{ maxWidth: "90vw", backgroundColor: colors.background }}
      />
    </Container>
  );
};

export default UserList;
