"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PokemonDetail } from "@/types/poketypes";
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/pokeapi";
import { PokeCard } from "@/components/poke-card";

interface InfinitePokemonListProps {
  initialPokemons: PokemonDetail[];
  initialNextOffset: string | null;
  nameFilter?: string;
  typeFilter?: string[];
}

export default function InfinitePokemonList({
  initialPokemons,
  initialNextOffset,
  nameFilter = "",
  typeFilter = [],
}: InfinitePokemonListProps) {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>(initialPokemons);
  const [nextOffset, setNextOffset] = useState<string | null>(
    initialNextOffset
  );
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (!nextOffset || loading) return;
    setLoading(true);
    const list = await fetchPokemonList(Number(nextOffset), 20);
    const details = await Promise.all(
      list.results.map((p) => fetchPokemonDetail(p.name))
    );
    setPokemons((prev) => [...prev, ...details]);
    setNextOffset(
      list.next ? new URL(list.next).searchParams.get("offset") : null
    );
    setLoading(false);
  }, [nextOffset, loading]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 500
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  // aplica filtros antes de renderizar
  const displayed = pokemons.filter((p) => {
    const matchName = p.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchType =
      typeFilter.length === 0 ||
      p.types.some((t) => typeFilter.includes(t.type.name));
    return matchName && matchType;
  });

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
      {displayed.map((p) => (
        <PokeCard key={p.id} pokemon={p} />
      ))}
      {loading && <p className="col-span-full text-center">Carregando...</p>}
    </div>
  );
}
