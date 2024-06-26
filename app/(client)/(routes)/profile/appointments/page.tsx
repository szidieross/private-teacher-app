import { getSession, isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import TeacherAppointments from "./components/teacher-appointment/teacher-appointment";
import UserAppointments from "./components/user-appointment/user-appointment";
import { findPageByLabel } from "@/app/(client)/utils/page.util";

export const generateMetadata = async () => {
  const page = findPageByLabel("appointments");

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
};

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }
  const session = await getSession();

  return (
    <main>
      {session.role === "teacher" && session.userId ? (
        <TeacherAppointments userId={session.userId} />
      ) : (
        <UserAppointments userId={session.userId ? session.userId : 2} />
      )}
    </main>
  );
}
