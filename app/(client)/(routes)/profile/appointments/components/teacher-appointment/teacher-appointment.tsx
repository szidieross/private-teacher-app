"use client";

import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import useTeachersService from "@/app/(client)/services/teacher.service";
import {
  Alert,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { getSession } from "@/app/actions";
import { colors } from "@/app/(client)/constants/color.constant";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { formatDate } from "@/app/api/utils/user.util";

type Props = {
  userId: number;
};

const TeacherAppointments: FC<Props> = ({ userId }) => {
  const { getAppointmentByTeacherId, deleteAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDelete = async (appointmentId: number) => {
    try {
      await deleteAppointment(appointmentId);
      if (teacherId) {
        const updatedAppointments = await getAppointmentByTeacherId(teacherId);
        setAppointments(updatedAppointments);
        setSnackbarMessage("Appointment successfully deleted.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setSnackbarMessage("Error deleting appointment.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();

        if (session.teacherId) {
          setTeacherId(session.teacherId);
          const fetchedAppointments = await getAppointmentByTeacherId(
            session?.teacherId
          );
          if (!fetchedAppointments) return;
          const currentDate = new Date();
          const filteredAppointments = fetchedAppointments.filter(
            (appointment) => new Date(appointment.startTime) >= currentDate
          );
          setAppointments(filteredAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [getAppointmentByTeacherId, userId]);

  const handleCellClick = (params: any) => {
    params.event?.stopPropagation();
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
      renderCell: (params) =>
        params.row.userId ? (
          <Link
            // sx={{ color: colors.darkPurple }}
            href={`/users/${params.row.userId}`}
          >
            {`${params.row.name}`}
          </Link>
        ) : null,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 110,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <IconButton
          sx={{ color: colors.error }}
          onClick={() => handleDelete(params.row.appointmentId)}
        >
          <DeleteRoundedIcon />
        </IconButton>
      ),
    },
  ];

  const rows = appointments?.map((item, index) => {
    return {
      id: index + 1,
      appointmentId: item.appointmentId,
      userId: item.userId,
      name: item.userId ? `${item.firstName} ${item.lastName}` : "-",
      subject: item.categoryName ? item.categoryName : "-",
      date: formatDate(item.startTime),
      action: "",
    };
  });

  return (
    <Box
      sx={{ p: 2 }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: colors.primary }}
      >
        Your Appointments
      </Typography>
      <Box>
        {rows && rows?.length > 0 ? (
          <Paper elevation={2}>
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
          </Paper>
        ) : (
          <Typography>No appointments yet.</Typography>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherAppointments;
