import { gql } from '@apollo/client';

export default gql`
  fragment themeSwitcherComponentFragment on ComponentPageComponentsThemeSwitcher {
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
