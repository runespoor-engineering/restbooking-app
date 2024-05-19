import { gql } from '@apollo/client';

import { IMAGE_FRAGMENT } from '../../fragments/common';
import { COVER_IMAGE_COMPONENT_FRAGMENT } from '../../fragments/components';

export default gql`
  ${IMAGE_FRAGMENT}
  ${COVER_IMAGE_COMPONENT_FRAGMENT}
  query ApartmentQuery($slug: String!, $brandIdentifier: String!, $locale: I18NLocaleCode!) {
    apartment: apartments(
      filters: { brand: { identifier: { eq: $brandIdentifier } }, slug: { eq: $slug } }
      locale: $locale
    ) {
      data {
        id
        attributes {
          title
          shortDescription
          longDescription
          coverImage {
            ...coverImageComponentFragment
          }
          price
          slug
        }
      }
    }
  }
`;
