import { gql } from '@apollo/client';

export default gql`
  query Regions($bmsPartnerId: Int!, $countryId: Int!, $locale: Locale!) {
    regions(bmsPartnerId: $bmsPartnerId, countryId: $countryId, locale: $locale) {
      name
      id
    }
  }
`;
