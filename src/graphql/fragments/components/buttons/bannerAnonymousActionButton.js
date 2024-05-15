import { gql } from '@apollo/client';

export default gql`
  fragment bannerAnonymousActionButtonComponentFragment on ComponentButtonsBannerAnonymousActionButton {
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
