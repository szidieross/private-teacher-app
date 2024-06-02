import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";
import Profile from "./components/profile/profile";
import { Container } from "@mui/material";
import { findPageByLabel } from "../../utils/page.util";

export const generateMetadata = async () => {
  const page = findPageByLabel("profile");

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
};

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
