import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

/**
 * Server-side Apollo Client for SSR data fetching
 * This client is used exclusively in Server Components
 * Reference: https://www.apollographql.com/blog/apollo-client-integration-nextjs-officially-released
 * Reference: https://github.com/apollographql/apollo-client-integrations/tree/main/packages/nextjs
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // Absolute URL is required for SSR
      uri: "https://rickandmortyapi.com/graphql",
      fetchOptions: {
        cache: "force-cache",
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      },
    }),
  });
});
