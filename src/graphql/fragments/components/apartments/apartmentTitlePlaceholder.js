import { gql } from '@apollo/client';

export default gql`
  fragment apartmentTitlePlaceholderComponentFragment on ComponentApartmentApartmentTitlePlaceholder {
    id
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
