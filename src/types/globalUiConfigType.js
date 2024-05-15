import { bool, shape, string } from 'prop-types';

import imageType from './cmsComponents/common/imageType';

export default shape({
  gameThumbnail: string,
  theme: shape({
    useCustomTheme: bool,
    defaultDarkTheme: shape(),
    defaultLightTheme: shape(),
    customDarkTheme: shape(),
    customLightTheme: shape()
  }),
  logo: shape({
    lightSmall: imageType,
    darkSmall: imageType,
    lightLarge: imageType,
    darkLarge: imageType
  })
});
