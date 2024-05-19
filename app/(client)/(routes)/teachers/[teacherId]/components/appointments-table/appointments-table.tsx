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
import { Button, Container, Snackbar } from "@mui/material";
import { getSession } from "@/app/actions";

type Props = {
  teacherId: number;
  lessonId: number;
  categoryName: string;
  ownTeacherId: number | null;
};

const AppointmentsTable: FC<Props> = ({
  teacherId,
  lessonId,
  ownTeacherId,
}) => {
  const { getAppointmentByTeacherId, bookAppointment } =
    useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleBooking = (appointmentId: number) => {
    console.log("ownTeacherId", ownTeacherId);
    console.log("teacherId", teacherId);
    if (ownTeacherId == teacherId) {
      
      setSnackbarOpen(true);
      setSnackbarMessage("You can't book your own appointments!");
      return;
    }
    bookAppointment(appointmentId, lessonId);
    setSnackbarOpen(true);
    setSnackbarMessage("Appointment successfully booked.");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAppointments = await getAppointmentByTeacherId(teacherId);
        setAppointments(fetchedAppointments);
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </TableContainer>
  );
};

export default AppointmentsTable;
