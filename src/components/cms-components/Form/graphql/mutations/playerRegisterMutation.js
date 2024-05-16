import { gql } from '@apollo/client';

const PLAYER_REGISTER_MUTATION = gql`
  mutation PlayerRegister($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default PLAYER_REGISTER_MUTATION;
