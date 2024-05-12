"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import useUsersService from "@/app/(client)/services/user.service";
import useTeachersService from "@/app/(client)/services/teacher.service";

type Props = {
  userId: number;
};

type TableProps = {
  id: number;
  name: string;
  date: string;
  subject: string;
  action: string;
};

const TeacherAppointments: FC<Props> = ({ userId }) => {
  console.log("userId", userId);
  console.log("teacherId");
  const { getTeacherByUserId } = useTeachersService();
  const { getAppointmentByTeacherId } = useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacher = await getTeacherByUserId(userId);
        if (teacher) {
          const fetchedAppointments = await getAppointmentByTeacherId(
            teacher?.teacherId
          );
          setAppointments(fetchedAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [getAppointmentByTeacherId, userId]);

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
      editable: true, // Convert subject to string
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
    },
  ];

  const rows = appointments?.map((item, index) => {
    return {
      id: index + 1,
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
