import { useMemo } from 'react';

import { MUI_BREAKPOINTS_WIDTH_MAP } from '../../constants/muiConstants';

// xs at the end because it image size will be set as default;
const MUI_BREAKPOINTS_ORDERED_LIST = ['sm', 'md', 'lg', 'xl', 'xs'];

/**
 * Custom hook that calculates image sizes based on breakpoints.
 * @param {object} breakpoints - Object containing breakpoint values.
 * @returns {string} - Comma-separated string of image sizes.
 */

const useImageSizes = (breakpoints = {}) =>
  useMemo(() => {
    /**
     * Calculates image sizes based on breakpoints.
     * @returns {string[]} - Array of image size attributes.
     */
    const imageSizeArray = MUI_BREAKPOINTS_ORDERED_LIST.reduce((acc, key) => {
      const breakPointMaxWidthValue = MUI_BREAKPOINTS_WIDTH_MAP[key];
      const imageViewportWidth =
        Number(breakpoints[key]) > 0
          ? `${Number(((100 / 12) * breakpoints[key]).toFixed(2))}vw`
          : '100vw';
      const breakPointMaxWidthAttr = breakPointMaxWidthValue
        ? `(min-width: ${breakPointMaxWidthValue}px) ${imageViewportWidth}`
        : imageViewportWidth;

      return [...acc, breakPointMaxWidthAttr];
    }, []);

    return imageSizeArray.join(', ');
  }, [breakpoints]);

export default useImageSizes;
