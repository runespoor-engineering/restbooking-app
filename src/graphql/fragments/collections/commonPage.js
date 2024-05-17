import { gql } from '@apollo/client';

export default gql`
  fragment commonPageFragment on Query {
    pageContents(
      filters: { slug: { eq: $slug }, brand: { identifier: { eq: $brandIdentifier } } }
      locale: $locale
      publicationState: $publicationState
    ) {
      data {
        attributes {
          seo {
            ...seoComponentFragment
          }
          uiComponents {
            __typename
            ...richTextComponentFragment
            ...formComponentFragment
            ...bannersSliderComponentFragment
            ...faqCatalogComponentFragment
            ...iframeComponentFragment
            ...playerAccountNaviagtionComponentFragment
            ...globalGenericActionButtonComponentFragment
            ...faqCatalogManualComponentFragment
            ...apartmentsCatalogComponentFragment
          }
          componentsGridContainerSettings {
            ...settingsJsonComponentFragment
          }
          settings {
            ...settingsJsonComponentFragment
          }
          permissions {
            ...permissionsFragment
          }
          layout {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
