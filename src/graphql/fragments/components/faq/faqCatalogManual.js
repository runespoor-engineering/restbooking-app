import { gql } from '@apollo/client';

export default gql`
  fragment faqCatalogManualComponentFragment on ComponentFaqFaqCatalogManual {
    id
    title
    faqs {
      details
      summary
      summaryIcon {
        data {
          attributes {
            ...imageFragment
          }
        }
      }
      settings {
        ...settingsJsonComponentFragment
      }
    }
    expandIcon {
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
