import { gql } from '@apollo/client';

export default gql`
  fragment apartmentCategoryFragment on ApartmentCategory {
    title
    apartments {
      data {
        id
        attributes {
          ...apartmentPreviewFragment
        }
      }
    }
    route
    slug
    tileColor
    tileIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    template_apartment_preview {
      data {
        id
        attributes {
          ...templateApartmentPreviewFragment
        }
      }
    }
  }
`;
