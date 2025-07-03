"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPokemons, fetchPokemon, PokemonDetail } from "@/lib/pokeapi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    case "water":
      return {
        border: "border-blue-500",
        btnBg: "bg-blue-500 hover:bg-blue-600",
      };
    case "grass":
      return {
        border: "border-green-500",
        btnBg: "bg-green-500 hover:bg-green-600",
      };
    case "fire":
      return {
        border: "border-orange-500",
        btnBg: "bg-orange-500 hover:bg-orange-600",
      };
    case "poison":
      return {
        border: "border-purple-500",
        btnBg: "bg-purple-500 hover:bg-purple-600",
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
      // 1️⃣ busca lista básica
      const list = await fetchPokemons(nextOffset, 20);
      // 2️⃣ busca os detalhes de cada novo Pokémon
      const details = await Promise.all(
        list.results.map((p) => fetchPokemon(p.name))
      );
      // 3️⃣ atualiza estados
      setPokemons((prev) => [...prev, ...details]);
      if (list.next) {
        setNextOffset(Number(new URL(list.next).searchParams.get("offset")));
      } else {
        setNextOffset(null);
      }
    } catch (err) {
      console.error("Erro ao carregar mais:", err);
    } finally {
      setLoading(false);
    }
  }, [nextOffset]);

  // IntersectionObserver para infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && nextOffset !== null) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
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
              <div className="flex gap-1 mb-2">
                {p.types.map((t) => (
                  <Badge key={t.slot}>{t.type.name}</Badge>
                ))}
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
          <p>Carregando...</p>
        ) : nextOffset === null ? (
          <p>— Fim da lista —</p>
        ) : (
          <p>Role para carregar mais</p>
        )}
      </div>
    </div>
  );
}
