/**
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} currentBreakpoint
 * @param {Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'>} availableBreakpoints
 * @returns {'xs' | 'sm' | 'md' | 'lg' | 'xl'} - The nearest active breakpoint.
 */
const findNearestAvailableBreakpoint = (currentBreakpoint, availableBreakpoints) => {
  const defaultBreakpoints = ['xl', 'lg', 'md', 'sm', 'xs'];
  const currentBreakpointIndex = defaultBreakpoints.findIndex(
    (breakpoint) => breakpoint === currentBreakpoint
  );

  const nearestAvailableBreakpoint = defaultBreakpoints.find(
    (breakpoint, breakpointIndex) =>
      availableBreakpoints.includes(breakpoint) && breakpointIndex >= currentBreakpointIndex
  );

  return nearestAvailableBreakpoint;
};

export default findNearestAvailableBreakpoint;
