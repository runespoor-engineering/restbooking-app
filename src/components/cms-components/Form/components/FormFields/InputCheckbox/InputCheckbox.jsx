import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { string } from 'prop-types';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  formFieldColorType,
  formFieldDataType,
  formFieldVariantType
} from '../../../../../../types';
import selectSettings from '../../../../../../utils/componentSettings/selectSettings';
import RichText from '../../../../../common/RichText';
import { FormConfigContext } from '../../../context';
import { usePendingForValueFieldOptions } from '../../../hooks';

const CheckboxInput = ({ fieldData, color }) => {
  const {
    label,
    required,
    name,
    identifier,
    readonly,
    disabled,
    muiHelperText,
    inputmode,
    autocomplete,
    title,
    checked,
    settings
  } = fieldData;
  const { checkboxProps } = selectSettings(settings) || {};
  const {
    register,
    trigger,
    control,
    formState: { errors }
  } = useFormContext();
  const { ref: refRegister, ...restRegister } = register(name);
  const { isFormDisabled, isFormReadOnly, formType, handleCloseAlert } =
    useContext(FormConfigContext);
  const [pendingForValue, pendingForValueFieldOptions] = usePendingForValueFieldOptions(formType);
  const { disabled: pendingDisabledState } = pendingForValueFieldOptions;

  return (
    <FormControl error={!!errors[name]} required={required}>
      <FormGroup>
        <Controller
          control={control}
          data-testid="input-checkbox"
          inputRef={refRegister}
          name={name}
          {...restRegister}
          defaultValue={checked}
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  color={color || 'primary'}
                  defaultValue={false}
                  inputProps={{
                    disabled: pendingForValue
                      ? pendingDisabledState
                      : isFormReadOnly || isFormDisabled || readonly || disabled,
                    autocomplete,
                    inputMode: inputmode,
                    title,
                    id: identifier
                  }}
                  name={name}
                  required={required}
                  onChange={(e) => {
                    if (errors[name]) {
                      trigger(name);
                    }
                    handleCloseAlert?.();
                    onChange(e);
                  }}
                  {...checkboxProps}
                />
              }
              error={!isFormReadOnly && !readonly && !!errors[name]}
              label={<RichText markdown={label} />}
            />
          )}
        />
      </FormGroup>
      {(errors[name] || muiHelperText) && (
        <FormHelperText>{errors[name]?.message || muiHelperText}</FormHelperText>
      )}
    </FormControl>
  );
};

CheckboxInput.propTypes = {
  fieldData: formFieldDataType.isRequired,
  variant: formFieldVariantType,
  color: formFieldColorType,
  classname: string
};

CheckboxInput.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  classname: undefined
};

export default CheckboxInput;
