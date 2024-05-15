import { styled } from '@mui/material/styles';
import { number, shape, string } from 'prop-types';

import { getAspectRatioKeeperProperties } from './utils';

const StyledAspectRatioKeeperWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'aspectRatioKeeper'
})(({ theme, aspectRatioKeeper }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  [theme.breakpoints.up('xs')]: {
    ...getAspectRatioKeeperProperties(aspectRatioKeeper, 'xs')
  },
  [theme.breakpoints.up('sm')]: {
    ...getAspectRatioKeeperProperties(aspectRatioKeeper, 'sm')
  },
  [theme.breakpoints.up('md')]: {
    ...getAspectRatioKeeperProperties(aspectRatioKeeper, 'md')
  },
  [theme.breakpoints.up('lg')]: {
    ...getAspectRatioKeeperProperties(aspectRatioKeeper, 'lg')
  },
  [theme.breakpoints.up('xl')]: {
    ...getAspectRatioKeeperProperties(aspectRatioKeeper, 'xl')
  }
}));

const AspectRatioKeeper = ({ aspectRatioKeeper }) => {
  return <StyledAspectRatioKeeperWrapper aspectRatioKeeper={aspectRatioKeeper} />;
};

export const aspectRatioKeeperType = shape({
  xs: shape({
    height: string,
    aspectRatio: number
  }),
  sm: shape({
    height: string,
    aspectRatio: number
  }),
  md: shape({
    height: string,
    aspectRatio: number
  }),
  lg: shape({
    height: string,
    aspectRatio: number
  }),
  xl: shape({
    height: string,
    aspectRatio: number
  })
});

AspectRatioKeeper.propTypes = {
  aspectRatioKeeper: aspectRatioKeeperType
};

AspectRatioKeeper.defaultProps = {
  aspectRatioKeeper: null
};

export default AspectRatioKeeper;
