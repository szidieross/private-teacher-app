import { isLoggedIn } from "@/app/actions";
import UserList from "./components/user-list/UserList";
import { redirect } from "next/navigation";
import { findPageByLabel } from "../../utils/page.util";

export const generateMetadata = async () => {
  const page = findPageByLabel("users");

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
};

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
