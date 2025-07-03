// app/page.tsx
import PokemonInfiniteList from "@/components/PokemonInfiniteList";
import {
  fetchPokemons,
  PokemonListResponse,
  PokemonDetail,
  fetchPokemon,
} from "@/lib/pokeapi";

export default async function Home() {
  // 1️⃣ busca lista básica
  const list: PokemonListResponse = await fetchPokemons(0, 20);
  // 2️⃣ transforma cada resultado em detalhe completo
  const initialPokemons: PokemonDetail[] = await Promise.all(
    list.results.map((p) => fetchPokemon(p.name))
  );
  // 3️⃣ extrai próximo offset
  const nextOffset = list.next
    ? Number(new URL(list.next).searchParams.get("offset"))
    : null;

  return (
    <main className="p-4">
      <h1 className="text-3xl mb-4">Pokédex</h1>
      <PokemonInfiniteList
        initialPokemons={initialPokemons}
        initialNextOffset={nextOffset}
      />
    </main>
  );
}
