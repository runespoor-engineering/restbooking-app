import { gql } from '@apollo/client';

const PLAYER_LOGIN_MUTATION = gql`
  mutation PlayerLogin($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
    }
  }
`;

export default PLAYER_LOGIN_MUTATION;
