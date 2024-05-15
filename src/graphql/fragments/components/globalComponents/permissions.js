import { gql } from '@apollo/client';

export default gql`
  fragment permissionsFragment on ComponentGlobalComponentsPermissions {
    id
    availableOnlyFor
    redirectUrl
  }
`;
