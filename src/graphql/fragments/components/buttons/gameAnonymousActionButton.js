import { gql } from '@apollo/client';

export default gql`
  fragment gameAnonymousActionButtonComponentFragment on ComponentButtonsGameAnonymousActionButton {
    id
    isMuiIconButton
    muiButtonText
    muiButtonAnonymousAction: muiButtonAction
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
