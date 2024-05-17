import { gql } from '@apollo/client';

export default gql`
  fragment apartmentPreviewFragment on Apartment {
    title
    squareThumbnail {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    rectangularThumbnail {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
  }
`;
