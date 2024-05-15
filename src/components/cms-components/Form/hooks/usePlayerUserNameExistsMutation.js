import { useMutation } from '@apollo/client';
import { useContext } from 'react';

import ConfigContext from '../../../../context/ConfigContext';
import { PLAYER_USER_NAME_EXISTS_MUTATION } from '../graphql';

const usePlayerUserNameExistsMutation = (userName) => {
  const { bmsPartnerId } = useContext(ConfigContext);

  const [mutate, mutationResult] = useMutation(PLAYER_USER_NAME_EXISTS_MUTATION, {
    variables: {
      bmsPartnerId,
      input: {
        userName
      }
    }
  });

  return [mutate, mutationResult];
};

export default usePlayerUserNameExistsMutation;
