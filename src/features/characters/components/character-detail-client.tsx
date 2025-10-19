"use client";

import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GET_CHARACTER } from "@/lib/graphql/queries/characters";
import { CharacterResponse } from "@/lib/graphql/types/character";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface CharacterDetailClientProps {
  id: string;
}

export function CharacterDetailClient({ id }: CharacterDetailClientProps) {
  const router = useRouter();
  const { loading, error, data } = useQuery<CharacterResponse>(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) {
    return <LoadingSpinner label="Loading character..." />;
  }

  if (error || !data?.character) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold">
            Error loading character
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            {error?.message || "Character not found"}
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Back to Characters
          </Button>
        </div>
      </div>
    );
  }

  const character = data.character;

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="w-fit"
      >
        <ArrowLeft className="mr-2" />
        Back to Characters
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="relative aspect-square w-full">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {character.name}
            </h1>
            <p className={`text-lg font-medium text-foreground`}>
              {character.status}
            </p>
          </div>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Character Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <dl>
                <dt>Species:</dt>
                <dd>{character.species}</dd>
                <dt>Type:</dt>
                <dd>{character.type}</dd>
                <dt>Gender:</dt>
                <dd>{character.gender}</dd>
                <dt>Origin:</dt>
                <dd>{character.origin.name}</dd>
                <dt>Location:</dt>
                <dd>{character.location.name}</dd>
                <dt>Episodes:</dt>
                <dd>{character.episode.length} episodes</dd>
                <dt>Created:</dt>
                <dd>
                  {new Date(character.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
