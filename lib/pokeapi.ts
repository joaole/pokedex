// lib/pokeapi.ts

export interface PokemonResult {
    name: string
    url: string
}

export interface PokemonListResponse {
    count: number
    next: string | null
    previous: string | null
    results: PokemonResult[]
}

export interface PokemonType {
    slot: number
    type: {
        name: string
        url: string
    }
}

export interface PokemonAbility {
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
}

export interface PokemonSprites {
    front_default: string | null
}

export interface PokemonStat {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export interface PokemonDetail {
    id: number
    name: string
    height: number
    weight: number
    types: PokemonType[]
    abilities: PokemonAbility[]
    sprites: PokemonSprites
    stats: PokemonStat[]        // ← aqui
}

const API_BASE = 'https://pokeapi.co/api/v2'

export async function fetchPokemons(offset = 0, limit = 20): Promise<PokemonListResponse> {
    const res = await fetch(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`)
    if (!res.ok) throw new Error(`Falha ao buscar lista (status ${res.status})`)
    return res.json()
}

export async function fetchPokemon(nameOrId: string | number): Promise<PokemonDetail> {
    const res = await fetch(`${API_BASE}/pokemon/${nameOrId}`)
    if (!res.ok) throw new Error(`Pokémon "${nameOrId}" não encontrado`)
    return res.json()
}
