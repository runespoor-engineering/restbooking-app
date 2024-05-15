import { from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';

import { SSR_MODE } from '../../constants/common';
import { getPlayerSessionToken } from '../auth/userSessionToken';

const clientHttpLink = new HttpLink({
  uri: '/graphql',
  fetch
});

const authLink = setContext((_, { headers }) => {
  const token = getPlayerSessionToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, ...details }) => {
      console.error(
        `[GraphQL error]: Message: ${message}`,
        details?.extensions?.exception?.stacktrace || details
      );
      if (['SessionExpired', 'SessionNotFound'].includes(message)) logoutPlayer();
    });

  if (networkError) {
    console.error(`[Network error]: ${networkError}}`);
  }
});

const getApolloClientLinks = (token) => {
  const serverHttpLink = new HttpLink({
    uri: `${process.env.CMS_URL}/graphql`,
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  return from(SSR_MODE ? [errorLink, serverHttpLink] : [authLink, errorLink, clientHttpLink]);
};

export default getApolloClientLinks;
