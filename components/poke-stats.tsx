interface Stat {
  name: string;
  value: number;
}

interface PokemonStatsProps {
  stats: Stat[];
  primaryType: string;
}

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

export function PokemonStats({ stats, primaryType }: PokemonStatsProps) {
  const statBarColorClass = getTypeColorClass(primaryType);

  return (
    <div className="bg-white text-black p-4 rounded mt-4">
      <h2 className="text-lg font-bold text-center mb-4">Base stats</h2>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center gap-2">
            <div className="w-20 text-xs font-bold uppercase text-right pr-2">{stat.name}</div>
            <div className="w-8 text-xs font-bold">{stat.value}</div>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className={`h-2 ${statBarColorClass} rounded`}
                style={{ width: `${(stat.value / 255) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}