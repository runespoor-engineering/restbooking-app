import { shape } from 'prop-types';
import { useContext } from 'react';

import ConfigContext from '../../../context/ConfigContext';
import { ThemeContext, THEMES } from '../../../context/ThemeContext';
import useBreakpointEquality from '../../../hooks/useBreakpointEquality';
import Image from '../../common/Image';
import NextLinkComposed from '../../common/NextLinkComposed';

export const LogoCmsName = 'ComponentPageComponentsLogo';
export const Logo = ({ staticData }) => {
  const {
    logoSizeSwitchingBreakpoint,
    lightLarge,
    lightSmall,
    darkLarge,
    darkSmall,
    smallImageDimensions,
    largeImageDimensions
  } = staticData;
  const { logoDimensions: defaultLogoDimensions } = useContext(ConfigContext);
  const { currentTheme } = useContext(ThemeContext) || {};
  const currentLogo =
    currentTheme === THEMES.DARK
      ? { small: darkSmall, large: darkLarge }
      : { small: lightSmall, large: lightLarge };
  const smallLogoAttributes = currentLogo.small.data?.attributes;
  const largeLogoAttributes = currentLogo.large.data?.attributes;
  const shouldSwitchLogoSize = useBreakpointEquality(logoSizeSwitchingBreakpoint);

  return (
    <div data-testid="logo">
      {shouldSwitchLogoSize
        ? largeLogoAttributes && (
            <NextLinkComposed to="/">
              <Image
                alt={largeLogoAttributes.alternativeText}
                height={largeImageDimensions.height || defaultLogoDimensions.largeHeight}
                src={largeLogoAttributes.url}
                width={largeImageDimensions?.width || defaultLogoDimensions.largeWidth}
              />
            </NextLinkComposed>
          )
        : smallLogoAttributes && (
            <NextLinkComposed to="/">
              <Image
                alt={smallLogoAttributes.alternativeText}
                height={smallImageDimensions.height || defaultLogoDimensions.smallHeight}
                src={smallLogoAttributes.url}
                width={smallImageDimensions?.width || defaultLogoDimensions.smallWidth}
              />
            </NextLinkComposed>
          )}
    </div>
  );
};

Logo.propTypes = {
  staticData: shape().isRequired
};
