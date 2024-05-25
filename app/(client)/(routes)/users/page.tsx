import { isLoggedIn } from "@/app/actions";
import UserList from "./components/user-list/UserList";
import { redirect } from "next/navigation";

export default async function Home() {
  const isSession = await isLoggedIn();

  if (!isSession) {
    redirect("/teachers");
  }

  return (
    <main>
      <UserList isSession={isSession} />
    </main>
  );
}
