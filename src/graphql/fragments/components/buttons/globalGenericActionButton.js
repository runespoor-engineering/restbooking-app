import { gql } from '@apollo/client';

export default gql`
  fragment globalGenericActionButtonComponentFragment on ComponentButtonsGlobalGenericActionButton {
    id
    isMuiIconButton
    muiButtonText
    muiButtonAction
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
