"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Character } from "@/lib/graphql/types/character";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{character.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl>
            <dt>Status:</dt>
            <dd>{character.status}</dd>
            <dt>Species:</dt>
            <dd>{character.species}</dd>
          </dl>
        </CardContent>
      </Card>
    </Link>
  );
}
