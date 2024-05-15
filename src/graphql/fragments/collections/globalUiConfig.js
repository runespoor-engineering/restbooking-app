import { gql } from '@apollo/client';

export default gql`
  fragment globalUiConfigFragment on GlobalUiConfig {
    theme {
      ...themeComponentFragment
    }
    useSaveModalHistory
    defaultLayout {
      data {
        id
      }
    }
  }
`;
