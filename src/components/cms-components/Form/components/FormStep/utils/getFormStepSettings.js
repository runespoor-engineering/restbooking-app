import {
  getGridContainerProps,
  getGridItemProps
} from '../../../../../../utils/componentSettings/specialComponentProps';

const getFormStepSettings = (settings) => {
  const { titleTypographyProps, imageProps, formGroupSettings } = settings || {};
  const gridContainerProps = getGridContainerProps(settings?.gridContainerProps);
  const titleGridItemProps = getGridItemProps(settings?.titleGridItemProps);
  const descriptionGridItemProps = getGridItemProps(settings?.descriptionGridItemProps);
  const imageGridItemProps = getGridItemProps(settings?.imageGridItemProps);
  const formGroupGridItemProps = getGridItemProps(settings?.formGroupGridItemProps);

  return {
    gridContainerProps,
    titleGridItemProps,
    titleTypographyProps,
    descriptionGridItemProps,
    imageGridItemProps,
    imageProps,
    formGroupGridItemProps,
    formGroupSettings
  };
};

export default getFormStepSettings;
