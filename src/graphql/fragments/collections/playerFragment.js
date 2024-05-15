import { gql } from '@apollo/client';

export default gql`
  fragment playerFragment on UsersPermissionsMe {
    id
    username
    email
    confirmed
  }
`;
