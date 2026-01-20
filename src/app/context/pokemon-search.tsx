"use client";

import * as React from "react";

type Ctx = {
    query: string;
    setQuery: (v: string) => void;
};

const PokemonSearchContext = React.createContext<Ctx | null>(null);

export function PokemonSearchProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = React.useState("");
    return (
        <PokemonSearchContext.Provider value={{ query, setQuery }}>
            {children}
        </PokemonSearchContext.Provider>
    );
}

export function usePokemonSearch() {
    const ctx = React.useContext(PokemonSearchContext);
    if (!ctx) throw new Error("usePokemonSearch must be used within PokemonSearchProvider");
    return ctx;
}
