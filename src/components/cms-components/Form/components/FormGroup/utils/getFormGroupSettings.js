import {
  getGridContainerProps,
  getGridItemProps
} from '../../../../../../utils/componentSettings/specialComponentProps';

const getFormGroupSettings = (settings) => {
  const { titleTypographyProps } = settings || {};
  const gridContainerProps = getGridContainerProps(settings?.gridContainerProps);
  const titleGridItemProps = getGridItemProps(settings?.titleGridItemProps);
  const formFieldsGridItemProps = getGridItemProps(settings?.formFieldsGridItemProps);

  return {
    gridContainerProps,
    titleGridItemProps,
    titleTypographyProps,
    formFieldsGridItemProps
  };
};

export default getFormGroupSettings;
