import { isLoggedIn } from "@/app/actions";
import List from "./components/list/list";

export default async function Home() {
  const isSession = await isLoggedIn();

  return (
    <main>
      <List isSession={isSession} />
    </main>
  );
}
