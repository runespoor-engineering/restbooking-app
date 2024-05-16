import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useContext } from 'react';

import { DIRECTIONS } from '../../../../constants/muiConstants';
import { useCmsStaticDataContext } from '../../../../context/CmsStaticDataContext';
import { UserContext } from '../../../../context/UserContext/UserContext';
import selectSettings from '../../../../utils/componentSettings/selectSettings';
import CmsComponentsGrid from '../../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import { GLOBAL_CMS_NAME_TO_COMPONENT_MAP } from '../../../cms-components/СmsComponentsGrid/cmsComponentsMaps';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    height: '82px',
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '32px',
    paddingRight: '32px'
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: '48px',
    paddingRight: '48px'
  },
  [theme.breakpoints.up('xl')]: {
    height: '106px',
    paddingLeft: '96px',
    paddingRight: '96px'
  }
}));

const Header = () => {
  const { isLoggedIn } = useContext(UserContext);
  const cms = useCmsStaticDataContext();
  const { layout } = useCmsStaticDataContext();
  console.log('Header', cms);

  const {
    anonymousHeaderUiComponents,
    authenticatedHeaderUiComponents,
    headerComponentsGridContainerSettings,
    headerSettings
  } = layout?.attributes || {};
  const headerUiComponents = isLoggedIn
    ? authenticatedHeaderUiComponents
    : anonymousHeaderUiComponents;
  const selectedHeaderSettings = selectSettings(headerSettings);
  const { appBarProps, toolbarSx } = selectedHeaderSettings;

  if (!headerUiComponents?.length) return null;

  return (
    <AppBar color="transparent" position="static" {...appBarProps} data-cp="appBarProps">
      <StyledToolbar data-cp="toolbarSx" sx={toolbarSx}>
        {headerUiComponents && (
          <CmsComponentsGrid
            cmsComponents={headerUiComponents}
            cmsComponentsMap={GLOBAL_CMS_NAME_TO_COMPONENT_MAP}
            direction={DIRECTIONS.row}
            gridContainerSettings={headerComponentsGridContainerSettings}
          />
        )}
      </StyledToolbar>
    </AppBar>
  );
};

Header.propTypes = {};

export default Header;
