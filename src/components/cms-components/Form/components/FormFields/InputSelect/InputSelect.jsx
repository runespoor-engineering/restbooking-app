import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { string } from 'prop-types';
import { useContext, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  formFieldColorType,
  formFieldDataType,
  formFieldVariantType
} from '../../../../../../types';
import selectSettings from '../../../../../../utils/componentSettings/selectSettings';
import { FormConfigContext } from '../../../context';
import { usePendingForValueFieldOptions } from '../../../hooks';
import { forceLabelShrink, readOnlyFieldLabelShrink } from '../../../utils';

const COUNTRIES_DIVIDER = '...';
const InputSelect = ({ fieldData, variant, className }) => {
  const {
    label,
    name,
    readonly,
    required,
    inputmode,
    identifier,
    disabled,
    options,
    muiHelperText,
    autocomplete,
    title,
    settings
  } = fieldData;
  const { inputLabelProps, selectProps, formHelperTextProps } = selectSettings(settings);
  const {
    control,
    register,
    getValues,
    formState: { errors, touchedFields }
  } = useFormContext();
  const { ref: refRegister, ...restRegister } = register(name);

  const { isFormDisabled, isFormReadOnly, formType, handleCloseAlert } =
    useContext(FormConfigContext);
  const [pendingForValue, pendingForValueFieldOptions] = usePendingForValueFieldOptions(formType);
  const { disabled: pendingDisabledState, shrink: pendingShrinkState } =
    pendingForValueFieldOptions;

  const [inputOptions] = useState(options || []);

  const InputOptions = useMemo(() => {
    if (name === 'countryId') {
      const filteredCountries = inputOptions?.filter((country) => {
        return !options?.some((optionCountry) => country.iso === optionCountry?.iso);
      });
      return (
        <>
          {options?.map(({ label: optionLabel, value }) => (
            <option key={optionLabel} value={value}>
              {optionLabel}
            </option>
          ))}
          {Boolean(options?.length) && <option disabled>{COUNTRIES_DIVIDER}</option>}
          {filteredCountries?.map(({ label: optionLabel, value }) => (
            <option key={optionLabel} value={value}>
              {optionLabel}
            </option>
          ))}
        </>
      );
    }
    return inputOptions.map(({ label: optionLabel, value, defaultOption }) => (
      <option key={optionLabel} selected={defaultOption} value={value}>
        {optionLabel}
      </option>
    ));
  }, [inputOptions, name, options]);

  return (
    <FormControl
      className={className}
      error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
      required={required}
      variant={variant || 'outlined'}
    >
      <InputLabel
        htmlFor={`{${identifier}-label}`}
        shrink={
          pendingForValue
            ? pendingShrinkState
            : forceLabelShrink(getValues(name), {
                isFormReadOnly,
                isFormDisabled,
                readonly,
                disabled
              }) || readOnlyFieldLabelShrink({ isFormReadOnly, readonly })
        }
        {...inputLabelProps}
      >
        {label}
      </InputLabel>
      <Controller
        control={control}
        data-testid="input-select"
        defaultValue=""
        inputRef={refRegister}
        name={name}
        {...restRegister}
        render={({ field }) => (
          <Select
            {...field}
            native
            id={identifier}
            inputProps={{
              id: `{${identifier}-label}`,
              disabled: pendingForValue
                ? pendingDisabledState
                : isFormReadOnly || isFormDisabled || readonly || disabled,
              title,
              autocomplete,
              inputMode: inputmode
            }}
            label={label}
            name={name}
            onChange={(e) => {
              handleCloseAlert?.();
              field.onChange(e);
            }}
            {...selectProps}
          >
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option disabled selected value="" />
              {InputOptions}
            </>
          </Select>
        )}
      />
      {((!isFormReadOnly && !readonly && errors[name]?.message) || muiHelperText) && (
        <FormHelperText error={!!touchedFields[name]} {...formHelperTextProps}>
          {errors[name]?.message || muiHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

InputSelect.propTypes = {
  fieldData: formFieldDataType.isRequired,
  variant: formFieldVariantType,
  color: formFieldColorType,
  className: string
};

InputSelect.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  className: undefined
};

export default InputSelect;
