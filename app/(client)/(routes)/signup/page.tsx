import { getSession, isLoggedIn } from "@/app/actions";
import Signup from "./components/signup";
import { redirect } from "next/navigation";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/teachers");
  }

  return (
    <main>
      signup
      <Signup />
    </main>
  );
}
