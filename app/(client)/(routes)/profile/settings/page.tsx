import UploadForm from "@/app/(client)/components/upload-form/upload-form";
import ServerUploadPage from "@/app/(client)/components/upload-server/upload-server";
import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session.isLoggedIn) {
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
