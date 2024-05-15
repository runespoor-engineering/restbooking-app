import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { shape } from 'prop-types';

import { LINK_OPENING_TYPE, NAVIGATION_TYPES } from '../../../constants/cms';
import useNavigation from '../../../hooks/useNavigation';
import useNavigationFilteringByCountry from '../../../hooks/useNavigationFilteringByCountry';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import NextLinkComposed from '../../common/NextLinkComposed';
import NavigationGroup from './components/NavigationGroup';
import NavigationItem from './components/NavigationItem';

export const SecondaryNavigationCmsName = 'ComponentNavigationsSecondaryNavigation';
export const SecondaryNavigation = ({ staticData }) => {
  const selectedSettings = selectSettings(staticData.settings) || {};
  const {
    navigationBoxSx,
    navigationGroupBoxSx,
    navigationGroupTitleTypographySx,
    navigationGroupItemsBoxSx,
    navigationItemBoxSx,
    navigationItemIconBoxSx,
    navigationItemTypographySx
  } = selectedSettings;
  const navigation = useNavigation(NAVIGATION_TYPES.secondary);
  const filteredByCountryFooterNavigationAttributes = useNavigationFilteringByCountry(
    navigation?.attributes
  );

  return filteredByCountryFooterNavigationAttributes ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
        ...navigationBoxSx
      }}
    >
      {filteredByCountryFooterNavigationAttributes?.menuGroups?.map(
        ({ id, menuItems, title: menuGroupTitle }) => (
          <NavigationGroup
            key={id}
            groupBoxSx={navigationGroupBoxSx}
            navigationItemsBoxSx={navigationGroupItemsBoxSx}
            title={menuGroupTitle}
            titleTypographySx={navigationGroupTitleTypographySx}
          >
            {menuItems?.map((menuItem) => {
              return (
                <NextLinkComposed
                  key={menuItem.id}
                  passHref
                  prefetch={false}
                  to={menuItem.link}
                  {...(menuItem.linkOpeningType === LINK_OPENING_TYPE.openBlank && {
                    target: '_blank'
                  })}
                >
                  <NavigationItem
                    icon={menuItem.icon}
                    iconBoxSx={navigationItemIconBoxSx}
                    itemBoxSx={navigationItemBoxSx}
                  >
                    <Typography
                      color="text.primary"
                      sx={{
                        fontSize: { xs: '14px', sm: '16px' },
                        ...navigationItemTypographySx
                      }}
                      variant="body1"
                    >
                      {menuItem.text}
                    </Typography>
                  </NavigationItem>
                </NextLinkComposed>
              );
            })}
          </NavigationGroup>
        )
      )}
    </Box>
  ) : null;
};

SecondaryNavigation.propTypes = {
  staticData: shape().isRequired
};
