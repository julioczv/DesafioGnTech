"use client";

import React from "react";
import { Tooltip , Chip } from "@mui/material";
import {
    CardInner,
    CardBorder,
    TopRow,
    NumberTag,
    ChipRow,
    ArtWrap,
    PokemonName,
    Stats,
    TypeChip,
} from "./style";
import {Pokemon} from "@/app/domain/models/dto/IPokemon";
import {formatId, formatName, mapTypeToTone} from "@/app/utils/pokemonFormat";
import {POKEMON_TYPE_COLORS} from "@/app/domain/pokemon-types-colors";
import {POKEMON_TYPES_PT} from "@/app/domain/pokemon-types-colors";
import {PokemonType} from "@/app/domain/pokemon-types";

export default function PokemonCard({pokemon}: { pokemon: Pokemon }) {
    return (
        <CardBorder>
            <CardInner>
                <TopRow>
                    <NumberTag>{formatId(pokemon.id)}</NumberTag>

                    <ChipRow>
                        {pokemon.types.slice(0, 2).map((t) => {
                            const type = t.toLowerCase() as PokemonType;
                            const color = POKEMON_TYPE_COLORS[type] ?? "#999";
                            const title = POKEMON_TYPES_PT[type] ?? formatName(t);

                            return (
                                <Tooltip key={t} title={title} arrow>
                  <span style={{display: "inline-flex"}}>
                    <Chip
                        label={t.toUpperCase()}
                        size="small"
                        sx={{
                            bgcolor: color,
                            color: "#fff",
                            fontWeight: 900,
                            letterSpacing: 0.6,
                            borderRadius: 1,
                            height: 22,
                            "& .MuiChip-label": {px: 1},
                        }}
                    />
                  </span>
                                </Tooltip>
                            );
                        })}
                    </ChipRow>
                </TopRow>

                <ArtWrap>
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{width: 220, height: 220, objectFit: "contain", display: "block"}}
                    />
                </ArtWrap>

                <PokemonName>{formatName(pokemon.name)}</PokemonName>

                <Stats>
                    <div style={{fontSize: 12, fontWeight: 800, opacity: 0.7, textTransform: "uppercase"}}>
                        Abilities
                    </div>

                    <div style={{display: "flex", flexWrap: "wrap", gap: 8}}>
                        {pokemon.abilities.slice(0, 3).map((a) => (
                            <span
                                key={a}
                                style={{
                                    fontSize: 12,
                                    fontWeight: 800,
                                    padding: "6px 10px",
                                    borderRadius: 10,
                                    background: "rgba(0,0,0,0.06)",
                                }}
                            >
                {formatName(a)}
              </span>
                        ))}
                    </div>
                </Stats>
            </CardInner>
        </CardBorder>
    );
}
