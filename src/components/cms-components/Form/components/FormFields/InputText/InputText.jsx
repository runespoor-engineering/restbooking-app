import TextField from '@mui/material/TextField';
import { shape, string } from 'prop-types';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  formFieldColorType,
  formFieldDataType,
  formFieldVariantType
} from '../../../../../../types';
import selectSettings from '../../../../../../utils/componentSettings/selectSettings';
import { FormConfigContext } from '../../../context';
import { usePendingForValueFieldOptions } from '../../../hooks';
import { forceLabelShrink, readOnlyFieldLabelShrink } from '../../../utils';

const InputText = ({ fieldData, variant, color, className }) => {
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
    settings
  } = fieldData;
  const selectedSettings = selectSettings(settings);
  const {
    register,
    trigger,
    getValues,
    formState: { errors, touchedFields }
  } = useFormContext();
  const { ref: refRegister, onBlur: onBlurFn, ...restRegister } = register(name);
  const { isFormDisabled, isFormReadOnly, formType, handleCloseAlert } =
    useContext(FormConfigContext);
  const [pendingForValue, pendingForValueFieldOptions] = usePendingForValueFieldOptions(formType);
  const {
    placeholder: pendingPlaceholder,
    disabled: pendingDisabledState,
    shrink: pendingShrinkState
  } = pendingForValueFieldOptions;

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
          title,
          inputMode: inputmode
        }
      }}
      className={className}
      data-testid="input-text"
      disabled={pendingForValue ? pendingDisabledState : isFormDisabled || disabled}
      error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
      inputRef={refRegister}
      label={label}
      name={name}
      placeholder={pendingForValue ? pendingPlaceholder : placeholder}
      required={required}
      type="text"
      {...restRegister}
      color={color || 'primary'}
      helperText={(!isFormReadOnly && !readonly && errors[name]?.message) || muiHelperText}
      variant={variant || 'outlined'}
      onBlur={(event) => {
        onBlurFn(event);
      }}
      onKeyUp={() => {
        handleCloseAlert?.();
        if (errors[name]) {
          trigger(name);
        }
      }}
      {...selectedSettings?.textFieldProps}
    />
  );
};

InputText.propTypes = {
  fieldData: formFieldDataType.isRequired,
  variant: formFieldVariantType,
  color: formFieldColorType,
  className: string,
  settings: shape()
};

InputText.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  className: undefined,
  settings: null
};

export default InputText;
