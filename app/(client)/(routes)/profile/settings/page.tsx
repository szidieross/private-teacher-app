import { getSession, isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import Settings from "./components/settings/settings";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }

  const session = await getSession();
  console.log("session", session);

  return (
    <main>
      <Settings
        userId={session.userId}
        teacherId={session.teacherId ?? session.teacherId}
      />
    </main>
  );
}
