"use client";

import { createContext, useContext } from "react";

type ThemeToggleCtx = {
    toggleTheme: () => void;
};

const ThemeToggleContext = createContext<ThemeToggleCtx | null>(null);

export function ThemeToggleProvider({
                                        value,
                                        children,
                                    }: {
    value: ThemeToggleCtx;
    children: React.ReactNode;
}) {
    return (
        <ThemeToggleContext.Provider value={value}>
            {children}
            </ThemeToggleContext.Provider>
    );
}

export function useThemeToggle() {
    const ctx = useContext(ThemeToggleContext);
    if (!ctx) throw new Error("useThemeToggle must be used inside ThemeToggleProvider");
    return ctx;
}
