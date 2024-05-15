import { gql } from '@apollo/client';

export default gql`
  fragment breadcrumbsComponentFragment on ComponentPageComponentsBreadcrumbs {
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
