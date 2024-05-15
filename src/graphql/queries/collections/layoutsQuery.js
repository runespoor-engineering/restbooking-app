import { gql } from '@apollo/client';

import { LAYOUT_FRAGMENT } from '../../fragments/collections';

export default gql`
  ${LAYOUT_FRAGMENT}
  query LayoutsQuery($id: ID!, $brandIdentifier: String!, $locale: I18NLocaleCode!) {
    layout: layouts(
      filters: { brand: { identifier: { eq: $brandIdentifier } }, id: { eq: $id } }
      locale: $locale
    ) {
      data {
        attributes {
          ...layoutFragment
        }
      }
    }
  }
`;
