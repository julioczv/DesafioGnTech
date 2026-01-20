export type Pokemon = {
    id: number;
    name: string;
    image: string;
    types: string[];
    abilities: string[];
}

export type PokeListResponse = {
    results: Array<{ name: string; url: string }>;
}

export type PokeDetailsResponse = {
    id: number;
    name: string;
    types: { type: { name: string; } } []
    abilities: { ability: { name: string } }[]
    sprites: {
        other?: { "art-oficial"?: {front_default: string | null } };
    }
}

export interface PokeTypeResponse {
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        };
    }[];
}

export type PokeTypeListResponse = {
    results: PokeTypeItem[];
};
