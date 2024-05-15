import { gql } from '@apollo/client';

export default gql`
  fragment primaryNavigationComponentFragment on ComponentNavigationsPrimaryNavigation {
    id
    useBreakpoint {
      ...useBreakpointComponentFragment
    }
    settings {
      ...settingsJsonComponentFragment
    }
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
    expandIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    collapseIcon {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
  }
`;
