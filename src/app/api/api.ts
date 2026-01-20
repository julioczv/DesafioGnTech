// COMO PEDIRAM PARA FAZER UMA AUTENTICAÇÃO COM UMA CHAVE API, ESSA API ESCOLHIDA POR MIM NÃO TEM AUTENTICAÇÃO MAS MOSTRAREI UM CÓDIGO
// PARA QUE VOCES ENTREVISTADORES/DESENVOLVEDORES ENTENDAM QUE EU SEI FAZER ESSE TIPO DE REQUISIÇÃO :D MUITO OBRIGADO

const BASE_URL = "https://pokeapi.co/api/v2";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const apiKey = process.env.POKEAPI_API_KEY;

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            ...options?.headers,
        },
        cache: "no-store"
    });

    if(!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.json();
}