import { useApolloClient } from '@apollo/client';
import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { bool, shape, string } from 'prop-types';
import { useContext, useState } from 'react';

import { NAVIGATION_TYPES } from '../../../constants/cms';
import { UserContext } from '../../../context/UserContext/UserContext';
import useHandleUrlOpening from '../../../hooks/useHandleUrlOpening';
import useNavigation from '../../../hooks/useNavigation';
import useNavigationFilteringByCountry from '../../../hooks/useNavigationFilteringByCountry';
import { imageType } from '../../../types';
import logoutPlayer from '../../../utils/auth/logoutUser';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import ConfigurableButton from '../../common/ConfigurableButton';
import Image from '../../common/Image';

export const PlayerAccountMenuButtonCmsName = 'ComponentPlayerAccountPlayerAccountMenuButton';
export const PlayerAccountMenuButton = ({ staticData }) => {
  const {
    buttonConfig: {
      muiButtonText,
      settings: buttonSettings,
      muiButtonStartIcon,
      muiButtonEndIcon,
      isMuiIconButton,
      muiIconButtonIcon
    },
    settings
  } = staticData;
  const apolloClient = useApolloClient();
  const handleUrlOpening = useHandleUrlOpening();
  const { t } = useTranslation();
  const navigation = useNavigation(NAVIGATION_TYPES.playerAccount);
  const filteredByCountryNavigationAttributes = useNavigationFilteringByCountry(
    navigation?.attributes
  );
  const { data } = useContext(UserContext) || {};
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpened = Boolean(anchorEl);
  const { userName } = data?.player || {};
  const selectedSettings = selectSettings(settings);
  const {
    menuProps,
    menuItemProps,
    listItemIconProps,
    iconContainerSx,
    imageProps,
    listItemTextProps,
    typographyProps,
    dividerProps,
    logoutIconProps
  } = selectedSettings;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (menuItemLink, openingType) => () => {
    handleUrlOpening({ openingType, url: menuItemLink });
    handleClose();
  };
  const handleLogoutClick = async () => {
    await logoutPlayer();
    apolloClient.cache.evict({ fieldName: 'player' });
    apolloClient.cache.gc();
  };

  return (
    <Box>
      <ConfigurableButton
        dataTestId="PlayerAccountMenuButton-menu-toggle"
        disabled={!filteredByCountryNavigationAttributes}
        endIcon={muiButtonEndIcon}
        handleClick={handleClick}
        icon={muiIconButtonIcon}
        isIconButton={isMuiIconButton}
        muiButtonProps={{
          disableElevation: true,
          'aria-controls': isMenuOpened ? 'demo-customized-menu' : undefined,
          'aria-expanded': isMenuOpened ? 'true' : undefined,
          'aria-haspopup': 'true',
          ...selectSettings(buttonSettings)
        }}
        startIcon={muiButtonStartIcon}
      >
        {muiButtonText || userName}
      </ConfigurableButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
          sx: { width: '220px' }
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        id="demo-customized-menu"
        open={isMenuOpened}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleClose}
        {...menuProps}
      >
        {filteredByCountryNavigationAttributes?.menuGroups &&
          filteredByCountryNavigationAttributes?.menuGroups.map((menuGroup) =>
            menuGroup.menuItems.map((menuItem) => {
              const iconAttributes = menuItem.icon.data?.attributes;
              return (
                <MenuItem
                  key={menuItem.id}
                  disableRippl
                  data-testid="PlayerAccountMenuButton-menu-item"
                  onClick={handleMenuItemClick(menuItem.link, menuItem.linkOpeningType)}
                  {...menuItemProps}
                >
                  {iconAttributes && (
                    <ListItemIcon {...listItemIconProps}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          marginRight: '12px',
                          border: `1px solid tertiary.dark`,
                          borderRadius: '8px',
                          ...iconContainerSx
                        }}
                      >
                        <Image
                          alt={iconAttributes.alternativeText}
                          height={16}
                          src={iconAttributes.url}
                          width={16}
                          {...imageProps}
                        />
                      </Box>
                    </ListItemIcon>
                  )}
                  <ListItemText {...listItemTextProps}>
                    <Typography color="text.primary" component="a" {...typographyProps}>
                      {menuItem.text}
                    </Typography>
                  </ListItemText>
                </MenuItem>
              );
            })
          )}
        <Divider {...dividerProps} />
        <MenuItem
          disableRipple
          data-testId="PlayerAccountMenuButton-button-logOut"
          onClick={handleLogoutClick}
          {...menuItemProps}
        >
          <ListItemIcon {...listItemIconProps}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                marginRight: '12px',
                border: `1px solid tertiary.dark`,
                borderRadius: '8px',
                ...iconContainerSx
              }}
            >
              <Logout color="error" fontSize="small" {...logoutIconProps} />
            </Box>
          </ListItemIcon>
          <ListItemText sx={{ color: 'text.secondary' }} {...listItemTextProps}>
            <Typography {...typographyProps}>{t('Logout')}</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

const playerAccountMenuButtonSettingsType = shape({
  menuProps: shape(),
  menuItemProps: shape(),
  listItemIconProps: shape(),
  iconContainerSx: shape(),
  imageProps: shape(),
  listItemTextProps: shape(),
  typographyProps: shape(),
  dividerProps: shape(),
  logoutIconProps: shape()
});

PlayerAccountMenuButton.propTypes = {
  staticData: shape({
    buttonConfig: shape({
      isMuiIconButton: bool,
      muiButtonText: string,
      muiIconButtonIcon: imageType,
      muiButtonStartIcon: imageType,
      muiButtonEndIcon: imageType,
      settings: shape({
        useCustomSettings: bool.isRequired,
        defaultSettings: shape({}),
        customSettings: shape({})
      })
    }),
    settings: shape({
      useCustomSettings: bool.isRequired,
      customSettings: playerAccountMenuButtonSettingsType,
      defaultSettings: playerAccountMenuButtonSettingsType
    })
  })
};

PlayerAccountMenuButton.defaultProps = {
  staticData: null
};
