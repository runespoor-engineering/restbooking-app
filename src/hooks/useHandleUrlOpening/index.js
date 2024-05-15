import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { LINK_OPENING_TYPE } from '../../constants/cms';
import generateRouterUrl from '../../utils/router/generateRouterUrl';

const useHandleUrlOpening = () => {
  const router = useRouter();
  const handleUrlOpening = useCallback(
    ({ url, as, options, openingType }) => {
      const generatedUrl = generateRouterUrl(url, router.asPath);
      const OPENING_TYPE_TO_ACTION_MAP = {
        [LINK_OPENING_TYPE.open]: () => router.push(generatedUrl, as, options),
        [LINK_OPENING_TYPE.openWithoutHistory]: () => router.replace(generatedUrl, as, options),
        [LINK_OPENING_TYPE.openBlank]: () => window.open(generatedUrl, '_blank')
      };
      const action = OPENING_TYPE_TO_ACTION_MAP[openingType];
      if (action) {
        action();
      } else router.push(generatedUrl, as, options);
    },
    [router]
  );
  return handleUrlOpening;
};

export default useHandleUrlOpening;
