import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import { UserModel } from "@/app/api/models/user.model";
import useUsersService from "@/app/(client)/services/user.service";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { colors } from "@/app/(client)/constants/color.constant";

type Props = {
  user: UserModel;
  teacherId?: number;
};

const UserItem: FC<Props> = ({ user, teacherId }) => {
  const { deleteUserById } = useUsersService();
  const { deleteTeacherById } = useTeachersService();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const confirmDelete = () => {
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
      width: 1,
    },
    {
      field: "name",
      headerName: "Felhasználó",
      width: 140,
      editable: false,
      renderCell: (params) =>
        params.row.userId ? (
          <Link
            href={`/users/${params.row.userId}`}
            underline="none"
            color={colors.mediumPurple}
            fontWeight={"bold"}
          >
            {`${params.row.name}`}
          </Link>
        ) : null,
    },
    {
      field: "subject",
      headerName: "Tantárgy",
      width: 140,
      editable: false,
    },
    {
      field: "date",
      headerName: "Dátum",
      width: 200,
      editable: false,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <IconButton
          sx={{ color: colors.error }}
          onClick={() => confirmDelete(params.row.appointmentId)}
          title="Időpont törlése"
        >
          {/* <DeleteRoundedIcon /> */}
          delete
        </IconButton>
      ),
    },
  ];

  const rows = appointments?.map((item, index) => {
    return {
      id: index + 1,
      appointmentId: item.appointmentId,
      userId: item.userId,
      name: item.userId ? `${item.lastName} ${item.firstName}` : "-",
      subject: item.categoryName ? item.categoryName : "-",
      date: formatDate(item.startTime),
      action: "",
    };
  });

  return (
    <Box>
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
    </Box>
    // <Card style={{ maxWidth: 345, margin: "16px" }}>
    //   <CardMedia
    //     component="img"
    //     alt={user.username}
    //     height="140"
    //     image={user.profilePicture}
    //     title={user.username}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {user.firstName} {user.lastName}
    //     </Typography>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       Username: {user.username}
    //     </Typography>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       Email: {user.email}
    //     </Typography>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       Phone: {user.phone}
    //     </Typography>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       Role: {user.role}
    //     </Typography>
    //     {user.createdAt && (
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         Joined: {new Date(user.createdAt).toLocaleDateString()}
    //       </Typography>
    //     )}
    //     <Button variant="contained" color="secondary" onClick={confirmDelete}>
    //       Delete
    //     </Button>
    //   </CardContent>
    // </Card>
  );
};


export default UserItem;
