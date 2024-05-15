import { gql } from '@apollo/client';

export default gql`
  fragment richTextComponentFragment on ComponentPageComponentsRichText {
    id
    content
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
  }
`;
