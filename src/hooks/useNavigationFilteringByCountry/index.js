import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import { COOKIE_NAMES } from '../../constants/browser';

const removeMenuItemsByCountry = (navigationAttributes, countryCode) => {
  if (!navigationAttributes?.menuGroups) return navigationAttributes;

  const updatedMenuGroups = navigationAttributes.menuGroups?.map((menuGroup) => {
    if (!menuGroup?.menuItems) return menuGroup;

    const filteredMenuItems = menuGroup.menuItems.filter((menuItem) => {
      if (menuItem.restrictFor?.length) {
        if (!countryCode || menuItem.restrictFor.includes(countryCode)) return false;
      }
      return true;
    });
    return { ...menuGroup, menuItems: filteredMenuItems };
  });
  return { ...navigationAttributes, menuGroups: updatedMenuGroups };
};

const useNavigationFilteringByCountry = (navigationAttributes) => {
  const cookies = parseCookies();
  const countryCode = cookies[COOKIE_NAMES.playerCountryCode];
  const [filteredNavigationAttributes, setFilteredNavigationAttributes] = useState(
    removeMenuItemsByCountry(navigationAttributes)
  );

  useEffect(() => {
    setFilteredNavigationAttributes(removeMenuItemsByCountry(navigationAttributes, countryCode));
  }, [navigationAttributes, countryCode]);

  return filteredNavigationAttributes;
};

export default useNavigationFilteringByCountry;
