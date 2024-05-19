import { oneOf, shape } from 'prop-types';

import useResponsiveCoverImage from '../../../hooks/useResponsiveCoverImage';
import { imageType } from '../../../types';
import Image from '../Image';

const CoverImage = ({ coverImage }) => {
  const { image, settings } = useResponsiveCoverImage(coverImage);
  const { imageProps } = settings || {};
  const imageAttributes = image?.data?.attributes;

  return imageAttributes ? (
    <Image
      fill
      alt={imageAttributes.alternativeText}
      objectFit="cover"
      src={imageAttributes.url}
      {...imageProps}
    />
  ) : null;
};

export const coverImageType = shape({
  smallImage: imageType.isRequired,
  largeImage: imageType.isRequired,
  settings: shape({
    smallImageSettings: shape({
      imageProps: shape()
    }),
    largeImageSettings: shape({
      imageProps: shape()
    }),
    imageTypeBreakPoints: shape({
      xs: oneOf(['small', 'large']),
      sm: oneOf(['small', 'large']),
      md: oneOf(['small', 'large']),
      lg: oneOf(['small', 'large']),
      xl: oneOf(['small', 'large'])
    })
  })
});

CoverImage.propTypes = {
  coverImage: coverImageType.isRequired
};

export default CoverImage;
