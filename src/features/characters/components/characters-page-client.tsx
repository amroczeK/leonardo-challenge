"use client";

import { useQuery } from "@apollo/client/react";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_CHARACTERS } from "@/lib/graphql/queries/characters";
import { CharactersResponse } from "@/lib/graphql/types/character";
import { CharacterGrid } from "./character-grid";
import { CharacterFilters } from "./character-filters";

import LoadingSpinner from "@/components/ui/loading-spinner";
import PaginationControls from "./pagination-controls";

interface CharactersPageClientProps {
  initialData: CharactersResponse | null;
  initialPage: number;
  initialNameFilter: string;
}

/**
 * Client component with hybrid rendering support
 * - Uses server-rendered data for pages 1-2 (when available)
 * - Falls back to client-side fetching for pages 3+ or when filters are applied
 */
export function CharactersPageClient({
  initialData,
  initialPage,
  initialNameFilter,
}: CharactersPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const nameFilter = searchParams.get("name") || "";

  // Determine if we should skip the client-side query
  // Skip if we have initial data and we're on the same page/filter
  const shouldUseInitialData =
    initialData !== null &&
    page === initialPage &&
    nameFilter === initialNameFilter;

  const { loading, error, data } = useQuery<CharactersResponse>(
    GET_CHARACTERS,
    {
      variables: {
        page,
        filter: nameFilter ? { name: nameFilter } : undefined,
      },
      // Skip the query if we have server-rendered data
      skip: shouldUseInitialData,
    }
  );

  const handleFilterChange = (name: string) => {
    const params = new URLSearchParams();
    if (name) {
      params.set("name", name);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (nameFilter) {
      params.set("name", nameFilter);
    }
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold">
            Error loading characters
          </p>
          <p className="text-muted-foreground text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // Use server-rendered data if available, otherwise use client-fetched data
  const displayData = shouldUseInitialData ? initialData : data;
  const characters = displayData?.characters.results || [];
  const info = displayData?.characters.info;

  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Rick and Morty Characters</h1>
        <p className="text-muted-foreground">
          Browse through all the characters
        </p>
      </div>

      <CharacterFilters
        onFilterChange={handleFilterChange}
        defaultValue={nameFilter}
      />

      {loading ? (
        <LoadingSpinner label="Loading characters..." />
      ) : (
        <>
          <CharacterGrid characters={characters} />

          {info && info.pages > 1 && (
            <PaginationControls
              currentPage={page}
              totalPages={info.pages}
              onPageChange={handlePageChange}
              prevPage={info.prev}
              nextPage={info.next}
            />
          )}
        </>
      )}
    </div>
  );
}
