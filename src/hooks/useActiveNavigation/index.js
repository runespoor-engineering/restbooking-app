import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const normalizeLink = (link) => {
  if (!link) return null;
  const path = link.split('?')[0];
  return path?.length > 1 ? path?.replaceAll(/(^\/|\/$)?/g, '') : path;
};

export const isNavigationItemActive = (navigationItemLink, asPath) => {
  return navigationItemLink && asPath
    ? normalizeLink(navigationItemLink) === normalizeLink(asPath)
    : false;
};

export const findActiveMenuSubItem = (menuSubItems, asPath) => {
  return menuSubItems?.find((menuSubItem) => isNavigationItemActive(menuSubItem.link, asPath));
};

export const findActiveMenuItem = (menuGroups, asPath) => {
  return menuGroups?.reduce(
    (activeMenuItem, menuGroup) =>
      menuGroup.menuItems?.find(
        (menuItem) =>
          isNavigationItemActive(menuItem.link, asPath) ||
          !!findActiveMenuSubItem(menuItem.menuSubItems, asPath)
      ),
    null
  );
};

const useActiveNavigation = (menuGroups) => {
  const { asPath } = useRouter();

  const activeMenuItem = useMemo(
    () => findActiveMenuItem(menuGroups, asPath),
    [asPath, menuGroups]
  );
  const activeMenuSubItem = useMemo(
    () => findActiveMenuSubItem(activeMenuItem?.menuSubItems, asPath),
    [activeMenuItem?.menuSubItems, asPath]
  );

  return [activeMenuItem, activeMenuSubItem];
};

export default useActiveNavigation;
