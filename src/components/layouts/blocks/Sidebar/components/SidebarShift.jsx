import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import * as React from 'react';

import useBodyScrollPreventing from '../../../../../hooks/useBodyScrollPreventing';
import CmsComponentsGrid from '../../../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import { GLOBAL_CMS_NAME_TO_COMPONENT_MAP } from '../../../../cms-components/СmsComponentsGrid/cmsComponentsMaps';

const SIDEBAR_WIDTH_MAP = '288px';

const SidebarShift = ({
  isMenuOpened,
  handleMenuClose,
  settings,
  sidebarComponentsGridContainerSettings,
  sidebarUiComponents
}) => {
  useBodyScrollPreventing(isMenuOpened);

  return (
    <>
      {isMenuOpened && (
        <Box
          data-cp="shiftingSidebarBackdropSx"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            ...settings?.shiftingSidebarBackdropSx
          }}
          onClick={handleMenuClose}
        />
      )}
      <Box
        data-cp={`shiftingSidebarContainerSx${
          isMenuOpened ? ', shiftingSidebarOpenedContainerSx' : ''
        }`.trim()}
        sx={{
          position: 'absolute',
          top: 0,
          left: `-${SIDEBAR_WIDTH_MAP}`,
          bottom: 0,
          width: SIDEBAR_WIDTH_MAP,
          backgroundColor: '#F81123',
          zIndex: 1200,
          transition: '0.3s ease-in-out',
          transform: isMenuOpened
            ? `translate(${settings?.shiftingSidebarContainerSx?.width || SIDEBAR_WIDTH_MAP})`
            : 0,
          overflow: 'unset',
          height: '100vh',
          ...settings?.shiftingSidebarContainerSx,
          ...(isMenuOpened ? settings.shiftingSidebarOpenedContainerSx : '')
        }}
      >
        {sidebarUiComponents && (
          <CmsComponentsGrid
            cmsComponents={sidebarUiComponents}
            cmsComponentsMap={GLOBAL_CMS_NAME_TO_COMPONENT_MAP}
            gridContainerSettings={sidebarComponentsGridContainerSettings}
            isMenuOpened={isMenuOpened}
          />
        )}
      </Box>
    </>
  );
};

SidebarShift.propTypes = {
  isMenuOpened: PropTypes.bool,
  handleMenuClose: PropTypes.func,
  settings: PropTypes.shape(),
  sidebarComponentsGridContainerSettings: PropTypes.shape(),
  sidebarUiComponents: PropTypes.arrayOf(PropTypes.shape())
};

SidebarShift.defaultProps = {
  isMenuOpened: false,
  handleMenuClose: () => {},
  settings: {},
  sidebarComponentsGridContainerSettings: {},
  sidebarUiComponents: []
};

export default SidebarShift;
