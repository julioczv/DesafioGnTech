"use client";

import React from "react";
import {Root, GridLayout} from "./style";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import PokemonCard from "@/app/components/cards-pokemon/PokemonCard";
import {usePokemonFilters} from "@/app/context/pokemon-filters-checkbox";
import {useInfinitePokemon} from "@/app/hooks/useInfinitePokemon";
import {usePokemonSearch} from "@/app/context/pokemon-search";
import {usePokemonSearchResult} from "@/app/hooks/usePokemonSearchResult";
import {savePokemonsToDb} from "../lib/send-backend";

function mapToSavePayload(p: any) {
    return {
        pokemon_id: p.id,
        name: p.name,
        image: p.image ?? null,
        types: p.types ?? [],
        abilities: p.abilities ?? [],
    };
}

export default function Home() {
    const {activeTypes} = usePokemonFilters();
    const {query} = usePokemonSearch();

    const isSearching = query.trim().length > 0;

    const {items, loading, error, hasMore, loadMore} = useInfinitePokemon(
        20,
        activeTypes,
        "OR"
    );

    const search = usePokemonSearchResult(query);
    const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (isSearching) return;

        const el = sentinelRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) loadMore();
            },
            {rootMargin: "800px 0px", threshold: 0}
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [loadMore, isSearching]);

    const searchedPokemon = React.useMemo(() => {
        if (!search.result) return null;

        if (activeTypes.length === 0) return search.result;

        const types = search.result.types.map((t) => t.toLowerCase());
        const ok = types.some((t) => activeTypes.includes(t));
        return ok ? search.result : null;
    }, [search.result, activeTypes]);

    return (
        <Root>
            {isSearching && search.loading && <Typography>Buscando...</Typography>}
            {isSearching && search.error && (
                <Typography sx={{color: "error.main", fontWeight: 800}}>
                    {search.error}
                </Typography>
            )}
            <Box sx={{ position: 'fixed' }}>
                <Button
                    variant="contained"
                    onClick={async () => {
                        const payload = items.map(mapToSavePayload);
                        const r = await savePokemonsToDb(payload);
                        alert(`Salvos no banco: ${r.saved}`);
                    }}
                >
                    Salvar no banco
                </Button>
            </Box>
            <GridLayout
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                        xl: "repeat(4, 1fr)",
                    },
                    gap: 3,
                }}
            >
                {isSearching ? (
                    searchedPokemon ? (
                        <PokemonCard pokemon={searchedPokemon}/>
                    ) : (
                        !search.loading && (
                            <Typography sx={{opacity: 0.8, fontWeight: 700}}>
                                Nenhum Pokémon encontrado (ou não bate com o filtro)
                            </Typography>
                        )
                    )
                ) : (
                    items.map((p) => <PokemonCard key={p.id} pokemon={p}/>)
                )}
            </GridLayout>

            {!isSearching && (
                <Box sx={{py: 6, display: "grid", placeItems: "center"}}>
                    {error && (
                        <Typography sx={{color: "error.main", fontWeight: 800}}>
                            {error}
                        </Typography>
                    )}
                    {loading && <CircularProgress/>}
                    {!hasMore && !loading && (
                        <Typography sx={{opacity: 0.7, fontWeight: 800}}>
                            Fim da lista :D
                        </Typography>
                    )}
                    <div ref={sentinelRef} style={{height: 1, width: "100%"}}/>
                </Box>
            )}
        </Root>
    );
}
