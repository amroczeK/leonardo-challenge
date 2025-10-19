import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      // Use cache-first to avoid unnecessary network requests on navigation
      // This will use cached data when available, only fetching when cache misses
      fetchPolicy: "cache-first",
    },
  },
});
