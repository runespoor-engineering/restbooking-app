import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';

import logoutPlayer from '../../../../utils/auth/logoutUser';

const useLogoutClickHandler = () => {
  const apolloClient = useApolloClient();

  const handleLogoutClick = useCallback(async () => {
    await logoutPlayer();
    apolloClient.cache.evict({ fieldName: 'player' });
    apolloClient.cache.gc();
  }, [apolloClient.cache]);

  return handleLogoutClick;
};

export default useLogoutClickHandler;
