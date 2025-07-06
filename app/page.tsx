import Pokedex from "@/components/pokedex";
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/pokeapi";
import { PokemonListResponse, PokemonDetail } from "@/types/poketypes";

export default async function Home() {
  const list: PokemonListResponse = await fetchPokemonList(0, 20);
  const initialPokemons: PokemonDetail[] = await Promise.all(
    list.results.map((p) => fetchPokemonDetail(p.name))
  );
  const nextOffset = list.next
    ? new URL(list.next).searchParams.get("offset")
    : null;

  // const allTypes = [
  //   "normal",
  //   "fire",
  //   "water",
  //   "grass",
  //   "electric",
  //   "ice",
  //   "fighting",
  //   "poison",
  //   "ground",
  //   "flying",
  //   "psychic",
  //   "bug",
  //   "rock",
  //   "ghost",
  //   "dragon",
  //   "dark",
  //   "steel",
  //   "fairy",
  // ];

  return (
    <Pokedex
      initialPokemons={initialPokemons}
      initialNextOffset={nextOffset}
      //allTypes={allTypes}
    />
  );
}
