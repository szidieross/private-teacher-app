"use client";

import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import useTeachersService from "@/app/(client)/services/teacher.service";
import { Button, Link } from "@mui/material";
import { getSession } from "@/app/actions";

type Props = {
  userId: number;
};

const TeacherAppointments: FC<Props> = ({ userId }) => {
  const { getTeacherByUserId } = useTeachersService();
  const { getAppointmentByTeacherId, deleteAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );
  const [teacherId, setTeacherId] = useState<number | null>(null);

  const handleDelete = async (appointmentId: number) => {
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
  }, [getAppointmentByTeacherId, userId]);

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
      renderCell: (params) => (
        // Use Link to wrap the name and provide the appropriate route
        <Link href={`/users/${params.row.userId}`}>
          {/* {`${item.firstName} ${item.lastName}`} */}
          {`${params.row.name}`}
        </Link>
      ),
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
      userId: item.userId,
      name: item.userId ? `${item.firstName} ${item.lastName}` : "-",
      subject: item.categoryName ? item.categoryName : "-",
      date: item.startTime,
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
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default TeacherAppointments;
