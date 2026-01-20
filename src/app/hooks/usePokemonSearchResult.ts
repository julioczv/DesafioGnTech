"use client";

import * as React from "react";
import type { Pokemon } from "@/app/domain/models/dto/IPokemon";
import { fetchPokemonByNameOrId } from "@/app/home/service";

export function usePokemonSearchResult(query: string) {
    const [result, setResult] = React.useState<Pokemon | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const q = query.trim();
        if (!q) {
            setResult(null);
            setError(null);
            setLoading(false);
            return;
        }

        const t = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
                const pokemon = await fetchPokemonByNameOrId(q);
                setResult(pokemon);
            } catch (e) {
                setResult(null);
                setError("Não encontrado");
            } finally {
                setLoading(false);
            }
        }, 450);

        return () => clearTimeout(t);
    }, [query]);

    return { result, loading, error };
}
