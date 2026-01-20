"use client";

import * as React from "react";
import type { Pokemon } from "@/app/domain/models/dto/IPokemon";
import { fetchPokemonCards } from "@/app/home/service";

export function useInfinitePokemon(limit = 20) {
    const [items, setItems] = React.useState<Pokemon[]>([]);
    const [offset, setOffset] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [hasMore, setHasMore] = React.useState(true);

    const loadMore = React.useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);

        try {
            const next = await fetchPokemonCards(limit, offset);

            if (!next || next.length === 0) {
                setHasMore(false);
                return;
            }

            setItems((prev) => {
                const map = new Map<number, Pokemon>();
                prev.forEach((p) => map.set(p.id, p));
                next.forEach((p) => map.set(p.id, p));
                return Array.from(map.values()).sort((a, b) => a.id - b.id);
            });

            setOffset((prev) => prev + limit);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erro ao carregar pokemons");
        } finally {
            setLoading(false);
        }
    }, [limit, offset, loading, hasMore]);
    React.useEffect(() => {
        loadMore();
    }, []);

    return { items, loading, error, hasMore, loadMore };
}
