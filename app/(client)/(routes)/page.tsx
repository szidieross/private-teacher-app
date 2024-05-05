import Upload from "../components/upload-form/upload-form";
import { redirect } from "next/navigation";
import ServerUploadPage from "../components/upload-server/upload-server";
import UploadForm from "../components/upload-form/upload-form";

export default function Home() {
  redirect("/teachers");
  return <main>Home</main>;
}
