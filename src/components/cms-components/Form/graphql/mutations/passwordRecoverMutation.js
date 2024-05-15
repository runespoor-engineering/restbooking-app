import { gql } from '@apollo/client';

const PASSWORD_RECOVER_MUTATION = gql`
  mutation PasswordRecoverMutation(
    $bmsPartnerId: Int!
    $recoveryToken: String!
    $input: PasswordRecoverInput!
    $locale: Locale!
  ) {
    passwordRecover(
      bmsPartnerId: $bmsPartnerId
      recoveryToken: $recoveryToken
      input: $input
      locale: $locale
    ) {
      recordId
      status
      problems {
        message
        problemCode
      }
    }
  }
`;

export default PASSWORD_RECOVER_MUTATION;
