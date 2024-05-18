import { bool, func, number, oneOfType, shape, string } from 'prop-types';
import React, { memo } from 'react';

import useResponsiveValue from '../../../hooks/useResponsiveValue';
import Image from '../Image';

const ResponsiveDimensionsImage = ({ width, height, ...restNextImageProps }) => {
  const responsiveWidth = useResponsiveValue(width);
  const responsiveHeight = useResponsiveValue(height);
  return <Image height={responsiveHeight} width={responsiveWidth} {...restNextImageProps} />;
};

ResponsiveDimensionsImage.propTypes = {
  src: string.isRequired,
  width: oneOfType([
    number,
    shape({
      xs: number,
      sm: number,
      md: number,
      lg: number,
      xl: number
    })
  ]),
  height: oneOfType([
    number,
    shape({
      xs: number,
      sm: number,
      md: number,
      lg: number,
      xl: number
    })
  ]),
  alt: string,
  loader: func,
  fill: bool,
  sizes: string,
  quality: number,
  priority: bool,
  placeholder: string,
  style: shape(),
  onLoadingComplete: func,
  onLoad: func,
  onError: func,
  loading: string,
  blurDataURL: string
};

ResponsiveDimensionsImage.defaultProps = {
  width: undefined,
  height: undefined,
  alt: undefined,
  loader: undefined,
  fill: false,
  sizes: undefined,
  quality: undefined,
  priority: false,
  placeholder: undefined,
  style: undefined,
  onLoadingComplete: undefined,
  onLoad: undefined,
  onError: undefined,
  loading: undefined,
  blurDataURL: undefined
};

export default memo(ResponsiveDimensionsImage);
