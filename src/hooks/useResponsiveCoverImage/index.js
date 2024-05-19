import { useMemo } from 'react';

import { getResponsiveValue } from '../../utils/mediaQueryBreakpoints';
import useCurrentBreakpoint from '../useCurrentBreakpoint';

const IMAGE_TYPE_TO_PROP_NAME_MAPPER = {
  small: 'smallImage',
  large: 'largeImage'
};

const IMAGE_TYPE_TO_SETTINGS_PROP_NAME_MAPPER = {
  small: 'smallImageSettings',
  large: 'largeImageSettings'
};

const useResponsiveCoverImage = (coverImage) => {
  const { imageTypeBreakPoints } = coverImage?.settings || {};
  const currentBreakpoint = useCurrentBreakpoint();
  const imageType = useMemo(() => {
    if (imageTypeBreakPoints)
      return getResponsiveValue(coverImage?.settings?.imageTypeBreakPoints, currentBreakpoint);
    return 'large';
  }, [imageTypeBreakPoints, coverImage?.settings?.imageTypeBreakPoints, currentBreakpoint]);

  const responsiveCoverImage = useMemo(
    () => ({
      image: coverImage?.[IMAGE_TYPE_TO_PROP_NAME_MAPPER[imageType]],
      settings: coverImage?.settings?.[IMAGE_TYPE_TO_SETTINGS_PROP_NAME_MAPPER[imageType]]
    }),
    [coverImage, imageType]
  );

  return responsiveCoverImage;
};

export default useResponsiveCoverImage;
