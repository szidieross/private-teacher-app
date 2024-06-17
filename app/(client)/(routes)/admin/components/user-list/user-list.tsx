"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { getSession } from "@/app/actions";
import { colors } from "@/app/(client)/constants/color.constant";
import useTeachersService from "@/app/(client)/services/teacher.service";
import useUsersService from "@/app/(client)/services/user.service";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import { UserModel } from "@/app/api/models/user.model";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

type Props = {
  isSession: boolean;
};

const UserList: FC<Props> = ({ isSession }) => {
  const { getUsers, deleteUserById } = useUsersService();
  const { getTeachers, deleteTeacherById } = useTeachersService();
  const { setUserInfo } = useUserContext();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserModel | null>(null);
  const [teacherIdToDelete, setTeacherIdToDelete] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      isLoggedIn: isSession,
    }));
  }, [isSession, setUserInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const openDeleteDialog = (user: UserModel, teacherId?: number) => {
    setUserToDelete(user);
    setTeacherIdToDelete(teacherId);
    setOpenDeleteModal(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteModal(false);
    setUserToDelete(null);
    setTeacherIdToDelete(undefined);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      if (userToDelete.userId && !teacherIdToDelete) {
        handleDeleteUser(userToDelete.userId);
      } else if (userToDelete.userId && teacherIdToDelete) {
        handleDeleteTeacher(userToDelete.userId, teacherIdToDelete);
      }
    }
    setOpenDeleteModal(false);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserById(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error("Failed deleting user", error);
    }
  };

  const handleDeleteTeacher = async (userId: number, teacherId: number) => {
    try {
      await deleteTeacherById(teacherId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
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
      headerName: "Felhasználó",
      width: 300,
      editable: false,
      renderCell: (params) =>
        params.row.teacherId ? (
          <Link
            href={`/teachers/${params.row.teacherId}`}
            color={colors.mediumPurple}
          >
            {params.row.name}
          </Link>
        ) : (
          <Link
            href={`/users/${params.row.userId}`}
            color={colors.mediumPurple}
          >
            {params.row.name}
          </Link>
        ),
    },
    {
      field: "role",
      headerName: "Típus",
      width: 100,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <IconButton
          sx={{ color: colors.error }}
          onClick={() => openDeleteDialog(params.row, params.row.teacherId)}
          title="Delete user"
        >
          <DeleteRoundedIcon />
        </IconButton>
      ),
    },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    role: user.role === "teacher" ? "Tanár" : "Diák",
    userId: user.userId,
    name: `${user.lastName} ${user.firstName}`,
    teacherId: (user as any).teacherId,
  }));

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={false}
          disableRowSelectionOnClick
          onCellClick={handleCellClick}
          autoHeight
          autosizeOnMount
          sx={{ maxWidth: "fit-content", backgroundColor: colors.background }}
        />
      </Box>
      <Dialog
        open={openDeleteModal}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Fiók törlésének megerősítése
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Biztosan törölni szeretné ezt a fiókot? Ez a művelet nem
            visszavonható.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            variant="outlined"
            color="primary"
          >
            Mégse
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              backgroundColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.mediumPurple,
              },
            }}
          >
            Megerősítés
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
