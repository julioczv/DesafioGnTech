"use client";

import * as React from "react";

type Ctx = {
    selectedTypes: Set<string>;
    toggleType: (type: string) => void;
    setType: (type: string, value: boolean) => void;
    resetTypes: () => void;
    activeTypes: string[];
};

const PokemonFiltersContext = React.createContext<Ctx | null>(null);

export function PokemonFiltersProvider({ children }: { children: React.ReactNode }) {
    const [selectedTypes, setSelectedTypes] = React.useState<Set<string>>(new Set());

    const toggleType = React.useCallback((type: string) => {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            next.has(type) ? next.delete(type) : next.add(type);
            return next;
        });
    }, []);

    const setType = React.useCallback((type: string, value: boolean) => {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            value ? next.add(type) : next.delete(type);
            return next;
        });
    }, []);

    const resetTypes = React.useCallback(() => setSelectedTypes(new Set()), []);

    const activeTypes = React.useMemo(() => Array.from(selectedTypes), [selectedTypes]);

    const value: Ctx = { selectedTypes, toggleType, setType, resetTypes, activeTypes };

    return <PokemonFiltersContext.Provider value={value}>{children}</PokemonFiltersContext.Provider>;
}

export function usePokemonFilters() {
    const ctx = React.useContext(PokemonFiltersContext);
    if (!ctx) throw new Error("usePokemonFilters must be used within PokemonFiltersProvider");
    return ctx;
}
