import { arrayOf, shape, string } from 'prop-types';

import imageType from '../cmsComponents/common/imageType';

export default shape({
  id: string,
  title: string,
  slug: string,
  route: string,
  squareThumbnail: imageType,
  rectangularThumbnail: imageType,
  categories: arrayOf(
    shape({
      id: string,
      slug: string,
      title: string,
      route: string
    })
  )
});
