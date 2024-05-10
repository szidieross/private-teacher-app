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
import { Button } from "@mui/material";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
type Props = {
  teacherId: number;
};

const AppointmentsTable: FC<Props> = ({ teacherId }) => {
  const { getAppointmentByTeacherId } = useAppointmentsService();
  const [appointments, setAppointments] = useState<AppointmentModel[] | null>(
    null
  );

  const handleBooking = () => {
    console.log("Booking");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAppointments = await getAppointmentByTeacherId(teacherId);
        setAppointments(fetchedAppointments);
        console.log("fetchedAppointments", fetchedAppointments);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchData();
  }, [getAppointmentByTeacherId, teacherId]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Start Time</TableCell>
            <TableCell>Booking</TableCell>
            <TableCell align="right">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments &&
            appointments.map((item) => (
              <TableRow
                key={item.appointmentId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.startTime}
                </TableCell>
                <TableCell align="right">
                  {item.userId ? "Taken" : "Avaliable"}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={handleBooking}>Booking</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
