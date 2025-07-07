import { PokemonDetail } from "@/types/poketypes";
import { FC } from "react";

interface PokeAboutProps {
  pokemon: PokemonDetail;
}

const PokeAbout: FC<PokeAboutProps> = ({ pokemon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4 text-center">About</h2>
      <div className="grid grid-cols-3 text-center gap-4">
        <div>
          <div className="flex items-center justify-center text-gray-500 mb-1">
            <span className="font-semibold">Height</span>
          </div>
          <p className="text-lg">{pokemon.height / 10} m</p>
        </div>
        <div>
          <div className="flex items-center justify-center text-gray-500 mb-1">
            <span className="font-semibold">Weight</span>
          </div>
          <p className="text-lg">{pokemon.weight / 10} kg</p>
        </div>
        <div>
          <div className="flex items-center justify-center text-gray-500 mb-1">
            <span className="font-semibold">Abilities</span>
          </div>
          <ul className="list-none p-0 m-0">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="capitalize text-lg">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokeAbout;