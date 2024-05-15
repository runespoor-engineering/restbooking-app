import { useContext, useMemo } from 'react';

import { useCmsStaticDataContext } from '../../context/CmsStaticDataContext';
import { UserContext } from '../../context/UserContext/UserContext';
import { isMobile } from '../../utils/deviceDetection';
import matchBreakpointEquality from '../../utils/mediaQueryBreakpoints/matchBreakpointEquality';

const filterNavigationsByType = (navigationsData, type) =>
  navigationsData.filter((navigation) => navigation.attributes.type === type);

const filterNavigationsByChannel = (navigationsData, requiredChannel) => {
  const currentChannel = requiredChannel || (isMobile() ? 'mobile' : 'desktop');
  const filteredNavigationsByChannel = navigationsData.filter(
    (navigation) => navigation.attributes.channel === currentChannel
  );
  const genericChannelNavigations = navigationsData.filter(
    (navigation) => navigation.attributes.channel === 'generic'
  );
  return filteredNavigationsByChannel.length > 0
    ? filteredNavigationsByChannel
    : genericChannelNavigations;
};

const filterNavigationsByAuthenticationState = (navigationsData, isLoggedIn) => {
  const currentAuthenticationState = isLoggedIn ? 'authenticated' : 'anonymous';
  const filteredNavigationsByAuthenticationState = navigationsData.filter(
    (navigation) => navigation.attributes.authenticationState === currentAuthenticationState
  );
  const genericAuthenticationNavigations = navigationsData.filter(
    (navigation) => navigation.attributes.authenticationState === 'generic'
  );
  return filteredNavigationsByAuthenticationState.length > 0
    ? filteredNavigationsByAuthenticationState
    : genericAuthenticationNavigations;
};

const findGenericNavigation = (navigationsData, type, currentBreakpoint) =>
  navigationsData.find(
    (navigation) =>
      navigation.attributes.type === type &&
      navigation.attributes.authenticationState === 'generic' &&
      navigation.attributes.channel === 'generic' &&
      matchBreakpointEquality(navigation.attributes.useBreakpoint, currentBreakpoint)
  );

const findNavigation = (navigationsData, type, isLoggedIn, requiredChannel) => {
  const filteredNavigationsByType = filterNavigationsByType(navigationsData, type);
  const filteredNavigationsByChannel = filterNavigationsByChannel(
    filteredNavigationsByType,
    requiredChannel
  );
  const filteredNavigationsByAuthenticationState = filterNavigationsByAuthenticationState(
    filteredNavigationsByChannel,
    isLoggedIn
  );

  return (
    filteredNavigationsByAuthenticationState[0] || findGenericNavigation(navigationsData, type)
  );
};

const useNavigation = (type, requiredChannel) => {
  const { isLoggedIn } = useContext(UserContext);
  const { navigations } = useCmsStaticDataContext();

  return useMemo(
    () => findNavigation(navigations.data, type, isLoggedIn, requiredChannel),
    [navigations.data, isLoggedIn, requiredChannel, type]
  );
};

export default useNavigation;
