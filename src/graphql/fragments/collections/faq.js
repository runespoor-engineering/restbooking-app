import { gql } from '@apollo/client';

export default gql`
  fragment faqFragment on Faq {
    summary
    details
    summaryIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
  }
`;
