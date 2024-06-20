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
import { formatDate } from "@/app/api/utils/user.util";

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
      setSnackbarMessage("Az időpnt sikeresen lemondva.");
    } catch (error) {
      setSnackbarMessage("Hiba az időpont lemondásakor.");
      console.error("Hiba az időpont lemondásakor:", error);
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
        if (!fetchedAppointments) return;
        const currentDate = new Date();
        const filteredAppointments = fetchedAppointments.filter(
          (appointment) => new Date(appointment.startTime) >= currentDate
        );
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [getAppointmentByUserId, userId]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 1,
      editable: false,
    },
    {
      field: "subject",
      headerName: "Tantárgy",
      width: 160,
    },
    {
      field: "name",
      headerName: "Tanár",
      width: 160,
      renderCell: (params) => (
        <Link
          href={`/teachers/${params.row.teacherId}`}
          underline="none"
          color={colors.mediumPurple}
          fontWeight={"bold"}
        >
          {`${params.row.name}`}
        </Link>
      ),
    },
    {
      field: "date",
      headerName: "Dátum",
      width: 200,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <IconButton
          sx={{ color: colors.error }}
          onClick={() => handleCancel(params.row.appointmentId)}
          title="Időpont törlése"
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
      name: `${item.lastName} ${item.firstName}`,
      date: formatDate(item.startTime),
    })) || [];

  const handleCellClick = (params: any) => {
    params.event?.stopPropagation();
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
        sx={{ mb: 2, fontWeight: "bold", color: colors.primary }}
      >
        Időpontjaim
      </Typography>
      <Box>
        {rows && rows?.length > 0 ? (
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
                sx={{ maxWidth: "90vw", backgroundColor: colors.background }}
              />
            )}
          </Paper>
        ) : (
          <Typography>Még nincsenek időpontok.</Typography>
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

export default UserAppointments;
