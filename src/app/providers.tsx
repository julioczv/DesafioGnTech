"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { buildTheme } from "@/theme/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<"light" | "dark">("light");
    const theme = React.useMemo(() => buildTheme(mode), [mode]);

    React.useEffect(() => {
        (globalThis as any).__toggleTheme = () =>
            setMode((m: "light" | "dark") => (m === "light" ? "dark" : "light"));
    }, []);

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
