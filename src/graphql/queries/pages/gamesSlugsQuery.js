import { gql } from '@apollo/client';

export default gql`
  query ($brandIdentifier: String!) {
    gamesSlugs: apartments(filters: { brand: { identifier: { eq: $brandIdentifier } } }) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
