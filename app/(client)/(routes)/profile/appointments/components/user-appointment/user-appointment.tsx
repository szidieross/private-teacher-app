"use client";

import React, { FC, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";

type Props = {
  userId: number;
};

const UserAppointments: FC<Props> = ({ userId }) => {
  const { getAppointmentByUserId, cancelAppointment, deleteAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );

  const handleCancel = async (appointmentId: number) => {
    await cancelAppointment(appointmentId);
    const updatedAppointments = await getAppointmentByUserId(userId);
    setAppointments(updatedAppointments);
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 110,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
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
      editable: false,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          onClick={() => handleCancel(params.row.appointmentId)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const rows = appointments?.map((item, index) => {
    return {
      id: index + 1,
      // appointmentId: item.appointmentId,
      subject: item.categoryName,
      name: `${item.firstName} ${item.lastName}`,
      // date: "date",
      date: item.startTime,
    };
  });

  const handleCellClick = (params: any) => {
    params.event?.stopPropagation(); // Prevent focusing on cells
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Appointments
      </Typography>
      <Box sx={{ height: "fit-content", width: "100%" }}>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={false}
            disableRowSelectionOnClick
            onCellClick={handleCellClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserAppointments;
