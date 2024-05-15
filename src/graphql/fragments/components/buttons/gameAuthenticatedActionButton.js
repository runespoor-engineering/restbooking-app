import { gql } from '@apollo/client';

export default gql`
  fragment gameAuthenticatedActionButtonComponentFragment on ComponentButtonsGameAuthenticatedActionButton {
    id
    isMuiIconButton
    muiButtonText
    muiButtonAuthenticatedAction: muiButtonAction
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
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
    useBreakpoint {
      ...useBreakpointComponentFragment
    }
  }
`;
