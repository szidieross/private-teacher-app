"use client"

import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";

type Props = {
  userId: number;
};

const UserAppointments: FC<Props> = ({ userId }) => {
  const { getAppointmentByUserId } = useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );

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
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <button onClick={() => handleCancel(params.row.id)}>Cancel</button>
      ),
    },
  ];

  const handleCancel = (appointmentId: number) => {
    // Implement cancellation logic here
    console.log("Cancel appointment with ID:", appointmentId);
  };

  const rows = appointments?.map((item, index) => {
    return {
      id: index + 1,
      name: `${item.userId}`,
      date: "date",
      subject: "subject",
    };
  });  

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {rows && (
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default UserAppointments;
