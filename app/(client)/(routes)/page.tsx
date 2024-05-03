import Upload from "../components/upload-form/upload-form";
import { redirect } from "next/navigation";
import ServerUploadPage from "../components/upload-server/upload-server";

export default function Home() {
  return (
    <main>
      {/* <Upload /> */}
      <ServerUploadPage/>

      
    </main>
  );
}
