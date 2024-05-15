import { gql } from '@apollo/client';

export default gql`
  fragment loadMoreCatalogCounterComponentFragment on ComponentGlobalComponentsLoadMoreCatalogCounter {
    id
    variant
    position
    afterCounterText
    beforeCounterText
  }
`;
