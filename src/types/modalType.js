import { arrayOf, oneOfType, shape, string } from 'prop-types';

import imageType from './cmsComponents/common/imageType';
import formType from './form/formType';
import richTextType from './richTextType';

export default shape({
  name: string,
  backdropImage: imageType,
  uiComponents: arrayOf(oneOfType([arrayOf(formType), richTextType]).isRequired)
});
