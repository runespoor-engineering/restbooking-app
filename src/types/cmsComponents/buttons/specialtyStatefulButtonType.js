import { bool, shape, string } from 'prop-types';

import imageType from '../common/imageType';

export default shape({
  isMuiIconButton: bool.isRequired,
  muiButtonText: string,
  muiIconButtonIcon: imageType,
  muiButtonStartIcon: imageType,
  muiButtonEndIcon: imageType,
  muiButtonUseActiveState: bool.isRequired,
  muiButtonTextActive: string,
  muiIconButtonIconActive: imageType,
  muiButtonStartIconActive: imageType,
  muiButtonEndIconActive: imageType,
  settings: shape({
    useCustomSettings: bool.isRequired,
    defaultSettings: shape({}),
    customSettings: shape({})
  })
});
