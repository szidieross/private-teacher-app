import { getSession, isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import Settings from "./components/settings/settings";
import { findPageByLabel } from "@/app/(client)/utils/page.util";

export const generateMetadata = async () => {
  const page = findPageByLabel("settings");

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
      <Settings
        userId={session.userId}
        teacherId={session.teacherId ?? session.teacherId}
      />
    </main>
  );
}
