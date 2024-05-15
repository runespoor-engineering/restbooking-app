import { useContext, useEffect } from 'react';

import { UserContext } from '../../../../context/UserContext/UserContext';

const FORM_TYPES_WITH_PLYER_DATA_VALUES = ['profile', 'verifyEmail'];
const usePlayerDataFormValues = (formType, formFields, setValue) => {
  const { data } = useContext(UserContext) || {};
  const player = data?.player;

  useEffect(() => {
    if (player && FORM_TYPES_WITH_PLYER_DATA_VALUES.includes(formType)) {
      formFields.forEach(({ name }) => {
        setValue(name, player[name], { shouldValidate: false });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields, formType, player]); // WARN! You will get the infinity loop if you add the setValue to the hook deps
};

export default usePlayerDataFormValues;
