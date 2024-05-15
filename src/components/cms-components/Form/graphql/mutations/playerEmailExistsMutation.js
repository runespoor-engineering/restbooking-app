import { gql } from '@apollo/client';

const PLAYER_EMAIL_EXISTS_MUTATION = gql`
  mutation PlayerEmailExists($bmsPartnerId: Int!, $input: PlayerEmailExistsInput!) {
    playerEmailExists(bmsPartnerId: $bmsPartnerId, input: $input) {
      problems {
        message
        problemCode
      }
      record {
        isEmailExists
      }
      status
    }
  }
`;

export default PLAYER_EMAIL_EXISTS_MUTATION;
