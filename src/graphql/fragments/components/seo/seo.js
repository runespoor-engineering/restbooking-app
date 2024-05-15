import { gql } from '@apollo/client';

export default gql`
  fragment seoComponentFragment on ComponentSeoSeo {
    id
    description
    title
    microMarkup
    openGraph
    meta {
      name
      property
      content
    }
  }
`;
