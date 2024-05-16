import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MUTATION_STATUS, SUCCESS_NOTIFICATION_KEYS } from '../../../constants/serverConstants';
import { UserContext } from '../../../context/UserContext/UserContext';
import withNullabilityCheck from '../../../hocs/withNullabilityCheck';
import useGlobalTranslations, {
  GLOBAL_TRANSLATION_TYPE
} from '../../../hooks/useGlobalTranslations';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import AlertNotification from '../../common/AlertNotification';
import ConfigurableButton from '../../common/ConfigurableButton';
import { useNormalizedButtonConfig } from '../../common/ConfigurableButton/hooks';
import { HorizontalStepper } from '../../common/HorizontalStepper';
import RichText from '../../common/RichText';
import FormStep from './components/FormStep';
import {
  DEFAULT_NEXT_STEP_BUTTON,
  DEFAULT_PREV_STEP_BUTTON,
  DEFAULT_SUBMIT_FORM_BUTTON
} from './constants';
import { FormConfigContext } from './context';
import { useFormSubmit, usePendingForValueFieldOptions, usePlayerDataFormValues } from './hooks';
import { createValidationSchema, getFormFieldsFromSteps, getFormSettings } from './utils';
import { isFormOfVerificationType, isPlayerDataVerified } from './utils/playerVerification';

const isStepComplete = (formFields, formState, getValues) => {
  const requiredFields = formFields.filter((field) => !!field.required);
  const allValid =
    !formState.isValidating && formFields.every((field) => !formState.errors[field.name]);
  const allRequiredFilled = requiredFields.every((field) => {
    if (field.kind === 'inputFile') {
      const files = getValues(field.name);
      return !!files?.[0];
    }

    return !!getValues(field.name);
  });

  return allValid && allRequiredFilled;
};

const getStepFields = (step) =>
  step.formGroups
    .map((formGroup) => formGroup.formFields?.filter((formField) => !!formField.useThisField))
    .flat();

const getStepsLabelsWithStateAndIcons = (formSteps, formState, getValues, activeStepIndex) => {
  return formSteps.map((step, index) => {
    const isStepActive = index === activeStepIndex;
    const isStepCompleted = isStepComplete(getStepFields(step), formState, getValues);
    const { title, activeStepIcon, completedStepIcon, defaultStepIcon } = step || {};
    return {
      label: title,
      activeStepIcon: activeStepIcon?.data?.attributes,
      completedStepIcon: completedStepIcon?.data?.attributes,
      defaultStepIcon: defaultStepIcon?.data?.attributes,
      isCompleted: isStepCompleted,
      isActive: isStepActive
    };
  });
};

const FormComponent = ({ staticData }) => {
  const { t } = useTranslation();
  const { getGlobalTranslation } = useGlobalTranslations();
  const { data: playerData } = useContext(UserContext);

  const { form } = staticData || {};
  const formAttributes = form.data.attributes;
  const {
    type: formType,
    title,
    steps,
    header,
    footer,
    prevStepButton,
    nextStepButton,
    submitButton,
    onSubmitLinkToOpen,
    readonly: isFormReadOnly,
    disabled: isFormDisabled,
    formSettings,
    anonymousFallbackLink,
    useResetOnSuccessSubmit,
    useStepConnector
  } = formAttributes;
  const {
    mainGridContainerProps,
    titleGridItemProps,
    titleTypographyProps,
    pendingForFormValuesSkeletonProps,
    horizontalStepperGridItemProps,
    headerGridItemProps,
    formGridItemProps,
    formStepSettings,
    successAlertProps,
    problemAlertProps,
    footerGridItemProps,
    horizontalStepperSettings
  } = getFormSettings(selectSettings(formSettings));
  const componentSettings = selectSettings(staticData.settings);
  const normalizedPrevStepButtonConfig = useNormalizedButtonConfig(prevStepButton);
  const normalizedNextStepButtonConfig = useNormalizedButtonConfig(nextStepButton);
  const normalizedSubmitButtonConfig = useNormalizedButtonConfig(submitButton);

  const formFields = useMemo(() => getFormFieldsFromSteps(formAttributes), [formAttributes]);
  const isVerificationFormCompleted = useMemo(
    () => isFormOfVerificationType(formType) && isPlayerDataVerified(formType, playerData?.player),
    [formType, playerData?.player]
  );

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const isActiveStepFirst = activeStepIndex === 0;
  const isActiveStepLast = activeStepIndex === formAttributes.steps.length - 1;

  const [onSubmit, mutationResult, submitRequestStatus, submitRequestProblems] = useFormSubmit(
    formType,
    onSubmitLinkToOpen,
    anonymousFallbackLink
  );
  const { loading, reset } = mutationResult;

  const handleCloseAlert = useCallback(() => {
    reset();
    setIsAlertOpen(false);
  }, [reset]);

  const formConfigContextValue = useMemo(
    () => ({
      isFormDisabled,
      isFormReadOnly: isFormReadOnly || isVerificationFormCompleted,
      formType,
      handleCloseAlert
    }),
    [isFormDisabled, isFormReadOnly, isVerificationFormCompleted, formType, handleCloseAlert]
  );

  const schema = yup.object().shape(createValidationSchema(formFields, { t }));

  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const [pendingForValue] = usePendingForValueFieldOptions(formType);
  usePlayerDataFormValues(formType, formFields, formMethods.setValue);

  const isActiveStepCompleted = useMemo(
    () =>
      isStepComplete(
        getStepFields(steps[activeStepIndex]),
        formMethods.formState,
        formMethods.getValues
      ),
    [activeStepIndex, formMethods.formState, formMethods.getValues, steps]
  );

  const stepsLabelsWithStateAndIcons = useMemo(
    () =>
      getStepsLabelsWithStateAndIcons(
        steps,
        formMethods.formState,
        formMethods.getValues,
        activeStepIndex
      ),
    [activeStepIndex, formMethods.formState, formMethods.getValues, steps]
  );

  const isSubmitButtonDisabled = useMemo(
    () =>
      isFormDisabled ||
      !isActiveStepCompleted ||
      loading ||
      isPlayerDataVerified(formType, playerData?.player),
    [formType, isActiveStepCompleted, isFormDisabled, loading, playerData?.player]
  );

  // ===== Handlers ==================================================================================================//
  const handleNextStepClick = () => {
    if (!isActiveStepLast && isActiveStepCompleted)
      setActiveStepIndex((currentStep) => currentStep + 1);
  };

  const handlePreviousStepClick = () => {
    setActiveStepIndex((currentStep) => currentStep - 1);
  };

  const handleStepperStepClick = (stepIndex) => () => {
    if (
      stepIndex === 0 ||
      isStepComplete(getStepFields(steps[stepIndex - 1]), formMethods.formState)
    ) {
      setActiveStepIndex(stepIndex);
    }
  };

  useEffect(() => {
    if (submitRequestStatus) {
      setIsAlertOpen(true);
    }
    if (submitRequestStatus === MUTATION_STATUS.SUCCESS && useResetOnSuccessSubmit) {
      formMethods.reset();
    }
  }, [formMethods, submitRequestStatus, useResetOnSuccessSubmit]);

  // =================================================================================================================//
  return (
    <FormProvider {...formMethods}>
      <FormConfigContext.Provider value={formConfigContextValue}>
        <Grid
          container
          component="form"
          data-testid="form"
          spacing={3}
          sx={{
            position: 'relative',
            height: '100%',
            ...mainGridContainerProps?.sx,
            ...componentSettings?.rootBox?.sx
          }}
          {...mainGridContainerProps}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <Grid item {...titleGridItemProps}>
            <Grid container spacing={pendingForValue ? 2 : undefined}>
              {title && (
                <Grid item md={9} xs={12}>
                  <Typography
                    color="text.primary"
                    component="h5"
                    fontWeight="bold"
                    variant="h5"
                    {...titleTypographyProps}
                  >
                    {title}
                  </Typography>
                </Grid>
              )}

              {pendingForValue && (
                <Grid item alignSelf="center" md={3} xs={12}>
                  <Skeleton {...pendingForFormValuesSkeletonProps} />
                </Grid>
              )}
            </Grid>
          </Grid>
          {steps.length > 1 && (
            <Grid item {...horizontalStepperGridItemProps}>
              <HorizontalStepper
                activeStepIndex={activeStepIndex}
                handleStepClick={handleStepperStepClick}
                settings={horizontalStepperSettings}
                stepsData={stepsLabelsWithStateAndIcons}
                useStepConnector={useStepConnector}
              />
            </Grid>
          )}
          {header && (
            <Grid item {...headerGridItemProps}>
              <RichText markdown={header} />
            </Grid>
          )}

          <Grid item {...formGridItemProps}>
            {steps.map((step, index) => (
              <FormStep
                key={step.id}
                isActive={activeStepIndex === index}
                settings={formStepSettings}
                stepData={step}
              />
            ))}
            {submitRequestStatus === MUTATION_STATUS.FAIL && submitRequestProblems && !loading && (
              <AlertNotification
                close={handleCloseAlert}
                isOpen={isAlertOpen}
                severity="error"
                {...problemAlertProps}
              >
                {submitRequestProblems.map((problem) =>
                  getGlobalTranslation({
                    iqsTranslationId: problem?.problemCode,
                    type: GLOBAL_TRANSLATION_TYPE.ERROR,
                    status: submitRequestStatus
                  })
                )}
              </AlertNotification>
            )}
            {submitRequestStatus === MUTATION_STATUS.SUCCESS && (
              <AlertNotification
                close={handleCloseAlert}
                isOpen={isAlertOpen}
                {...successAlertProps}
              >
                {getGlobalTranslation({
                  iqsTranslationId: SUCCESS_NOTIFICATION_KEYS[formAttributes.type],
                  status: submitRequestStatus,
                  type: GLOBAL_TRANSLATION_TYPE.SUCCESS
                })}
              </AlertNotification>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '24px' }}>
              {!isActiveStepFirst && (
                <ConfigurableButton
                  dataTestId="previous-step-button"
                  endIcon={normalizedPrevStepButtonConfig?.endIcon}
                  handleClick={handlePreviousStepClick}
                  icon={normalizedPrevStepButtonConfig?.icon}
                  isIconButton={normalizedPrevStepButtonConfig?.isIconButton}
                  muiButtonProps={normalizedPrevStepButtonConfig?.muiButtonProps}
                  startIcon={normalizedPrevStepButtonConfig?.startIcon}
                >
                  {normalizedPrevStepButtonConfig?.text || t(DEFAULT_PREV_STEP_BUTTON.text)}
                </ConfigurableButton>
              )}
              {!isActiveStepLast && (
                <ConfigurableButton
                  dataTestId="next-step-button"
                  endIcon={normalizedNextStepButtonConfig?.endIcon}
                  handleClick={handleNextStepClick}
                  icon={normalizedNextStepButtonConfig?.icon}
                  isIconButton={normalizedNextStepButtonConfig?.isIconButton}
                  muiButtonProps={{
                    ...normalizedNextStepButtonConfig?.muiButtonProps,
                    disabled: isFormDisabled || !isActiveStepCompleted,
                    sx: {
                      width: isActiveStepFirst ? '100%' : 'max-content',
                      ...normalizedNextStepButtonConfig?.muiButtonProps?.sx
                    }
                  }}
                  startIcon={normalizedNextStepButtonConfig?.startIcon}
                >
                  {normalizedNextStepButtonConfig?.text || t(DEFAULT_NEXT_STEP_BUTTON.text)}
                </ConfigurableButton>
              )}

              {pendingForValue && !isFormReadOnly && (
                <Skeleton
                  sx={{ width: isActiveStepFirst ? '100%' : '20%', height: '36.5px' }}
                  variant="rectangular"
                />
              )}

              {isActiveStepLast &&
                !pendingForValue &&
                !isFormReadOnly &&
                !isVerificationFormCompleted && (
                  <ConfigurableButton
                    endIcon={normalizedSubmitButtonConfig?.endIcon}
                    icon={normalizedSubmitButtonConfig?.icon}
                    isIconButton={normalizedSubmitButtonConfig?.isIconButton}
                    muiButtonProps={{
                      type: 'submit',
                      disabled: isSubmitButtonDisabled,
                      ...normalizedSubmitButtonConfig?.muiButtonProps,
                      sx: {
                        width: isActiveStepFirst ? '100%' : 'max-content',
                        ...normalizedSubmitButtonConfig?.muiButtonProps?.sx
                      }
                    }}
                    startIcon={normalizedSubmitButtonConfig?.startIcon}
                  >
                    {normalizedSubmitButtonConfig?.text || t(DEFAULT_SUBMIT_FORM_BUTTON.text)}
                  </ConfigurableButton>
                )}
              {!pendingForValue && isVerificationFormCompleted && (
                <Alert
                  severity="success"
                  sx={{ width: isActiveStepFirst ? '100%' : 'max-content' }}
                  variant="filled"
                >
                  {t('Verified')}
                </Alert>
              )}
            </Box>
          </Grid>

          {footer && (
            <Grid item {...footerGridItemProps}>
              <RichText markdown={footer} />
            </Grid>
          )}
        </Grid>
      </FormConfigContext.Provider>
    </FormProvider>
  );
};

FormComponent.defaultProps = {
  globalData: undefined
};

export default withNullabilityCheck(FormComponent, ['staticData', 'form']);
