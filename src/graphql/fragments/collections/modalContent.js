import { gql } from '@apollo/client';

export const MODAL_CONTENT_FRAGMENT = gql`
  fragment modalContentFragment on ModalContent {
    name
    modalSettings {
      ...settingsJsonComponentFragment
    }
    backdropImage {
      data {
        attributes {
          ...imageFragment
        }
      }
    }
    backgroundCoverImage {
      ...coverImageComponentFragment
    }
    uiComponents {
      ...richTextComponentFragment
      ...formComponentFragment
      ...bannersSliderComponentFragment
      ...globalGenericActionButtonComponentFragment
      ...iframeComponentFragment
    }
    componentsGridContainerSettings {
      ...settingsJsonComponentFragment
    }
    useSaveHistoryOnClose
  }
`;
