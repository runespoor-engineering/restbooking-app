import { useMemo } from 'react';

import { getResponsiveValue } from '../../utils/mediaQueryBreakpoints';
import useCurrentBreakpoint from '../useCurrentBreakpoint';

const useResponsiveValue = (valueBreakpoints, defaultValue) => {
  const currentBreakpoint = useCurrentBreakpoint();
  return useMemo(
    () => getResponsiveValue(valueBreakpoints, currentBreakpoint) || defaultValue,
    [currentBreakpoint, defaultValue, valueBreakpoints]
  );
};

export default useResponsiveValue;
