import { isLoggedIn } from "@/app/actions";
import TeacherList from "./components/teacher-list/teacher-list";
import { findPageByLabel } from "../../utils/page.util";

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
      <TeacherList isSession={isSession} />
    </main>
  );
}
