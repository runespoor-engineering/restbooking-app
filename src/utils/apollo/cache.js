import { makeVar } from '@apollo/client';

export const cacheOptions = {
  typePolicies: {
    Game: {
      keyFields: ['library_game', ['data', ['attributes', ['slug']]]]
    },
    Lobby: {
      keyFields: ['library_lobby', ['data', ['attributes', ['slug']]]]
    },
    Promotion: {
      keyFields: ['slug']
    }
  }
};

export const onFormSubmitRedirectLinkVar = makeVar('');

export const isLoggedInVar = makeVar(false);
