import Item from "./components/item/item";

type Props = {
  params: { teacherId: number };
};
export default function Home(props: Props) {
  return (
    <main>
      <Item teacherId={props.params.teacherId} />
    </main>
  );
}
