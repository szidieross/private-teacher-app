import PageModel from "../models/page.model";

const pages: PageModel[] = [
    {
        label: "Home",
        route: "/",
        title: "",
        description:
            "",
        keywords: ["idk", "idk",],
    },
    {
        label: "Teachers",
        route: "/teachers",
        title: "",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Signup",
        route: "/signup",
        title: "",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Login",
        route: "/login",
        title: "",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Profile",
        route: "/profile",
        title: "",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "Settings",
        route: "/profile/settings",
        title: "",
        description:
            "",
        keywords: ["idk", "stb",],
    },
    {
        label: "My Appointments",
        route: "/profile/appointments",
        title: "",
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