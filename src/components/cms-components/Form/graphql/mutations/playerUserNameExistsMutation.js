import { gql } from '@apollo/client';

const PLAYER_USER_NAME_EXISTS_MUTATION = gql`
  mutation PlayerUserNameExists($bmsPartnerId: Int!, $input: PlayerUserNameExistsInput!) {
    playerUserNameExists(bmsPartnerId: $bmsPartnerId, input: $input) {
      problems {
        message
        problemCode
      }
      record {
        isUserNameExists
      }
      status
    }
  }
`;

export default PLAYER_USER_NAME_EXISTS_MUTATION;
