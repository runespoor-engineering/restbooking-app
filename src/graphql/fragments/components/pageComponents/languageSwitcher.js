import { gql } from '@apollo/client';

export default gql`
  fragment languageSwitcherComponentFragment on ComponentPageComponentsLanguageSwitcher {
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
