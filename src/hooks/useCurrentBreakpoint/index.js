import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';

/**
 * Hook that returns the current MUI breakpoint up value.
 * @returns {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
 */
const useCurrentBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('xs');

  const xsUp = useMediaQuery((theme) => theme.breakpoints.up('xs'));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const xlUp = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  useEffect(() => {
    const currentBreakpointObject = [
      { value: xlUp, name: 'xl' },
      { value: lgUp, name: 'lg' },
      { value: mdUp, name: 'md' },
      { value: smUp, name: 'sm' },
      { value: xsUp, name: 'xs' }
    ].find((breakpointObject) => breakpointObject.value === true);

    setCurrentBreakpoint(currentBreakpointObject?.name);
  }, [lgUp, mdUp, smUp, xlUp, xsUp]);

  return currentBreakpoint;
};

export default useCurrentBreakpoint;
