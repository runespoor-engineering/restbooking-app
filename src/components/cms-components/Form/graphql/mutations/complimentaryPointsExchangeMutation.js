import { gql } from '@apollo/client';

export default gql`
  mutation ComplimentaryPointsExchangeMutation(
    $bmsPartnerId: Int!
    $input: ComplimentaryPointsExchangeInput!
  ) {
    complimentaryPointsExchange(bmsPartnerId: $bmsPartnerId, input: $input) {
      status
      problems {
        message
        problemCode
      }
    }
  }
`;
