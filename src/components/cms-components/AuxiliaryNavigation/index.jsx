import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { bool, shape } from 'prop-types';

import { CHANNELS, LINK_OPENING_TYPE, NAVIGATION_TYPES } from '../../../constants/cms';
import useActiveNavigation from '../../../hooks/useActiveNavigation';
import useNavigation from '../../../hooks/useNavigation';
import useNavigationFilteringByCountry from '../../../hooks/useNavigationFilteringByCountry';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import Image from '../../common/Image';
import NextLinkComposed from '../../common/NextLinkComposed';

export const AuxiliaryNavigationCmsName = 'ComponentNavigationsAuxiliaryNavigation';
export const AuxiliaryNavigation = ({ staticData }) => {
  const selectedSettings = selectSettings(staticData.settings);
  const {
    navigationBoxSx,
    navigationItemSx,
    activeNavigationItemSx,
    navigationItemIconBoxSx,
    activeNavigationItemTypographySx,
    navigationItemTypographySx
  } = selectedSettings;

  const navigation = useNavigation(NAVIGATION_TYPES.auxiliary, CHANNELS.desktop);
  const filteredByCountryNavigationAttributes = useNavigationFilteringByCountry(
    navigation?.attributes
  );
  const [activeMenuItem] = useActiveNavigation(filteredByCountryNavigationAttributes?.menuGroups);
  return filteredByCountryNavigationAttributes ? (
    <Box component="nav" sx={{ display: 'flex', ...navigationBoxSx }}>
      {filteredByCountryNavigationAttributes.menuGroups &&
        filteredByCountryNavigationAttributes.menuGroups.map((menuGroup) =>
          menuGroup.menuItems.map((menuItem) => {
            const iconAttributes = menuItem.icon.data?.attributes;

            return (
              <NextLinkComposed
                key={menuItem.id}
                {...(menuItem.linkOpeningType === LINK_OPENING_TYPE.openBlank && {
                  target: '_blank'
                })}
                to={menuItem.link}
              >
                <MenuItem
                  data-testid="AuxiliaryNavigation-menu-item"
                  sx={
                    activeMenuItem?.link === menuItem.link
                      ? activeNavigationItemSx
                      : navigationItemSx
                  }
                >
                  {iconAttributes && (
                    <Box
                      sx={{
                        mr: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...navigationItemIconBoxSx
                      }}
                    >
                      <Image
                        alt={iconAttributes.alternativeText}
                        height={16}
                        src={iconAttributes.url}
                        width={16}
                      />
                    </Box>
                  )}
                  <Typography
                    color="text.primary"
                    sx={
                      activeMenuItem?.link === menuItem.link
                        ? activeNavigationItemTypographySx
                        : navigationItemTypographySx
                    }
                  >
                    {menuItem.text}
                  </Typography>
                </MenuItem>
              </NextLinkComposed>
            );
          })
        )}
    </Box>
  ) : null;
};

const auxiliaryNavigationSettingsType = shape({
  navigationBoxSx: shape(),
  activeNavigationItemSx: shape(),
  navigationItemSx: shape(),
  navigationItemIconBoxSx: shape(),
  activeNavigationItemTypographySx: shape(),
  navigationItemTypographySx: shape()
});

AuxiliaryNavigation.propTypes = {
  staticData: shape({
    settings: shape({
      useCustomSettings: bool,
      customSettings: auxiliaryNavigationSettingsType,
      defaultSettings: auxiliaryNavigationSettingsType
    })
  })
};
AuxiliaryNavigation.defaultProps = {
  staticData: null
};
