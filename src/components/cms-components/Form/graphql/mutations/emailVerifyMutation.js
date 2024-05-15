import { gql } from '@apollo/client';

export default gql`
  mutation EmailVerify($bmsPartnerId: Int!, $input: EmailVerifyInput!) {
    emailVerify(bmsPartnerId: $bmsPartnerId, input: $input) {
      recordId
      status
      problems {
        message
        problemCode
      }
    }
  }
`;
