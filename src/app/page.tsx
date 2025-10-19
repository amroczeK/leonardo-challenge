import { Suspense } from "react";
import { CharactersPageClient } from "@/features/characters/components/characters-page-client";
import { fetchCharactersForSSR } from "@/lib/graphql/queries/server-fetch";
import LoadingSpinner from "@/components/ui/loading-spinner";

/**
 * Home page with static generation and SSR optimization
 * - Always pre-fetches page 1 at build time (static)
 * - Wrapped in Suspense to allow static generation with useSearchParams
 */
export default async function HomePage() {
  // Always fetch page 1 data at build time for instant initial load
  // NOTE: CharactersPageClient will handle dynamic page/filter changes
  const initialData = await fetchCharactersForSSR(1, "", 2);

  return (
    <Suspense fallback={<LoadingSpinner label="Loading characters..." />}>
      <CharactersPageClient
        initialData={initialData}
        initialPage={1}
        initialNameFilter=""
      />
    </Suspense>
  );
}
