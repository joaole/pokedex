// components/PokeCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { PokemonDetail } from "@/types/poketypes";

export interface PokeCardProps {
  pokemon: PokemonDetail;
}

export const PokeCard: FC<PokeCardProps> = ({ pokemon }) => {
  // Pega o nome do primeiro tipo (slot=1) ou 'normal' como fallback
  const primaryType =
    pokemon.types.find((t) => t.slot === 1)?.type.name ?? "normal";

  // Classes dinâmicas baseadas no tipo
  const containerClasses = `
    group
    text-${primaryType}
    bg-gray-50 dark:bg-gray-800
    cursor-pointer
    rounded-xl
    shadow-md
    transition
    transform
    hover:-translate-y-1
    hover:shadow-lg
    p-4
    border-2 border-${primaryType}
    flex flex-col items-center
  `;

  return (
    <div className={containerClasses}>
      <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
      <div className="relative w-24 h-24 ">
        <Image
          src={pokemon.sprites.front_default!}
          fill
          style={{ objectFit: "contain" }}
          priority
          alt={"Poke IMG"}
        />
      </div>

      {/* Link “show details” */}
      <Link
        href={`/pokemon/${pokemon.id}`}
        className={`
          mt-2
          px-4 py-1
          border-2 border-${primaryType}
          text-${primaryType}
          rounded-full
          text-sm font-medium
          transition-colors transition-transform duration-200
          hover:bg-${primaryType}
          hover:text-white!
          hover:-translate-y-0.5
        `}
      >
        show details
      </Link>
    </div>
  );
};
