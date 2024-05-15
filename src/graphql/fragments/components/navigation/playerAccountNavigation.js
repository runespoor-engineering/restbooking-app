import { gql } from '@apollo/client';

export default gql`
  fragment playerAccountNaviagtionComponentFragment on ComponentNavigationsPlayerAccountNavigation {
    menuType
    useTopLevelNavigation
    componentGridItemSettings {
      ...settingsJsonComponentFragment
    }
    settings {
      ...settingsJsonComponentFragment
    }
  }
`;
