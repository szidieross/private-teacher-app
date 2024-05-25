import { isLoggedIn } from "@/app/actions";
import TeacherList from "./components/teacher-list/teacher-list";

export default async function Home() {
  const isSession = await isLoggedIn();

  return (
    <main>
      <TeacherList isSession={isSession} />
    </main>
  );
}
