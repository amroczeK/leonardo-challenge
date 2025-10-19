import { CharactersPageClient } from "@/features/characters/components/characters-page-client";
import { fetchCharactersForSSR } from "@/lib/graphql/queries/server-fetch";

/**
 * Home page with SSR optimization to fetch chars
 * - Fetches pages 1-2 on the server for fast initial load
 * - Client component handles pagination and fetching for pages 3+
 * - Using searchParams to respect the URL state e.g. /?page=2&name=Rick
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const nameFilter = params.name || "";
  const pageLimit = 2;

  const initialData = await fetchCharactersForSSR(page, nameFilter, pageLimit);

  return (
    <CharactersPageClient
      initialData={initialData}
      initialPage={page}
      initialNameFilter={nameFilter}
    />
  );
}
