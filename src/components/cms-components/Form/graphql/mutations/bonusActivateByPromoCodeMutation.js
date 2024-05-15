import { gql } from '@apollo/client';

export default gql`
  mutation BonusActivateByPromoCodeMutation(
    $bmsPartnerId: Int!
    $input: BonusActivateByPromoCodeInput!
  ) {
    bonusActivateByPromoCode(bmsPartnerId: $bmsPartnerId, input: $input) {
      recordId
      status
      problems {
        message
        problemCode
      }
    }
  }
`;
