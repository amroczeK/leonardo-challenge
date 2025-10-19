import { Suspense } from "react";
import { Metadata } from "next";
import { CharacterDetailClient } from "@/features/characters/components/character-detail-client";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Character #${id} - Rick and Morty`,
    description:
      "View detailed information about this Rick and Morty character",
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingSpinner label="Loading character..." />}>
      <CharacterDetailClient id={id} />
    </Suspense>
  );
}
