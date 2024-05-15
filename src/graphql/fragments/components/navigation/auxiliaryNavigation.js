import { gql } from '@apollo/client';

export default gql`
  fragment auxiliaryNavigationComponentFragment on ComponentNavigationsAuxiliaryNavigation {
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
