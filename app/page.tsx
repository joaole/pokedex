// app/page.tsx
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/pokeapi";
import { PokemonListResponse, PokemonDetail } from "@/types/poketypes";
import InfinitePokemonList from "@/components/infinite-pokemon-list";

export default async function Home() {
  const list: PokemonListResponse = await fetchPokemonList(0, 20);
  const initialPokemons: PokemonDetail[] = await Promise.all(
    list.results.map((p) => fetchPokemonDetail(p.name))
  );
  const nextOffset = list.next
    ? new URL(list.next).searchParams.get("offset")
    : null;

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-2xl font-bold mb-6">Pokédex</h1>
      <InfinitePokemonList
        initialPokemons={initialPokemons}
        initialNextOffset={nextOffset}
      />
    </main>
  );
}
