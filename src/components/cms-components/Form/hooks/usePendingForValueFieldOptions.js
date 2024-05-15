import { useContext, useEffect, useMemo, useState } from 'react';

import { UserContext } from '../../../../context/UserContext/UserContext';

const PENDING_FOR_VALUE_FIELD_OPTIONS = {
  placeholder: '...',
  disabled: true,
  shrink: true
};

const isFormPendingByDefault = (dynamicFormTypes, formType) => dynamicFormTypes.includes(formType);

const usePendingForValueFieldOptions = (formType) => {
  const { loading: playerLoading } = useContext(UserContext);

  const formTypeLoadingMap = useMemo(
    () => ({
      profile: playerLoading,
      verifyEmail: playerLoading
    }),
    [playerLoading]
  );

  const [pending, setPending] = useState(
    isFormPendingByDefault(Object.keys(formTypeLoadingMap), formType)
  );

  useEffect(() => {
    setPending(formTypeLoadingMap[formType] || false);
  }, [formType, formTypeLoadingMap]);

  return [pending, PENDING_FOR_VALUE_FIELD_OPTIONS];
};

export default usePendingForValueFieldOptions;
