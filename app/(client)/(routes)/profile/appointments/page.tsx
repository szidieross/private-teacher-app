import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import Appointments from "./components/appointments";
import AppointmentsTable from "../../teachers/[teacherId]/components/appointments-table/appointments-table";
import TeacherAppointments from "./components/teacher-appointment/teacher-appointment";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }
  return (
    <main>
      my appontments page
      {/* <Appointments /> */}
      <TeacherAppointments teacherId={13} />
    </main>
  );
}
