"use client";

import React from "react";
import { Root, GridLayout } from "./style";
import {useInfinitePokemon} from "@/app/hooks/useInfinitePokemon";
import PokemonCard from "@/app/components/cards-pokemon/PokemonCard";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Home() {
    const { items, loading, error, hasMore, loadMore } = useInfinitePokemon(20);
    const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) loadMore();
            },
            { root: null, rootMargin: "800px 0px", threshold: 0 }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [loadMore]);

    return (
        <Root>
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
                {items.map((p) => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </GridLayout>
            <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
                {error && (
                    <Typography sx={{ color: "error.main", fontWeight: 800 }}>
                        {error}
                    </Typography>
                )}

                {loading && <CircularProgress />}

                {!hasMore && !loading && (
                    <Typography sx={{ opacity: 0.7, fontWeight: 800 }}>
                        Você chegou no fim :D
                    </Typography>
                )}

                <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />
            </Box>
        </Root>
    );
}
