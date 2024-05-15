import { gql } from '@apollo/client';

import { PLAYER_FRAGMENT } from '../../../../graphql/fragments/collections';

export default gql`
  ${PLAYER_FRAGMENT}
  query Player {
    me {
      ...playerFragment
    }
  }
`;
