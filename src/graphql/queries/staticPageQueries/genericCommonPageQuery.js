import { gql } from '@apollo/client';

import {
  APARTMENT_CATEGORY_FRAGMENT,
  APARTMENT_PREVIEW_FRAGMENT,
  BANNER_FRAGMENT,
  BRAND_FRAGMENT,
  COMMON_PAGE_FRAGMENT,
  FAQ_CATEGORY_FRAGMENT,
  FAQ_FRAGMENT,
  GENERIC_COLLECTIONS_FRAGMENT,
  GLOBAL_UI_CONFIG_FRAGMENT,
  LANGUAGE_FRAGMENT,
  NAVIGATION_FRAGMENT,
  TEMPLATE_APARTMENT_PREVIEW_FRAGMENT
} from '../../fragments/collections';
import { IMAGE_FRAGMENT } from '../../fragments/common';
import {
  APARTMENT_ANONYMOUS_ACTION_BUTTON_COMPONENT_FRAGMENT,
  APARTMENT_AUTHENTICATED_ACTION_BUTTON_COMPONENT_FRAGMENT,
  BANNER_ANONYMOUS_ACTION_BUTTON_COMPONENT_FRAGMENT,
  BANNER_AUTHENTICATED_ACTION_BUTTON_COMPONENT_FRAGMENT,
  BANNERS_SLIDER_COMPONENT_FRAGMENT,
  FAQ_CATALOG_COMPONENT_FRAGMENT,
  FAQ_CATALOG_MANUAL_COMPONENT_FRAGMENT,
  FORM_COMPONENT_FRAGMENT,
  FORM_STEP_COMPONENT_FRAGMENT,
  GLOBAL_GENERIC_ACTION_BUTTON_COMPONENT_FRAGMENT,
  IFRAME_COMPONENT_FRAGMENT,
  PERMISSIONS_FRAGMENT,
  PLAYER_ACCOUNT_NAVIGATION_COMPONENT_FRAGMENT,
  RICH_TEXT_COMPONENT_FRAGMENT,
  SEO_COMPONENT_FRAGMENT,
  SETTINGS_JSON_COMPONENT_FRAGMENT,
  SPECIALTY_BUTTON_COMPONENT_FRAGMENT,
  THEME_COMPONENT_FRAGMENT,
  USE_BREAKPOINT_COMPONENT_FRAGMENT
} from '../../fragments/components';
import { APARTMENTS_CATALOG_COMPONENT_FRAGMENT, APARTMENT_TITLE_PLACEHOLDER_COMPONENT_FRAGMENT } from '../../fragments/components/apartments';

export default gql`
  ${THEME_COMPONENT_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SEO_COMPONENT_FRAGMENT}
  ${SETTINGS_JSON_COMPONENT_FRAGMENT}
  ${PERMISSIONS_FRAGMENT}
  ${FORM_STEP_COMPONENT_FRAGMENT}
  ${GENERIC_COLLECTIONS_FRAGMENT}
  ${FORM_COMPONENT_FRAGMENT}
  ${RICH_TEXT_COMPONENT_FRAGMENT}
  ${COMMON_PAGE_FRAGMENT}
  ${BRAND_FRAGMENT}
  ${GLOBAL_UI_CONFIG_FRAGMENT}
  ${NAVIGATION_FRAGMENT}
  ${SPECIALTY_BUTTON_COMPONENT_FRAGMENT}
  ${BANNER_FRAGMENT}
  ${BANNERS_SLIDER_COMPONENT_FRAGMENT}
  ${FAQ_FRAGMENT}
  ${FAQ_CATEGORY_FRAGMENT}
  ${FAQ_CATALOG_COMPONENT_FRAGMENT}
  ${LANGUAGE_FRAGMENT}
  ${IFRAME_COMPONENT_FRAGMENT}
  ${USE_BREAKPOINT_COMPONENT_FRAGMENT}
  ${PLAYER_ACCOUNT_NAVIGATION_COMPONENT_FRAGMENT}
  ${BANNER_ANONYMOUS_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${BANNER_AUTHENTICATED_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${GLOBAL_GENERIC_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${FAQ_CATALOG_MANUAL_COMPONENT_FRAGMENT}
  ${APARTMENT_CATEGORY_FRAGMENT}
  ${APARTMENT_PREVIEW_FRAGMENT}
  ${TEMPLATE_APARTMENT_PREVIEW_FRAGMENT}
  ${APARTMENT_TITLE_PLACEHOLDER_COMPONENT_FRAGMENT}
  ${APARTMENT_ANONYMOUS_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${APARTMENT_AUTHENTICATED_ACTION_BUTTON_COMPONENT_FRAGMENT}
  ${APARTMENTS_CATALOG_COMPONENT_FRAGMENT}
  query (
    $slug: String!
    $brandIdentifier: String!
    $locale: I18NLocaleCode!
    $publicationState: PublicationState
  ) {
    ...commonPageFragment
    ...genericCollectionsFragment
  }
`;
