import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import LoginForm from "../../components/login-form/login-form";

const LoginPage = async () => {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect("/teachers");
  }

  return (
    <div className="login">
      <h1>Welcome to the LoginPage</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
