import { isLoggedIn } from "@/app/actions";
import { findPageByLabel } from "../../utils/page.util";
import UserList from "./components/user-list/user-list";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async (props: Props) => {
  const { params } = props;
  const page = findPageByLabel("teacher");

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
};

export default async function Home() {
  const isSession = await isLoggedIn();

  return (
    <main>
      Admin
      <UserList isSession={isSession} />
    </main>
  );
}
