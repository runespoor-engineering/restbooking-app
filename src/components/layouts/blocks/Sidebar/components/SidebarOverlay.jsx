import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import * as React from 'react';

import CmsComponentsGrid from '../../../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import { GLOBAL_CMS_NAME_TO_COMPONENT_MAP } from '../../../../cms-components/СmsComponentsGrid/cmsComponentsMaps';

const SIDEBAR_WIDTH_MAP = '288px';

const SidebarOverlay = ({
  isMenuOpened,
  handleMenuClose,
  sidebarUiComponents,
  settings,
  sidebarComponentsGridContainerSettings
}) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: 'primary.dark',
          backgroundImage: 'none',
          padding: '36px',
          width: {
            sm: SIDEBAR_WIDTH_MAP
          },
          ...settings?.sidebarDrawerProps?.PageProps?.sx
        },
        'data-cp': 'sidebarDrawerProps.PageProps.sx'
      }}
      anchor="left"
      data-testid="sidebar"
      {...settings?.sidebarDrawerProps}
      data-cp="sidebarDrawerProps"
      open={isMenuOpened}
      onClose={handleMenuClose}
    >
      {sidebarUiComponents && (
        <CmsComponentsGrid
          cmsComponents={sidebarUiComponents}
          cmsComponentsMap={GLOBAL_CMS_NAME_TO_COMPONENT_MAP}
          gridContainerSettings={sidebarComponentsGridContainerSettings}
        />
      )}
    </Drawer>
  );
};

SidebarOverlay.propTypes = {
  isMenuOpened: PropTypes.bool,
  handleMenuClose: PropTypes.func,
  settings: PropTypes.shape(),
  sidebarComponentsGridContainerSettings: PropTypes.shape(),
  sidebarUiComponents: PropTypes.arrayOf(PropTypes.shape())
};

SidebarOverlay.defaultProps = {
  isMenuOpened: false,
  handleMenuClose: () => {},
  settings: {},
  sidebarComponentsGridContainerSettings: {},
  sidebarUiComponents: []
};

export default SidebarOverlay;
