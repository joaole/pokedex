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
    stats: PokemonStat[]       
}