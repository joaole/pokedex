import Link from "next/link";
import Image from "next/image";
import { fetchPokemon } from "@/lib/pokeapi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function PokemonPage({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  const data = await fetchPokemon(params.name);
  return (
    <div className="p-4 max-w-xl mx-auto">
      <Button asChild>
        <Link href="/">← Voltar</Link>
      </Button>
      <Card className="mt-4">
        <CardContent className="text-center">
          <h1 className="text-2xl capitalize">{data.name}</h1>
          <div className="mx-auto">
            <Image
              src={data.sprites.front_default!}
              alt={data.name}
              width={96}
              height={96}
              priority
            />
          </div>
          <div className="flex justify-center gap-2 my-2">
            {data.types.map((t) => (
              <Badge key={t.slot}>{t.type.name}</Badge>
            ))}
          </div>
          <p>Altura: {data.height}</p>
          <p>Peso: {data.weight}</p>
          <ul className="list-disc list-inside mt-2">
            {data.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
