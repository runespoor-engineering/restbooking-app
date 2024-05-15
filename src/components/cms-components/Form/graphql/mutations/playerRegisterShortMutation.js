import { gql } from '@apollo/client';

const PLAYER_REGISTER_SHORT_MUTATION = gql`
  mutation PlayerRegisterShort(
    $bmsPartnerId: Int!
    $input: PlayerRegisterShortInput!
    $locale: Locale!
  ) {
    playerRegisterShort(bmsPartnerId: $bmsPartnerId, input: $input, locale: $locale) {
      problems {
        message
        problemCode
      }
      record {
        sessionToken
        userName
        id
        email
      }
      status
    }
  }
`;

export default PLAYER_REGISTER_SHORT_MUTATION;
