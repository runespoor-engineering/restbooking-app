import { useMutation } from '@apollo/client';
import { useContext } from 'react';

import ConfigContext from '../../../../context/ConfigContext';
import { PLAYER_EMAIL_EXISTS_MUTATION } from '../graphql';

const usePlayerEmailExistsMutation = (email) => {
  const { bmsPartnerId } = useContext(ConfigContext);

  const [mutate, mutationResult] = useMutation(PLAYER_EMAIL_EXISTS_MUTATION, {
    variables: {
      bmsPartnerId,
      input: {
        email
      }
    }
  });

  return [mutate, mutationResult];
};

export default usePlayerEmailExistsMutation;
