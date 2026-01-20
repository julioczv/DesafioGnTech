"use client";

import * as React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import {fetchAllTypes} from "@/app/home/service";
import {usePokemonFilters} from "@/app/context/pokemon-filters-checkbox";
import {POKEMON_TYPES} from "@/app/domain/pokemon-types";
import {getPokemonTypeLabel} from "@/app/domain/pokemon-type-label";

export default function TypesFilter() {
    const { selectedTypes, setType } = usePokemonFilters();
    const [types, setTypes] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchAllTypes()
            .then(setTypes)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box sx={{display: "flex", flexDirection: 'column', gap: "12px"}}>
            <Typography sx={{ fontSize: 12, fontWeight: 900, opacity: 0.6, mb: 1 }}>
                TIPOS DE POKEMONS
            </Typography>

            {loading && <Typography>Carregando...</Typography>}

            {!loading && types.length === 0 && (
                <Typography sx={{ color: "error.main" }}>
                    Não carregou tipos
                </Typography>
            )}

            {Object.entries(POKEMON_TYPES).map(([type, meta]) => (
                <FormControlLabel
                    key={type}
                    label={getPokemonTypeLabel(type, "pt")}
                    control={
                        <Checkbox
                            checked={selectedTypes.has(type)}
                            onChange={(e) => setType(type, e.target.checked)}
                            sx={{
                                color: meta.color,
                                "&.Mui-checked": { color: meta.color },
                            }}
                        />
                    }
                />
            ))}
        </Box>
    );
}
