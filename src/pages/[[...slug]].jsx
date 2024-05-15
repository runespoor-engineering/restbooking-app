import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../config';
import { PAGES_SLUGS_QUERY } from '../graphql/queries/pages';
import initializeApollo from '../utils/apollo/initializeApolloClient';
import getRootPageProps from '../utils/pages/getRootPageProps';
import { generateStaticPaths, normalizePagesSlugs } from '../utils/pages/getStaticPaths';
import { GENERIC_COMMON_PAGE_QUERY } from '../graphql/queries/staticPageQueries';

export default (props) => {
  console.log('======= props =======', props)
  // console.log(GENERIC_COMMON_PAGE_QUERY.loc.source.body)
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
  console.log('======= staticPaths =======', JSON.stringify(staticPaths))

  return staticPaths;
};

export const getStaticProps = (ctx) => getRootPageProps({ ctx, config, serverSideTranslations });
