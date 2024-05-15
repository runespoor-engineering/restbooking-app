import { gql } from '@apollo/client';

export default gql`
  fragment specialtyButtonComponentFragment on ComponentButtonsSpecialtyButton {
    id
    isMuiIconButton
    muiButtonText
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
