import { getClient } from "@/lib/graphql/server-client";
import { GET_CHARACTERS } from "./characters";
import { CharactersResponse } from "../types/character";

/**
 * Fetches characters data on the server for SSR
 * Only fetches for pages 1-2 without filters
 */
export async function fetchCharactersForSSR(
  page: number,
  nameFilter?: string,
  pageLimit: number = 2
): Promise<CharactersResponse | null> {
  // Only fetch data on the server for pages 1-2 (no filter applied)
  if (page > pageLimit || nameFilter) {
    return null;
  }

  try {
    const { data } = await getClient().query<CharactersResponse>({
      query: GET_CHARACTERS,
      variables: {
        page,
        filter: undefined,
      },
    });
    return data || null;
  } catch (error) {
    console.error("Error fetching characters for SSR:", error);
    return null;
  }
}
