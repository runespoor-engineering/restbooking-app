import { gql } from '@apollo/client';

export default gql`
  fragment globalAuthenticatedActionButtonComponentFragment on ComponentButtonsGlobalAuthenticatedActionButton {
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
