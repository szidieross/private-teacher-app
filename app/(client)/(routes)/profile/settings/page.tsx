import UploadForm from "@/app/(client)/components/upload-form/upload-form";
import ServerUploadPage from "@/app/(client)/components/upload-server/upload-server";

export default function Home() {
  return (
    <main>
      settings page
      <UploadForm />
      <ServerUploadPage />
    </main>
  );
}
