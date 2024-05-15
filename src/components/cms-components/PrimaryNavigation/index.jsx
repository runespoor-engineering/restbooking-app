import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { bool, shape } from 'prop-types';

import { LINK_OPENING_TYPE, NAVIGATION_TYPES } from '../../../constants/cms';
import useActiveNavigation from '../../../hooks/useActiveNavigation';
import useNavigation from '../../../hooks/useNavigation';
import useNavigationFilteringByCountry from '../../../hooks/useNavigationFilteringByCountry';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import NextLinkComposed from '../../common/NextLinkComposed';
import NavigationItem from './components/NavigationItem/NavigationItem';

export const PrimaryNavigationCmsName = 'ComponentNavigationsPrimaryNavigation';
export const PrimaryNavigation = ({ staticData }) => {
  const { settings, expandIcon, collapseIcon } = staticData || {};
  const selectedSettings = selectSettings(settings);
  const {
    navBoxSx,
    navigationGroupBoxSx,
    activeNavigationItemBoxSx,
    navigationItemBoxSx,
    navigationItemIconBoxSx,
    activeNavigationItemTypographySx,
    navigationItemTypographySx,
    subItemsCollapseBoxSx,
    imageProps,
    collapseImageProps
  } = selectedSettings;

  const navigation = useNavigation(NAVIGATION_TYPES.primary);
  const filteredByCountryNavigationAttributes = useNavigationFilteringByCountry(
    navigation?.attributes
  );
  const [activeMenuItem, activeMenuSubItem] = useActiveNavigation(
    filteredByCountryNavigationAttributes?.menuGroups
  );

  return filteredByCountryNavigationAttributes ? (
    <Box component="nav" data-testid="PrimaryNavigation-sidebar-nav" sx={navBoxSx}>
      {filteredByCountryNavigationAttributes.menuGroups?.map((menuGroup) =>
        menuGroup.menuItems.map((menuItem) => {
          const currentNavigationItemTypographySx =
            activeMenuItem?.link === menuItem.link
              ? activeNavigationItemTypographySx
              : navigationItemTypographySx;
          return (
            <Box
              key={menuItem?.id}
              sx={{
                '&:not(:first-of-type)': {
                  marginTop: { xs: '16px', sm: '20px' }
                },
                ...navigationGroupBoxSx
              }}
            >
              <NextLinkComposed
                passHref
                to={menuItem.link}
                {...(menuItem.linkOpeningType === LINK_OPENING_TYPE.openBlank && {
                  target: '_blank'
                })}
              >
                <NavigationItem
                  activeMenuSubItemLink={activeMenuSubItem?.link}
                  collapseIconAttributes={collapseIcon?.data?.attributes}
                  complexSx={{
                    navigationItemBoxSx:
                      activeMenuItem?.link === menuItem.link
                        ? activeNavigationItemBoxSx
                        : navigationItemBoxSx,
                    iconBoxSx: navigationItemIconBoxSx,
                    subItemsCollapseBoxSx,
                    imageProps,
                    collapseImageProps
                  }}
                  data-testid="PrimaryNavigation-sidebar-link"
                  expandIconAttributes={expandIcon?.data?.attributes}
                  icon={menuItem.icon}
                  menuSubItems={menuItem?.menuSubItems}
                  navigationItemBoxSx={
                    activeMenuItem?.link === menuItem.link
                      ? activeNavigationItemBoxSx
                      : navigationItemBoxSx
                  }
                  navigationSubItemComplexSx={selectedSettings}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '16px', lg: '18px' },
                      lineHeight: { xs: '18px', lg: '21px' },
                      ...currentNavigationItemTypographySx
                    }}
                  >
                    {menuItem.text}
                  </Typography>
                </NavigationItem>
              </NextLinkComposed>
            </Box>
          );
        })
      )}
    </Box>
  ) : null;
};

const primaryNavigationSettings = shape({
  navBoxSx: shape(),
  navigationGroupBoxSx: shape(),
  activeNavigationItemBoxSx: shape(),
  navigationItemBoxSx: shape(),
  navigationItemIconBoxSx: shape(),
  activeNavigationItemTypographySx: shape(),
  navigationItemTypographySx: shape(),
  navigationSubItemBoxSx: shape(),
  activeNavigationSubItemBoxSx: shape(),
  navigationSubItemIconBoxSx: shape(),
  navigationSubItemTypographySx: shape(),
  activeNavigationSubItemTypographySx: shape(),
  subItemsCollapseBoxSx: shape(),
  imageProps: shape(),
  collapseImageProps: shape()
});

PrimaryNavigation.propTypes = {
  staticData: shape({
    settings: shape({
      useCustomSettings: bool.isRequired,
      customSettings: primaryNavigationSettings,
      defaultSettings: primaryNavigationSettings
    }),
    expandIcon: shape(),
    collapseIcon: shape()
  }).isRequired
};
