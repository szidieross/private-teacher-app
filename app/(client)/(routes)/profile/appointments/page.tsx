import { getSession, isLoggedIn } from "@/app/actions";
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
  const session = await getSession();
  console.log("session.teacherId", session.teacherId);
  console.log("session.userId", session.userId);
  // const teacherId=session.

  return (
    <main>
      {session.role} appontments page
      {/* <Appointments /> */}
      {session.role === "teacher" && session.userId ? (
        <TeacherAppointments userId={session.userId} />
      ) : (
        <UserAppointments userId={session.userId ? session.userId : 2} />
      )}
    </main>
  );
}
