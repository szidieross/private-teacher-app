import { getUserById } from "@/app/api/services/user.service";
import UserItem from "./components/user-item/user-item";
import { findPageByLabel } from "@/app/(client)/utils/page.util";

type Props = {
  params: { userId: number };
};

export const generateMetadata = async (props: Props) => {
  const { params } = props;
  const user = await getUserById(params.userId)
  const page = findPageByLabel("teachers");

  return {
    title: `${user.firstName} ${user.lastName}`,
    description: page.description,
    keywords: page.keywords,
  };
};

export default function Home(props: Props) {
  return (
    <main>
      <UserItem userId={props.params.userId} />
    </main>
  );
}
