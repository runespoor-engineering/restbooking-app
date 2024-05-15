import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo } from 'react';

import logoutPlayer from '../../utils/auth/logoutUser';
import { getPlayerSessionToken } from '../../utils/auth/userSessionToken';
import { PLAYER_QUERY } from './graphql/queries';

export const UserContext = createContext(null);

const UserProvider = ({ isLoggedIn, setIsLoggedIn, children }) => {
  const token = getPlayerSessionToken();

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn, token]);

  const { data, loading } = useQuery(PLAYER_QUERY, {
    skip: !token,
    onError: () => {
      if (isLoggedIn) logoutPlayer();
    },
    onCompleted: () => {
      setIsLoggedIn(true);
    },
    fetchPolicy: 'network-only'
  });
  const userContextValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn, data, loading }),
    [data, isLoggedIn, loading, setIsLoggedIn]
  );

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  children: PropTypes.node
};

UserProvider.defaultProps = {
  children: undefined
};

export default UserProvider;
