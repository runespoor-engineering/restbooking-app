import { gql } from '@apollo/client';

export default gql`
  fragment playerAccountNaviagtionComponentFragment on ComponentNavigationsUserAccountNavigation {
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
