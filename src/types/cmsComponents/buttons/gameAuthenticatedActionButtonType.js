import { bool, oneOf, shape, string } from 'prop-types';

import imageType from '../common/imageType';

export default shape({
  isMuiIconButton: bool.isRequired,
  muiButtonText: string,
  muiButtonAction: oneOf(['openLink', 'playDemo', 'playReal']),
  muiButtonLink: string,
  muiIconButtonIcon: imageType,
  muiButtonStartIcon: imageType,
  muiButtonEndIcon: imageType,
  settings: shape({
    useCustomSettings: bool.isRequired,
    defaultSettings: shape({}),
    customSettings: shape({})
  })
});
