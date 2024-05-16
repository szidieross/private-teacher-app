"use client";

import React, { FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppointmentModel } from "@/app/api/models/appointment.model";
import useAppointmentsService from "@/app/(client)/services/appointment.service";
import { Button, Container } from "@mui/material";

type Props = {
  teacherId: number;
  lessonId: number;
  categoryName: string;
};

const AppointmentsTable: FC<Props> = ({ teacherId, lessonId }) => {
  const { getAppointmentByTeacherId, bookAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );

  const handleBooking = (appointmentId: number) => {
    bookAppointment(appointmentId, lessonId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAppointments = await getAppointmentByTeacherId(teacherId);
        setAppointments(fetchedAppointments);
        console.log("booking", fetchedAppointments);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchData();
  }, [getAppointmentByTeacherId, teacherId]);

  return (
    <TableContainer
      component={Container}
      sx={{ backgroundColor: "rgb(240, 240, 240);" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">Booking</TableCell>
            <TableCell align="center">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments &&
            appointments.map((item) => (
              <TableRow
                key={item.appointmentId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {item.startTime}
                </TableCell>
                <TableCell align="center">
                  {item.userId ? "Taken" : "Avaliable"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleBooking(item.appointmentId)}
                    disabled={item.userId != null}
                  >
                    Booking
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
