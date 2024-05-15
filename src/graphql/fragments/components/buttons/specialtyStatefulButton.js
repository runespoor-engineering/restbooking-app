import { gql } from '@apollo/client';

export default gql`
  fragment specialtyStatefulButtonComponentFragment on ComponentButtonsSpecialtyStatefulButton {
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
    muiButtonUseActiveState
    muiButtonTextActive
    muiIconButtonIconActive {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    muiButtonStartIconActive {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    muiButtonEndIconActive {
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
