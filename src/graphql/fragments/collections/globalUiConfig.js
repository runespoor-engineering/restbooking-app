import { gql } from '@apollo/client';

export default gql`
  fragment globalUiConfigFragment on GlobalUiConfig {
    gameThumbnailType
    theme {
      ...themeComponentFragment
    }
    progressAnimation {
      ...progressAnimationComponentFragment
    }
    useSaveModalHistory
    defaultTemplateGamePreview {
      data {
        id
      }
    }
    defaultLayout {
      data {
        id
      }
    }
  }
`;
