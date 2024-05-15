import { gql } from '@apollo/client';

const PLAYER_REGISTER_MUTATION = gql`
  mutation PlayerRegister($bmsPartnerId: Int!, $input: PlayerRegisterInput!, $locale: Locale!) {
    playerRegister(bmsPartnerId: $bmsPartnerId, input: $input, locale: $locale) {
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

export default PLAYER_REGISTER_MUTATION;
