import PageModel from "../models/page.model";

const pages: PageModel[] = [
    {
        label: "Home",
        route: "/",
        title: "Private Teacher App",
        description:
            "",
        keywords: ["idk", "idk",],
    },
    {
        label: "Teachers",
        route: "/teachers",
        title: "Teachers",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Users",
        route: "/users",
        title: "Users",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Signup",
        route: "/signup",
        title: "Signup",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Login",
        route: "/login",
        title: "Login",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Profile",
        route: "/profile",
        title: "Profile",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Settings",
        route: "/profile/settings",
        title: "Settings",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "appointments",
        route: "/profile/appointments",
        title: "My Appointments",
        description:
            "",
        keywords: ["idk", "stb",],
    },
];

const unknowPage: PageModel = {
    label: "Unknown",
    route: "/",
    title: "",
    description: "",
    keywords: [],
};

export { pages, unknowPage };