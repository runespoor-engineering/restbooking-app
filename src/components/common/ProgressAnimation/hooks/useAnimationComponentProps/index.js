import { useMemo } from 'react';

import { PROGRESS_ANIMATION_TYPES } from '../../../../../constants/cms';

const useAnimationComponentProps = ({
  type,
  image,
  richText,
  imageProps,
  muiCircularProgressProps
}) => {
  return useMemo(() => {
    const TYPE_TO_PROPS_MAP = {
      [PROGRESS_ANIMATION_TYPES.image]: {
        src: image?.data?.attributes?.url,
        ...imageProps
      },
      [PROGRESS_ANIMATION_TYPES.richText]: {
        markdown: richText
      },
      [PROGRESS_ANIMATION_TYPES.mui]: {
        color: 'primary',
        ...muiCircularProgressProps
      }
    };
    return TYPE_TO_PROPS_MAP[type] || TYPE_TO_PROPS_MAP.mui;
  }, [image?.data?.attributes, imageProps, muiCircularProgressProps, richText, type]);
};

export default useAnimationComponentProps;
