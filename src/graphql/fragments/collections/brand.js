import { gql } from '@apollo/client';

export default gql`
  fragment brandFragment on Brand {
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
