/* eslint-disable react/prop-types, no-restricted-imports */
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useMemo } from 'react';

import generateRouterUrl from '../../../utils/router/generateRouterUrl';

const Anchor = styled('a')({});
/*
Read more details https://mui.com/material-ui/guides/routing/#next-js
 */
const NextLinkComposed = forwardRef(function NextLinkComposed(props, ref) {
  const {
    to,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior = true,
    locale,
    ...otherProps
  } = props;
  const router = useRouter();

  const url = useMemo(() => {
    if (typeof to === 'object' && Object.keys(to).length > 0) {
      // it can be improved and modified in future for usage `to` as object
      return to;
    }
    return generateRouterUrl(to, router?.asPath);
  }, [router?.asPath, to]);

  return (
    <NextLink
      passHref
      href={url}
      legacyBehavior={legacyBehavior}
      locale={locale}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <Anchor ref={ref} {...otherProps} />
    </NextLink>
  );
});

export default NextLinkComposed;
