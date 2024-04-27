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
];

const unknowPage: PageModel = {
    label: "Unknown",
    route: "/",
    title: "",
    description: "",
    keywords: [],
};

export { pages, unknowPage };