import { gql } from '@apollo/client';

const PASSWORD_SEND_RECOVERY_TOKEN_BY_EMAIL_MUTATION = gql`
  mutation PasswordSendRecoveryTokenByEmailMutation(
    $bmsPartnerId: Int!
    $locale: Locale!
    $input: PasswordSendRecoveryTokenByEmailInput!
  ) {
    passwordSendRecoveryTokenByEmail(bmsPartnerId: $bmsPartnerId, input: $input, locale: $locale) {
      recordId
      status
      problems {
        message
        problemCode
      }
    }
  }
`;

export default PASSWORD_SEND_RECOVERY_TOKEN_BY_EMAIL_MUTATION;
