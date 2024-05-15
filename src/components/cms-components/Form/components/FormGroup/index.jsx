import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes, { string } from 'prop-types';
import { useMemo } from 'react';

import { formFieldColorType, formFieldDataType, formFieldVariantType } from '../../../../../types';
import {
  InputCheckbox,
  InputDate,
  InputEmail,
  InputFile,
  InputNumber,
  InputPassword,
  InputPhone,
  InputSelect,
  InputText
} from '../FormFields';
import { getFormGroupSettings } from './utils';

const defaultMapper = {
  inputText: InputText,
  inputDate: InputDate,
  inputEmail: InputEmail,
  inputTel: InputPhone,
  select: InputSelect,
  inputNumber: InputNumber,
  inputPassword: InputPassword,
  inputCheckbox: InputCheckbox,
  inputFile: InputFile
};

const FormField = ({ fieldData, variant, color, className }) => {
  const FieldComponent = defaultMapper[fieldData.kind];

  if (!FieldComponent) {
    return null;
  }

  return (
    <FieldComponent
      className={className}
      color={color}
      data-testid="form-field"
      fieldData={fieldData}
      variant={variant}
    />
  );
};

FormField.propTypes = {
  fieldData: formFieldDataType.isRequired,
  variant: formFieldVariantType,
  color: formFieldColorType,
  className: string
};

FormField.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  className: undefined
};

const StyledFormField = styled(FormField)(({ theme, styles }) => ({
  width: '100%',
  '& input': {
    backgroundColor: 'transparent'
  },
  '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
    {
      WebkitBoxShadow: `0 0 0 100px ${
        styles && styles[theme.palette.mode]?.autofillBackground
      } inset`
    }
}));

const FormGroup = ({ formGroup, fieldsVariant, fieldsColor, settings }) => {
  const { styles } = settings?.field || {};
  const { fieldsGridContainerProps, title, formFields } = formGroup;
  const { gridContainerProps, titleGridItemProps, titleTypographyProps, formFieldsGridItemProps } =
    getFormGroupSettings(settings);

  const usableFields = useMemo(
    () => formFields.filter((formField) => !!formField.useThisField),
    [formFields]
  );

  return (
    <Grid container spacing={1} {...gridContainerProps}>
      {title && (
        <Grid item {...titleGridItemProps}>
          <Typography {...titleTypographyProps}>{title}</Typography>
        </Grid>
      )}
      <Grid item {...formFieldsGridItemProps}>
        <Grid container spacing={2} {...fieldsGridContainerProps}>
          {usableFields.map((field) => {
            return (
              <Grid item xs={12} {...field.gridItemSettings} key={`${field.kind}${field.id}`}>
                <StyledFormField
                  color={fieldsColor}
                  fieldData={field}
                  styles={styles}
                  variant={fieldsVariant}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

FormGroup.propTypes = {
  formGroup: PropTypes.shape().isRequired,
  fieldsVariant: formFieldVariantType,
  fieldsColor: formFieldColorType,
  settings: PropTypes.shape()
};

FormGroup.defaultProps = {
  fieldsVariant: 'outlined',
  fieldsColor: 'primary',
  settings: undefined
};

export default FormGroup;
