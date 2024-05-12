import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import Appointments from "./components/appointments";
import AppointmentsTable from "../../teachers/[teacherId]/components/appointments-table/appointments-table";
import TeacherAppointments from "./components/teacher-appointment/teacher-appointment";
import useUsersService from "@/app/(client)/services/user.service";
import { useState } from "react";
import { UserModel } from "@/app/api/models/user.model";
import UserAppointments from "./components/user-appointment/user-appointment";

export default async function Home() {
  // const{getUserById}=useUsersService();
  // const [user, setUser] = useState<UserModel|null>(null)
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }
  return (
    <main>
      my appontments page
      {/* <Appointments /> */}
      <UserAppointments userId={2}/>
      {/* <TeacherAppointments teacherId={2} /> */}
    </main>
  );
}
