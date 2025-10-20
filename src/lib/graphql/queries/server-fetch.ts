import { getClient } from "@/lib/graphql/server-client";
import { GET_CHARACTERS } from "./characters";
import { CharactersResponse } from "../types/character";

/**
 * Fetches characters data using server-side Apollo Client
 * @apollo/client-integration-nextjs
 * @param page - The page number to fetch
 * @param nameFilter - The name filter to apply
 * @returns The characters data
 */
export async function fetchCharactersForSSR(
  page: number,
  nameFilter: string | undefined = undefined
): Promise<CharactersResponse | null> {
  // NOTE: Rick and Morty GraphQL API returns exactly 20 characters per page
  try {
    const { data } = await getClient().query<CharactersResponse>({
      query: GET_CHARACTERS,
      variables: {
        page,
        filter: nameFilter,
      },
    });
    return data || null;
  } catch (error) {
    console.error("Error fetching characters for SSR:", error);
    return null;
  }
}
