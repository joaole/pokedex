import { PokemonListResponse, PokemonDetail } from "@/types/poketypes";

export async function fetchPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)

    if (!response.ok) {
        throw new Error(`Error fetching Pokémon list: ${response.statusText}`);
    }
    const data: PokemonListResponse = await response.json();
    return data;
}

export async function fetchPokemonDetail(pokeId: number | string): Promise<PokemonDetail> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_BASE_URL}/pokemon/${pokeId}`);

    if (!response.ok) {
        throw new Error(`Error fetching Pokémon details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}