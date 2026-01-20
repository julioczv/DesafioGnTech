"use client";

import * as React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { POKEMON_TYPES, PokemonType } from "@/app/domain/pokemon-types";
import { usePokemonFilters } from "@/app/context/pokemon-filters-checkbox";

export default function TypeRail() {
    const { selectedTypes, toggleType } = usePokemonFilters();

    return (
        <Box sx={{ display: "grid", gap: 1.25, justifyItems: "center", py: 2 }}>
            {(Object.keys(POKEMON_TYPES) as PokemonType[]).map((type) => {
                const meta = POKEMON_TYPES[type];
                const Icon = meta.icon;
                const active = selectedTypes.has(type);

                return (
                    <Tooltip key={type} title={meta.labelPt} placement="right" arrow>
                        <IconButton
                            onClick={() => toggleType(type)}
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: active ? meta.color : "rgba(0,0,0,.12)",
                                bgcolor: active ? meta.color : "transparent",
                                color: active ? "#fff" : meta.color,
                                "&:hover": { bgcolor: meta.color, color: "#fff" },
                            }}
                        >
                            <Icon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                );
            })}
        </Box>
    );
}
