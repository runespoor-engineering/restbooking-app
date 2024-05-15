import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

import { LINK_OPENING_TYPE } from '../../../../../../../constants/cms';
import Image from '../../../../../../common/Image';
import NextLinkComposed from '../../../../../../common/NextLinkComposed';

const TabContentNavigation = ({
  selectedSettings,
  playerAccountNavigationAttributes,
  activeMenuItem,
  activeMenuSubItem,
  useTopLevelNavigation
}) => {
  const {
    mainBoxSx,
    navigationItemsGridContainerProps,
    activeNavigationItemButtonSx,
    defaultNavigationItemButtonSx,
    navigationSubItemsGridContainerProps,
    navigationItemsGridItemProps,
    navigationSubItemsGridItemProps,
    activeNavigationSubItemButtonSx,
    defaultNavigationSubItemButtonSx
  } = selectedSettings?.tabsNavigation || {};
  // Render nothing if this navigation is not configured
  return playerAccountNavigationAttributes ? (
    <Box sx={{ ...mainBoxSx }}>
      <Grid container {...navigationItemsGridContainerProps}>
        {useTopLevelNavigation &&
          playerAccountNavigationAttributes.menuGroups &&
          playerAccountNavigationAttributes.menuGroups.map((menuGroup) =>
            menuGroup.menuItems.map((menuItem) => {
              const iconAttributes = menuItem?.icon?.data?.attributes;
              return (
                <Grid key={menuItem.id} item {...navigationItemsGridItemProps}>
                  <Button
                    component={menuItem?.link ? NextLinkComposed : undefined}
                    startIcon={
                      iconAttributes && (
                        <Image
                          alt={iconAttributes.alternativeText}
                          height={16}
                          src={iconAttributes.url}
                          width={16}
                        />
                      )
                    }
                    sx={
                      activeMenuItem.link === menuItem.link
                        ? activeNavigationItemButtonSx
                        : defaultNavigationItemButtonSx
                    }
                    to={menuItem?.link}
                    {...(menuItem.linkOpeningType === LINK_OPENING_TYPE.openBlank && {
                      target: '_blank'
                    })}
                  >
                    {menuItem.text}
                  </Button>
                </Grid>
              );
            })
          )}
      </Grid>

      {activeMenuSubItem && (
        <Grid container {...navigationSubItemsGridContainerProps}>
          {activeMenuItem.menuSubItems?.map((menuSubItem) => {
            const iconAttributes = menuSubItem?.icon?.data?.attributes;
            return (
              <Grid key={menuSubItem.id} item {...navigationSubItemsGridItemProps}>
                <Button
                  component={menuSubItem?.link ? NextLinkComposed : undefined}
                  startIcon={
                    iconAttributes && <Image height={16} src={iconAttributes?.url} width={16} />
                  }
                  sx={
                    activeMenuSubItem.link === menuSubItem.link
                      ? activeNavigationSubItemButtonSx
                      : defaultNavigationSubItemButtonSx
                  }
                  to={menuSubItem?.link}
                >
                  {menuSubItem.text}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  ) : null;
};

TabContentNavigation.propTypes = {
  selectedSettings: PropTypes.shape(),
  playerAccountNavigationAttributes: PropTypes.shape(),
  activeMenuItem: PropTypes.shape(),
  activeMenuSubItem: PropTypes.shape(),
  useTopLevelNavigation: PropTypes.bool
};

TabContentNavigation.defaultProps = {
  selectedSettings: {},
  playerAccountNavigationAttributes: {},
  activeMenuItem: {},
  activeMenuSubItem: {},
  useTopLevelNavigation: true
};

export default TabContentNavigation;
