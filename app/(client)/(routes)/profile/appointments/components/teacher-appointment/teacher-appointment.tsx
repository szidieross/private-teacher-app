"use client";

import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { Button } from "@mui/material";
import { getSession } from "@/app/actions";

type Props = {
  userId: number;
};

type TableProps = {
  id: number;
  appointmentId: number;
  name: string;
  date: string;
  subject: string;
  action: string;
};

const TeacherAppointments: FC<Props> = ({ userId }) => {
  console.log("userId", userId);
  console.log("teacherId");
  const { getTeacherByUserId } = useTeachersService();
  const { getAppointmentByTeacherId, deleteAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );
  const [teacherId, setTeacherId] = useState<number | null>(null);

  const handleDelete = async (appointmentId: number) => {
    console.log("appointmentId", appointmentId);
    console.log("Delete appointment with ID:", appointmentId);
    await deleteAppointment(appointmentId);
    if (teacherId) {
      const fetchedAppointments = await getAppointmentByTeacherId(teacherId);
      setAppointments(fetchedAppointments);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        // const teacher = await getTeacherByUserId(userId);
        if (session.teacherId) {
          setTeacherId(session.teacherId);
          const fetchedAppointments = await getAppointmentByTeacherId(
            session?.teacherId
          );
          setAppointments(fetchedAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [getAppointmentByTeacherId, userId, getSession]);

  const columns: GridColDef<TableProps>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: true,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 110,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          onClick={() => handleDelete(params.row.appointmentId)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = appointments?.map((item, index) => {
    return {
      id: index + 1,
      appointmentId: item.appointmentId,
      name: `${item.userId}`,
      date: "date",
      subject: "subject",
      action: "",
    };
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {rows && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default TeacherAppointments;
