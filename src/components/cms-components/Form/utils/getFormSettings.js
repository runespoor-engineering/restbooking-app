import {
  getGridContainerProps,
  getGridItemProps
} from '../../../../utils/componentSettings/specialComponentProps';

const getFormSettings = (settings) => {
  const {
    titleTypographyProps,
    pendingForFormValuesSkeletonProps,
    formStepSettings,
    successAlertProps,
    problemAlertProps,
    horizontalStepperSettings
  } = settings || {};
  const mainGridContainerProps = getGridContainerProps(settings?.mainGridContainerProps);
  const titleGridItemProps = getGridItemProps(settings?.titleGridItemProps);
  const horizontalStepperGridItemProps = getGridItemProps(settings?.horizontalStepperGridItemProps);
  const headerGridItemProps = getGridItemProps(settings?.headerGridItemProps);
  const formGridItemProps = getGridItemProps(settings?.formGridItemProps);
  const footerGridItemProps = getGridItemProps(settings?.footerGridItemProps);

  return {
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
  };
};

export default getFormSettings;
