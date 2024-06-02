import PageModel from "../models/page.model";

const pages: PageModel[] = [
  {
    label: "Home",
    route: "/",
    title: "Private Teacher App",
    description:
      "Welcome to Private Teacher App. Find the best teachers for your subjects.",
    keywords: ["private teacher app", "teachers", "education"],
  },
  {
    label: "Teachers",
    route: "/teachers",
    title: "Teachers",
    description:
      "Explore our list of qualified teachers covering various subjects.",
    keywords: ["teachers", "education", "subjects"],
  },
  {
    label: "Signup",
    route: "/signup",
    title: "Signup",
    description:
      "Create an account to access all features of Private Teacher App.",
    keywords: ["signup", "register", "account"],
  },
  {
    label: "Login",
    route: "/login",
    title: "Login",
    description: "Login to your Private Teacher App account.",
    keywords: ["login", "signin", "authentication"],
  },
  {
    label: "Profile",
    route: "/profile",
    title: "Profile",
    description: "View and manage your profile information.",
    keywords: ["profile", "user profile", "account"],
  },
  {
    label: "Settings",
    route: "/profile/settings",
    title: "Settings",
    description: "Adjust your account settings and preferences.",
    keywords: ["settings", "preferences", "account settings"],
  },
  {
    label: "appointments",
    route: "/profile/appointments",
    title: "My Appointments",
    description: "View and manage your upcoming appointments.",
    keywords: ["appointments", "schedule", "agenda"],
  },
];

const unknowPage: PageModel = {
  label: "Unknown",
  route: "/",
  title: "Unknown Page",
  description: "This page is not found. Please navigate back to the homepage.",
  keywords: ["404", "not found", "error"],
};

export { pages, unknowPage };
