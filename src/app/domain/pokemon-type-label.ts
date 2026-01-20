import {POKEMON_TYPES} from "@/app/domain/pokemon-types";

export function getPokemonTypeMeta(type: string) {
    return POKEMON_TYPES[type as PokemonType] ?? null;
}

export function getPokemonTypeLabel(type: string, lang: "pt" | "en" = "pt") {
    const meta = getPokemonTypeMeta(type);
    if (!meta) return type;
    return lang === "pt" ? meta.labelPt : meta.label;
}

export function getPokemonTypeColor(type: string) {
    return getPokemonTypeMeta(type)?.color ?? "#999";
}

export function getPokemonTypeIcon(type: string) {
    return getPokemonTypeMeta(type)?.icon ?? null;
}
