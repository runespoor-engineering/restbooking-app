import { gql } from '@apollo/client';

export default gql`
  fragment iframeComponentFragment on ComponentPageComponentsIframe {
    iframeTitle
    src
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
    settings {
      ...settingsJsonComponentFragment
    }
  }
`;
