import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import Appointments from "./components/appointments";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }
  return (
    <main>
      my appontments page
      <Appointments />
    </main>
  );
}
