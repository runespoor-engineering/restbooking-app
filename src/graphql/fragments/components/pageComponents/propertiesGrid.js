import { gql } from '@apollo/client';

export default gql`
  fragment propertiesGridComponentFragment on ComponentPageComponentsPropertiesGrid {
    id
    title
    properties {
      name
      value
      settings {
        ...settingsJsonComponentFragment
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
