const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
const API_KEY = process.env.POKEAPI_API_KEY ?? "challenge-demo-key";

export type PokemonToSave = {
  pokemon_id: number;
  name: string;
  image?: string | null;
  types: string[];
  abilities: string[];
};

export async function savePokemonsToDb(pokemons: PokemonToSave[]) {
  const payload = pokemons.map((p) => ({
    pokemon_id: p.pokemon_id,
    name: p.name,
    types: p.types,
    abilities: p.abilities,
  }));

  const res = await fetch(`${API_URL}/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "poke-api-key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  return res.json();
}
