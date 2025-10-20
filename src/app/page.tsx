import { Suspense } from "react";
import { CharactersPageClient } from "@/features/characters/components/characters-page-client";
import { fetchCharactersForSSR } from "@/lib/graphql/queries/server-fetch";
import LoadingSpinner from "@/components/ui/loading-spinner";

const INITIAL_PAGE = 1;

/**
 * Home page with static generation and SSR optimization
 * - Always pre-fetches page 1 at build time (static)
 * - Wrapped in Suspense to allow static generation with useSearchParams
 */
export default async function HomePage() {
  // Always fetch page 1 data at build time for instant initial load
  const initialData = await fetchCharactersForSSR(INITIAL_PAGE);

  return (
    <Suspense fallback={<LoadingSpinner label="Loading characters..." />}>
      <CharactersPageClient
        initialData={initialData}
        initialPage={INITIAL_PAGE}
        initialNameFilter=""
      />
    </Suspense>
  );
}
