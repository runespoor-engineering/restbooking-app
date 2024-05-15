import { gql } from '@apollo/client';

export default gql`
  fragment defaultSeoComponentFragment on ComponentSeoDefaultSeo {
    id
    titleTemplate
    defaultTitle
    dangerouslySetAllPagesToNoFollow
    dangerouslySetAllPagesToNoIndex
  }
`;
