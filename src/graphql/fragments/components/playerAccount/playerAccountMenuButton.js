import { gql } from '@apollo/client';

export default gql`
  fragment playerAccountMenuButtonComponentFragment on ComponentPlayerAccountPlayerAccountMenuButton {
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
