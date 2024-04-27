import { PaletteOptions, Theme, ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { customBreakpoints } from "./breakpoints.utils";

declare module "@mui/material/styles" {
    interface Palette {
        white: Palette["primary"];
    }
    interface PaletteOptions {
        white: PaletteOptions["primary"];
    }
}

const generalThemeConfig: ThemeOptions = {
    palette: {
        white: {
            main: "#ffffff",
        },
    },
    breakpoints: {
        values: customBreakpoints,
    },
};

const lightTheme = createTheme({
    ...generalThemeConfig,
});

const darkTheme = createTheme({
    ...generalThemeConfig,
    palette: {
        ...generalThemeConfig.palette,
        mode: "dark",
        whiteByMode: {
            main: "#000000",
        },
        blackByMode: {
            main: "#ffffff",
        },
        background: {
            default: "#050d15 !important",
        },
    } as PaletteOptions,
});

const getActiveTheme = (themeMode: "light" | "dark" = "dark"): Theme => {
    return themeMode === "light" ? lightTheme : darkTheme;
};

export { lightTheme, darkTheme, getActiveTheme };