import { isLoggedIn } from "@/app/actions";
import Signup from "./components/signup";
import { redirect } from "next/navigation";
import { findPageByLabel } from "../../utils/page.util";

export const generateMetadata = async () => {
  const page = findPageByLabel("signup");

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
};

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/teachers");
  }

  return (
    <main>
      <Signup />
    </main>
  );
}
