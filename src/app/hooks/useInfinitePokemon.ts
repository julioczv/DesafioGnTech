"use client";

import * as React from "react";
import type { Pokemon } from "@/app/domain/models/dto/IPokemon";
import { fetchPokemonCards, fetchPokemonDetails } from "@/app/home/service";
import type { TypeKey } from "@/context/pokemon-filters-context";
import {fetchIdsByType} from "@/app/home/service";

export function useInfinitePokemon(limit = 20, activeTypes: TypeKey[] = [], mode: "OR" | "AND" = "OR") {
    const [items, setItems] = React.useState<Pokemon[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [hasMore, setHasMore] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [filteredIds, setFilteredIds] = React.useState<number[] | null>(null);
    const [cursor, setCursor] = React.useState(0);

    React.useEffect(() => {
        setItems([]);
        setError(null);
        setHasMore(true);
        setOffset(0);
        setFilteredIds(null);
        setCursor(0);
    }, [activeTypes.join(","), mode]);

    const buildIdsFromTypes = React.useCallback(async () => {
        const lists = await Promise.all(activeTypes.map((t) => fetchIdsByType(t)));

        if (mode === "OR") {
            return Array.from(new Set(lists.flat())).sort((a, b) => a - b);
        }

        return lists.reduce((acc, cur) => acc.filter((id) => cur.includes(id))).sort((a, b) => a - b);
    }, [activeTypes, mode]);

    const loadMore = React.useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);

        try {
            if (activeTypes.length === 0) {
                const next = await fetchPokemonCards(limit, offset);

                if (!next || next.length === 0) {
                    setHasMore(false);
                    return;
                }

                setItems((prev) => [...prev, ...next]);
                setOffset((prev) => prev + limit);
                return;
            }
            let ids = filteredIds;
            if (!ids) {
                ids = await buildIdsFromTypes();
                setFilteredIds(ids);
            }

            if (!ids || cursor >= ids.length) {
                setHasMore(false);
                return;
            }

            const slice = ids.slice(cursor, cursor + limit);
            const next = await Promise.all(slice.map((id) => fetchPokemonDetails(id)));

            setItems((prev) => {
                const map = new Map<number, Pokemon>();
                prev.forEach((p) => map.set(p.id, p));
                next.forEach((p) => map.set(p.id, p));
                return Array.from(map.values()).sort((a, b) => a.id - b.id);
            });

            setCursor((prev) => prev + limit);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erro ao carregar pokemons");
        } finally {
            setLoading(false);
        }
    }, [activeTypes.length, buildIdsFromTypes, cursor, filteredIds, hasMore, limit, loading, offset]);
    React.useEffect(() => {
        loadMore();
    }, [activeTypes.join(","), mode]);



    return { items, loading, error, hasMore, loadMore };
}
