import { gql } from '@apollo/client';

export default gql`
  fragment apartmentsCatalogComponentFragment on ComponentApartmentsApartmentsCatalog {
    id
    useLoadMore
    title
    displayCategoryApartmentsCount
    categories {
      id
      apartmentCategory {
        data {
          id
          attributes {
            ...apartmentCategoryFragment
          }
        }
      }
    }
    showMoreButton {
      ...specialtyButtonComponentFragment
    }
    settings {
      ...settingsJsonComponentFragment
    }
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
  }
`;
