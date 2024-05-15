import { gql } from '@apollo/client';

export default gql`
  fragment faqCategoryFragment on FaqCategory {
    title
    icon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    faqs {
      faq {
        data {
          id
          attributes {
            ...faqFragment
          }
        }
      }
    }
  }
`;
