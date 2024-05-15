import { gql } from '@apollo/client';

export default gql`
  fragment genericCollectionsFragment on Query {
    brands(filters: { identifier: { eq: $brandIdentifier } }) {
      data {
        attributes {
          ...brandFragment
        }
      }
    }
    globalUiConfigs(filters: { brand: { identifier: { eq: $brandIdentifier } } }) {
      data {
        attributes {
          ...globalUiConfigFragment
        }
      }
    }
    navigations(filters: { brand: { identifier: { eq: $brandIdentifier } } }, locale: $locale) {
      data {
        attributes {
          ...navigationFragment
        }
      }
    }
  }
`;
