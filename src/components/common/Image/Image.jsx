/* eslint-disable no-restricted-imports */
import NextImage from 'next/image';
import { bool, func, number, shape, string } from 'prop-types';
import React, { memo } from 'react';

export const getStrapiMedia = (url) => {
  return url.includes('http') ? url : `http://localhost:1337${url}`;
};

const Image = ({ alt, ...restNextImageProps }) => (
  <NextImage
    unoptimized
    alt={alt || 'Image content'}
    {...restNextImageProps}
    src={getStrapiMedia(restNextImageProps.src)}
  />
);

export default memo(Image);

Image.propTypes = {
  src: string.isRequired,
  width: number,
  height: number,
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

Image.defaultProps = {
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
