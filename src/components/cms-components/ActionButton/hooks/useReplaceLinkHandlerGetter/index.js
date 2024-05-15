import { useRouter } from 'next/router';
import { useCallback } from 'react';

import generateRouterUrl from '../../../../../utils/router/generateRouterUrl';

const useReplaceLinkHandlerGetter = () => {
  const router = useRouter();

  return useCallback(
    ({ link }) =>
      () => {
        if (link) {
          router.replace(generateRouterUrl(link, router?.asPath), undefined, {
            shallow: link.includes('modal=')
          });
        }
      },
    [router]
  );
};

export default useReplaceLinkHandlerGetter;
