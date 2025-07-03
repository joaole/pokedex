// app/pokemon/[name]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchPokemon, PokemonDetail, PokemonStat } from "@/lib/pokeapi";

interface PokemonPageProps {
  params: { name: string };
}

// mapeamento de classes Tailwind por tipo
const TYPE_STYLES: Record<
  string,
  {
    bg: string; // fundo principal (header)
    bgLight: string; // fundo de badges
    text: string; // cor do texto principal e badges
  }
> = {
  normal: { bg: "bg-gray-400", bgLight: "bg-gray-200", text: "text-gray-700" },
  fire: {
    bg: "bg-orange-500",
    bgLight: "bg-orange-100",
    text: "text-orange-700",
  },
  water: { bg: "bg-blue-500", bgLight: "bg-blue-100", text: "text-blue-700" },
  electric: {
    bg: "bg-yellow-400",
    bgLight: "bg-yellow-100",
    text: "text-yellow-700",
  },
  grass: {
    bg: "bg-green-500",
    bgLight: "bg-green-100",
    text: "text-green-700",
  },
  ice: { bg: "bg-teal-300", bgLight: "bg-teal-100", text: "text-teal-700" },
  fighting: { bg: "bg-red-700", bgLight: "bg-red-100", text: "text-red-700" },
  poison: {
    bg: "bg-purple-500",
    bgLight: "bg-purple-100",
    text: "text-purple-700",
  },
  ground: {
    bg: "bg-yellow-600",
    bgLight: "bg-yellow-100",
    text: "text-yellow-800",
  },
  flying: {
    bg: "bg-indigo-300",
    bgLight: "bg-indigo-100",
    text: "text-indigo-700",
  },
  psychic: { bg: "bg-pink-500", bgLight: "bg-pink-100", text: "text-pink-700" },
  bug: { bg: "bg-lime-500", bgLight: "bg-lime-100", text: "text-lime-700" },
  rock: {
    bg: "bg-yellow-700",
    bgLight: "bg-yellow-100",
    text: "text-yellow-800",
  },
  ghost: {
    bg: "bg-purple-700",
    bgLight: "bg-purple-100",
    text: "text-purple-800",
  },
  dragon: {
    bg: "bg-indigo-600",
    bgLight: "bg-indigo-100",
    text: "text-indigo-800",
  },
  dark: { bg: "bg-gray-700", bgLight: "bg-gray-200", text: "text-gray-800" },
  steel: { bg: "bg-gray-500", bgLight: "bg-gray-200", text: "text-gray-700" },
  fairy: { bg: "bg-pink-300", bgLight: "bg-pink-100", text: "text-pink-700" },
};

function pad(n: number) {
  return String(n).padStart(3, "0");
}

function formatStatName(name: string) {
  return name.replace("special-", "S").toUpperCase();
}

export async function generateStaticParams() {
  // pré-build das 151 primeiras páginas
  const pokemons = Array.from({ length: 151 }, (_, i) => String(i + 1));
  return pokemons.map((id) => ({ name: id }));
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon: PokemonDetail = await fetchPokemon(params.name);
  const primaryType = pokemon.types[0].type.name;
  const styles = TYPE_STYLES[primaryType] ?? TYPE_STYLES.normal;

  return (
    <div className={`${styles.bg} min-h-screen py-12`}>
      <div className="relative max-w-3xl mx-auto px-4">
        {/* Botão voltar */}
        <Link
          href="/"
          className="absolute left-4 top-4 inline-flex items-center text-white hover:underline"
        >
          <ArrowLeft size={20} className="mr-1" /> Voltar
        </Link>

        {/* Nome e ID */}
        <h1 className="text-4xl font-bold text-white text-center capitalize">
          {pokemon.name}
        </h1>
        <span className="absolute right-4 top-4 text-white font-mono">
          #{pad(pokemon.id)}
        </span>

        {/* Imagem */}
        <div className="mt-8 flex justify-center">
          <Image
            src={pokemon.sprites.front_default!}
            alt={pokemon.name}
            width={240}
            height={240}
            priority
          />
        </div>

        {/* Card de detalhes */}
        <Card className="mt-10 bg-white rounded-2xl shadow-lg">
          <CardContent>
            {/* Badges de tipo */}
            <div className="flex justify-center gap-2 mb-6">
              {pokemon.types.map((t) => (
                <Badge
                  key={t.slot}
                  className={`px-3 py-1 rounded-full uppercase font-medium ${styles.bgLight} ${styles.text}`}
                >
                  {t.type.name}
                </Badge>
              ))}
            </div>

            {/* About */}
            <h2
              className={`text-2xl font-semibold text-center ${styles.text} mb-4`}
            >
              About
            </h2>
            <div className="grid grid-cols-3 text-center border-b pb-6 mb-8">
              <div>
                <p className="font-bold text-lg text-gray-700">
                  {pokemon.weight} kg
                </p>
                <p className="text-sm text-gray-500">Weight</p>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-700">
                  {pokemon.height} m
                </p>
                <p className="text-sm text-gray-500">Height</p>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-700">
                  {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </p>
                <p className="text-sm text-gray-500">Abilities</p>
              </div>
            </div>

            {/* Base stats */}
            <h2
              className={`text-2xl font-semibold text-center ${styles.text} mb-4`}
            >
              Base stats
            </h2>
            <div className="space-y-3">
              {pokemon.stats.map((s: PokemonStat) => {
                const percent = Math.round((s.base_stat / 255) * 100);
                return (
                  <div key={s.stat.name} className="flex items-center">
                    <span className="w-16 text-sm font-bold uppercase text-gray-600">
                      {formatStatName(s.stat.name)}
                    </span>
                    <span className="w-8 text-right">{pad(s.base_stat)}</span>
                    <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`${styles.bg} h-full`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-right">{pad(s.base_stat)}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
