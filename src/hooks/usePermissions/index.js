import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../context/UserContext/UserContext';
import { onFormSubmitRedirectLinkVar } from '../../utils/apollo/cache';

const shouldBeLoggedInMap = {
  authenticated: true,
  anonymous: false
};

/**
 * Redirect to the provided URl and returns boolean value which means does the route is allowed for the provided status.
 * @param {Object | null} [permissions]
 * @param {'authenticated' | 'anonymous' | null} permissions.availableOnlyFor - determines for what status the content should be shown or null value for any status
 * @param {string} permissions.redirectUrl - determines urlObject which should be pushed by router in case user have no the necessary permission.
 * @return {[boolean]} - determines does the user have the necessary permission.
 */
const usePermissions = (permissions) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(UserContext);
  const { availableOnlyFor, redirectUrl } = permissions || {};
  const [isAllowed, setAllowed] = useState(
    () => !availableOnlyFor || availableOnlyFor === 'anonymous'
  );

  useEffect(() => {
    if (availableOnlyFor) {
      const shouldBeLoggedIn = shouldBeLoggedInMap[availableOnlyFor];

      if (isLoggedIn !== shouldBeLoggedIn) {
        setAllowed(false);

        if (redirectUrl) {
          router.push(redirectUrl);
          onFormSubmitRedirectLinkVar(router.asPath);
        }
      } else {
        setAllowed(true);
      }
    } else {
      setAllowed(true);
    }
  }, [isLoggedIn, availableOnlyFor, router, redirectUrl]);

  return [isAllowed];
};

export default usePermissions;
