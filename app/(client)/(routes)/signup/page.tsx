import { getSession } from "@/app/actions";
import Signup from "./components/signup";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/teachers");
  }
  return (
    <main>
      signup
      <Signup />
    </main>
  );
}
