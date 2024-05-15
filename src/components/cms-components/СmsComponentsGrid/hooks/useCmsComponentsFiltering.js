import { useContext, useMemo } from 'react';

import { BUTTON_ACTIONS } from '../../../../constants/cms';
import { UserContext } from '../../../../context/UserContext/UserContext';
import useCurrentBreakpoint from '../../../../hooks/useCurrentBreakpoint';
import isMobileDevice from '../../../../utils/deviceDetection/isMobile';
import matchBreakpointEquality from '../../../../utils/mediaQueryBreakpoints/matchBreakpointEquality';
import {
  GameAnonymousActionButtonCmsName,
  GameAuthenticatedActionButtonCmsName
} from '../../ActionButton';
import ActionButtonContext from '../../ActionButton/context/ActionButtonContext';
import ANONYMOUS_CMS_COMPONENTS_NAMES from '../cmsComponentsMaps/anonymousCmsCmponentNames';
import AUTHENTICATED_CMS_COMPONENTS_NAMES from '../cmsComponentsMaps/authenticatedCmsCmponentNames';

const isBreakpointAllowed = (cmsComponent, currentBreakpoint) =>
  !Object.keys(cmsComponent).includes('useBreakpoint') ||
  matchBreakpointEquality(cmsComponent.useBreakpoint.breakpoint, currentBreakpoint);

const isGameActionButtonAllowed = (gameActionButtonData, actionButtonContextValue) =>
  gameActionButtonData.muiButtonAction !== BUTTON_ACTIONS.playDemo ||
  typeof actionButtonContextValue?.isDemoModeSupported !== 'boolean' ||
  (actionButtonContextValue.isDemoModeSupported && !isMobileDevice());

const isComponentAllowedByUserState = (isLoggedIn, cmsComponentName) =>
  !Object.values(
    isLoggedIn ? ANONYMOUS_CMS_COMPONENTS_NAMES : AUTHENTICATED_CMS_COMPONENTS_NAMES
  ).includes(cmsComponentName);

const useCmsComponentsFiltering = (cmsComponents) => {
  const actionButtonContextValue = useContext(ActionButtonContext);
  const currentBreakpoint = useCurrentBreakpoint();
  const { isLoggedIn } = useContext(UserContext);

  const filteredSectionsByBreakpoint = useMemo(
    () =>
      cmsComponents.filter(
        (cmsComponent) =>
          (![GameAnonymousActionButtonCmsName, GameAuthenticatedActionButtonCmsName].includes(
            cmsComponent.__typename
          ) ||
            isGameActionButtonAllowed(cmsComponent, actionButtonContextValue)) &&
          isBreakpointAllowed(cmsComponent, currentBreakpoint) &&
          isComponentAllowedByUserState(isLoggedIn, cmsComponent.__typename)
      ),
    [cmsComponents, actionButtonContextValue, currentBreakpoint, isLoggedIn]
  );

  return filteredSectionsByBreakpoint;
};

export default useCmsComponentsFiltering;
