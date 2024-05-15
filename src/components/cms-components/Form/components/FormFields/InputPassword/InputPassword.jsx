import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { string } from 'prop-types';
import { useContext, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  formFieldColorType,
  formFieldDataType,
  formFieldVariantType
} from '../../../../../../types';
import selectSettings from '../../../../../../utils/componentSettings/selectSettings';
import { FormConfigContext } from '../../../context';
import { usePendingForValueFieldOptions } from '../../../hooks';
import { forceLabelShrink, getPasswordFieldType, readOnlyFieldLabelShrink } from '../../../utils';

const InputPassword = ({ fieldData, className, variant, color }) => {
  const {
    label,
    name,
    identifier,
    placeholder,
    required,
    readonly,
    inputmode,
    disabled,
    muiHelperText,
    autocomplete,
    title,
    muiInputAdornmentVisibility,
    settings
  } = fieldData;
  const { textFieldProps } = selectSettings(settings);
  const {
    register,
    trigger,
    getValues,
    formState: { errors, touchedFields }
  } = useFormContext();
  const { ref: refRegister, ...restRegister } = register(name);
  const { isFormDisabled, isFormReadOnly, formType, handleCloseAlert } =
    useContext(FormConfigContext);
  const [pendingForValue, pendingForValueFieldOptions] = usePendingForValueFieldOptions(formType);
  const [isPasswordHidden, setIsPasswordHidden] = useState(muiInputAdornmentVisibility);
  const {
    placeholder: pendingPlaceholder,
    disabled: pendingDisabledState,
    shrink: pendingShrinkState
  } = pendingForValueFieldOptions;
  const passwordFiledType = useMemo(
    () => getPasswordFieldType(muiInputAdornmentVisibility, isPasswordHidden),
    [isPasswordHidden, muiInputAdornmentVisibility]
  );
  const handleEndAdornmentClick = () => {
    setIsPasswordHidden((currentState) => !currentState);
  };

  return (
    <TextField
      InputLabelProps={{
        shrink: pendingForValue
          ? pendingShrinkState
          : forceLabelShrink(getValues(name), {
              isFormReadOnly,
              isFormDisabled,
              readonly,
              disabled
            }) || readOnlyFieldLabelShrink({ isFormReadOnly, readonly })
      }}
      InputProps={{
        readOnly: isFormReadOnly || readonly,
        autoComplete: autocomplete,
        id: identifier,
        inputProps: {
          inputMode: inputmode,
          title
        },
        endAdornment: muiInputAdornmentVisibility ? (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleEndAdornmentClick}>
              {isPasswordHidden ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null
      }}
      className={className}
      data-testid="input-password"
      disabled={pendingForValue ? pendingDisabledState : isFormDisabled || disabled}
      error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
      inputRef={refRegister}
      label={label}
      name={name}
      placeholder={pendingForValue ? pendingPlaceholder : placeholder}
      required={required}
      type={passwordFiledType}
      {...restRegister}
      color={color || 'primary'}
      helperText={(!isFormReadOnly && !readonly && errors[name]?.message) || muiHelperText}
      variant={variant || 'outlined'}
      onKeyUp={() => {
        if (errors[name]) {
          trigger(name);
        }
        handleCloseAlert?.();
      }}
      {...textFieldProps}
    />
  );
};

InputPassword.propTypes = {
  fieldData: formFieldDataType.isRequired,
  variant: formFieldVariantType,
  color: formFieldColorType,
  className: string
};

InputPassword.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  className: undefined
};

export default InputPassword;
