import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';

import GenericPage from '../components/layouts/blocks/GenericPage';
import HorizontalLayout from '../components/layouts/HorizontalLayout/HorizontalLayout';
import config from '../config';
import { PAGES_SLUGS_QUERY } from '../graphql/queries/pages';
import usePermissions from '../hooks/usePermissions';
import useRedirectOnLogout from '../hooks/useRedirectOnLogout';
import initializeApollo from '../utils/apollo/initializeApolloClient';
import getRootPageProps from '../utils/pages/getRootPageProps';
import { generateStaticPaths, normalizePagesSlugs } from '../utils/pages/getStaticPaths';

const RootPageComponent = ({ slug, globalContentConfigs, globalUiConfigs, pageContents }) => {
  const router = useRouter();

  const copyright = globalContentConfigs?.data[0]?.attributes.copyright || null;
  const pages = pageContents.data || {};
  const { uiComponents, seo, componentsGridContainerSettings, permissions, settings } =
    pages[0]?.attributes || {};

  const [isAllowed] = usePermissions(permissions);
  useRedirectOnLogout(permissions);

  if (router.isFallback || !isAllowed) return <p>Loading...</p>;

  return (
    <HorizontalLayout copyright={copyright} settings={settings}>
      <GenericPage
        componentsGridContainerSettings={componentsGridContainerSettings}
        globalUiConfigs={globalUiConfigs}
        seo={seo}
        slug={slug}
        uiComponents={uiComponents}
      />
    </HorizontalLayout>
  );
};

RootPageComponent.propTypes = {
  slug: PropTypes.string.isRequired,
  globalContentConfigs: PropTypes.shape().isRequired,
  pageContents: PropTypes.shape().isRequired,
  globalUiConfigs: PropTypes.shape().isRequired
};

export default RootPageComponent;

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
