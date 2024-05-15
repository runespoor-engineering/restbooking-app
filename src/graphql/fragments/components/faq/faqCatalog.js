import { gql } from '@apollo/client';

export default gql`
  fragment faqCatalogComponentFragment on ComponentFaqFaqCatalog {
    id
    type
    faqType
    faqCategories {
      faq_category {
        data {
          id
          attributes {
            ...faqCategoryFragment
          }
        }
      }
    }
    expandIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    collapseIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    settings {
      ...settingsJsonComponentFragment
    }
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
  }
`;
