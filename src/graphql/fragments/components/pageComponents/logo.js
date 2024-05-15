import { gql } from '@apollo/client';

export default gql`
  fragment logoComponentFragment on ComponentPageComponentsLogo {
    id
    logoSizeSwitchingBreakpoint
    useBreakpoint {
      ...useBreakpointComponentFragment
    }
    lightLarge {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    lightSmall {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    darkLarge {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    darkSmall {
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
    smallImageDimensions {
      ...imageDimensionsComponentFragment
    }
    largeImageDimensions {
      ...imageDimensionsComponentFragment
    }
  }
`;
