/* eslint-disable no-underscore-dangle, no-param-reassign, no-restricted-globals */
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { SSR_MODE } from '../../constants/common';
import { cacheOptions } from './cache';
import getApolloClientLinks from './getApolloClientLinks';

let apolloClient;

function createApolloClient(token) {
  return new ApolloClient({
    ssrMode: SSR_MODE,
    link: getApolloClientLinks(token),
    cache: new InMemoryCache(cacheOptions)
  });
}

export default function initializeApollo(initialState = null, token = null) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore(SSR_MODE ? initialState : { ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (SSR_MODE) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
