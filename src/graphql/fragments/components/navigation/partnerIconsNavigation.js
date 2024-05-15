import { gql } from '@apollo/client';

export default gql`
  fragment partnerIconsNavigationComponentFragment on ComponentNavigationsPartnerIconsNavigation {
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
