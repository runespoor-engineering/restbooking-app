import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { getPositionedContainerProperties } from './utils';

const PositionedContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'aspectRatioKeeper'
})(({ aspectRatioKeeper, theme }) => ({
  top: 0,
  left: 0,
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    ...getPositionedContainerProperties(aspectRatioKeeper, 'xs')
  },
  [theme.breakpoints.up('sm')]: {
    ...getPositionedContainerProperties(aspectRatioKeeper, 'sm')
  },
  [theme.breakpoints.up('md')]: {
    ...getPositionedContainerProperties(aspectRatioKeeper, 'md')
  },
  [theme.breakpoints.up('lg')]: {
    ...getPositionedContainerProperties(aspectRatioKeeper, 'lg')
  },
  [theme.breakpoints.up('xl')]: {
    ...getPositionedContainerProperties(aspectRatioKeeper, 'xl')
  }
}));

export default PositionedContainer;
