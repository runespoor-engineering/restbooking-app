import { gql } from '@apollo/client';

export default gql`
  fragment playerAccountMenuButtonComponentFragment on ComponentUserAccountUserAccountMenuButton {
    id
    useBreakpoint {
      ...useBreakpointComponentFragment
    }
    buttonConfig {
      ...specialtyButtonComponentFragment
    }
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
