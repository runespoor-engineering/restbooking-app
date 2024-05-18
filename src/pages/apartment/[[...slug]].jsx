import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import { APARTMENT_QUERY } from '../../graphql/queries/collections';
import { GAMES_SLUGS_QUERY } from '../../graphql/queries/pages';
import initializeApollo from '../../utils/apollo/initializeApolloClient';
import { generateStaticProps } from '../../utils/pages/generateStaticProps';
import { generateStaticPaths, normalizeGamesSlugs } from '../../utils/pages/getStaticPaths';

export const getStaticPaths = async (ctx) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GAMES_SLUGS_QUERY,
    variables: {
      brandIdentifier: config.identifier
    }
  });

  const normalizedGamesSlugs = normalizeGamesSlugs(data.gamesSlugs.data || []);
  const staticPaths = generateStaticPaths({
    normalizedSlugs: normalizedGamesSlugs,
    directSlugs: config.directPageSlugs,
    locales: ctx.locales
  });

  return staticPaths;
};

export const getStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();
  const gameSlug = ctx.params.slug?.[0] || '';

  const { data } = await apolloClient.query({
    query: APARTMENT_QUERY,
    variables: {
      brandIdentifier: config.identifier,
      slug: gameSlug,
      locale: ctx.locale
    }
  });

  const staticProps = await generateStaticProps({
    data: {
      apartment: data.apartment.data[0]
    },
    ctx,
    serverSideTranslations
  });

  return staticProps;
};

export default (props) => {
  console.log(props)
  return null
};
