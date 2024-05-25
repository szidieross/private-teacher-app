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
import {
  Container,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";

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
  const { userInfo } = useUserContext();

  const fetchAppointments = async () => {
    try {
      const fetchedAppointments = await getAppointmentByTeacherId(teacherId);
      const currentDate = new Date();
      if (!fetchedAppointments) return;
      const filteredAppointments = fetchedAppointments.filter(
        (appointment) => new Date(appointment.startTime) >= currentDate
      );
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleBooking = async (appointmentId: number) => {
    if (ownTeacherId == teacherId) {
      setSnackbarMessage("You can't book your own appointments!");
      setSnackbarOpen(true);
      return;
    }
    try {
      await bookAppointment(appointmentId, lessonId);
      setSnackbarMessage("Appointment successfully booked.");
      await fetchAppointments(); // Fetch updated appointments
    } catch (error) {
      setSnackbarMessage("Error booking appointment.");
      console.error("Error booking appointment:", error);
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [teacherId]);

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

  return (
    <Container sx={{ mt: 4, mb: 4, maxHeight: "50vh" }}>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgb(245, 242, 245)",
          maxHeight: "50vh",
        }}
      >
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="appointments table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center"></TableCell>
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
                    {formatDate(item.startTime)}
                  </TableCell>
                  <TableCell align="center">
                    {item.userId ? "Taken" : "Available"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleBooking(item.appointmentId)}
                      disabled={item.userId != null}
                      sx={{ textTransform: "none" }}
                    >
                      {item.userId == userInfo.userId ? (
                        <AddTaskRoundedIcon />
                      ) : (
                        <AddCircleOutlineRoundedIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Container>
  );
};

export default AppointmentsTable;
