import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '../../context/UserContext/UserContext';
import usePrevious from '../usePrevious';

const useRedirectOnLogout = (permissions) => {
  const { isLoggedIn } = useContext(UserContext);
  const previousIsLoggedIn = usePrevious(isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (previousIsLoggedIn && !isLoggedIn && router.asPath !== '/' && !permissions?.redirectUrl) {
      router.push('/');
    }
  }, [isLoggedIn, previousIsLoggedIn, router, permissions]);
};

export default useRedirectOnLogout;
