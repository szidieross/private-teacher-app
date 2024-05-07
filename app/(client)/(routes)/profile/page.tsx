import { changePremium, changeUsername, getSession } from "@/app/actions";
import { redirect } from "next/navigation";
import Profile from "./components/profile/profile";
// import NewCategoryForm from "./category/category";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/teachers");
  }

  return (
    <div className="profile">
      <h1>Welcome to the {session.role} ProfilePage</h1>
      <p>
        Welcome, <b>{session.username}</b>
      </p>
      <span>
        You are a <b>{session.isPro ? "Premium" : "Free"}</b> user
      </span>
      <form action={changePremium}>
        <button>{session.isPro ? "Cancel" : "Buy"} Premium</button>
      </form>

      <form action={changeUsername}>
        <input
          type="text"
          name="username"
          required
          placeholder={session.username}
        />
        <button>Update</button>
      </form>
      <Profile userId={session.userId} />
      {/* <NewCategoryForm /> */}
    </div>
  );
};

export default ProfilePage;
