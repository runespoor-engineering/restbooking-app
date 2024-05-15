const getPasswordFieldType = (muiInputAdornmentVisibility, isPasswordHidden) => {
  if (muiInputAdornmentVisibility) {
    return isPasswordHidden ? 'password' : 'text';
  }
  return 'password';
};

export default getPasswordFieldType;
