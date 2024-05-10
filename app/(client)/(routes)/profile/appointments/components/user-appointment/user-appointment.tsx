"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { AppointmentModel } from "@/app/api/models/appointment.model";

type Props = {
  teacherId: number;
};

type TableProps = {
  id: number;
  name: string;
  date: string;
  subject: string;
  action: string;
};

const UserAppointments: FC<Props> = ({ teacherId }) => {
  const { getAppointmentByTeacherId } = useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAppointments = await getAppointmentByTeacherId(teacherId);
        setAppointments(fetchedAppointments);
        console.log("fetchedAppointments", fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [getAppointmentByTeacherId, teacherId]);

  const columns: GridColDef<TableProps>[] = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 90 
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
  

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  const rows = appointments?.map((item, index) => {
    return {
      id: index,
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

export default UserAppointments;
