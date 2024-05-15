import { gql } from '@apollo/client';

export default gql`
  fragment brandFragment on Brand {
    bmsPartnerId
    appUrl
    languages {
      data {
        attributes {
          ...languageFragment
        }
      }
    }
  }
`;
