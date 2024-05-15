import getComponentProps from './index';
import withRequiredProps from './withRequiredProps';

const SPECIAL_COMPONENT_REQUIRED_PROPS = {
  gridContainer: {
    container: true
  },
  gridItem: {
    item: true,
    xs: 12
  }
};

export const getGridContainerProps = withRequiredProps(
  getComponentProps,
  SPECIAL_COMPONENT_REQUIRED_PROPS.gridContainer
);

export const getGridItemProps = withRequiredProps(
  getComponentProps,
  SPECIAL_COMPONENT_REQUIRED_PROPS.gridItem
);
