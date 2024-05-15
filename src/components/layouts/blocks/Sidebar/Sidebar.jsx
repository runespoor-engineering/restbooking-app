import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import * as React from 'react';

import { SIDEBAR_TYPE } from '../../../../constants/cms';
import { useCmsStaticDataContext } from '../../../../context/CmsStaticDataContext';
import { UserContext } from '../../../../context/UserContext/UserContext';
import selectSettings from '../../../../utils/componentSettings/selectSettings';
import { SidebarOverlay, SidebarShift } from './components';

const SIDEBAR_TYPES = {
  [SIDEBAR_TYPE.overlay]: SidebarOverlay,
  [SIDEBAR_TYPE.shift]: SidebarShift
};

const Sidebar = ({ isMenuOpened, handleMenuClose, type }) => {
  const { isLoggedIn } = useContext(UserContext);
  const { layout } = useCmsStaticDataContext();

  const {
    authenticatedSidebarUiComponents,
    anonymousSidebarUiComponents,
    sidebarComponentsGridContainerSettings,
    sidebarSettings
  } = layout?.attributes || {};
  const sidebarUiComponents = isLoggedIn
    ? authenticatedSidebarUiComponents
    : anonymousSidebarUiComponents;
  const selectedSettings = selectSettings(sidebarSettings);

  const SidebarComponent = useMemo(() => SIDEBAR_TYPES[type] || SidebarOverlay, [type]);

  if (!sidebarUiComponents?.length) return null;

  return (
    <SidebarComponent
      handleMenuClose={handleMenuClose}
      isMenuOpened={isMenuOpened}
      settings={selectedSettings}
      sidebarComponentsGridContainerSettings={sidebarComponentsGridContainerSettings}
      sidebarUiComponents={sidebarUiComponents}
    />
  );
};

Sidebar.propTypes = {
  isMenuOpened: PropTypes.bool,
  handleMenuClose: PropTypes.func,
  type: PropTypes.oneOf([SIDEBAR_TYPE.shift, SIDEBAR_TYPE.overlay])
};

Sidebar.defaultProps = {
  isMenuOpened: false,
  handleMenuClose: () => {},
  type: SIDEBAR_TYPE.overlay
};

export default Sidebar;
