import { gql } from '@apollo/client';

export default gql`
  fragment specialtyLinkButtonComponentFragment on ComponentButtonsSpecialtyLinkButton {
    id
    isMuiIconButton
    muiButtonText
    muiButtonLink
    muiIconButtonIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    muiButtonStartIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    muiButtonEndIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    settings {
      ...settingsJsonComponentFragment
    }
  }
`;
