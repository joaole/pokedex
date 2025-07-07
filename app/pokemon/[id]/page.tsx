import { fetchPokemonDetail } from "@/lib/pokeapi";
import PokeAbout from "@/components/poke-about";
import { PokemonStats } from "@/components/poke-stats";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Função utilitária para definir as cores dos tipos de Pokémon
const getTypeColorClass = (type: string) => {
  switch (type) {
    case "normal":
      return "bg-gray-400";
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-400";
    case "ice":
      return "bg-blue-200";
    case "fighting":
      return "bg-red-700";
    case "poison":
      return "bg-purple-500";
    case "ground":
      return "bg-yellow-700";
    case "flying":
      return "bg-indigo-400";
    case "psychic":
      return "bg-pink-500";
    case "bug":
      return "bg-green-700";
    case "rock":
      return "bg-gray-700";
    case "ghost":
      return "bg-indigo-700";
    case "dragon":
      return "bg-indigo-900";
    case "steel":
      return "bg-gray-500";
    case "fairy":
      return "bg-pink-300";
    default:
      return "bg-gray-300";
  }
};

// generateStaticParams força o Next.js a inferir corretamente os tipos da rota dinâmica
export function generateStaticParams() {
  return []; // Pode ser preenchido futuramente se quiser pré-gerar páginas
}

// Componente da página de detalhes do Pokémon
export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await fetchPokemonDetail(Number(params.id));

  const primaryType =
    pokemon.types.find((t) => t.slot === 1)?.type.name || "normal";
  const backgroundColorClass = getTypeColorClass(primaryType);

  const stats = pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));

  return (
    <div
      className={`min-h-screen ${backgroundColorClass} flex flex-col items-center p-4`}
    >
      <Link href="/" className="flex items-center text-white! mb-4">
        <ChevronLeft />
        <span className="ml-2">Back to Home</span>
      </Link>

      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-20">
        <h1 className="text-5xl font-bold text-white capitalize text-center absolute -top-16 left-1/2 -translate-x-1/2 z-10">
          {pokemon.name}
        </h1>

        <div className="relative w-48 h-48 mx-auto -mt-24 mb-4 z-20">
          <Image
            src={pokemon.sprites.front_default!}
            alt={pokemon.name}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-3 py-1 rounded-full text-white text-sm capitalize ${getTypeColorClass(
                type.type.name
              )}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <PokeAbout pokemon={pokemon} />
        <PokemonStats stats={stats} primaryType={primaryType} />
      </div>
    </div>
  );
}
