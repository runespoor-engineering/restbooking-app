import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { string } from 'prop-types';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  formFieldColorType,
  formFieldDataType,
  formFieldVariantType
} from '../../../../../../types';
import selectSettings from '../../../../../../utils/componentSettings/selectSettings';
import isMobile from '../../../../../../utils/deviceDetection/isMobile';
import { FormConfigContext } from '../../../context';
import { usePendingForValueFieldOptions } from '../../../hooks';
import { forceLabelShrink, readOnlyFieldLabelShrink } from '../../../utils';
import getValidationDate from '../../../utils/utils';

const localeFormatMap = {
  en: 'MMMM d, yyyy',
  ru: 'd MMM yyyy'
};

const InputDate = ({ fieldData, variant, color, className }) => {
  const {
    label,
    name,
    identifier,
    readonly,
    inputmode,
    disabled,
    muiHelperText,
    autocomplete,
    title,
    max,
    min,
    placeholder,
    required,
    settings
  } = fieldData;
  const { datePickerProps, textFieldProps, formHelperTextProps } = selectSettings(settings);
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors, touchedFields },
    setValue,
    watch
  } = useFormContext();
  const { ref: refRegister, onBlur, ...restRegister } = register(name);
  const { isFormDisabled, isFormReadOnly, formType, handleCloseAlert } =
    useContext(FormConfigContext);
  const [pendingForValue, pendingForValueFieldOptions] = usePendingForValueFieldOptions(formType);
  const { disabled: pendingDisabledState, shrink: pendingShrinkState } =
    pendingForValueFieldOptions;

  const value = watch(name);
  const router = useRouter();
  const { t } = useTranslation();

  const DatePickerComponent = isMobile() ? MobileDatePicker : DesktopDatePicker;

  return (
    <FormControl
      className={className}
      error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
      required={required}
      sx={{ width: '100%' }}
    >
      <Controller
        control={control}
        data-testid="input-material-picker"
        inputRef={refRegister}
        name={name}
        {...restRegister}
        render={({ field }) => (
          <DatePickerComponent
            cancelLabel={t('Cancel')}
            format={localeFormatMap[router.locale]}
            margin="normal"
            openTo="year"
            renderInput={(params) => (
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
                  autoComplete: autocomplete,
                  id: identifier,
                  inputProps: {
                    inputMode: inputmode,
                    title
                  }
                }}
                required={required}
                variant={variant || 'outlined'}
                onBlur={() => {
                  setValue(name, value, { shouldTouch: true });
                  trigger(name);
                }}
                onChange={() => {
                  handleCloseAlert?.();
                }}
                {...params}
                {...textFieldProps}
                error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
              />
            )}
            variant="dialog"
            views={['year', 'month', 'day']}
            {...field}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            color={color}
            disabled={pendingForValue ? pendingDisabledState : isFormDisabled || disabled}
            label={label}
            maxDate={new Date(getValidationDate(min))}
            minDate={new Date(getValidationDate(max))}
            readOnly={isFormReadOnly || readonly}
            sx={{ width: '100%' }}
            toolbarPlaceholder={placeholder}
            value={value || null}
            {...datePickerProps}
          />
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

InputDate.propTypes = {
  fieldData: formFieldDataType.isRequired,
  variant: formFieldVariantType,
  color: formFieldColorType,
  className: string
};

InputDate.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  className: undefined
};

export default InputDate;
