import { gql } from '@apollo/client';

export default gql`
  query Countries($bmsPartnerId: Int!, $locale: Locale!) {
    countries(bmsPartnerId: $bmsPartnerId, locale: $locale) {
      id
      name
      iso
    }
  }
`;
