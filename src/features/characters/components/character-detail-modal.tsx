"use client";

import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { GET_CHARACTER } from "@/lib/graphql/queries/characters";
import { CharacterResponse } from "@/lib/graphql/types/character";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface CharacterDetailModalProps {
  characterId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterDetailModal({
  characterId,
  open,
  onOpenChange,
}: CharacterDetailModalProps) {
  const { loading, error, data } = useQuery<CharacterResponse>(GET_CHARACTER, {
    variables: { id: characterId },
    skip: !characterId || !open,
  });

  const character = data?.character;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            Character Information
          </DialogTitle>
          <DialogDescription>
            Additional information about the character
          </DialogDescription>
        </DialogHeader>

        {loading && <LoadingSpinner label="Loading character..." />}

        {error && (
          <>
            <p className="text-destructive text-lg font-semibold">
              Error loading character
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {error.message || "Character not found"}
            </p>
          </>
        )}

        {character && (
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <dl>
                  <dt>Status:</dt>
                  <dd>{character.status}</dd>
                  <dt>Species:</dt>
                  <dd>{character.species}</dd>
                  <dt>Type:</dt>
                  <dd>{character.type || "N/A"}</dd>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
