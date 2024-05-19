import UserItem from "./components/user-item/user-item";

type Props = {
  params: { userId: number };
};
export default function Home(props: Props) {
  return (
    <main>
      <UserItem userId={props.params.userId} />
    </main>
  );
}
