import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { formStepType } from '../../../../../types';
import Image from '../../../../common/Image';
import RichText from '../../../../common/RichText';
import FormGroup from '../FormGroup';
import { getFormStepSettings } from './utils';

const FormStep = ({ stepData, isActive, settings }) => {
  const { title, formGroups, description, stepImage } = stepData;
  const stepImageAttributes = stepImage?.data?.attributes;
  const {
    gridContainerProps,
    titleGridItemProps,
    titleTypographyProps,
    descriptionGridItemProps,
    imageGridItemProps,
    imageProps,
    formGroupGridItemProps,
    formGroupSettings
  } = getFormStepSettings(settings);

  return (
    <Grid
      container
      spacing={2}
      {...gridContainerProps}
      sx={{ display: isActive ? 'block' : 'none', ...gridContainerProps?.sx }}
    >
      {title && (
        <Grid item {...titleGridItemProps}>
          <Typography color="primary" component="h5" variant="h5" {...titleTypographyProps}>
            {title}
          </Typography>
        </Grid>
      )}
      {description && (
        <Grid item {...descriptionGridItemProps}>
          <RichText markdown={description} />
        </Grid>
      )}
      {stepImageAttributes && (
        <Grid item sx={{ display: 'flex', justifyContent: 'center' }} {...imageGridItemProps}>
          <Image
            alt={stepImageAttributes.alternativeText}
            css={{ borderRadius: '8px' }}
            height={271}
            src={stepImageAttributes.url}
            width={432}
            {...imageProps}
          />
        </Grid>
      )}
      {formGroups.map((formGroup) => (
        <Grid item {...formGroupGridItemProps}>
          <FormGroup
            key={formGroup.id}
            fieldsColor={stepData.fieldsColor}
            fieldsVariant={stepData.fieldsVariant}
            formGroup={formGroup}
            settings={formGroupSettings}
          />
        </Grid>
      ))}
    </Grid>
  );
};

FormStep.propTypes = {
  stepData: formStepType.isRequired,
  isActive: PropTypes.bool.isRequired,
  settings: PropTypes.shape()
};

FormStep.defaultProps = {
  settings: undefined
};

export default FormStep;
