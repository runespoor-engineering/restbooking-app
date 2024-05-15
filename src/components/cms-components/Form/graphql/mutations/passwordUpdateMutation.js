import { gql } from '@apollo/client';

const PASSWORD_UPDATE_MUTATION = gql`
  mutation PasswordUpdateMutation($bmsPartnerId: Int!, $input: PasswordUpdateInput!) {
    passwordUpdate(bmsPartnerId: $bmsPartnerId, input: $input) {
      recordId
      status
      problems {
        message
        problemCode
      }
    }
  }
`;

export default PASSWORD_UPDATE_MUTATION;
