import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import LoginForm from "./components/login-form/login-form";
import { findPageByLabel } from "../../utils/page.util";

export const generateMetadata = async () => {
  const page = findPageByLabel("login");

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
};

const LoginPage = async () => {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/teachers");
  }

  return (
    <div className="login">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
