"use client";

import React from "react";
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


export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
    return (
        <CardBorder>
            <CardInner>
                <TopRow>
                    <NumberTag>{formatId(pokemon.id)}</NumberTag>

                    <ChipRow>
                        {pokemon.types.slice(0, 2).map((t) => (
                            <TypeChip key={t} label={t.toUpperCase()} tone={mapTypeToTone(t)} />
                        ))}
                    </ChipRow>
                </TopRow>

                <ArtWrap>
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ width: 220, height: 220, objectFit: "contain", display: "block" }}
                    />
                </ArtWrap>

                <PokemonName>{formatName(pokemon.name)}</PokemonName>

                <Stats>
                    <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.7, textTransform: "uppercase" }}>
                        Abilities
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
