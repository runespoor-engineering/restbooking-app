import { gql } from '@apollo/client';

export default gql`
  fragment templateApartmentPreviewFragment on TemplateApartmentPreview {
    componentsGridContainerSettings {
      ...settingsJsonComponentFragment
    }
    apartmentThumbnailType
    uiComponents {
      ...apartmentTitlePlaceholderComponentFragment
      ...apartmentAnonymousActionButtonComponentFragment
      ...apartmentAuthenticatedActionButtonComponentFragment
    }
  }
`;
