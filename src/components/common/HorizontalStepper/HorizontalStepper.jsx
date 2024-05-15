import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import * as React from 'react';

import { getCurrentStateIconUrl } from '../../cms-components/Form/utils';
import Image from '../Image/index';

const HorizontalLinearStepper = ({
  activeStepIndex,
  handleStepClick,
  stepsData,
  useStepConnector,
  settings
}) => {
  const { stepperBoxSx, stepperProps, stepConnectorProps, stepProps, stepLabelProps, imageProps } =
    settings || {};

  return (
    <Box sx={{ width: '100%', ...stepperBoxSx }}>
      <Stepper
        activeStep={activeStepIndex}
        connector={useStepConnector ? <StepConnector {...stepConnectorProps} /> : null}
        sx={{ justifyContent: 'space-between' }}
        {...stepperProps}
      >
        {stepsData.map((stepData, index) => {
          const url = getCurrentStateIconUrl(stepData);
          return (
            <Step key={stepData?.label} onClick={handleStepClick(index)} {...stepProps}>
              <StepLabel
                icon={url ? <Image height={24} src={url} width={24} {...imageProps} /> : null}
                {...stepLabelProps}
              >
                {stepData?.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

const stepLabelWithStateAndIcons = shape({
  label: string,
  activeStepIcon: shape(),
  completedStepIcon: shape(),
  defaultStepIcon: shape(),
  isCompleted: bool,
  isActive: bool
});

const horizontalStepperSettings = shape({
  stepperBoxSx: shape(),
  stepperProps: shape(),
  stepConnectorProps: shape(),
  stepProps: shape(),
  stepLabelProps: shape(),
  imageProps: shape()
});

HorizontalLinearStepper.propTypes = {
  activeStepIndex: number.isRequired,
  handleStepClick: func.isRequired,
  stepsData: arrayOf(stepLabelWithStateAndIcons).isRequired,
  useStepConnector: bool,
  settings: horizontalStepperSettings
};

HorizontalLinearStepper.defaultProps = {
  useStepConnector: null,
  settings: null
};

export default HorizontalLinearStepper;
