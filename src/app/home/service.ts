import { apiFetch } from "@/app/api/api";
import {
    PokeListResponse,
    PokeDetailsResponse,
    Pokemon,
} from "@/app/domain/models/dto/IPokemon";

function getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return Number(parts[parts.length - 1]);
}

export async function fetchPokemonList(limit = 40, offset = 0) {
    const data = await apiFetch<PokeListResponse>(
        `/pokemon?limit=${limit}&offset=${offset}`
    );

    return data.results.map((p) => ({
        id: getIdFromUrl(p.url),
    }));
}

export async function fetchPokemonDetails(id: number): Promise<Pokemon> {
    const p = await apiFetch<PokeDetailsResponse>(`/pokemon/${id}`);

    const image =
        p.sprites.other?.["official-artwork"]?.front_default ??
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

    return {
        id: p.id,
        name: p.name,
        image,
        types: p.types.map((t) => t.type.name),
        abilities: p.abilities.map((a) => a.ability.name),
    };
}

export async function fetchPokemonCards(limit = 20, offset = 0): Promise<Pokemon[]> {
    const list = await fetchPokemonList(limit, offset);
    return Promise.all(list.map((p) => fetchPokemonDetails(p.id)));
}

