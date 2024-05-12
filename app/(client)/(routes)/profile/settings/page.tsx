import { getSession, isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import Settings from "./components/settings/settings";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }

  const session = await getSession();
  
  return (
    <main>
      settings page
      {/* <UploadForm />
      <ServerUploadPage /> */}
      <Settings userId={session.userId}/>
    </main>
  );
}
