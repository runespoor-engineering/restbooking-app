import { useEffect } from 'react';

// This hook is used to watch 'password' and 'newPassword' field changes
// If 'password' and 'newPassword' field has changed - 'confirmPassword' field gets triggered and revalidated

const usePasswordConfirmationValidation = (formMethods) => {
  const passwordField = formMethods.watch('password');
  const newPasswordField = formMethods.watch('newPassword');
  const confirmPassword = formMethods.watch('confirmPassword');
  useEffect(() => {
    if (confirmPassword) formMethods.trigger(['confirmPassword']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordField, newPasswordField]); // WARN! You will get the infinity loop if you add the formMethods to the hook deps
};

export default usePasswordConfirmationValidation;
