import { gql } from '@apollo/client';

const PLAYER_LOGIN_MUTATION = gql`
  mutation PlayerLogin($bmsPartnerId: Int!, $input: PlayerLoginInput!, $locale: Locale!) {
    playerLogin(bmsPartnerId: $bmsPartnerId, input: $input, locale: $locale) {
      problems {
        message
        problemCode
      }
      record {
        email
        sessionToken
        userName
      }
      status
    }
  }
`;

export default PLAYER_LOGIN_MUTATION;
