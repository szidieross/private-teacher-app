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
import { Container, Snackbar, Alert, IconButton } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useUserContext } from "@/app/(client)/hooks/context.hook";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import { formatDate } from "@/app/api/utils/user.util";

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
    if (ownTeacherId) {
      setSnackbarMessage("Tanárként nem lehet időpontot foglalni.");
      setSnackbarOpen(true);
      return;
    }
    try {
      await bookAppointment(appointmentId, lessonId);
      setSnackbarMessage("Az időpont sikeresen lefoglalva.");
      await fetchAppointments();
    } catch (error) {
      setSnackbarMessage("Az időpont foglalás sikertelen.");
      console.error("Az időpont foglalás sikertelen:", error);
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [teacherId]);

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
              <TableCell align="center">Kezdési időpont</TableCell>
              <TableCell align="center">Állapot</TableCell>
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
                    {item.userId ? "Foglalt" : "Elérhető "}
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
