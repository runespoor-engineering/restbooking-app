import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../config';
import { PAGES_SLUGS_QUERY } from '../graphql/queries/pages';
import initializeApollo from '../utils/apollo/initializeApolloClient';
import getRootPageProps from '../utils/pages/getRootPageProps';
import { generateStaticPaths, normalizePagesSlugs } from '../utils/pages/getStaticPaths';

export default (props) => {
  return <div>Page</div>
};

export const getStaticPaths = async (ctx) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: PAGES_SLUGS_QUERY,
    variables: {
      brandIdentifier: config.identifier
    }
  });
  const {
    pageContents: { data: pageContentsData }
  } = data;

  const pages = pageContentsData;
  const normalizedPagesSlugs = normalizePagesSlugs(pages);
  const staticPaths = generateStaticPaths({
    normalizedSlugs: normalizedPagesSlugs,
    directSlugs: config.directPageSlugs,
    locales: ctx?.locales
  });

  return staticPaths;
};

export const getStaticProps = (ctx) => getRootPageProps({ ctx, config, serverSideTranslations });
