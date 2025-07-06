"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PokeCard } from "@/components/poke-card";
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/pokeapi";
import { PokemonDetail } from "@/types/poketypes";

interface InfinitePokemonListProps {
  initialPokemons: PokemonDetail[];
  initialNextOffset: string | null;
}

export default function InfinitePokemonList({
  initialPokemons,
  initialNextOffset,
}: InfinitePokemonListProps) {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>(initialPokemons);
  const [nextOffset, setNextOffset] = useState<string | null>(
    initialNextOffset
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (!nextOffset || loading) return;
    setLoading(true);
    try {
      const list = await fetchPokemonList(Number(nextOffset), 20);
      const details = await Promise.all(
        list.results.map((res) => fetchPokemonDetail(res.name))
      );
      setPokemons((prev) => [...prev, ...details]);
      setNextOffset(
        list.next ? new URL(list.next).searchParams.get("offset") : null
      );
    } finally {
      setLoading(false);
    }
  }, [nextOffset, loading]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMore]);

  return (
    <div className="space-y-6 ">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {pokemons.map((p) => (
          <PokeCard key={p.id} pokemon={p} />
        ))}
      </div>
      <div ref={sentinelRef} className="h-1" />
      {loading && <p className="text-center py-4">Carregando mais...</p>}
      {!nextOffset && (
        <p className="text-center py-4 opacity-70">
          Você alcançou o fim da lista.
        </p>
      )}
    </div>
  );
}
