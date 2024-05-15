import { gql } from '@apollo/client';

import { IMAGE_FRAGMENT } from '../common';
import {
  AUXILIARY_NAVIGATION_COMPONENT_FRAGMENT,
  GLOBAL_ANONYMOUS_ACTION_BUTTON_COMPONENT_FRAGMENT,
  GLOBAL_AUTHENTICATED_ACTION_BUTTON_COMPONENT_FRAGMENT,
  IMAGE_DIMENSIONS_COMPONENT_FRAGMENT,
  LANGUAGE_SWITCHER_COMPONENT_FRAGMENT,
  LOGO_COMPONENT_FRAGMENT,
  PLAYER_ACCOUNT_MENU_BUTTON_COMPONENT_FRAGMENT,
  PRIMARY_NAVIGATION_COMPONENT_FRAGMENT,
  RICH_TEXT_COMPONENT_FRAGMENT,
  SECONDARY_NAVIGATION_COMPONENT_FRAGMENT,
  SETTINGS_JSON_COMPONENT_FRAGMENT,
  SPECIALTY_BUTTON_COMPONENT_FRAGMENT,
  SPECIALTY_LINK_BUTTON_COMPONENT_FRAGMENT,
  THEME_SWITCHER_COMPONENT_FRAGMENT,
  USE_BREAKPOINT_COMPONENT_FRAGMENT
} from '../components';

export default gql`
  ${SETTINGS_JSON_COMPONENT_FRAGMENT}
  ${AUXILIARY_NAVIGATION_COMPONENT_FRAGMENT},
  ${LOGO_COMPONENT_FRAGMENT},
  ${GLOBAL_ANONYMOUS_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${SPECIALTY_BUTTON_COMPONENT_FRAGMENT}
  ${PLAYER_ACCOUNT_MENU_BUTTON_COMPONENT_FRAGMENT}
  ${USE_BREAKPOINT_COMPONENT_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${IMAGE_DIMENSIONS_COMPONENT_FRAGMENT}
  ${GLOBAL_AUTHENTICATED_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${THEME_SWITCHER_COMPONENT_FRAGMENT}
  ${LANGUAGE_SWITCHER_COMPONENT_FRAGMENT}
  ${PRIMARY_NAVIGATION_COMPONENT_FRAGMENT}
  ${SECONDARY_NAVIGATION_COMPONENT_FRAGMENT}
  ${RICH_TEXT_COMPONENT_FRAGMENT}
  fragment layoutFragment on Layout {
    anonymousHeaderUiComponents {
      ...logoComponentFragment
      ...auxiliaryNavigationComponentFragment
      ...globalAnonymousActionButtonComponentFragment
    }
    authenticatedHeaderUiComponents {
      ...logoComponentFragment
      ...auxiliaryNavigationComponentFragment
      ...playerAccountMenuButtonComponentFragment
      ...globalAuthenticatedActionButtonComponentFragment
    }
    headerComponentsGridContainerSettings {
      ...settingsJsonComponentFragment
    }
    headerSettings {
      ...settingsJsonComponentFragment
    }
    anonymousSidebarUiComponents {
      ...logoComponentFragment
      ...globalAnonymousActionButtonComponentFragment
      ...themeSwitcherComponentFragment
      ...languageSwitcherComponentFragment
      ...primaryNavigationComponentFragment
    }
    authenticatedSidebarUiComponents {
      ...logoComponentFragment
      ...globalAuthenticatedActionButtonComponentFragment
      ...themeSwitcherComponentFragment
      ...languageSwitcherComponentFragment
      ...primaryNavigationComponentFragment
    }
    sidebarComponentsGridContainerSettings {
      ...settingsJsonComponentFragment
    }
    sidebarSettings {
      ...settingsJsonComponentFragment
    }
    footerUiComponents {
      ...globalAnonymousActionButtonComponentFragment
      ...themeSwitcherComponentFragment
      ...languageSwitcherComponentFragment
      ...secondaryNavigationComponentFragment
      ...richTextComponentFragment
    }
    footerGridContainerSettings {
      ...settingsJsonComponentFragment
    }
    footerSettings {
      ...settingsJsonComponentFragment
    }
  }
`;
