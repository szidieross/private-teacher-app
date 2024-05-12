import { getSession, isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import TeacherAppointments from "./components/teacher-appointment/teacher-appointment";
import UserAppointments from "./components/user-appointment/user-appointment";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }
  const session = await getSession();
  console.log("session.teacherId", session.teacherId);
  console.log("session.userId", session.userId);

  return (
    <main>
      {session.role} appontments page
      {session.role === "teacher" && session.userId ? (
        <TeacherAppointments userId={session.userId} />
      ) : (
        <UserAppointments userId={session.userId ? session.userId : 2} />
      )}
    </main>
  );
}
