"use client";

import React, { useState } from "react";
import NavBar from "./navbar";
import InfinitePokemonList from "./infinite-pokemon-list";
import { PokemonDetail } from "@/types/poketypes";

interface PokedexProps {
  initialPokemons: PokemonDetail[];
  initialNextOffset: string | null;
  //allTypes: string[];
}

export default function Pokedex({
  initialPokemons,
  initialNextOffset,
 // allTypes,
}: PokedexProps) {
  const [nameFilter, setNameFilter] = useState("");
  //const [typeFilter, setTypeFilter] = useState<string[]>([]);

  return (
    <>
      <NavBar
        //types={allTypes}
        onNameFilterChange={setNameFilter}
        //onTypeFilterChange={setTypeFilter}
      />
      <main className="min-h-screen bg-background text-foreground p-8">
        <InfinitePokemonList
          initialPokemons={initialPokemons}
          initialNextOffset={initialNextOffset}
          nameFilter={nameFilter}
          //typeFilter={typeFilter}
        />
      </main>
    </>
  );
}
