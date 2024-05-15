import { BREAKPOINT_DIRECTIONS, MUI_BREAKPOINTS_LIST } from '../../constants/muiConstants';

const matchBreakpointEquality = (breakpoint, currentBreakpointValue) => {
  if (!breakpoint) return false;
  const breakpointValue = breakpoint.slice(0, 2);
  const breakPointDirection = breakpoint.toLowerCase().slice(2);

  const breakpointIndex = MUI_BREAKPOINTS_LIST.findIndex(
    (muiBreakpoint) => muiBreakpoint === breakpointValue
  );
  const currentBreakpointIndex = MUI_BREAKPOINTS_LIST.findIndex(
    (muiBreakpoint) => muiBreakpoint === currentBreakpointValue
  );

  return breakPointDirection === BREAKPOINT_DIRECTIONS.up
    ? breakpointIndex <= currentBreakpointIndex
    : breakpointIndex > currentBreakpointIndex;
};

export default matchBreakpointEquality;
