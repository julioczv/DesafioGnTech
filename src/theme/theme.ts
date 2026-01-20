import { createTheme } from "@mui/material/styles";

export const colors = {
    primary: "#f4e225",
    bgLight: "#f8f8f5",
    bgDark: "#1a1a1a",
    techGray: "#e6e5db",
    fire: "#FF421C",
    water: "#2980EF",
    grass: "#3FA129",
    electric: "#FAC000",
    psychic: "#EF4179",
};

export function buildTheme(mode: "light" | "dark") {
    return createTheme({
        palette: hookupPalette(mode),
        typography: {
            fontFamily:
                '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        },
        shape: { borderRadius: 12 },
    });
}

function hookupPalette(mode: "light" | "dark") {
    const isDark = mode === "dark";
    return {
        mode,
        primary: { main: "#f4e225", contrastText: "#111" },
        background: { default: isDark ? "#1a1a1a" : "#f8f8f5", paper: isDark ? "rgba(255,255,255,0.04)" : "#fff" },
        text: { primary: isDark ? "#fff" : "#181711", secondary: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" },
        divider: isDark ? "rgba(255,255,255,0.10)" : "#e6e5db",
    } as const;
}
