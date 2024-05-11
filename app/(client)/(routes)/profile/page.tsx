import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";
import Profile from "./components/profile/profile";
import { Container } from "@mui/material";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/teachers");
  }

  return (
    <Container>
      <Profile userId={session.userId} />
    </Container>
  );
};

export default ProfilePage;
