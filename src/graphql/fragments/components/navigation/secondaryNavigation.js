import { gql } from '@apollo/client';

export default gql`
  fragment secondaryNavigationComponentFragment on ComponentNavigationsSecondaryNavigation {
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
  }
`;
