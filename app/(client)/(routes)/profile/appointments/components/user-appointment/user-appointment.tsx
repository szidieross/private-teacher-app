"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Link,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import "./user-appointment";
import { colors } from "@/app/(client)/constants/color.constant";

type Props = {
  userId: number;
};

const UserAppointments: FC<Props> = ({ userId }) => {
  const { getAppointmentByUserId, cancelAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCancel = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
      const updatedAppointments = await getAppointmentByUserId(userId);
      setAppointments(updatedAppointments);
      setSnackbarMessage("Appointment successfully canceled.");
    } catch (error) {
      setSnackbarMessage("Error canceling appointment.");
      console.error("Error canceling appointment:", error);
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAppointments = await getAppointmentByUserId(userId);
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [getAppointmentByUserId, userId]);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return (
      dateObj.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " " +
      dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 90,
      editable: false,
    },
    { field: "subject", headerName: "Subject", width: 180 },
    {
      field: "name",
      headerName: "Teacher",
      width: 200,
      renderCell: (params) => (
        <Link
          href={`/teachers/${params.row.teacherId}`}
          underline="hover"
          color="primary"
        >
          {`${params.row.name}`}
        </Link>
      ),
    },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleCancel(params.row.appointmentId)}
        >
          <CancelRoundedIcon />
        </IconButton>
      ),
    },
  ];

  const rows =
    appointments?.map((item, index) => ({
      id: index + 1,
      appointmentId: item.appointmentId,
      subject: item.categoryName,
      teacherId: item.teacherId,
      name: `${item.firstName} ${item.lastName}`,
      date: formatDate(item.startTime),
    })) || [];

  const handleCellClick = (params: any) => {
    params.event?.stopPropagation(); // Prevent focusing on cells
  };

  return (
    <Box
      sx={{ p: 2 }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
      >
        Your Appointments
      </Typography>
      <Box>
        <Paper elevation={2}>
          {rows && (
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection={false}
              disableRowSelectionOnClick
              onCellClick={handleCellClick}
              autoHeight
              autosizeOnMount
              sx={{ maxWidth: "90vw",backgroundColor:colors.background }}
            />
          )}
        </Paper>
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

export default UserAppointments;
