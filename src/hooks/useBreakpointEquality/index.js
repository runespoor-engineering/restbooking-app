import matchBreakpointEquality from '../../utils/mediaQueryBreakpoints/matchBreakpointEquality';
import useCurrentBreakpoint from '../useCurrentBreakpoint';

/**
 * @param {'xsUp' | 'smUp' | 'mdUp' | 'lgUp' | 'xlUp' | 'xsDown' | 'smDown' | 'mdDown' | 'lgDown' | 'xlDown' | null} breakpoint
 * @returns boolean - The breakpoint matches the current breakpoint.
 */
const useBreakpointEquality = (breakpoint) => {
  const currentBreakpoint = useCurrentBreakpoint();
  return matchBreakpointEquality(breakpoint, currentBreakpoint);
};

export default useBreakpointEquality;
