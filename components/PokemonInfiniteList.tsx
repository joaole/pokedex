// components/PokemonInfiniteList.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchPokemons, fetchPokemon, PokemonDetail } from "@/lib/pokeapi";

interface Props {
  initialPokemons: PokemonDetail[];
  initialNextOffset: number | null;
}

interface TypeStyles {
  border: string;
  btnBg: string;
}

function getTypeStyles(type: string): TypeStyles {
  switch (type) {
    case "normal":
      return {
        border: "border-amber-400",
        btnBg: "bg-amber-400 hover:bg-amber-500",
      };
    case "fire":
      return {
        border: "border-orange-500",
        btnBg: "bg-orange-500 hover:bg-orange-600",
      };
    case "water":
      return {
        border: "border-blue-500",
        btnBg: "bg-blue-500 hover:bg-blue-600",
      };
    case "electric":
      return {
        border: "border-yellow-400",
        btnBg: "bg-yellow-400 hover:bg-yellow-500",
      };
    case "grass":
      return {
        border: "border-green-500",
        btnBg: "bg-green-500 hover:bg-green-600",
      };
    case "ice":
      return {
        border: "border-teal-300",
        btnBg: "bg-teal-300 hover:bg-teal-400",
      };
    case "fighting":
      return {
        border: "border-red-700",
        btnBg: "bg-red-700 hover:bg-red-800",
      };
    case "poison":
      return {
        border: "border-purple-500",
        btnBg: "bg-purple-500 hover:bg-purple-600",
      };
    case "ground":
      return {
        border: "border-yellow-600",
        btnBg: "bg-yellow-600 hover:bg-yellow-700",
      };
    case "flying":
      return {
        border: "border-indigo-300",
        btnBg: "bg-indigo-300 hover:bg-indigo-400",
      };
    case "psychic":
      return {
        border: "border-pink-500",
        btnBg: "bg-pink-500 hover:bg-pink-600",
      };
    case "bug":
      return {
        border: "border-lime-500",
        btnBg: "bg-lime-500 hover:bg-lime-600",
      };
    case "rock":
      return {
        border: "border-yellow-700",
        btnBg: "bg-yellow-700 hover:bg-yellow-800",
      };
    case "ghost":
      return {
        border: "border-purple-700",
        btnBg: "bg-purple-700 hover:bg-purple-800",
      };
    case "dragon":
      return {
        border: "border-indigo-600",
        btnBg: "bg-indigo-600 hover:bg-indigo-700",
      };
    case "dark":
      return {
        border: "border-gray-700",
        btnBg: "bg-gray-700 hover:bg-gray-800",
      };
    case "steel":
      return {
        border: "border-gray-500",
        btnBg: "bg-gray-500 hover:bg-gray-600",
      };
    case "fairy":
      return {
        border: "border-pink-300",
        btnBg: "bg-pink-300 hover:bg-pink-400",
      };
    default:
      return {
        border: "border-gray-300",
        btnBg: "bg-gray-300 hover:bg-gray-400",
      };
  }
}

export default function PokemonInfiniteList({
  initialPokemons,
  initialNextOffset,
}: Props) {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>(initialPokemons);
  const [nextOffset, setNextOffset] = useState<number | null>(
    initialNextOffset
  );
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (nextOffset === null) return;
    setLoading(true);
    try {
      const list = await fetchPokemons(nextOffset, 20);
      const details = await Promise.all(
        list.results.map((p) => fetchPokemon(p.name))
      );
      setPokemons((prev) => [...prev, ...details]);
      setNextOffset(
        list.next ? Number(new URL(list.next).searchParams.get("offset")) : null
      );
    } catch (err) {
      console.error("Erro ao carregar mais:", err);
    } finally {
      setLoading(false);
    }
  }, [nextOffset]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && nextOffset !== null) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore, loading, nextOffset]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {pokemons.map((p) => {
        const primaryType = p.types[0].type.name;
        const { border, btnBg } = getTypeStyles(primaryType);

        return (
          <Card key={p.name} className={`border-2 ${border}`}>
            <CardContent className="flex flex-col items-center">
              <h3 className="capitalize mb-1">{p.name}</h3>
              <div className="w-24 h-24 relative mb-2">
                <Image
                  src={p.sprites.front_default!}
                  alt={p.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <Link href={`/pokemon/${p.name}`} className="w-full">
                <Button className={`w-full ${btnBg}`}>Ver mais</Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}

      <div ref={sentinelRef} className="col-span-full text-center py-4">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <svg
              className="animate-spin h-8 w-8 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : nextOffset === null ? (
          <p className="text-gray-600 font-medium py-4">
            No more Pokémon to load
          </p>
        ) : (
          <p className="text-gray-600 font-medium py-4">
            Scroll down to load more Pokémon
          </p>
        )}
      </div>
    </div>
  );
}
