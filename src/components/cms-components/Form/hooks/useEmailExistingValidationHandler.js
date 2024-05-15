import debounce from 'lodash/debounce';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import usePlayerEmailExistsMutation from './usePlayerEmailExistsMutation';

const useEmailExistingValidationHandler = (userName, setError) => {
  const { t } = useTranslation();
  const [playerEmailExistsMutate] = usePlayerEmailExistsMutation(userName);

  const checkPlayerEmailExist = async () => {
    const response = await playerEmailExistsMutate();
    if (response?.data?.playerEmailExists?.record?.isEmailExists) {
      setError('email', { type: 'custom', message: t('This email already exists') });
    }
  };

  const debouncedPlayerEmailExistCheck = useRef(debounce(checkPlayerEmailExist, 500)).current;

  return debouncedPlayerEmailExistCheck;
};

export default useEmailExistingValidationHandler;
