"use client";

import * as React from "react";
import {Pokemon} from "@/app/domain/models/dto/IPokemon";
import {fetchPokemonCards} from "@/app/home/service";

export function usePokemon(limit = 40, offset = 0) {
    const [data, setData] = React.useState<Pokemon[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let alive = true;

        (async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchPokemonCards(limit, offset);
                if (alive) setData(result);
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : "Erro desconhecido");
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => {
            alive = false;
        };
    }, [limit, offset]);

    return { data, loading, error };
}
