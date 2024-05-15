import debounce from 'lodash/debounce';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import usePlayerUserNameExistsMutation from './usePlayerUserNameExistsMutation';

const useUserNameExistingValidationHandler = (userName, setError) => {
  const { t } = useTranslation();
  const [playerUserNameExistsMutate] = usePlayerUserNameExistsMutation(userName);

  const checkPlayerUserName = async () => {
    const response = await playerUserNameExistsMutate();
    if (response?.data?.playerUserNameExists?.record?.isUserNameExists) {
      setError('username', { type: 'custom', message: t('This username already exists') });
    }
  };

  const debouncedPlayerUserNameExistCheck = useRef(debounce(checkPlayerUserName, 500)).current;

  return debouncedPlayerUserNameExistCheck;
};

export default useUserNameExistingValidationHandler;
