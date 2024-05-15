import { isObject } from '../../defining';
import findNearestAvailableBreakpoint from '../findNearestAvailableBreakpoint';

const getResponsiveValue = (responsiveValues, currentBreakpoint) => {
  if (!isObject(responsiveValues)) return responsiveValues;
  const availableBreakpoints = Object.keys(responsiveValues);
  const nearestAvailableBreakpoint = findNearestAvailableBreakpoint(
    currentBreakpoint,
    availableBreakpoints
  );
  return responsiveValues[nearestAvailableBreakpoint];
};

export default getResponsiveValue;
