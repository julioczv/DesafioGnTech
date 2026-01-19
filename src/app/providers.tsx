import { CssBaseline, ThemeProvider } from "@mui/material"
import {ReactNode, useCallback, useMemo, useState} from "react";
import { buildTheme } from "@/theme/theme";

export default function Providers ({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const theme = useMemo(() => buildTheme(mode), [mode]);

    (globalThis as any).__toggleTheme = useCallback(() => {
        setMode((m) => (m === "light" ? "dark" : "light"));

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        );
    })
}