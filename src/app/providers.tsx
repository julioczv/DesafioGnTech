"use client";

import * as React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {buildTheme} from "@/theme/theme";
import {ThemeToggleProvider} from "./theme-toggle-context";
import {PokemonFiltersProvider} from "@/app/context/pokemon-filters-checkbox";
import {PokemonSearchProvider} from "@/app/context/pokemon-search";

export default function Providers({children}: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<"light" | "dark">("light");
    const theme = React.useMemo(() => buildTheme(mode), [mode]);

    const toggleTheme = React.useCallback(() => {
        setMode((m) => (m === "light" ? "dark" : "light"));
    }, []);

    return (
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeToggleProvider value={{toggleTheme}}>
                <PokemonFiltersProvider>
                    <PokemonSearchProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            {children}
                        </ThemeProvider>
                    </PokemonSearchProvider>
                </PokemonFiltersProvider>
            </ThemeToggleProvider>
        </AppRouterCacheProvider>

    );
}
