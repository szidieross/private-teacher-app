import { findPageByLabel } from "@/app/(client)/utils/page.util";
import Item from "./components/item/item";
import { getTeacherById } from "@/app/api/services/teacher.service";
import { getUserById } from "@/app/api/services/user.service";

type Props = {
  params: { teacherId: number };
};

export const generateMetadata = async (props: Props) => {
  const { params } = props;
  const teacher = await getTeacherById(params.teacherId);
  const user = await getUserById(teacher.userId)
  const page = findPageByLabel("teacher");

  return {
    title: `${user.lastName} ${user.firstName}`,
    description: page.description,
    keywords: page.keywords,
  };
};
export default function Home(props: Props) {
  return (
    <main>
      <Item teacherId={props.params.teacherId} />
    </main>
  );
}
