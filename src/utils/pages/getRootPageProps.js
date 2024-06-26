import { PUBLICATION_STATE } from '../../constants/cms';
import { LAYOUTS_QUERY } from '../../graphql/queries/collections';
import { GENERIC_COMMON_PAGE_QUERY } from '../../graphql/queries/staticPageQueries';
import initializeApollo from '../apollo/initializeApolloClient';
import { generateStaticProps, getChainedSlug } from './generateStaticProps';

const getRootPageProps = async ({ ctx, config, serverSideTranslations }) => {
  const apolloClient = initializeApollo();
  const chainedSlug = getChainedSlug(ctx.params?.slug);

  const { data } = await apolloClient.query({
    query: GENERIC_COMMON_PAGE_QUERY,
    variables: {
      brandIdentifier: config.identifier,
      slug: chainedSlug,
      locale: ctx.locale,
      publicationState: PUBLICATION_STATE.live
    }
  });

  const [globalUiConfig = {}] = data.globalUiConfigs.data || [];
  const pageDataAttributes = data?.pageContents?.data?.[0]?.attributes || {};
  // // const uiComponentsDynamicZones = pageDataAttributes?.uiComponents;
  const pageLayoutId = pageDataAttributes?.layout?.data?.id;
  const defaultLayoutId = globalUiConfig.attributes?.defaultLayout?.data?.id;
  const layoutId = pageLayoutId || defaultLayoutId;

  let layoutData = {};
  if (layoutId) {
    const { data: layoutQueryData } = await apolloClient.query({
      query: LAYOUTS_QUERY,
      variables: {
        id: layoutId,
        brandIdentifier: config.identifier,
        locale: ctx.locale
      }
    });
    const [layout = {}] = layoutQueryData.layout.data || [];
    layoutData = layout;
  }

  // const { data: templateGamePreviewsData } = await apolloClient.query({
  //   query: TEMPLATE_GAME_PREVIEWS_QUERY,
  //   variables: {
  //     brandIdentifier: config.identifier,
  //     publicationState: PUBLICATION_STATE.live,
  //     ids: getTemplateGamePreviewIdsFromUiComponents(uiComponentsDynamicZones),
  //     defaultTemplateId: globalUiConfig.attributes?.defaultTemplateGamePreview.data?.id || null
  //   }
  // });

  // console.log(staticProps)

  const staticProps = await generateStaticProps({
    data: {
      ...data,
      // ...templateGamePreviewsData,
      layout: { ...layoutData }
    },
    ctx,
    serverSideTranslations
  });

  if (staticProps.props.pageContents?.data.length) {
    return staticProps;
  }

  return {
    notFound: true
  };
};

export default getRootPageProps;
