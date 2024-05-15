import { gql } from '@apollo/client';

export default gql`
  fragment coverImageComponentFragment on ComponentGlobalComponentsCoverImage {
    largeImage {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    smallImage {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    description
    settings
  }
`;
