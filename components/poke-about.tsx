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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">Height</span>
          </div>
          <p className="text-lg">{pokemon.height / 10} m</p>
        </div>
        <div>
          <div className="flex items-center justify-center text-gray-500 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
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