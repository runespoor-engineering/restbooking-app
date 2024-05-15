import { gql } from '@apollo/client';

export default gql`
  query ($brandIdentifier: String!) {
    pageContents(
      filters: { brand: { identifier: { eq: $brandIdentifier } }, slug: { ne: "404" } }
    ) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
