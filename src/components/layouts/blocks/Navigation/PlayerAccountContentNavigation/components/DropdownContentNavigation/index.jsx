import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';

import useHandleUrlOpening from '../../../../../../../hooks/useHandleUrlOpening';
import Image from '../../../../../../common/Image';

const MenuButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  minWidth: '32px',
  width: '100%',
  height: '42.5px',
  paddingLeft: '8px',
  paddingRight: '8px',
  '& .MuiButton-endIcon': { marginLeft: 'auto' },
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '22px',
    paddingRight: '22px'
  }
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  marginRight: '12px',
  border: `1px solid ${theme.palette.tertiary.dark}`,
  borderRadius: '8px'
}));

const DropdownContentNavigation = ({
  selectedSettings,
  playerAccountNavigationAttributes,
  activeMenuItem,
  activeMenuSubItem,
  useTopLevelNavigation
}) => {
  const {
    mainBoxSx,
    navigationGridContainerProps,
    navigationItemsGridItemProps,
    navigationSubItemsGridItemProps,
    navigationItemMenuButtonSx,
    navigationItemMenuSx,
    navigationSubItemMenuButtonSx,
    navigationSubItemMenusSx
  } = selectedSettings?.dropdownNavigation || {};
  const handleUrlOpening = useHandleUrlOpening();
  const [menuButtonAnchorEl, setMenuButtonAnchorEl] = useState(null);
  const [subMenuButtonAnchorEl, setSubMenuButtonAnchorEl] = useState(null);
  const isMenuOpened = Boolean(menuButtonAnchorEl);
  const isSubMenuOpened = Boolean(subMenuButtonAnchorEl);

  const handleMenuButtonClick = (event) => {
    setMenuButtonAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuButtonAnchorEl(null);
  };
  const handleMenuItemClick = (menuItemLink, openingType) => () => {
    handleUrlOpening({ url: menuItemLink, openingType });
    handleMenuClose();
  };
  const handleSubMenuButtonClick = (event) => {
    setSubMenuButtonAnchorEl(event.currentTarget);
  };
  const handleSubMenuClose = () => {
    setSubMenuButtonAnchorEl(null);
  };
  const handleSubMenuItemClick = (subMenuItemLink) => () => {
    handleSubMenuClose();
    handleUrlOpening({ url: subMenuItemLink });
  };

  // Render nothing if this navigation is not configured
  return playerAccountNavigationAttributes ? (
    <Box sx={{ ...mainBoxSx }}>
      <Grid container spacing={2} {...navigationGridContainerProps}>
        {useTopLevelNavigation && (
          <Grid item lg={2} md={3} xs={6} {...navigationItemsGridItemProps}>
            <MenuButton
              aria-controls={isMenuOpened ? 'PlayerAccountContentNavigation-menu' : undefined}
              aria-expanded={isMenuOpened ? 'true' : undefined}
              aria-haspopup="true"
              color="primary"
              endIcon={<KeyboardArrowDownIcon />}
              id="PlayerAccountContentNavigation-menu-button"
              size="large"
              sx={{ ...navigationItemMenuButtonSx }}
              variant="outlined"
              onClick={handleMenuButtonClick}
            >
              {activeMenuItem.text}
            </MenuButton>
            <Menu
              MenuListProps={{
                'aria-labelledby': 'PlayerAccountContentNavigation-menu-button',
                sx: { width: '220px', ...navigationItemMenuSx }
              }}
              anchorEl={menuButtonAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              id="PlayerAccountContentNavigation-menu"
              open={isMenuOpened}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handleMenuClose}
            >
              {playerAccountNavigationAttributes.menuGroups &&
                playerAccountNavigationAttributes.menuGroups.map((menuGroup) =>
                  menuGroup.menuItems.map((menuItem) => {
                    const iconAttributes = menuItem.icon.data?.attributes;
                    return (
                      <MenuItem
                        key={menuItem.id}
                        disableRippl
                        onClick={handleMenuItemClick(menuItem.link, menuItem.linkOpeningType)}
                      >
                        {iconAttributes && (
                          <ListItemIcon>
                            <IconContainer>
                              <Image
                                alt={iconAttributes.alternativeText}
                                height={16}
                                src={iconAttributes.url}
                                width={16}
                              />
                            </IconContainer>
                          </ListItemIcon>
                        )}
                        <ListItemText>
                          <Typography
                            color={
                              activeMenuItem.link === menuItem.link
                                ? 'primary.main'
                                : 'text.primary'
                            }
                            component="a"
                          >
                            {menuItem.text}
                          </Typography>
                        </ListItemText>
                      </MenuItem>
                    );
                  })
                )}
            </Menu>
          </Grid>
        )}
        {activeMenuSubItem && (
          <Grid item lg={2} md={3} xs={6} {...navigationSubItemsGridItemProps}>
            <MenuButton
              aria-controls={isMenuOpened ? 'PlayerAccountContentNavigation-sub-menu' : undefined}
              aria-expanded={isMenuOpened ? 'true' : undefined}
              aria-haspopup="true"
              color="secondary"
              endIcon={<KeyboardArrowDownIcon />}
              id="PlayerAccountContentNavigation-sub-menu-button"
              size="large"
              sx={{ ...navigationSubItemMenuButtonSx }}
              variant="outlined"
              onClick={handleSubMenuButtonClick}
            >
              {activeMenuSubItem.text}
            </MenuButton>
            <Menu
              MenuListProps={{
                'aria-labelledby': 'PlayerAccountContentNavigation-sub-menu-button',
                sx: { width: '220px', ...navigationSubItemMenusSx }
              }}
              anchorEl={subMenuButtonAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              id="PlayerAccountContentNavigation-sub-menu"
              open={isSubMenuOpened}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handleSubMenuClose}
            >
              {activeMenuItem.menuSubItems?.map((menuSubItem) => {
                const iconAttributes = menuSubItem.icon.data?.attributes;
                return (
                  <MenuItem
                    key={menuSubItem.id}
                    disableRippl
                    onClick={handleSubMenuItemClick(menuSubItem.link)}
                  >
                    {iconAttributes && (
                      <ListItemIcon>
                        <IconContainer>
                          <Image
                            alt={iconAttributes.alternativeText}
                            height={16}
                            src={iconAttributes.url}
                            width={16}
                          />
                        </IconContainer>
                      </ListItemIcon>
                    )}
                    <ListItemText>
                      <Typography
                        color={
                          activeMenuSubItem.link === menuSubItem.link
                            ? 'secondary.main'
                            : 'text.primary'
                        }
                        component="a"
                      >
                        {menuSubItem.text}
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                );
              })}
            </Menu>
          </Grid>
        )}
      </Grid>
    </Box>
  ) : null;
};

DropdownContentNavigation.propTypes = {
  selectedSettings: PropTypes.shape(),
  playerAccountNavigationAttributes: PropTypes.shape(),
  activeMenuItem: PropTypes.shape(),
  activeMenuSubItem: PropTypes.shape(),
  useTopLevelNavigation: PropTypes.bool
};

DropdownContentNavigation.defaultProps = {
  selectedSettings: {},
  playerAccountNavigationAttributes: {},
  activeMenuItem: {},
  activeMenuSubItem: {},
  useTopLevelNavigation: true
};

export default DropdownContentNavigation;
