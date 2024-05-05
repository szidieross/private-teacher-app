import UploadForm from "@/app/(client)/components/upload-form/upload-form";
import ServerUploadPage from "@/app/(client)/components/upload-server/upload-server";
import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/teachers");
  }
  return (
    <main>
      settings page
      <UploadForm />
      <ServerUploadPage />
    </main>
  );
}
